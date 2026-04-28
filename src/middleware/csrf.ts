import type { Context, Next } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { createHmac, randomBytes } from 'crypto';

const SECRET = process.env.CSRF_SECRET ?? randomBytes(32).toString('hex');

function generateToken(): string {
  return randomBytes(32).toString('hex');
}

function signToken(token: string): string {
  return createHmac('sha256', SECRET).update(token).digest('hex');
}

export async function csrfProtection(c: Context, next: Next) {
  if (c.req.method === 'GET' || c.req.method === 'HEAD') {
    await next();
    return;
  }

  const cookieToken = getCookie(c, 'csrf_token');
  const headerToken = c.req.header('x-csrf-token');

  if (!cookieToken || !headerToken) {
    return c.json({ error: 'CSRF token missing' }, 403);
  }

  const expectedSignature = signToken(headerToken);
  if (cookieToken !== expectedSignature) {
    return c.json({ error: 'Invalid CSRF token' }, 403);
  }

  await next();
}

export function setCSRFToken(c: Context): string {
  const token = generateToken();
  const signature = signToken(token);

  setCookie(c, 'csrf_token', signature, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 3600
  });

  return token;
}
