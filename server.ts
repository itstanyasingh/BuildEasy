import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Path declarations
const DB_FILE = path.join(process.cwd(), 'published_portfolios.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure database file and uploads directory exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({}, null, 2), 'utf-8');
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Reserved system slugs that cannot be claimed as portfolio subdomains
const RESERVED_SLUGS = new Set([
  'admin', 'administrator', 'api', 'app', 'assets', 'auth', 'bin', 'buildeasy',
  'builder', 'cdn', 'config', 'dashboard', 'dash', 'demo', 'dev', 'dist', 'docs',
  'edit', 'editor', 'explore', 'gallery', 'help', 'home', 'images', 'import',
  'login', 'logout', 'null', 'oauth', 'p', 'portfolio', 'portfolios', 'privacy',
  'public', 'publish', 'published', 'register', 'root', 'server', 'settings',
  'signin', 'signout', 'signup', 'static', 'status', 'support', 'template',
  'templates', 'terms', 'test', 'undefined', 'upload', 'uploads', 'user', 'users',
  'verify', 'view', 'www'
]);

// Rate limiter helper
interface RateLimitInfo {
  count: number;
  resetTime: number;
}
const rateLimits = new Map<string, RateLimitInfo>();

function checkRateLimit(ip: string, limit = 30, windowMs = 60 * 1000): boolean {
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

// Database helper functions
function readDb(): Record<string, any> {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read database file:', err);
    return {};
  }
}

function writeDb(data: Record<string, any>) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write database file:', err);
  }
}

// Slug normalization & validation
function normalizeSlug(rawInput: string): string {
  if (!rawInput) return '';
  return rawInput
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function validateSlug(slug: string): { valid: boolean; error?: string } {
  const normalized = normalizeSlug(slug);
  if (!normalized) {
    return { valid: false, error: 'Subdomain / slug cannot be empty.' };
  }
  if (normalized.length < 3) {
    return { valid: false, error: 'Subdomain must be at least 3 characters long.' };
  }
  if (normalized.length > 50) {
    return { valid: false, error: 'Subdomain cannot exceed 50 characters.' };
  }
  const slugRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  if (!slugRegex.test(normalized)) {
    return { valid: false, error: 'Subdomain can only contain lowercase letters, numbers, and non-consecutive hyphens.' };
  }
  if (RESERVED_SLUGS.has(normalized)) {
    return { valid: false, error: `"${normalized}" is a reserved system path. Please choose another name.` };
  }
  return { valid: true };
}

// Asset extractor: Converts base64 data URIs into static persisted files
function persistBase64Images(obj: any): any {
  if (!obj) return obj;
  if (typeof obj === 'string') {
    const match = obj.match(/^data:image\/(png|jpeg|jpg|webp|gif|svg\+xml);base64,(.+)$/);
    if (match) {
      try {
        let ext = match[1];
        if (ext === 'jpeg') ext = 'jpg';
        if (ext === 'svg+xml') ext = 'svg';
        const buffer = Buffer.from(match[2], 'base64');
        const hash = crypto.createHash('md5').update(buffer).digest('hex').slice(0, 16);
        const filename = `asset-${Date.now()}-${hash}.${ext}`;
        const filePath = path.join(UPLOADS_DIR, filename);
        fs.writeFileSync(filePath, buffer);
        return `/uploads/${filename}`;
      } catch (err) {
        console.error('Failed to persist base64 asset to disk:', err);
        return obj;
      }
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => persistBase64Images(item));
  }
  if (typeof obj === 'object') {
    const cleaned: Record<string, any> = {};
    for (const [key, val] of Object.entries(obj)) {
      cleaned[key] = persistBase64Images(val);
    }
    return cleaned;
  }
  return obj;
}

// Canonical Public Domain Resolver
function getCanonicalPublicUrl(slug: string, req: express.Request): string {
  // 1. Check explicitly configured PRODUCTION_URL or PUBLIC_URL or CUSTOM_DOMAIN
  const configuredProd = process.env.PRODUCTION_URL || process.env.PUBLIC_URL || process.env.CUSTOM_DOMAIN;
  if (configuredProd) {
    const base = configuredProd.replace(/\/+$/, '');
    return `${base}/p/${slug}`;
  }

  // 2. Check APP_URL if running in deployed environment
  const appUrl = process.env.APP_URL;
  if (appUrl && !appUrl.includes('ais-dev-') && !appUrl.includes('localhost')) {
    const base = appUrl.replace(/\/+$/, '');
    return `${base}/p/${slug}`;
  }

  // 3. Fallback to current request host if valid public domain, or canonical domain
  const host = req.get('host') || '';
  const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';

  // If host is a standard custom domain (not an internal dev URL)
  if (host && !host.includes('localhost') && !host.includes('ais-dev-') && !host.includes('127.0.0.1')) {
    return `${protocol}://${host}/p/${slug}`;
  }

  // Default production canonical URL for BuildEasy
  return `https://buildeasy.com/p/${slug}`;
}

// Middlewares
app.use(express.json({ limit: '20mb' }));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve uploaded persistent media statically
app.use('/uploads', express.static(UPLOADS_DIR, {
  maxAge: '30d',
  immutable: true
}));

// ==========================================
// API ROUTES
// ==========================================

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 2. Deployment Configuration Info
app.get('/api/deployment/config', (req, res) => {
  const hasVercel = !!process.env.VERCEL_TOKEN;
  const prodUrl = process.env.PRODUCTION_URL || process.env.PUBLIC_URL || process.env.CUSTOM_DOMAIN;
  
  const provider = hasVercel ? 'vercel' : (prodUrl ? 'native' : 'native');
  const canonicalDomain = prodUrl ? prodUrl.replace(/\/+$/, '') : 'https://buildeasy.com';

  res.json({
    configured: true,
    provider,
    canonicalDomain,
    environment: process.env.NODE_ENV || 'development'
  });
});

// 3. Slug Availability and Format Check
app.get('/api/deploy/check-slug/:slug', (req, res) => {
  const rawSlug = req.params.slug;
  const portfolioId = req.query.portfolioId as string | undefined;

  const validation = validateSlug(rawSlug);
  const normalized = normalizeSlug(rawSlug);

  if (!validation.valid) {
    return res.status(400).json({
      available: false,
      normalizedSlug: normalized,
      error: validation.error
    });
  }

  const db = readDb();
  const existingRecord = db[normalized];

  if (existingRecord) {
    // If it belongs to the same portfolio ID, it is available for update
    if (portfolioId && existingRecord.id === portfolioId) {
      return res.json({
        available: true,
        normalizedSlug: normalized,
        isExistingOwner: true
      });
    }
    return res.status(409).json({
      available: false,
      normalizedSlug: normalized,
      error: 'That subdomain is already taken.'
    });
  }

  return res.json({
    available: true,
    normalizedSlug: normalized
  });
});

// 4. Fetch Published Portfolio Snapshot (Public Route Data Source)
app.get('/api/published/:slug', (req, res) => {
  try {
    const slug = normalizeSlug(req.params.slug);
    const db = readDb();
    
    const record = db[slug];
    if (!record) {
      return res.status(404).json({ error: 'Portfolio not found', code: 'NOT_FOUND' });
    }

    if (!record.published) {
      return res.status(403).json({ error: 'Portfolio has been unpublished by the creator.', code: 'UNPUBLISHED' });
    }

    // Strip private credentials and creator tokens
    const publicSnapshot = {
      id: record.id,
      name: record.name,
      templateId: record.templateId,
      username: record.username,
      published: true,
      updatedAt: record.updatedAt,
      version: record.version || 1,
      publicUrl: record.publicUrl,
      deploymentId: record.deploymentId,
      publishedAt: record.publishedAt,
      data: record.data,
      customizer: record.customizer
    };

    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    res.json(publicSnapshot);
  } catch (error) {
    console.error('Error fetching published snapshot:', error);
    res.status(500).json({ error: 'Internal server error fetching portfolio' });
  }
});

// 5. Publish / Redeploy Portfolio Snapshot
app.post('/api/published/:slug', async (req, res) => {
  try {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(ip, 20, 60 * 1000)) {
      return res.status(429).json({ 
        error: 'Too many deployment requests. Please wait a minute and retry.', 
        code: 'RATE_LIMIT' 
      });
    }

    const requestedSlug = normalizeSlug(req.params.slug);
    const payload = req.body;

    // 1. Basic schema validation
    if (!payload || !payload.id || typeof payload.id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing portfolio ID' });
    }
    if (!payload.templateId || typeof payload.templateId !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing template ID' });
    }
    if (!payload.publishedData || typeof payload.publishedData !== 'object') {
      return res.status(400).json({ error: 'Invalid or missing published data object' });
    }

    // 2. Slug validation
    const slugCheck = validateSlug(requestedSlug);
    if (!slugCheck.valid) {
      return res.status(400).json({ error: slugCheck.error });
    }

    // 3. Ownership / Authorization Token Check
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required: missing creator token.' });
    }
    const clientToken = authHeader.substring(7).trim();
    if (!clientToken || clientToken.length < 8) {
      return res.status(401).json({ error: 'Unauthorized: invalid creator credentials.' });
    }

    const db = readDb();

    // 4. Duplicate slug check (Must NOT silently rename to a different slug)
    const existingSlugRecord = db[requestedSlug];
    if (existingSlugRecord && existingSlugRecord.id !== payload.id) {
      return res.status(409).json({ 
        error: 'That subdomain is already taken.',
        code: 'SLUG_TAKEN'
      });
    }

    // 5. Ownership verification
    if (existingSlugRecord && existingSlugRecord.creatorToken && existingSlugRecord.creatorToken !== clientToken) {
      return res.status(403).json({ 
        error: 'Ownership conflict: you do not have permission to overwrite this subdomain.',
        code: 'FORBIDDEN'
      });
    }

    // Check if this portfolio ID was previously registered under another slug by a different token
    for (const key of Object.keys(db)) {
      if (db[key].id === payload.id && db[key].creatorToken && db[key].creatorToken !== clientToken) {
        return res.status(403).json({ 
          error: 'Access denied: ownership token mismatch for this portfolio ID.',
          code: 'FORBIDDEN'
        });
      }
    }

    // 6. Asset Extraction: Persist base64 images to permanent disk storage
    const cleanPublishedData = persistBase64Images(payload.publishedData);
    const cleanPublishedCustomizer = persistBase64Images(payload.publishedCustomizer || {});

    // 7. Generate Deployment Metadata
    const deploymentId = `dep_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const publishedAt = new Date().toISOString();
    const currentVersion = (payload.version || (existingSlugRecord ? existingSlugRecord.version : 0)) + 1;
    const publicUrl = getCanonicalPublicUrl(requestedSlug, req);

    // 8. Build Immutable Snapshot Record
    const snapshotRecord = {
      id: payload.id,
      name: payload.name || 'Untitled Portfolio',
      templateId: payload.templateId,
      username: requestedSlug,
      published: true,
      updatedAt: publishedAt.split('T')[0],
      publishedAt: publishedAt,
      version: currentVersion,
      deploymentId: deploymentId,
      publicUrl: publicUrl,
      creatorToken: clientToken, // Stored safely on server
      data: cleanPublishedData,
      customizer: cleanPublishedCustomizer
    };

    // 9. Save Snapshot to Database
    db[requestedSlug] = snapshotRecord;
    writeDb(db);

    // 10. Server-Side Verification: Verify saved snapshot integrity
    const verifiedDb = readDb();
    const verifiedRecord = verifiedDb[requestedSlug];
    if (!verifiedRecord || verifiedRecord.id !== payload.id || !verifiedRecord.published) {
      return res.status(500).json({
        error: 'Deployment verification failed: snapshot failed to persist to disk.',
        code: 'VERIFICATION_FAILED'
      });
    }

    // 11. Return Confirmed Deployment Result
    return res.json({
      success: true,
      portfolioId: snapshotRecord.id,
      slug: requestedSlug,
      publicUrl: publicUrl,
      deploymentId: deploymentId,
      version: currentVersion,
      status: 'ready',
      publishedAt: publishedAt,
      snapshot: {
        id: snapshotRecord.id,
        name: snapshotRecord.name,
        templateId: snapshotRecord.templateId,
        username: snapshotRecord.username,
        published: true,
        updatedAt: snapshotRecord.updatedAt,
        version: snapshotRecord.version,
        publicUrl: snapshotRecord.publicUrl,
        deploymentId: snapshotRecord.deploymentId
      }
    });

  } catch (error: any) {
    console.error('Error during portfolio deployment:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to complete portfolio deployment.',
      code: 'SERVER_ERROR'
    });
  }
});

// 6. Unpublish Portfolio
app.post('/api/unpublish/:slug', (req, res) => {
  try {
    const slug = normalizeSlug(req.params.slug);
    const db = readDb();

    const record = db[slug];
    if (!record) {
      return res.status(404).json({ error: 'Portfolio snapshot not found' });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required to unpublish.' });
    }
    const clientToken = authHeader.substring(7).trim();

    if (record.creatorToken && record.creatorToken !== clientToken) {
      return res.status(403).json({ error: 'Access denied: you do not own this portfolio.' });
    }

    // Mark unpublished or delete
    record.published = false;
    db[slug] = record;
    writeDb(db);

    res.json({ success: true, message: 'Portfolio unpublished successfully' });
  } catch (error) {
    console.error('Error during unpublishing:', error);
    res.status(500).json({ error: 'Internal server error during unpublish.' });
  }
});

// ==========================================
// SPA ROUTING & DEV/PROD MIDDLEWARES
// ==========================================
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
    console.log(`BuildEasy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
