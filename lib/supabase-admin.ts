import { createClient } from '@supabase/supabase-js';

/**
 * Server-only Supabase client for reading/writing auto-generated articles.
 * Prefers the service-role key (bypasses RLS); falls back to the anon key.
 */
/** Reduce a Supabase URL to its origin (scheme + host), tolerating a pasted
 *  "/rest/v1" path or trailing slash that would otherwise produce a malformed
 *  "//rest/v1/rest/v1/..." path ("Invalid path specified in request URL"). */
function normalizeSupabaseUrl(raw: string): string {
  const trimmed = raw.trim();
  try {
    return new URL(trimmed).origin;
  } catch {
    return trimmed.replace(/\/(rest\/v1)?\/*$/, '');
  }
}

export function getSupabaseAdminClient() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)?.trim();
  if (!rawUrl || !key) throw new Error('Missing Supabase env vars');
  const url = normalizeSupabaseUrl(rawUrl);
  return createClient(url, key, {
    auth: { persistSession: false },
    // Force Next.js fetch cache bypass so server components always get fresh data.
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
  });
}

/** True when Supabase env vars are present (used to gracefully no-op before setup). */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  );
}
