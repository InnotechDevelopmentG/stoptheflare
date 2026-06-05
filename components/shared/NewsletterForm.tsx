'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface NewsletterFormProps {
  /** ConvertKit form ID — Griffen to provide one per condition. */
  formId?: string;
  /** Condition tag for segmentation. */
  tag?: string;
  variant?: 'light' | 'onAmber' | 'onGreen';
  buttonLabel?: string;
}

export default function NewsletterForm({
  formId,
  tag,
  variant = 'light',
  buttonLabel = 'Subscribe Free',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // PLACEHOLDER — wire up to ConvertKit when form IDs are provided.
    // POST https://api.convertkit.com/v3/forms/{formId}/subscribe { email, tags: [tag] }
    void formId;
    void tag;
    await new Promise((r) => setTimeout(r, 500));
    setStatus('done');
  }

  if (status === 'done') {
    return (
      <p
        className={clsx(
          'rounded-btn px-4 py-3 text-center font-medium',
          variant === 'light' ? 'bg-surface-warm text-primary' : 'bg-white/15 text-white',
        )}
      >
        You&apos;re in. Check your inbox to confirm.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor={`nl-${formId ?? 'global'}`}>
        Email address
      </label>
      <input
        id={`nl-${formId ?? 'global'}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 rounded-btn border border-border bg-white px-4 py-3 text-text-primary outline-none focus:ring-2 focus:ring-primary/40"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={clsx(
          'rounded-btn px-6 py-3 font-medium transition disabled:opacity-60',
          variant === 'onAmber'
            ? 'bg-primary text-white hover:bg-primary-light'
            : variant === 'onGreen'
              ? 'bg-secondary text-white hover:opacity-90'
              : 'bg-primary text-white hover:bg-primary-light',
        )}
      >
        {status === 'loading' ? 'Joining…' : buttonLabel}
      </button>
    </form>
  );
}
