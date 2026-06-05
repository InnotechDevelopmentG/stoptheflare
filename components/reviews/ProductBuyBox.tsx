import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import StarRating from '@/components/shared/StarRating';
import { goLink, AFFILIATE_REL, AFFILIATE_TITLE } from '@/lib/affiliates';

export default function ProductBuyBox({ product }: { product: Product }) {
  const isExternal = product.image.startsWith('http');
  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-sm lg:sticky lg:top-28">
      <div className="relative mx-auto mb-4 aspect-square w-40 overflow-hidden rounded-btn bg-surface-warm">
        <Image src={product.image} alt={product.name} fill sizes="160px" className="object-contain p-2" unoptimized={isExternal} />
      </div>
      <h3 className="text-center font-serif text-lg font-medium">{product.name}</h3>
      <p className="mb-3 text-center text-small text-text-muted">{product.brand}</p>
      <div className="flex justify-center">
        <StarRating rating={product.rating} />
      </div>
      <p className="my-4 text-center font-mono text-xl">{product.price}</p>
      <div className="space-y-2">
        {product.amazon && (
          <a
            href={goLink(product.affiliateSlug)}
            rel={AFFILIATE_REL}
            title={AFFILIATE_TITLE}
            className="block rounded-btn bg-primary px-4 py-3 text-center font-medium text-white transition hover:bg-primary-light"
          >
            Buy on Amazon
          </a>
        )}
        {product.direct && (
          <a
            href={goLink(product.affiliateSlug)}
            rel={AFFILIATE_REL}
            title={AFFILIATE_TITLE}
            className="block rounded-btn border border-primary px-4 py-3 text-center font-medium text-primary transition hover:bg-surface-warm"
          >
            Buy Direct from Brand
          </a>
        )}
      </div>
      <Link
        href="/affiliate-disclosure"
        className="mt-3 block text-center text-caption text-text-muted hover:text-primary"
      >
        Affiliate link disclosure
      </Link>
    </div>
  );
}
