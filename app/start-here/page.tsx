import type { Metadata } from 'next';
import Link from 'next/link';
import { getConditions } from '@/lib/data';
import { canonical } from '@/lib/seo';
import NewsletterForm from '@/components/shared/NewsletterForm';

export const metadata: Metadata = {
  title: 'Start Here — Your Autoimmune Starting Point',
  description:
    'New here? This is the fastest way to find the right protocol for your condition. Pick your condition, get the free starter guide, and skip the noise.',
  alternates: { canonical: canonical('/start-here') },
};

export default function StartHerePage() {
  const conditions = getConditions();
  return (
    <div className="bg-background">
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-prose px-4 sm:px-6">
          <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Start here. We&apos;ll point you in the right direction.
          </h1>
          <p className="mt-5 text-lg text-white/85">
            If you&apos;re newly diagnosed or just overwhelmed, you&apos;re in the right place.
            Pick your condition below and we&apos;ll hand you a clear, research-backed starting
            protocol — no miracle cures, no sponsored noise.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">1. Choose your condition</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {conditions.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group flex flex-col rounded-card border border-border bg-surface p-6 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="font-serif text-xl font-medium group-hover:text-primary">{c.name}</h3>
                <p className="mt-2 text-small text-text-secondary">{c.tagline}</p>
                <span className="mt-4 font-medium text-primary">Open the guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-warm py-16">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">2. How to use this site</h2>
          <ol className="mt-6 space-y-4">
            {[
              'Read your condition\u2019s pillar guide to understand the root causes and the supplement protocol.',
              'Start with the Tier 1 foundation supplements before adding anything else.',
              'Check the \u201CWhat to Avoid\u201D section \u2014 it will save you money and frustration.',
              'Use our reviews to choose quality products, then buy through any link you like.',
            ].map((step, i) => (
              <li key={i} className="flex gap-4 rounded-card border border-border bg-surface p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-primary font-mono text-small text-white">
                  {i + 1}
                </span>
                <p className="text-body text-text-secondary">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-secondary py-16 text-white">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">3. Get the free starter guide</h2>
          <p className="mt-3 text-white/90">
            We&apos;ll send your one-page starter protocol plus a weekly honest recommendation.
          </p>
          <div className="mx-auto mt-7 max-w-lg">
            <NewsletterForm formId="global" variant="onAmber" buttonLabel="Send My Guide" />
          </div>
          <p className="mt-4 text-small text-white/80">Unsubscribe anytime. We never sell your data.</p>
        </div>
      </section>
    </div>
  );
}
