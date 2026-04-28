import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { Hono } from 'hono';
import { rateLimiter, clearRateLimitStore } from './rate-limit';

describe('rateLimiter middleware', () => {
  let app: Hono;
  const originalEnv = { ...process.env };

  beforeEach(() => {
    app = new Hono();
    clearRateLimitStore();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    clearRateLimitStore();
  });

  describe('SIG-2026-006: store.set missing second argument', () => {
    test('should actually store rate limit entries', async () => {
      app.use('/test', rateLimiter({ max: 2, window: 60 }));
      app.get('/test', (c) => c.json({ ok: true }));

      const req1 = new Request('http://localhost/test', {
        headers: { 'x-forwarded-for': '203.0.113.42' },
      });
      const req2 = new Request('http://localhost/test', {
        headers: { 'x-forwarded-for': '203.0.113.42' },
      });
      const req3 = new Request('http://localhost/test', {
        headers: { 'x-forwarded-for': '203.0.113.42' },
      });

      const res1 = await app.fetch(req1);
      expect(res1.status).toBe(200);

      const res2 = await app.fetch(req2);
      expect(res2.status).toBe(200);

      const res3 = await app.fetch(req3);
      expect(res3.status).toBe(429);

      const body = await res3.json();
      expect(body).toHaveProperty('error');
      expect(body.error).toMatch(/rate limit/i);
    });
  });

  describe('SIG-2026-007: X-Forwarded-For trusted without validation', () => {
    test('should ignore X-Forwarded-For when no proxy configured', async () => {
      delete process.env.TRUSTED_PROXY_IP;

      app.use('/test', rateLimiter({ max: 2, window: 60 }));
      app.get('/test', (c) => c.json({ ok: true }));

      const makeRequest = (xff: string, realIp: string) =>
        new Request('http://localhost/test', {
          headers: {
            'x-forwarded-for': xff,
            'x-real-ip': realIp,
          },
        });

      const res1 = await app.fetch(makeRequest('1.1.1.1', '203.0.113.10'));
      const res2 = await app.fetch(makeRequest('2.2.2.2', '203.0.113.10'));
      const res3 = await app.fetch(makeRequest('3.3.3.3', '203.0.113.10'));

      expect(res1.status).toBe(200);
      expect(res2.status).toBe(200);
      expect(res3.status).toBe(429);
    });

    test('should use X-Real-IP when X-Forwarded-For is untrusted', async () => {
      delete process.env.TRUSTED_PROXY_IP;

      app.use('/test', rateLimiter({ max: 2, window: 60 }));
      app.get('/test', (c) => c.json({ ok: true }));

      const req1 = new Request('http://localhost/test', {
        headers: {
          'x-forwarded-for': '203.0.113.99',
          'x-real-ip': '203.0.113.50',
        },
      });

      const res1 = await app.fetch(req1);
      expect(res1.status).toBe(200);
    });

    test('should trust X-Forwarded-For when TRUSTED_PROXY_IP is set', async () => {
      process.env.TRUSTED_PROXY_IP = '10.0.0.1';

      app.use('/test', rateLimiter({ max: 2, window: 60 }));
      app.get('/test', (c) => c.json({ ok: true }));

      const makeRequest = (xff: string) =>
        new Request('http://localhost/test', {
          headers: {
            'x-forwarded-for': xff,
            'x-real-ip': '10.0.0.1',
          },
        });

      const res1 = await app.fetch(makeRequest('203.0.113.50'));
      const res2 = await app.fetch(makeRequest('203.0.113.50'));
      const res3 = await app.fetch(makeRequest('203.0.113.50'));

      expect(res1.status).toBe(200);
      expect(res2.status).toBe(200);
      expect(res3.status).toBe(429);

      delete process.env.TRUSTED_PROXY_IP;
    });

    test('should isolate IPs correctly with trusted proxy', async () => {
      process.env.TRUSTED_PROXY_IP = '10.0.0.1';

      app.use('/test', rateLimiter({ max: 2, window: 60 }));
      app.get('/test', (c) => c.json({ ok: true }));

      const makeRequest = (xff: string) =>
        new Request('http://localhost/test', {
          headers: {
            'x-forwarded-for': xff,
            'x-real-ip': '10.0.0.1',
          },
        });

      await app.fetch(makeRequest('203.0.113.1'));
      await app.fetch(makeRequest('203.0.113.1'));
      const res3 = await app.fetch(makeRequest('203.0.113.1'));
      expect(res3.status).toBe(429);

      const res4 = await app.fetch(makeRequest('203.0.113.2'));
      expect(res4.status).toBe(200);

      delete process.env.TRUSTED_PROXY_IP;
    });
  });

  describe('B10 spec: 10 requests per IP per minute', () => {
    test('should enforce 10/IP/min limit', async () => {
      delete process.env.TRUSTED_PROXY_IP;

      app.use('/pairing/redeem', rateLimiter({ max: 10, window: 60 }));
      app.post('/pairing/redeem', (c) => c.json({ ok: true }));

      const makeRequest = () =>
        new Request('http://localhost/pairing/redeem', {
          method: 'POST',
          headers: { 'x-real-ip': '203.0.113.100' },
        });

      for (let i = 0; i < 10; i++) {
        const res = await app.fetch(makeRequest());
        expect(res.status).toBe(200);
      }

      const res11 = await app.fetch(makeRequest());
      expect(res11.status).toBe(429);

      const body = await res11.json();
      expect(body.error).toMatch(/rate limit/i);
      expect(res11.headers.get('Retry-After')).toBeTruthy();
    });

    test('should isolate rate limits per IP', async () => {
      delete process.env.TRUSTED_PROXY_IP;

      app.use('/test', rateLimiter({ max: 2, window: 60 }));
      app.get('/test', (c) => c.json({ ok: true }));

      const ip1Req = () =>
        new Request('http://localhost/test', {
          headers: { 'x-real-ip': '203.0.113.10' },
        });
      const ip2Req = () =>
        new Request('http://localhost/test', {
          headers: { 'x-real-ip': '203.0.113.20' },
        });

      await app.fetch(ip1Req());
      await app.fetch(ip1Req());
      const ip1Blocked = await app.fetch(ip1Req());
      expect(ip1Blocked.status).toBe(429);

      const ip2First = await app.fetch(ip2Req());
      expect(ip2First.status).toBe(200);
    });
  });
});
