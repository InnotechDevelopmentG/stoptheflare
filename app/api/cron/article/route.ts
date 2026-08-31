import { NextRequest, NextResponse } from 'next/server';
import { generateArticle, pillarForDate } from '@/lib/article-generator';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';
import { getBlogPosts } from '@/lib/data';

export const maxDuration = 120; // article generation needs time
export const dynamic = 'force-dynamic';

const INDEXNOW_HOST = 'www.stoptheflare.com';
const INDEXNOW_KEY = '93a229d1c0bb3359bb4915c9a880f4c6';

/** Notify IndexNow (Bing/DuckDuckGo/Yandex) of a freshly published URL. Never throws. */
async function pingIndexNow(slug: string): Promise<void> {
  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: [`https://${INDEXNOW_HOST}/latest/${slug}`],
      }),
    });
  } catch (e) {
    console.error('[article-cron] IndexNow ping failed (non-fatal):', e);
  }
}

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

  try {
    const supabase = getSupabaseAdminClient();

    // Build the "avoid" list from both the static blog and previously generated
    // articles — scoped to today's pillar. Cross-pillar overlap isn't a real
    // duplication risk, and sending every title wastes input tokens.
    const pillar = pillarForDate();
    const staticTitles = getBlogPosts()
      .filter((p) => p.conditionSlug === pillar.slug)
      .map((p) => p.title);
    const { data: existing } = await supabase
      .from('flare_articles')
      .select('title')
      .eq('condition_slug', pillar.slug)
      .order('published_at', { ascending: false })
      .limit(60);
    const existingTitles = [
      ...staticTitles,
      ...((existing ?? []) as { title: string }[]).map((r) => r.title),
    ];

    console.log('[article-cron] Generating article...');
    const article = await generateArticle({ existingTitles, pillar });

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
    await pingIndexNow(data.slug);
    return NextResponse.json({ success: true, slug: data.slug, id: data.id });
  } catch (err) {
    console.error('[article-cron] Error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
