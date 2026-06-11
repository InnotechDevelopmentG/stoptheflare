import { createClient } from '@supabase/supabase-js';

/**
 * Server-only Supabase client for reading/writing auto-generated articles.
 * Prefers the service-role key (bypasses RLS); falls back to the anon key.
 */
export function getSupabaseAdminClient() {
  // Trim whitespace and any trailing slash — a trailing "/" yields a malformed
  // "//rest/v1/..." path and Supabase rejects it ("Invalid path specified in request URL").
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/+$/, '');
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)?.trim();
  if (!url || !key) throw new Error('Missing Supabase env vars');
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
