const points = [
  {
    title: 'No Sponsorships, Ever',
    body: "We don't accept money from supplement brands. Every recommendation comes from community research and independent review.",
  },
  {
    title: 'Real People, Real Results',
    body: 'Our guides are built from community feedback, published research, and honest analysis — not marketing materials.',
  },
  {
    title: 'Affiliate Supported, Reader Loyal',
    body: 'We earn small commissions if you buy through our links. This keeps the site free. It never changes what we recommend.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <h2 className="text-center font-serif text-3xl font-semibold md:text-4xl">
          Why Trust StopTheFlare?
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {points.map((p, i) => (
            <div key={p.title} className="rounded-card border border-border bg-background p-7">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-pill bg-primary font-mono text-white">
                {i + 1}
              </span>
              <h3 className="font-serif text-xl font-medium">{p.title}</h3>
              <p className="mt-2 text-small text-text-secondary">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
