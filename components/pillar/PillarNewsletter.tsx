import NewsletterForm from '@/components/shared/NewsletterForm';
import type { Condition } from '@/lib/types';

export default function PillarNewsletter({ condition }: { condition: Condition }) {
  return (
    <section className="bg-secondary py-16 text-white">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="font-serif text-3xl font-semibold">
          Get our {condition.shortName} Protocol Guide
        </h2>
        <p className="mt-3 text-white/90">
          A free one-page starter protocol, plus weekly research delivered to your inbox.
        </p>
        <div className="mx-auto mt-7 max-w-lg">
          <NewsletterForm formId={condition.slug} tag={condition.slug} variant="onAmber" />
        </div>
        <p className="mt-4 text-small text-white/80">Unsubscribe anytime. We never sell your data.</p>
      </div>
    </section>
  );
}
