import StarRating from '@/components/shared/StarRating';
import ConditionBadge from '@/components/shared/ConditionBadge';
import type { BadgeColor } from '@/lib/types';

/* PLACEHOLDER — replace with real community testimonials */
const testimonials: {
  initials: string;
  condition: string;
  color: BadgeColor;
  quote: string;
  source: string;
}[] = [
  {
    initials: 'S.M.',
    condition: "Hashimoto's",
    color: 'primary',
    quote:
      'I spent two years buying whatever Instagram told me to. StopTheFlare was the first place that told me what actually mattered for selenium dosing and why brand matters. My antibodies have been dropping for six months.',
    source: 'Via Reddit r/Hashimotos',
  },
  {
    initials: 'R.K.',
    condition: 'MCAS',
    color: 'flare',
    quote:
      'The histamine guide here is the only thing on the internet that actually explains MCAS in a way that helped me understand what to try first. My DAO enzyme recommendation came from this site.',
    source: 'Via our community survey',
  },
  {
    initials: 'J.T.',
    condition: "Crohn's",
    color: 'secondary',
    quote:
      'After my Crohn\u2019s diagnosis I was overwhelmed. This site gave me a protocol I could actually follow and products I could trust weren\u2019t full of fillers.',
    source: 'Via our community survey',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-primary py-20 text-white">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <h2 className="text-center font-serif text-3xl font-semibold md:text-4xl">
          From people who were exactly where you are
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.initials}
              className="flex flex-col rounded-card bg-surface p-6 text-text-primary shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-pill bg-surface-warm font-mono text-small text-primary">
                  {t.initials}
                </span>
                <ConditionBadge label={t.condition} color={t.color} />
              </div>
              <blockquote className="flex-1 font-serif italic text-text-secondary">
                “{t.quote}”
              </blockquote>
              <div className="mt-4">
                <StarRating rating={5} showValue={false} size="sm" />
                <figcaption className="mt-2 text-caption text-text-muted">{t.source}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
