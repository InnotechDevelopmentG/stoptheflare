import Link from 'next/link';
import { getProductsByCondition, getReviews } from '@/lib/data';
import { goLink, AFFILIATE_REL, AFFILIATE_TITLE } from '@/lib/affiliates';
import StarRating from '@/components/shared/StarRating';
import type { Condition } from '@/lib/types';

export default function ProductTable({ condition }: { condition: Condition }) {
  const products = getProductsByCondition(condition.slug);
  const reviews = getReviews();
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <h2 className="font-serif text-3xl font-semibold">Product Comparison</h2>
        <p className="mt-3 text-text-secondary">
          Every {condition.shortName} product we cover, side by side.
        </p>

        <div className="scrollbar-none mt-8 overflow-x-auto rounded-card border border-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-small">
            <thead>
              <tr className="bg-surface-warm text-caption uppercase tracking-wide text-text-muted">
                <th className="sticky left-0 bg-surface-warm px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Brand</th>
                <th className="px-4 py-3 font-semibold">Best For</th>
                <th className="px-4 py-3 font-semibold">Dose</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold">Buy</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const reviewSlug = reviews.find((r) => r.productId === p.id)?.slug;
                return (
                  <tr key={p.id} className="border-t border-border align-middle">
                    <td className="sticky left-0 bg-surface px-4 py-3 font-medium">
                      {reviewSlug ? (
                        <Link href={`/reviews/${reviewSlug}`} className="text-primary hover:underline">
                          {p.name}
                        </Link>
                      ) : (
                        p.name
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{p.brand}</td>
                    <td className="px-4 py-3 text-text-secondary">{p.bestFor}</td>
                    <td className="px-4 py-3 font-mono text-text-secondary">{p.dose}</td>
                    <td className="px-4 py-3 font-mono">{p.price}</td>
                    <td className="px-4 py-3">
                      <StarRating rating={p.rating} size="sm" />
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={goLink(p.affiliateSlug)}
                        rel={AFFILIATE_REL}
                        title={AFFILIATE_TITLE}
                        className="rounded-btn bg-primary px-3 py-1.5 text-caption font-medium text-white hover:bg-primary-light"
                      >
                        Buy
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
