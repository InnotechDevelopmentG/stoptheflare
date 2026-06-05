import Link from 'next/link';
import type { Condition } from '@/lib/types';

export default function RelatedArticles({ condition }: { condition: Condition }) {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <h2 className="font-serif text-3xl font-semibold">Go Deeper</h2>
        <p className="mt-3 text-text-secondary">
          Our full library of {condition.shortName} guides and reviews.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {condition.clusters.map((article) => (
            <Link
              key={article.slug}
              href={`/${condition.slug}/${article.slug}`}
              className="group flex items-center justify-between gap-3 rounded-card border border-border bg-surface-warm p-5 transition hover:border-primary/40 hover:shadow-sm"
            >
              <span className="font-medium text-text-primary group-hover:text-primary">
                {article.title}
              </span>
              <span aria-hidden="true" className="text-primary">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
