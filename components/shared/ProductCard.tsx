import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import StarRating from './StarRating';
import ConditionBadge from './ConditionBadge';
import { goLink, AFFILIATE_REL, AFFILIATE_TITLE } from '@/lib/affiliates';
import { getCondition, getReviews } from '@/lib/data';

export default function ProductCard({ product }: { product: Product }) {
  const reviewSlug = getReviews().find((r) => r.productId === product.id)?.slug;
  return (
    <div className="flex h-full flex-col rounded-card border border-border bg-surface p-5 shadow-sm transition hover:shadow-md">
      <div className="relative mb-4 aspect-square overflow-hidden rounded-btn bg-surface-warm">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 240px"
          className="object-contain p-2"
        />
      </div>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {product.conditions.slice(0, 2).map((slug) => {
          const c = getCondition(slug);
          return c ? <ConditionBadge key={slug} label={c.shortName} color={c.badgeColor} /> : null;
        })}
      </div>
      <h3 className="font-serif text-lg font-medium leading-snug">{product.name}</h3>
      <p className="mb-2 text-small text-text-muted">{product.brand}</p>
      <StarRating rating={product.rating} size="sm" />
      <p className="my-3 flex-1 text-small text-text-secondary">{product.verdict}</p>
      <div className="mb-3 font-mono text-small text-text-primary">{product.price}</div>
      <div className="mt-auto flex items-center gap-2">
        {reviewSlug && (
          <Link
            href={`/reviews/${reviewSlug}`}
            className="flex-1 rounded-btn border border-border px-3 py-2 text-center text-small font-medium text-primary transition hover:bg-surface-warm"
          >
            See Full Review
          </Link>
        )}
        <a
          href={goLink(product.affiliateSlug)}
          rel={AFFILIATE_REL}
          title={AFFILIATE_TITLE}
          className="flex-1 rounded-btn bg-primary px-3 py-2 text-center text-small font-medium text-white transition hover:bg-primary-light"
        >
          Buy
        </a>
      </div>
    </div>
  );
}
