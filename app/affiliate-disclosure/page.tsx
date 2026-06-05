import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description:
    'How StopTheFlare earns affiliate commissions, our FTC compliance, and our promise that commissions never influence our recommendations.',
  alternates: { canonical: canonical('/affiliate-disclosure') },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold">Affiliate Disclosure</h1>
      <p className="mt-2 text-small text-text-muted">Last updated: June 2026</p>
      <div className="prose-editorial mt-8">
        <p>
          StopTheFlare.com is a reader-supported, independent publication. To keep our content free,
          we participate in affiliate programs, including the Amazon Associates Program and direct
          brand partnerships with companies such as Thorne, Pure Encapsulations, Seeking Health, Life
          Extension, iHerb, Bioptimizers, Ancestral Supplements, and Heart &amp; Soil.
        </p>
        <h2>How affiliate links work</h2>
        <p>
          When you click certain links on our site and make a purchase, we may earn a commission at
          no additional cost to you. These commissions range from roughly 4% (Amazon) to 30% (some
          direct brand programs). The price you pay is exactly the same whether or not you use our
          link.
        </p>
        <h2>How to identify affiliate links</h2>
        <p>
          All outbound affiliate links carry the attribute{' '}
          <code>rel=&quot;nofollow sponsored&quot;</code> and route through our internal{' '}
          <code>/go/</code> redirect so we can track clicks cleanly. Buttons labeled
          &quot;Buy,&quot; &quot;Buy on Amazon,&quot; or &quot;Buy Direct from Brand&quot; are
          affiliate links.
        </p>
        <h2>Our promise</h2>
        <p>
          Commissions never influence our recommendations, ratings, or which products we choose to
          feature. We do not accept free products, and we do not accept payment for placement. If a
          product doesn&apos;t deserve to be recommended, it isn&apos;t on this site — and we will
          tell you directly when a popular product is not worth your money.
        </p>
        <h2>FTC compliance</h2>
        <p>
          This disclosure is provided in accordance with the Federal Trade Commission&apos;s
          guidelines concerning endorsements and testimonials in advertising (16 CFR Part 255).
        </p>
      </div>
    </div>
  );
}
