import Link from 'next/link';
import NewsletterForm from '@/components/shared/NewsletterForm';
import { getConditions } from '@/lib/data';

export default function Footer() {
  const conditions = getConditions();
  return (
    <footer className="mt-24 border-t border-border bg-surface-warm">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Link href="/" className="font-serif text-2xl font-semibold text-primary">
            StopTheFlare
          </Link>
          <p className="mt-3 max-w-xs text-small text-text-secondary">
            The honest, independent source of truth for managing autoimmune disease. No brand
            sponsorships — just research-backed guidance from people who did the work.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-small font-semibold uppercase tracking-wide text-text-muted">
            Explore
          </h4>
          <ul className="space-y-2 text-small">
            {conditions.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="text-text-secondary hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/reviews" className="text-text-secondary hover:text-primary">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/start-here" className="text-text-secondary hover:text-primary">
                Start Here
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-text-secondary hover:text-primary">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-small font-semibold uppercase tracking-wide text-text-muted">
            Stay in the loop
          </h4>
          <p className="mb-3 text-small text-text-secondary">
            One condition, one protocol, one honest product recommendation each week.
          </p>
          <NewsletterForm formId="global" buttonLabel="Subscribe" />
          <ul className="mt-5 space-y-2 text-small">
            <li>
              <Link href="/disclaimer" className="text-text-secondary hover:text-primary">
                Medical Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-text-secondary hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/affiliate-disclosure" className="text-text-secondary hover:text-primary">
                Affiliate Disclosure
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-content px-4 py-6 text-center text-caption text-text-muted sm:px-6">
          © 2025 StopTheFlare.com — Independent health research. Not medical advice.
        </p>
      </div>
    </footer>
  );
}
