import type { Review } from '@/lib/types';
import StarRating from '@/components/shared/StarRating';

export default function QuickVerdict({ review }: { review: Review }) {
  return (
    <div className="rounded-card border-l-4 border-primary bg-surface-warm p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-medium">Quick Verdict</h2>
        <StarRating rating={review.rating} />
      </div>
      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-caption font-semibold uppercase tracking-wide text-primary">Pros</p>
          <ul className="mt-2 space-y-1.5 text-small text-text-secondary">
            {review.pros.map((p) => (
              <li key={p} className="flex gap-2">
                <span aria-hidden="true" className="text-primary-light">
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-caption font-semibold uppercase tracking-wide text-flare">Cons</p>
          <ul className="mt-2 space-y-1.5 text-small text-text-secondary">
            {review.cons.map((c) => (
              <li key={c} className="flex gap-2">
                <span aria-hidden="true" className="text-flare">
                  ✕
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-5 border-t border-border pt-4 text-body">
        <span className="font-semibold">Bottom line:</span> {review.bottomLine}
      </p>
    </div>
  );
}
