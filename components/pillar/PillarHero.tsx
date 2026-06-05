import Link from 'next/link';
import type { Condition } from '@/lib/types';

export default function PillarHero({ condition }: { condition: Condition }) {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30">
        <svg className="absolute -right-10 top-0 h-full w-1/2" viewBox="0 0 300 300" fill="none">
          <circle cx="220" cy="80" r="120" fill="#234c25" />
          <circle cx="120" cy="260" r="80" fill="#2f6631" />
        </svg>
      </div>
      <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 md:py-24">
        <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
          {condition.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/85">{condition.tagline}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#protocol"
            className="rounded-btn bg-secondary px-6 py-3 text-center font-medium text-white transition hover:opacity-90"
          >
            Jump to Supplement Guide
          </Link>
          <Link
            href={`/reviews?condition=${condition.slug}`}
            className="rounded-btn border border-white/40 px-6 py-3 text-center font-medium text-white transition hover:bg-white/10"
          >
            See All Products
          </Link>
        </div>
        <dl className="mt-10 grid gap-4 border-t border-white/20 pt-6 text-small sm:grid-cols-3">
          <div>
            <dt className="text-white/60">Prevalence</dt>
            <dd className="mt-1 font-medium">{condition.stats.affected}</dd>
          </div>
          <div>
            <dt className="text-white/60">Top searched</dt>
            <dd className="mt-1 font-medium">{condition.stats.topSearched}</dd>
          </div>
          <div>
            <dt className="text-white/60">Updated</dt>
            <dd className="mt-1 font-medium">{condition.stats.updated}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
