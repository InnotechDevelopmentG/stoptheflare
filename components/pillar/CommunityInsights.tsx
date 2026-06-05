import type { Condition } from '@/lib/types';

export default function CommunityInsights({ condition }: { condition: Condition }) {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <h2 className="font-serif text-3xl font-semibold">
          What the {condition.shortName} Community Says
        </h2>
        <p className="mt-3 max-w-2xl text-text-secondary">
          We surveyed communities on Reddit and Facebook to understand what people are actually
          finding helpful. Here&apos;s what came up most.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {condition.community.map((c, i) => (
            <figure key={i} className="rounded-card border border-border bg-surface-warm p-6">
              <blockquote className="font-serif italic text-text-secondary">
                “{c.quote}”
              </blockquote>
              <figcaption className="mt-4 text-caption text-text-muted">{c.source}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
