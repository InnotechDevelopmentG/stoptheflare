import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCondition, getProductsByCondition } from '@/lib/data';
import { breadcrumbSchema, articleSchema, jsonLd } from '@/lib/seo';
import AffiliateDisclosure from '@/components/shared/AffiliateDisclosure';
import ProductCard from '@/components/shared/ProductCard';
import PillarNewsletter from '@/components/pillar/PillarNewsletter';

export default function ClusterPage({
  conditionSlug,
  clusterSlug,
}: {
  conditionSlug: string;
  clusterSlug: string;
}) {
  const condition = getCondition(conditionSlug);
  if (!condition) notFound();
  const cluster = condition.clusters.find((c) => c.slug === clusterSlug);
  if (!cluster) notFound();

  const related = getProductsByCondition(conditionSlug).slice(0, 2);

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: condition.shortName, path: `/${condition.slug}` },
      { name: cluster.title, path: `/${condition.slug}/${cluster.slug}` },
    ]),
    articleSchema({
      headline: cluster.title,
      description: `${cluster.title} — part of the StopTheFlare ${condition.shortName} guide.`,
      path: `/${condition.slug}/${cluster.slug}`,
      datePublished: '2026-01-01',
    }),
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
          <Link href={`/${condition.slug}`} className="hover:text-primary">
            {condition.shortName}
          </Link>{' '}
          / <span className="text-text-secondary">{cluster.title}</span>
        </nav>

        <p className="mb-2 text-caption font-medium uppercase tracking-wide text-primary">
          {condition.shortName}
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-tight">{cluster.title}</h1>
        <p className="mt-3 text-small text-text-muted">
          By StopTheFlare Research Team · Updated June 2026
        </p>

        <div className="my-6">
          <AffiliateDisclosure />
        </div>

        {/* PLACEHOLDER — full article content will be added via MDX/CMS. */}
        <div className="prose-editorial">
          <p>
            This is part of our in-depth {condition.shortName} guide. We&apos;re building out the
            full, research-backed version of <strong>{cluster.title}</strong> — covering what the
            studies show, what the community actually reports, and our honest product picks.
          </p>
          <p>
            In the meantime, start with our complete{' '}
            <Link href={`/${condition.slug}`}>{condition.shortName} supplement protocol</Link>, which
            covers the foundation supplements, what to avoid, and our top-rated products.
          </p>
          <h2>What this guide will cover</h2>
          <ul>
            <li>The evidence behind the recommendation</li>
            <li>Dosing, forms, and what to look for in a quality product</li>
            <li>Community-reported results and common mistakes</li>
            <li>Our honest top picks — including when to skip a popular product</li>
          </ul>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-5 font-serif text-2xl font-medium">Recommended products</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </article>

      <PillarNewsletter condition={condition} />
    </>
  );
}
