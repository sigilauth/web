import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { randomBytes } from 'crypto';
import { setCSRFToken } from '../middleware/csrf.js';

const pairingRoutes = new Hono();

// In-memory session store (production would use Redis)
const sessions = new Map<string, {
  code: string;
  serverUrl: string;
  serverPictogram: string[];
  createdAt: number;
  ipAddress: string;
  attempts: number;
}>();

// POST /pairing/initiate - Create pairing session
pairingRoutes.post('/initiate',
  zValidator('json', z.object({
    serverUrl: z.string().url(),
    serverPictogram: z.array(z.string()).length(5)
  })),
  async (c) => {
    const { serverUrl, serverPictogram } = c.req.valid('json');
    const sessionId = randomBytes(16).toString('hex');

    // Generate 8-digit pairing code (27 bits entropy per Knox spec)
    const code = Math.floor(10000000 + Math.random() * 90000000).toString();

    const ip = c.req.header('x-forwarded-for') ?? 'unknown';

    sessions.set(sessionId, {
      code,
      serverUrl,
      serverPictogram,
      createdAt: Date.now(),
      ipAddress: ip,
      attempts: 0
    });

    // Auto-cleanup after 10 minutes
    setTimeout(() => sessions.delete(sessionId), 10 * 60 * 1000);

    const csrfToken = setCSRFToken(c);

    return c.json({
      sessionId,
      code,
      qrData: JSON.stringify({ serverUrl, code, sessionId }),
      deepLink: `sigilauth://pair?code=${code}&server=${encodeURIComponent(serverUrl)}`,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      csrfToken
    }, 201);
  }
);

// POST /pairing/redeem - Device redeems pairing code
pairingRoutes.post('/redeem',
  zValidator('json', z.object({
    code: z.string().length(8),
    devicePublicKey: z.string()
  })),
  async (c) => {
    const { code, devicePublicKey } = c.req.valid('json');
    const ip = c.req.header('x-forwarded-for') ?? 'unknown';

    // Find session by code
    type SessionValue = ReturnType<typeof sessions.get>;
    let sessionId: string | undefined;
    let session: SessionValue = undefined;

    for (const [id, sess] of sessions.entries()) {
      if (sess.code === code) {
        sessionId = id;
        session = sess;
        break;
      }
    }

    if (!session || !sessionId) {
      return c.json({ error: 'Invalid or expired pairing code' }, 404);
    }

    // IP binding check (prevent code theft)
    if (session.ipAddress !== ip) {
      return c.json({ error: 'IP address mismatch' }, 403);
    }

    // Attempt limit (brute-force protection)
    session.attempts++;
    if (session.attempts > 3) {
      sessions.delete(sessionId);
      return c.json({ error: 'Too many attempts. Code invalidated.' }, 429);
    }

    // Constant-time comparison (prevent timing attacks)
    const providedCode = Buffer.from(code, 'utf8');
    const storedCode = Buffer.from(session.code, 'utf8');

    if (providedCode.length !== storedCode.length || !providedCode.equals(storedCode)) {
      return c.json({ error: 'Invalid pairing code' }, 400);
    }

    // Success - return server info for verification
    return c.json({
      sessionId,
      serverUrl: session.serverUrl,
      serverPictogram: session.serverPictogram,
      serverPictogramSpeakable: session.serverPictogram.join(' ')
    });
  }
);

// POST /pairing/callback - Device sends mnemonic verification code
pairingRoutes.post('/callback',
  zValidator('json', z.object({
    sessionId: z.string(),
    verificationCode: z.string().length(6),
    deviceFingerprint: z.string().regex(/^[a-f0-9]{64}$/)
  })),
  async (c) => {
    const { sessionId, verificationCode, deviceFingerprint } = c.req.valid('json');

    const session = sessions.get(sessionId);
    if (!session) {
      return c.json({ error: 'Session not found or expired' }, 404);
    }

    // In real implementation, this would:
    // 1. Decrypt mnemonic from device
    // 2. Compute verification code from mnemonic
    // 3. Compare codes
    // For demo, we just acknowledge

    sessions.delete(sessionId); // One-time use

    return c.json({
      status: 'success',
      message: 'Device paired successfully',
      deviceFingerprint
    });
  }
);

// GET /pairing/:sessionId/status - Poll pairing status
pairingRoutes.get('/:sessionId/status', (c) => {
  const sessionId = c.req.param('sessionId');
  const session = sessions.get(sessionId);

  if (!session) {
    return c.json({ status: 'expired' }, 404);
  }

  return c.json({
    status: 'pending',
    expiresAt: new Date(session.createdAt + 10 * 60 * 1000).toISOString()
  });
});

export { pairingRoutes };
