// Test helper to check Hono IP detection
import { Hono } from 'hono';

const app = new Hono();

app.get('/test', (c) => {
  return c.json({
    headers: {
      'x-forwarded-for': c.req.header('x-forwarded-for'),
      'x-real-ip': c.req.header('x-real-ip'),
    },
    env: c.env,
  });
});

const req = new Request('http://localhost/test', {
  headers: {
    'x-forwarded-for': '1.2.3.4',
    'x-real-ip': '5.6.7.8',
  },
});

const res = await app.fetch(req);
console.log(await res.json());
