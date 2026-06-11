import { NextRequest, NextResponse } from 'next/server';
import { generateArticle } from '@/lib/article-generator';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';
import { getBlogPosts } from '@/lib/data';

export const maxDuration = 120; // article generation needs time
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const isVercelCron = req.headers.get('x-vercel-cron') === '1';
  const authHeader = req.headers.get('authorization');
  const querySecret = req.nextUrl.searchParams.get('secret');

  const authorized =
    !cronSecret ||
    isVercelCron ||
    authHeader === `Bearer ${cronSecret}` ||
    querySecret === cronSecret;

  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Secret-protected diagnostics: ?debug=1 echoes the configured Supabase URL
  // (already public via NEXT_PUBLIC_) and which keys are present, without generating.
  if (req.nextUrl.searchParams.get('debug') === '1') {
    const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? null;
    return NextResponse.json({
      rawUrl,
      sanitizedUrl: rawUrl?.trim().replace(/\/+$/, '') ?? null,
      hasServiceKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      hasAnthropicKey: Boolean(process.env.ANTHROPIC_API_KEY),
    });
  }

  try {
    const supabase = getSupabaseAdminClient();

    // Build the "avoid" list from both the static blog and previously generated articles.
    const staticTitles = getBlogPosts().map((p) => p.title);
    const { data: existing } = await supabase
      .from('flare_articles')
      .select('title')
      .order('published_at', { ascending: false })
      .limit(200);
    const existingTitles = [
      ...staticTitles,
      ...((existing ?? []) as { title: string }[]).map((r) => r.title),
    ];

    console.log('[article-cron] Generating article...');
    const article = await generateArticle({ existingTitles });

    const { data, error } = await supabase
      .from('flare_articles')
      .insert({
        slug: article.slug,
        title: article.title,
        seo_description: article.seo_description,
        excerpt: article.excerpt,
        category: article.category,
        condition_slug: article.condition_slug,
        read_time: article.read_time,
        body: article.body,
        faqs: article.faqs,
        tags: article.tags,
        published_at: new Date().toISOString(),
      })
      .select('id, slug')
      .single();

    if (error) {
      // Duplicate slug — already published this exact title; treat as a no-op.
      if (error.code === '23505') {
        console.log('[article-cron] Duplicate slug, skipping:', article.slug);
        return NextResponse.json({ success: true, skipped: true, slug: article.slug });
      }
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    console.log('[article-cron] Published:', data.slug);
    return NextResponse.json({ success: true, slug: data.slug, id: data.id });
  } catch (err) {
    console.error('[article-cron] Error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
