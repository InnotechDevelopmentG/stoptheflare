import type { Condition, ProtocolItem } from '@/lib/types';
import { getProduct, getReviews } from '@/lib/data';
import { goLink, AFFILIATE_REL, AFFILIATE_TITLE } from '@/lib/affiliates';
import StarRating from '@/components/shared/StarRating';
import Link from 'next/link';

function TopPick({ slug }: { slug: string }) {
  const product = getProduct(slug);
  if (!product) return null;
  const reviewSlug = getReviews().find((r) => r.productId === product.id)?.slug;
  return (
    <div className="mt-4 flex flex-col gap-3 rounded-btn border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-caption font-semibold uppercase tracking-wide text-primary">Our top pick</p>
        <p className="font-medium">{product.name}</p>
        <div className="mt-1 flex items-center gap-3">
          <StarRating rating={product.rating} size="sm" />
          <span className="font-mono text-small text-text-secondary">{product.price}</span>
        </div>
      </div>
      <div className="flex shrink-0 gap-2">
        {reviewSlug && (
          <Link
            href={`/reviews/${reviewSlug}`}
            className="rounded-btn border border-border px-3 py-2 text-small font-medium text-primary hover:bg-surface-warm"
          >
            Review
          </Link>
        )}
        <a
          href={goLink(product.affiliateSlug)}
          rel={AFFILIATE_REL}
          title={AFFILIATE_TITLE}
          className="rounded-btn bg-primary px-4 py-2 text-small font-medium text-white hover:bg-primary-light"
        >
          Buy
        </a>
      </div>
    </div>
  );
}

function ProtocolEntry({ item }: { item: ProtocolItem }) {
  return (
    <div className="rounded-card border border-border bg-surface p-6">
      <h4 className="font-serif text-xl font-medium">{item.name}</h4>
      <p className="mt-2 text-small text-text-secondary">{item.why}</p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-caption font-semibold uppercase tracking-wide text-text-muted">Dose</dt>
          <dd className="font-mono text-small text-text-primary">{item.dose}</dd>
        </div>
        <div>
          <dt className="text-caption font-semibold uppercase tracking-wide text-text-muted">
            What to look for
          </dt>
          <dd className="text-small text-text-secondary">{item.lookFor}</dd>
        </div>
      </dl>
      <TopPick slug={item.productSlug} />
    </div>
  );
}

const tiers = [
  { key: 'tier1' as const, label: 'Tier 1 — Foundation', note: 'Start here.' },
  { key: 'tier2' as const, label: 'Tier 2 — Add If Needed', note: 'Layer in once the foundation is steady.' },
  { key: 'tier3' as const, label: 'Tier 3 — Community Favorites', note: 'More variable; evidence is emerging.' },
];

export default function SupplementProtocol({ condition }: { condition: Condition }) {
  return (
    <section id="protocol" className="scroll-mt-24 bg-surface-warm py-16">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <h2 className="font-serif text-3xl font-semibold">
          The {condition.shortName} Supplement Protocol
        </h2>
        <p className="mt-3 text-text-secondary">
          What the research and community actually support — organized by priority.
        </p>

        <div className="mt-10 space-y-12">
          {tiers.map((tier) => (
            <div key={tier.key}>
              <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-serif text-2xl font-medium text-primary">{tier.label}</h3>
                <span className="text-small text-text-muted">{tier.note}</span>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {condition.protocol[tier.key].map((item) => (
                  <ProtocolEntry key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
