import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReviews, getReview, getProduct, getCondition } from '@/lib/data';
import { canonical, reviewSchema, faqSchema, breadcrumbSchema, jsonLd } from '@/lib/seo';
import AffiliateDisclosure from '@/components/shared/AffiliateDisclosure';
import ConditionBadge from '@/components/shared/ConditionBadge';
import QuickVerdict from '@/components/reviews/QuickVerdict';
import ProductBuyBox from '@/components/reviews/ProductBuyBox';
import FAQAccordion from '@/components/pillar/FAQAccordion';

export function generateStaticParams() {
  return getReviews().map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const review = getReview(params.slug);
  if (!review) return {};
  return {
    title: review.title,
    description: review.bottomLine.slice(0, 160),
    alternates: { canonical: canonical(`/reviews/${review.slug}`) },
    openGraph: { title: `${review.title} | StopTheFlare`, type: 'article' },
  };
}

export default function ReviewPage({ params }: { params: { slug: string } }) {
  const review = getReview(params.slug);
  if (!review) notFound();
  const product = getProduct(review.productId);
  if (!product) notFound();

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Reviews', path: '/reviews' },
      { name: product.name, path: `/reviews/${review.slug}` },
    ]),
    reviewSchema({
      productName: product.name,
      brand: product.brand,
      rating: review.rating,
      path: `/reviews/${review.slug}`,
      datePublished: review.updated,
      description: review.bottomLine,
    }),
    faqSchema(review.faqs),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(s)} />
      ))}

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <nav className="mb-4 text-caption text-text-muted">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>{' '}
          /{' '}
          <Link href="/reviews" className="hover:text-primary">
            Reviews
          </Link>{' '}
          / <span className="text-text-secondary">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap gap-2">
              {review.conditionSlugs.map((slug) => {
                const c = getCondition(slug);
                return c ? <ConditionBadge key={slug} label={c.shortName} color={c.badgeColor} /> : null;
              })}
            </div>
            <h1 className="font-serif text-4xl font-semibold leading-tight">{review.title}</h1>
            <p className="mt-3 text-small text-text-muted">
              By StopTheFlare Research Team · Last updated{' '}
              {new Date(review.updated).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>

            <div className="my-6">
              <AffiliateDisclosure />
            </div>

            <QuickVerdict review={review} />

            <section className="mt-10">
              <h2 className="font-serif text-2xl font-medium">Who this is best for</h2>
              <p className="mt-3 text-body text-text-secondary">{review.bestFor}</p>
            </section>

            <section className="mt-10">
              <h2 className="font-serif text-2xl font-medium">Ingredients Analysis</h2>
              <div className="mt-4 divide-y divide-border rounded-card border border-border">
                {review.ingredients.map((ing) => (
                  <div key={ing.name} className="px-5 py-4">
                    <p className="font-medium">{ing.name}</p>
                    <p className="mt-1 text-small text-text-secondary">{ing.note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="font-serif text-2xl font-medium">What the research says</h2>
              {review.research.map((r, i) => (
                <p key={i} className="mt-3 text-body text-text-secondary">
                  {r}
                </p>
              ))}
            </section>

            <section className="mt-10">
              <h2 className="font-serif text-2xl font-medium">What the community says</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {review.community.map((c, i) => (
                  <figure key={i} className="rounded-card border border-border bg-surface-warm p-5">
                    <blockquote className="font-serif italic text-text-secondary">
                      “{c.quote}”
                    </blockquote>
                    <figcaption className="mt-3 text-caption text-text-muted">{c.source}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="font-serif text-2xl font-medium">Compared to alternatives</h2>
              <div className="scrollbar-none mt-4 overflow-x-auto rounded-card border border-border">
                <table className="w-full min-w-[480px] text-left text-small">
                  <thead>
                    <tr className="bg-surface-warm text-caption uppercase tracking-wide text-text-muted">
                      <th className="px-4 py-3 font-semibold">Product</th>
                      <th className="px-4 py-3 font-semibold">Brand</th>
                      <th className="px-4 py-3 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {review.alternatives.map((a) => (
                      <tr key={a.name} className="border-t border-border">
                        <td className="px-4 py-3 font-medium">{a.name}</td>
                        <td className="px-4 py-3 text-text-secondary">{a.brand}</td>
                        <td className="px-4 py-3 text-text-secondary">{a.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="font-serif text-2xl font-medium">Our verdict</h2>
              <p className="mt-3 text-body text-text-secondary">{review.verdict}</p>
            </section>
          </div>

          <aside>
            <ProductBuyBox product={product} />
          </aside>
        </div>
      </div>

      <FAQAccordion faqs={review.faqs} title="Product FAQs" />
    </>
  );
}
