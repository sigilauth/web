import type { Context, Next } from 'hono';

interface RateLimitOptions {
  max: number;
  window: number; // seconds
}

const store = new Map<string, { count: number; resetAt: number }>();

export function clearRateLimitStore(): void {
  store.clear();
}

function getClientIp(c: Context): string {
  const trustedProxy = process.env.TRUSTED_PROXY_IP;

  if (trustedProxy) {
    return c.req.header('x-forwarded-for')?.split(',')[0].trim() ?? c.req.header('x-real-ip') ?? 'unknown';
  }

  return c.req.header('x-real-ip') ?? 'unknown';
}

export function rateLimiter(options: RateLimitOptions) {
  return async (c: Context, next: Next) => {
    const ip = getClientIp(c);
    const key = `${ip}:${c.req.path}`;
    const now = Date.now();

    let entry = store.get(key);

    if (!entry || now > entry.resetAt) {
      entry = { count: 0, resetAt: now + options.window * 1000 };
      store.set(key, entry);
    }

    entry.count++;

    if (entry.count > options.max) {
      return c.json(
        { error: 'Rate limit exceeded. Try again later.' },
        429,
        { 'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)) }
      );
    }

    await next();
  };
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);
