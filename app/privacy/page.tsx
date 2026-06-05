import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How StopTheFlare handles analytics, email collection, and affiliate tracking. We use privacy-first tools and never sell your data.',
  alternates: { canonical: canonical('/privacy') },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-2 text-small text-text-muted">Last updated: June 2026</p>
      <div className="prose-editorial mt-8">
        <p>
          StopTheFlare.com respects your privacy. This policy explains what we collect and how we use
          it. We never sell your personal data.
        </p>
        <h2>Analytics</h2>
        <p>
          We use Plausible Analytics, a privacy-first, cookie-free analytics tool. It does not track
          you across sites or collect personally identifiable information. We use it only to
          understand which content is helpful in aggregate.
        </p>
        <h2>Email</h2>
        <p>
          If you subscribe to our newsletter, your email address is stored with ConvertKit, our
          email provider, and used only to send you the content you signed up for. You can
          unsubscribe at any time using the link in any email.
        </p>
        <h2>Affiliate tracking</h2>
        <p>
          When you click an affiliate link, the destination retailer (such as Amazon or a supplement
          brand) may set cookies to attribute your purchase to us. This is standard for affiliate
          programs and is governed by those retailers&apos; privacy policies.
        </p>
        <h2>Your choices</h2>
        <p>
          You can unsubscribe from emails at any time and use browser settings or extensions to
          control cookies from third-party retailers. If you have questions about your data, contact
          us through the site.
        </p>
      </div>
    </div>
  );
}
