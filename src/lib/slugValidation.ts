export const RESERVED_SLUGS: readonly string[] = [
  'admin',
  'administrator',
  'api',
  'app',
  'assets',
  'auth',
  'bin',
  'buildeasy',
  'builder',
  'cdn',
  'config',
  'dashboard',
  'dash',
  'demo',
  'dev',
  'dist',
  'docs',
  'edit',
  'editor',
  'explore',
  'gallery',
  'help',
  'home',
  'images',
  'import',
  'login',
  'logout',
  'null',
  'oauth',
  'p',
  'portfolio',
  'portfolios',
  'privacy',
  'public',
  'publish',
  'published',
  'register',
  'root',
  'server',
  'settings',
  'signin',
  'signout',
  'signup',
  'static',
  'status',
  'support',
  'template',
  'templates',
  'terms',
  'test',
  'undefined',
  'upload',
  'uploads',
  'user',
  'users',
  'verify',
  'view',
  'www'
];

export interface SlugValidationResult {
  valid: boolean;
  normalizedSlug: string;
  error?: string;
}

export function normalizeSlug(rawInput: string): string {
  if (!rawInput) return '';
  return rawInput
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function validateSlug(rawSlug: string): SlugValidationResult {
  const normalized = normalizeSlug(rawSlug);

  if (!normalized) {
    return {
      valid: false,
      normalizedSlug: '',
      error: 'Subdomain / slug cannot be empty.'
    };
  }

  if (normalized.length < 3) {
    return {
      valid: false,
      normalizedSlug: normalized,
      error: 'Subdomain must be at least 3 characters long.'
    };
  }

  if (normalized.length > 50) {
    return {
      valid: false,
      normalizedSlug: normalized,
      error: 'Subdomain cannot exceed 50 characters.'
    };
  }

  const slugRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  if (!slugRegex.test(normalized)) {
    return {
      valid: false,
      normalizedSlug: normalized,
      error: 'Subdomain can only contain lowercase letters, numbers, and non-consecutive hyphens.'
    };
  }

  if (RESERVED_SLUGS.includes(normalized)) {
    return {
      valid: false,
      normalizedSlug: normalized,
      error: `"${normalized}" is a reserved system path. Please choose another name.`
    };
  }

  return {
    valid: true,
    normalizedSlug: normalized
  };
}
