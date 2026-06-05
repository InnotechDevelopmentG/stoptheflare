import NewsletterForm from '@/components/shared/NewsletterForm';

export default function NewsletterCTA() {
  return (
    <section className="bg-secondary py-20 text-white">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="font-serif text-3xl font-semibold md:text-4xl">
          Get the Weekly Protocol Guide
        </h2>
        <p className="mt-4 text-white/90">
          Every week: one condition, one protocol, one honest product recommendation. No noise.
        </p>
        <div className="mx-auto mt-8 max-w-lg">
          <NewsletterForm formId="global" variant="onAmber" />
        </div>
        <p className="mt-4 text-small text-white/80">
          Join 50,000+ readers. Unsubscribe anytime. We never sell your data.
        </p>
      </div>
    </section>
  );
}
