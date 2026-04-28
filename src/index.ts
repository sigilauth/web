import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { logger } from 'hono/logger';
import { pairingRoutes } from './routes/pairing.js';
import { simulatorRoutes } from './routes/simulator.js';
import { rateLimiter } from './middleware/rate-limit.js';
import { csrfProtection } from './middleware/csrf.js';

const app = new Hono();

// Security middleware
app.use('*', secureHeaders({
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"]
  },
  crossOriginEmbedderPolicy: false // Allow embedding for demo
}));

app.use('*', logger());

app.use('*', cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
app.use('/pairing/*', rateLimiter({ max: 10, window: 60 })); // 10 per minute per IP

// CSRF protection on state-changing routes
app.use('/pairing/redeem', csrfProtection);
app.use('/pairing/callback', csrfProtection);

// Health check
app.get('/health', (c) => c.json({ status: 'ok', service: 'sigil-web-demo' }));

// Routes
app.route('/pairing', pairingRoutes);
app.route('/simulator', simulatorRoutes);

// 404
app.notFound((c) => c.json({ error: 'Not found' }, 404));

// Error handler
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

export default app;
