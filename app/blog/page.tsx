import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/data';
import { canonical, breadcrumbSchema, jsonLd, SITE_NAME, SITE_URL } from '@/lib/seo';
import ArticleCard from '@/components/shared/ArticleCard';

const TITLE = 'Research & Guides';
const DESCRIPTION =
  'Research-backed guides on supplements and protocols for autoimmune conditions — written for you, not for the brands.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonical('/blog') },
  openGraph: {
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: canonical('/blog'),
    type: 'website',
  },
};

export default function BlogIndex() {
  const posts = getBlogPosts();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: `${SITE_NAME} — ${TITLE}`,
    description: DESCRIPTION,
    url: canonical('/blog'),
    publisher: { '@id': `${SITE_URL}/#organization` },
    ...(posts.length > 0 && {
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.excerpt,
        url: canonical(`/blog/${p.slug}`),
        datePublished: p.date,
        author: { '@type': 'Organization', name: 'StopTheFlare Research Team' },
      })),
    }),
  };

  const itemListSchema =
    posts.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: posts.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: canonical(`/blog/${p.slug}`),
            name: p.title,
          })),
        }
      : null;

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
    blogSchema,
    ...(itemListSchema ? [itemListSchema] : []),
  ];

  return (
    <div className="bg-background">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(s)} />
      ))}

      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-4 text-caption text-white/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            / <span className="text-white/90">Blog</span>
          </nav>
          <h1 className="font-serif text-4xl font-semibold md:text-5xl">Research &amp; Guides</h1>
          <p className="mt-4 max-w-2xl text-white/85">
            Honest, research-backed writing on the supplements and protocols that actually help.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-card border border-border bg-surface-warm px-6 py-16 text-center">
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              New guides are on the way
            </h2>
            <p className="mt-3 text-text-secondary">
              We&apos;re researching and writing in-depth, evidence-based guides right now. In the
              meantime, explore our complete condition protocols.
            </p>
            <Link
              href="/start-here"
              className="mt-6 inline-flex rounded-pill bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary-light"
            >
              Start here
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
