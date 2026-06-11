import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLatestArticle } from '@/lib/articles';
import { getCondition } from '@/lib/data';
import { canonical, articleSchema, breadcrumbSchema, jsonLd } from '@/lib/seo';
import { goLink, AFFILIATE_REL } from '@/lib/affiliates';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/** Renders inline markdown: [label](/internal), [label](go:slug) affiliate, [label](https://ext), and **bold**. */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, url] = link;
      const cls = 'font-medium text-primary underline underline-offset-2';
      if (url.startsWith('go:'))
        return (
          <a key={i} href={goLink(url.slice(3))} rel={AFFILIATE_REL} className={cls}>
            {label}
          </a>
        );
      if (url.startsWith('/'))
        return (
          <Link key={i} href={url} className={cls}>
            {label}
          </Link>
        );
      return (
        <a key={i} href={url} target="_blank" rel="noopener noreferrer" className={cls}>
          {label}
        </a>
      );
    }
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    return part;
  });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getLatestArticle(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: (post.seo_description || post.excerpt || '').slice(0, 160),
    alternates: { canonical: canonical(`/latest/${post.slug}`) },
    openGraph: { title: `${post.title} | StopTheFlare`, type: 'article', publishedTime: post.published_at },
  };
}

export default async function LatestArticlePage({ params }: { params: { slug: string } }) {
  const post = await getLatestArticle(params.slug);
  if (!post) notFound();
  const condition = post.condition_slug ? getCondition(post.condition_slug) : undefined;

  const faqSchema =
    post.faqs?.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Latest', path: '/latest' },
      { name: post.title, path: `/latest/${post.slug}` },
    ]),
    articleSchema({
      headline: post.title,
      description: post.excerpt || post.seo_description || '',
      path: `/latest/${post.slug}`,
      datePublished: post.published_at,
    }),
    ...(faqSchema ? [faqSchema] : []),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(s)} />
      ))}

      <article className="mx-auto max-w-prose px-4 py-12 sm:px-6">
        <nav className="mb-4 text-caption text-text-muted">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>{' '}
          /{' '}
          <Link href="/latest" className="hover:text-primary">
            Latest
          </Link>{' '}
          / <span className="text-text-secondary">{post.category}</span>
        </nav>

        <div className="mb-3 flex items-center gap-2 text-caption text-text-muted">
          {post.category && (
            <span className="rounded-pill bg-surface-warm px-3 py-1 font-medium text-primary">
              {post.category}
            </span>
          )}
          {post.read_time && <span>{post.read_time}</span>}
        </div>
        <h1 className="font-serif text-4xl font-semibold leading-tight">{post.title}</h1>
        <p className="mt-3 text-small text-text-muted">
          By StopTheFlare Research Team \u00b7 Published{' '}
          {new Date(post.published_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>

        <div className="prose-editorial mt-8">
          {post.body.map((block, i) => {
            if (block.startsWith('## '))
              return (
                <h2 key={i} className="font-serif text-2xl font-semibold mt-10 mb-3">
                  {renderInline(block.slice(3))}
                </h2>
              );
            if (block.startsWith('### '))
              return (
                <h3 key={i} className="font-serif text-xl font-medium mt-7 mb-2">
                  {renderInline(block.slice(4))}
                </h3>
              );
            return <p key={i}>{renderInline(block)}</p>;
          })}
        </div>

        {post.faqs && post.faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <dl className="space-y-6">
              {post.faqs.map((f, i) => (
                <div key={i} className="rounded-card border border-border bg-surface-warm p-5">
                  <dt className="font-semibold text-text-primary">{f.q}</dt>
                  <dd className="mt-2 text-text-secondary text-small">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {condition && (
          <p className="mt-10 rounded-card border border-border bg-surface-warm p-5 text-small text-text-secondary">
            Want the full picture? Read our complete{' '}
            <Link href={`/${condition.slug}`} className="font-medium text-primary underline">
              {condition.shortName} supplement protocol
            </Link>
            .
          </p>
        )}

        <p className="mt-6 text-caption text-text-muted">
          This article is for education only and is not medical advice. Talk to a qualified clinician
          before making changes to your supplement or treatment routine.
        </p>
      </article>
    </>
  );
}
