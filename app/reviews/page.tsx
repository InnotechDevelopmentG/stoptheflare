import type { Metadata } from 'next';
import { getConditions, getProductsByCondition, products } from '@/lib/data';
import { canonical } from '@/lib/seo';
import ProductCard from '@/components/shared/ProductCard';

export const metadata: Metadata = {
  title: 'Supplement Reviews',
  description:
    'Honest, independent supplement reviews for autoimmune conditions. No brand sponsorships — just research-backed analysis and real community feedback.',
  alternates: { canonical: canonical('/reviews') },
};

export default function ReviewsIndex({
  searchParams,
}: {
  searchParams: { condition?: string };
}) {
  const conditions = getConditions();
  const active = searchParams.condition;
  const list = active ? getProductsByCondition(active) : products;

  return (
    <div className="bg-background">
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <h1 className="font-serif text-4xl font-semibold md:text-5xl">Supplement Reviews</h1>
          <p className="mt-4 max-w-2xl text-white/85">
            Every product we cover, researched and rated independently. We only feature products we
            would stand behind — and we&apos;ll tell you when to skip a popular one.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-wrap gap-2">
          <FilterLink label="All" href="/reviews" active={!active} />
          {conditions.map((c) => (
            <FilterLink
              key={c.slug}
              label={c.shortName}
              href={`/reviews?condition=${c.slug}`}
              active={active === c.slug}
            />
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <a
      href={href}
      className={
        active
          ? 'rounded-pill bg-primary px-4 py-2 text-small font-medium text-white'
          : 'rounded-pill border border-border bg-surface px-4 py-2 text-small font-medium text-text-secondary hover:border-primary/40'
      }
    >
      {label}
    </a>
  );
}
