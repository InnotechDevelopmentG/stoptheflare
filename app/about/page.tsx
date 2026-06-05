import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About',
  description:
    'We built the site we wish had existed when we first got sick. No sponsorships, no paid placement, full disclosure on every page.',
  alternates: { canonical: canonical('/about') },
};

const steps = [
  { n: 1, title: 'Research', body: 'We start with published studies and clinical literature.' },
  { n: 2, title: 'Community Review', body: 'We survey real patients in condition communities.' },
  { n: 3, title: 'Ingredient Analysis', body: 'We audit formulations for dosing, bioavailability, and fillers.' },
  { n: 4, title: 'Honest Verdict', body: 'We publish what we found, good or bad.' },
];

const standards = ['No free products accepted', 'No paid placement', 'Full disclosure on every page'];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="bg-surface-warm py-20">
        <div className="mx-auto max-w-prose px-4 sm:px-6">
          <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            We built the site we wish had existed when we first got sick.
          </h1>
          <div className="prose-editorial mt-8">
            <p>
              When someone in your life gets an autoimmune diagnosis, the first thing they do is go
              online. And what they find is a disaster. Sponsored blog posts pretending to be
              reviews. Supplement brands funding the very studies they promote. Doctors who
              haven&apos;t read the latest research on lifestyle and nutrition. And communities full
              of desperate people sharing information that sometimes helps — but with no way to know
              what&apos;s actually backed by evidence.
            </p>
            <p>
              StopTheFlare exists to fix that. We&apos;re not doctors. We&apos;re researchers who got
              tired of the noise and decided to do the work properly. We read the studies. We survey
              the communities. We test the logic behind every supplement protocol we cover. And we
              tell you exactly what we found — including when the answer is &ldquo;this doesn&apos;t
              work as advertised.&rdquo;
            </p>
            <p>
              We cover five conditions: Hashimoto&apos;s, gut health and IBD, autoimmune skin,
              fibromyalgia and chronic fatigue, and histamine intolerance and MCAS. We chose these
              because they&apos;re the conditions most people are navigating without trustworthy
              guidance, and the ones where the supplement market is most full of noise.
            </p>
            <p>
              Our revenue comes from affiliate commissions — small fees paid by brands when you buy
              through our links. This is disclosed on every page. It never changes our
              recommendations. If a product doesn&apos;t deserve to be here, it isn&apos;t here.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">How We Review</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-card border border-border bg-surface p-6">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-pill bg-primary font-mono text-white">
                  {s.n}
                </span>
                <h3 className="font-serif text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-small text-text-secondary">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">Our Standards</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {standards.map((s) => (
              <div
                key={s}
                className="flex items-center gap-3 rounded-card border border-border bg-background p-6"
              >
                <span aria-hidden="true" className="text-2xl text-primary">
                  ✓
                </span>
                <p className="font-medium">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-warm py-16">
        <div className="mx-auto max-w-prose px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">Affiliate Disclosure</h2>
          <div className="prose-editorial mt-6">
            <p>
              StopTheFlare is reader-supported. When you click an affiliate link and make a purchase,
              we may earn a commission at no additional cost to you. These commissions fund the
              research and writing that keep this site free.
            </p>
            <p>
              In compliance with FTC guidelines, affiliate links are marked with{' '}
              <code>rel=&quot;nofollow sponsored&quot;</code> and route through our <code>/go/</code>{' '}
              redirects. Commissions never influence our recommendations, ratings, or which products
              we choose to feature. Read the full version on our{' '}
              <a href="/affiliate-disclosure">Affiliate Disclosure</a> page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
