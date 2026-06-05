import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-prose flex-col items-center px-4 py-28 text-center sm:px-6">
      <p className="font-mono text-small text-text-muted">404</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">We couldn&apos;t find that page</h1>
      <p className="mt-4 text-text-secondary">
        The page may have moved. Try starting from one of our condition guides.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-btn bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-light">
          Go Home
        </Link>
        <Link
          href="/start-here"
          className="rounded-btn border border-border px-5 py-2.5 font-medium text-primary hover:bg-surface-warm"
        >
          Start Here
        </Link>
      </div>
    </div>
  );
}
