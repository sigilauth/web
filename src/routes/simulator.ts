import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const simulatorRoutes = new Hono();

// Mock challenge store
const challenges = new Map<string, {
  fingerprint: string;
  action: { type: string; description: string };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: number;
}>();

// POST /simulator/challenge - Integrator creates challenge (simulated)
simulatorRoutes.post('/challenge',
  zValidator('json', z.object({
    fingerprint: z.string().regex(/^[a-f0-9]{64}$/),
    action: z.object({
      type: z.string(),
      description: z.string()
    })
  })),
  async (c) => {
    const { fingerprint, action } = c.req.valid('json');

    const challengeId = crypto.randomUUID();

    challenges.set(challengeId, {
      fingerprint,
      action,
      status: 'pending',
      createdAt: Date.now()
    });

    // Auto-cleanup after 5 minutes
    setTimeout(() => challenges.delete(challengeId), 5 * 60 * 1000);

    return c.json({
      challengeId,
      status: 'pending',
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString()
    }, 201);
  }
);

// GET /simulator/challenge/:id/status - Poll challenge status
simulatorRoutes.get('/challenge/:id/status', (c) => {
  const challengeId = c.req.param('id');
  const challenge = challenges.get(challengeId);

  if (!challenge) {
    return c.json({ error: 'Challenge not found or expired' }, 404);
  }

  return c.json({
    challengeId,
    status: challenge.status,
    fingerprint: challenge.status !== 'pending' ? challenge.fingerprint : undefined
  });
});

// POST /simulator/challenge/:id/approve - Mock device approval (for demo)
simulatorRoutes.post('/challenge/:id/approve', (c) => {
  const challengeId = c.req.param('id');
  const challenge = challenges.get(challengeId);

  if (!challenge) {
    return c.json({ error: 'Challenge not found' }, 404);
  }

  challenge.status = 'approved';

  return c.json({
    challengeId,
    status: 'approved',
    fingerprint: challenge.fingerprint
  });
});

// POST /simulator/challenge/:id/reject - Mock device rejection (for demo)
simulatorRoutes.post('/challenge/:id/reject', (c) => {
  const challengeId = c.req.param('id');
  const challenge = challenges.get(challengeId);

  if (!challenge) {
    return c.json({ error: 'Challenge not found' }, 404);
  }

  challenge.status = 'rejected';

  return c.json({
    challengeId,
    status: 'rejected'
  });
});

// GET /simulator/source - Return SDK usage example source code
simulatorRoutes.get('/source', (c) => {
  const exampleCode = `
import { SigilAuth } from '@sigilauth/sdk';

// Initialize SDK
const sigil = new SigilAuth({
  serviceUrl: 'https://sigil.example.com'
});

// Create authentication challenge
const challenge = await sigil.auth.createChallenge({
  fingerprint: 'a1b2c3d4e5f6a7b8...',
  device_public_key: 'AgABAgMEBQYH...',
  action: {
    type: 'step_up',
    description: 'Sign in to dashboard'
  }
});

console.log('Challenge created:', challenge.challenge_id);
console.log('Pictogram:', challenge.pictogram.join(' '));

// Poll for result
const result = await sigil.auth.awaitResult(challenge.challenge_id, {
  pollInterval: 2000,  // 2 seconds
  timeout: 60000       // 60 seconds
});

if (result.status === 'verified') {
  console.log('✓ Authentication approved!');
} else {
  console.log('✗ Authentication failed');
}
`.trim();

  return c.json({
    language: 'typescript',
    code: exampleCode,
    package: '@sigilauth/sdk',
    documentation: 'https://docs.sigilauth.com'
  });
});

export { simulatorRoutes };
