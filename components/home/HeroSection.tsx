import Link from 'next/link';

/* Headline variants:
   - "Finally. An honest guide to living with autoimmune disease."
   - "The supplement guide written for you, not for the brands."
   - "Stop the flare. Start with the truth." */

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      {/* Abstract botanical shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40">
        <svg
          className="absolute -right-20 top-0 h-full w-2/3"
          viewBox="0 0 400 400"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path d="M320 40c-60 30-90 90-80 160 40-10 90-50 100-110 4-22-4-40-20-50z" fill="#234c25" />
          <path d="M240 120c-50 20-80 70-70 130 36-8 82-44 88-98 3-18-3-26-18-32z" fill="#2f6631" />
          <circle cx="120" cy="300" r="90" fill="#234c25" />
          <circle cx="320" cy="320" r="60" fill="#2f6631" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-content gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:items-center">
        <div className="animate-fade-up">
          <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Finally. An honest guide to living with autoimmune disease.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            No sponsored reviews. No miracle cures. Just real research on supplements, protocols, and
            products that actually help people like us manage their conditions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#conditions"
              className="rounded-btn bg-secondary px-6 py-3 text-center font-medium text-white transition hover:opacity-90"
            >
              Find Your Condition
            </Link>
            <Link
              href="/start-here"
              className="rounded-btn border border-white/40 px-6 py-3 text-center font-medium text-white transition hover:bg-white/10"
            >
              Start Here
            </Link>
          </div>
          <p className="mt-6 text-small text-white/60">
            Trusted by 50,000+ readers in the autoimmune community
          </p>
        </div>
      </div>
    </section>
  );
}
