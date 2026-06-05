import type { Condition } from '@/lib/types';

export default function AvoidSection({ condition }: { condition: Condition }) {
  return (
    <section className="bg-[#FBEDE8] py-16">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <h2 className="font-serif text-3xl font-semibold text-flare">
          What to Avoid With {condition.shortName}
        </h2>
        <p className="mt-3 max-w-2xl text-text-secondary">
          Being willing to say &ldquo;stop buying this&rdquo; is rare. These are commonly recommended
          but unsupported — or actively harmful — for this condition.
        </p>
        <ul className="mt-8 space-y-4">
          {condition.avoid.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-card border border-flare/20 bg-surface p-5 text-text-secondary"
            >
              <span aria-hidden="true" className="mt-0.5 font-bold text-flare">
                ✕
              </span>
              <span className="text-body">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
