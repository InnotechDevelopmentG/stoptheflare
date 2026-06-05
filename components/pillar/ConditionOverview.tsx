import type { Condition } from '@/lib/types';

export default function ConditionOverview({ condition }: { condition: Condition }) {
  const qf = condition.quickFacts;
  const facts: [string, string][] = [
    ['Who it affects', qf.affects],
    ['Key symptoms', qf.symptoms],
    ['Conventional care', qf.conventional],
    ['Why supplements matter', qf.whySupplements],
    ['Most important nutrients', qf.keyNutrients],
  ];
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto grid max-w-content gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_360px]">
        <div>
          <h2 className="font-serif text-3xl font-semibold">
            Understanding {condition.shortName}
          </h2>
          <p className="mt-5 text-body text-text-secondary">{condition.overview}</p>
        </div>
        <aside className="h-fit rounded-card border border-border bg-surface-warm p-6 lg:sticky lg:top-28">
          <h3 className="font-serif text-xl font-medium">Quick Facts</h3>
          <dl className="mt-4 space-y-4">
            {facts.map(([term, def]) => (
              <div key={term}>
                <dt className="text-caption font-semibold uppercase tracking-wide text-text-muted">
                  {term}
                </dt>
                <dd className="mt-1 text-small text-text-secondary">{def}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
