const items = [
  '5 Conditions Covered',
  '200+ Products Reviewed',
  'No Brand Sponsorships',
  'Research-Backed Only',
  'Community Verified',
];

export default function TrustBar() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-content grid-cols-2 gap-4 px-4 py-8 text-center sm:px-6 md:flex md:items-center md:justify-between">
        {items.map((item) => (
          <div key={item} className="flex items-center justify-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary-light" />
            <span className="text-small font-medium text-text-secondary">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
