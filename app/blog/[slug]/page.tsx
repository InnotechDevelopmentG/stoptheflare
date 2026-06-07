import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPosts, getBlogPost, getCondition, getProductsByCondition } from '@/lib/data';
import { canonical, articleSchema, breadcrumbSchema, jsonLd } from '@/lib/seo';
import ProductCard from '@/components/shared/ProductCard';
import PillarNewsletter from '@/components/pillar/PillarNewsletter';
import { goLink, AFFILIATE_REL } from '@/lib/affiliates';

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

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    alternates: { canonical: canonical(`/blog/${post.slug}`) },
    openGraph: { title: `${post.title} | StopTheFlare`, type: 'article', publishedTime: post.date },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();
  const condition = getCondition(post.conditionSlug);
  const related = getProductsByCondition(post.conditionSlug).slice(0, 2);

  const faqSchema = post.faqs?.length
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
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    articleSchema({
      headline: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      datePublished: post.date,
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
          <Link href="/blog" className="hover:text-primary">
            Blog
          </Link>{' '}
          / <span className="text-text-secondary">{post.category}</span>
        </nav>

        <div className="mb-3 flex items-center gap-2 text-caption text-text-muted">
          <span className="rounded-pill bg-surface-warm px-3 py-1 font-medium text-primary">
            {post.category}
          </span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="font-serif text-4xl font-semibold leading-tight">{post.title}</h1>
        <p className="mt-3 text-small text-text-muted">
          By StopTheFlare Research Team · Updated{' '}
          {new Date(post.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>

        <div className="prose-editorial mt-8">
          {post.body.map((block, i) => {
            if (block.startsWith('## '))
              return <h2 key={i} className="font-serif text-2xl font-semibold mt-10 mb-3">{renderInline(block.slice(3))}</h2>;
            if (block.startsWith('### '))
              return <h3 key={i} className="font-serif text-xl font-medium mt-7 mb-2">{renderInline(block.slice(4))}</h3>;
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

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-5 font-serif text-2xl font-medium">Related products</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
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
      </article>

      {condition && <PillarNewsletter condition={condition} />}
    </>
  );
}
