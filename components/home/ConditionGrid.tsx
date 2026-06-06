'use client';

import { useState } from 'react';
import { getConditions } from '@/lib/data';
import EmailCaptureModal from '@/components/shared/EmailCaptureModal';

interface ModalState {
  slug: string;
  name: string;
}

export default function ConditionGrid() {
  const conditions = getConditions();
  const [modal, setModal] = useState<ModalState | null>(null);

  return (
    <section id="conditions" className="scroll-mt-24 bg-background py-20">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">Find Your Condition</h2>
          <p className="mt-4 text-text-secondary">
            Each guide covers symptoms, root causes, the supplement protocols that work, and honest
            product reviews.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {conditions.map((c) => (
            <button
              key={c.slug}
              onClick={() => setModal({ slug: c.slug, name: c.name })}
              className="group flex w-full flex-col rounded-card border border-transparent border-t-4 border-t-transparent bg-surface-warm p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-t-primary hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-pill bg-primary/10 text-primary"
              >
                <LeafIcon />
              </span>
              <h3 className="font-serif text-xl font-medium">{c.name}</h3>
              <p className="mt-2 text-small text-text-secondary">{c.homeHeadline}</p>
              <ul className="mt-4 space-y-1.5 text-small text-text-secondary">
                {c.homeBullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden="true" className="text-primary-light">•</span>
                    {b}
                  </li>
                ))}
              </ul>
              <span className="mt-5 font-medium text-primary group-hover:underline">
                See the Guide →
              </span>
            </button>
          ))}
        </div>
      </div>

      {modal && (
        <EmailCaptureModal
          conditionSlug={modal.slug}
          conditionName={modal.name}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}

function LeafIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19c4-4 7-6 10-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
