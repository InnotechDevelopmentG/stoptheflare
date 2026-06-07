/**
 * Submits all site URLs to IndexNow (Bing, DuckDuckGo, Yandex, etc.).
 *
 * Reads the live sitemap, extracts every <loc>, and pings the IndexNow API
 * so search engines crawl new/updated pages quickly.
 *
 * Runs automatically via the `postbuild` npm script on Vercel production
 * deploys. Can also be run manually: `npm run indexnow`.
 */

const HOST = 'www.stoptheflare.com';
const KEY = '93a229d1c0bb3359bb4915c9a880f4c6';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function getSitemapUrls() {
  const res = await fetch(SITEMAP_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  // Only ping on real production deploys, not preview builds or local runs
  // triggered by the postbuild hook.
  if (process.env.npm_lifecycle_event === 'postbuild' && process.env.VERCEL_ENV !== 'production') {
    console.log('[indexnow] Skipping — not a Vercel production build.');
    return;
  }

  const urlList = await getSitemapUrls();
  if (urlList.length === 0) {
    console.log('[indexnow] No URLs found in sitemap, nothing to submit.');
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  });

  // IndexNow returns 200 (accepted) or 202 (accepted, pending) on success.
  if (res.ok) {
    console.log(`[indexnow] Submitted ${urlList.length} URLs (HTTP ${res.status}).`);
  } else {
    console.warn(`[indexnow] Submission failed: HTTP ${res.status} ${await res.text()}`);
  }
}

main().catch((err) => {
  // Never fail the build because of an IndexNow hiccup.
  console.warn('[indexnow] Error:', err.message);
});
