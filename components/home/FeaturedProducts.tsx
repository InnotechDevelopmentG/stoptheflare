import ProductCard from '@/components/shared/ProductCard';
import { getFeaturedProducts } from '@/lib/data';

export default function FeaturedProducts() {
  const products = getFeaturedProducts(8);
  return (
    <section className="bg-surface-warm py-20">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            Most Trusted Supplements This Month
          </h2>
          <p className="mt-4 text-text-secondary">
            Updated monthly based on community feedback and research review.
          </p>
        </div>
        <div className="scrollbar-none mt-12 flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">
          {products.slice(0, 4).map((p) => (
            <div key={p.id} className="w-72 shrink-0 md:w-auto">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
