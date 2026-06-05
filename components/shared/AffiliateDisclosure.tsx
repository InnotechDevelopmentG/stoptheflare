import Link from 'next/link';

export default function AffiliateDisclosure() {
  return (
    <div className="flex gap-3 rounded-btn border-l-4 border-primary bg-surface-warm px-4 py-3">
      <span aria-hidden="true" className="mt-0.5 text-primary">
        ℹ️
      </span>
      <p className="text-small italic text-text-secondary">
        This page contains affiliate links. If you purchase through our links, we may earn a small
        commission at no extra cost to you. This never influences our recommendations — we only
        feature products we&apos;ve researched and would stand behind.{' '}
        <Link href="/affiliate-disclosure" className="font-medium not-italic text-primary underline">
          See our full Affiliate Disclosure.
        </Link>
      </p>
    </div>
  );
}
