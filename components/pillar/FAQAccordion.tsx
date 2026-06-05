'use client';

import { useState } from 'react';

interface Faq {
  q: string;
  a: string;
}

export default function FAQAccordion({ faqs, title = 'Frequently Asked Questions' }: { faqs: Faq[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-surface-warm py-16">
      <div className="mx-auto max-w-prose px-4 sm:px-6">
        <h2 className="font-serif text-3xl font-semibold">{title}</h2>
        <div className="mt-8 divide-y divide-border rounded-card border border-border bg-surface">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-text-primary">{faq.q}</span>
                  <span aria-hidden="true" className="shrink-0 text-xl text-primary">
                    {isOpen ? '–' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-small text-text-secondary">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
