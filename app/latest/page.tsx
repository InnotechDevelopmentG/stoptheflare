import type { Metadata } from 'next';
import Link from 'next/link';
import { listLatestArticles } from '@/lib/articles';
import { canonical, breadcrumbSchema, jsonLd, SITE_URL, SITE_NAME } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const TITLE = 'Latest Guides \u2014 Autoimmune & Inflammatory Health';
const DESCRIPTION =
  'Fresh, research-backed guides on supplements and daily management for Hashimoto\u2019s, gut health, eczema, fibromyalgia, and histamine intolerance. Updated daily.';

export const metadata: Metadata = {
  title: `${TITLE} | StopTheFlare`,
  description: DESCRIPTION,
  alternates: { canonical: canonical('/latest') },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonical('/latest'), type: 'website' },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function LatestPage() {
  const articles = await listLatestArticles(50);

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Latest', path: '/latest' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE_URL}/latest#blog`,
      name: TITLE,
      description: DESCRIPTION,
      url: canonical('/latest'),
      publisher: { '@id': `${SITE_URL}/#organization` },
      blogPost: articles.slice(0, 20).map((a) => ({
        '@type': 'BlogPosting',
        headline: a.title,
        url: canonical(`/latest/${a.slug}`),
        datePublished: a.published_at,
        author: { '@type': 'Organization', name: `${SITE_NAME} Research Team` },
      })),
    },
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(s)} />
      ))}

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <nav className="mb-4 text-caption text-text-muted">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>{' '}
          / <span className="text-text-secondary">Latest</span>
        </nav>

        <h1 className="font-serif text-4xl font-semibold leading-tight">Latest guides</h1>
        <p className="mt-3 max-w-2xl text-text-secondary">
          New, research-backed guidance published regularly across all five conditions we cover. No
          brand sponsorships \u2014 just honest, evidence-informed help.
        </p>

        {articles.length === 0 ? (
          <div className="mt-12 rounded-card border border-border bg-surface-warm p-10 text-center">
            <p className="font-medium text-text-primary">First guide coming soon</p>
            <p className="mt-2 text-small text-text-muted">New articles publish automatically each day.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {articles.map((a) => (
              <Link key={a.id} href={`/latest/${a.slug}`} className="group block">
                <article className="flex h-full flex-col rounded-card border border-border bg-white p-6 transition-colors hover:border-primary">
                  <div className="mb-3 flex items-center gap-2 text-caption text-text-muted">
                    {a.category && (
                      <span className="rounded-pill bg-surface-warm px-3 py-1 font-medium text-primary">
                        {a.category}
                      </span>
                    )}
                    <span>{formatDate(a.published_at)}</span>
                  </div>
                  <h2 className="font-serif text-xl font-semibold leading-snug text-text-primary group-hover:text-primary">
                    {a.title}
                  </h2>
                  {a.excerpt && (
                    <p className="mt-2 flex-1 text-small text-text-secondary">{a.excerpt}</p>
                  )}
                  {a.read_time && <p className="mt-4 text-caption text-text-muted">{a.read_time}</p>}
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
