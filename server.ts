import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), 'published_portfolios.json');

// Ensure database file exists with a clean file write
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({}, null, 2), 'utf-8');
}

// Simple in-memory rate limiter to protect publishing endpoints (Requirement 13)
interface RateLimitInfo {
  count: number;
  resetTime: number;
}
const rateLimits = new Map<string, RateLimitInfo>();

function checkRateLimit(ip: string, limit = 60, windowMs = 60 * 1000): boolean {
  const now = Date.now();
  let info = rateLimits.get(ip);
  if (!info || now > info.resetTime) {
    info = { count: 1, resetTime: now + windowMs };
    rateLimits.set(ip, info);
    return true;
  }
  if (info.count >= limit) {
    return false;
  }
  info.count++;
  return true;
}

// Helper to read database safely
function readDb(): Record<string, any> {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read database file:', err);
    return {};
  }
}

// Helper to write database safely
function writeDb(data: Record<string, any>) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write database file:', err);
  }
}

// Limit overall JSON payload size to prevent DOS/extreme data payloads (Requirement 8)
app.use(express.json({ limit: '10mb' }));

// Set core security headers on all responses (Requirement 24)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET Endpoint to fetch published portfolio (exposes ONLY clean published snapshot)
app.get('/api/published/:username', (req, res) => {
  try {
    const username = req.params.username.toLowerCase();
    const db = readDb();
    
    const record = db[username];
    if (!record) {
      return res.status(404).json({ error: 'Portfolio not found', code: 'NOT_FOUND' });
    }

    if (!record.published) {
      return res.status(403).json({ error: 'Portfolio is unpublished', code: 'UNPUBLISHED' });
    }

    // Public API Hardening - STRICT separation: strip sensitive credentials & identifiers (Requirements 5 & 18)
    const sanitizedSnapshot = {
      id: record.id,
      name: record.name,
      templateId: record.templateId,
      username: record.username,
      published: true,
      updatedAt: record.updatedAt,
      version: record.version,
      data: record.data,
      customizer: record.customizer
    };

    res.json(sanitizedSnapshot);
  } catch (error) {
    console.error('Error serving public portfolio:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// POST Endpoint to publish/snapshot portfolio data with ownership verification
app.post('/api/published/:username', (req, res) => {
  try {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    // Rate limit publishing to maximum 15 publications per minute per IP (Requirement 13)
    if (!checkRateLimit(ip, 15, 60 * 1000)) {
      return res.status(429).json({ error: 'Too many publication requests. Please wait a minute and retry.', code: 'RATE_LIMIT' });
    }

    const username = req.params.username.toLowerCase();
    const payload = req.body;

    // Strict Request Validation (Requirement 8)
    if (!payload || !payload.id || typeof payload.id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing portfolio ID' });
    }
    if (!payload.templateId || typeof payload.templateId !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing template ID' });
    }
    if (!payload.publishedData || typeof payload.publishedData !== 'object') {
      return res.status(400).json({ error: 'Invalid or missing published data object' });
    }

    // Extract Bearer authorization token to enforce true ownership (Requirements 3 & 4)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required: missing token.' });
    }
    const clientToken = authHeader.substring(7).trim();
    if (!clientToken || clientToken.length < 8) {
      return res.status(401).json({ error: 'Unauthorized: invalid token structure.' });
    }

    const db = readDb();

    // Prevent IDOR: If a portfolio is already registered, only the authenticated owner can overwrite it
    const existingSlugRecord = db[username];
    if (existingSlugRecord && existingSlugRecord.id !== payload.id) {
      // Slug is taken by another portfolio! Collision-safe fallback (Requirement 2)
      let finalUsername = username;
      let counter = 1;
      while (db[finalUsername] && db[finalUsername].id !== payload.id) {
        counter++;
        finalUsername = `${username}-${counter}`;
      }
      return saveSnapshot(finalUsername, payload, clientToken, db);
    }

    if (existingSlugRecord && existingSlugRecord.creatorToken !== clientToken) {
      return res.status(403).json({ error: 'Ownership conflict: you do not have permission to overwrite this slug.' });
    }

    // Secondary scan to check if the exact portfolio ID is already published under another slug
    for (const key of Object.keys(db)) {
      if (db[key].id === payload.id && db[key].creatorToken !== clientToken) {
        return res.status(403).json({ error: 'Access denied: ownership token mismatch for this portfolio.' });
      }
    }

    return saveSnapshot(username, payload, clientToken, db);
  } catch (error) {
    console.error('Error during publishing:', error);
    res.status(500).json({ error: 'Failed to deploy portfolio snapshot.' });
  }

  function saveSnapshot(slug: string, dataPayload: any, token: string, db: Record<string, any>) {
    const snapshot = {
      id: dataPayload.id,
      name: dataPayload.name || 'Untitled Portfolio',
      templateId: dataPayload.templateId,
      username: slug,
      published: true,
      updatedAt: new Date().toISOString().split('T')[0],
      version: (dataPayload.version || 1) + 1,
      creatorToken: token, // Kept strictly on the server side
      data: dataPayload.publishedData,
      customizer: dataPayload.publishedCustomizer || {},
    };

    db[slug] = snapshot;
    writeDb(db);

    return res.json({ 
      success: true, 
      username: slug, 
      url: `/p/${slug}`,
      snapshot: {
        id: snapshot.id,
        name: snapshot.name,
        templateId: snapshot.templateId,
        username: snapshot.username,
        published: true,
        updatedAt: snapshot.updatedAt,
        version: snapshot.version
      }
    });
  }
});

// POST Endpoint to unpublish or delete a snapshot with ownership verification
app.post('/api/unpublish/:username', (req, res) => {
  try {
    const username = req.params.username.toLowerCase();
    const db = readDb();

    const record = db[username];
    if (!record) {
      return res.status(404).json({ error: 'Portfolio snapshot not found' });
    }

    // Verify token for deleting/unpublishing (Requirements 3 & 27)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required to unpublish.' });
    }
    const clientToken = authHeader.substring(7).trim();

    if (record.creatorToken !== clientToken) {
      return res.status(403).json({ error: 'Access denied: you do not own this portfolio.' });
    }

    delete db[username];
    writeDb(db);

    res.json({ success: true, message: 'Portfolio snapshot unpublished successfully' });
  } catch (error) {
    console.error('Error during unpublishing:', error);
    res.status(500).json({ error: 'Internal server error during unpublish.' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
