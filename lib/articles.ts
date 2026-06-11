import { getSupabaseAdminClient, isSupabaseConfigured } from '@/lib/supabase-admin';

export interface FlareArticle {
  id: string;
  slug: string;
  title: string;
  seo_description: string | null;
  excerpt: string | null;
  category: string | null;
  condition_slug: string | null;
  read_time: string | null;
  body: string[];
  faqs: { q: string; a: string }[];
  tags: string[];
  published_at: string;
}

/** List recent auto-generated articles. Returns [] before Supabase is configured. */
export async function listLatestArticles(limit = 50): Promise<FlareArticle[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from('flare_articles')
      .select('id, slug, title, seo_description, excerpt, category, condition_slug, read_time, body, faqs, tags, published_at')
      .order('published_at', { ascending: false })
      .limit(limit);
    if (error) return [];
    return (data ?? []) as FlareArticle[];
  } catch {
    return [];
  }
}

/** Fetch a single article by slug. Returns null when missing or unconfigured. */
export async function getLatestArticle(slug: string): Promise<FlareArticle | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from('flare_articles')
      .select('id, slug, title, seo_description, excerpt, category, condition_slug, read_time, body, faqs, tags, published_at')
      .eq('slug', slug)
      .single();
    if (error || !data) return null;
    return data as FlareArticle;
  } catch {
    return null;
  }
}
