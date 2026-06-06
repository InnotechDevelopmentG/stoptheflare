'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  conditionSlug: string;
  conditionName: string;
  onClose: () => void;
}

export default function EmailCaptureModal({ conditionSlug, conditionName, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function skip() {
    onClose();
    router.push(`/${conditionSlug}`);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, condition: conditionSlug }),
      });
      if (res.ok) {
        setStatus('done');
        setTimeout(() => {
          onClose();
          router.push(`/${conditionSlug}`);
        }, 1200);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) skip(); }}
    >
      <div className="w-full max-w-md rounded-card bg-surface p-8 shadow-xl">
        <h2 className="font-serif text-2xl font-semibold">
          Get the {conditionName} guide
        </h2>
        <p className="mt-2 text-text-secondary">
          Enter your email and we'll send you the full guide plus research-backed follow-up tips — no sponsored content, ever.
        </p>

        {status === 'done' ? (
          <p className="mt-6 font-medium text-primary">You're in! Taking you to the guide…</p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-3">
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full rounded-btn border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
            {status === 'error' && (
              <p className="text-sm text-red-500">Something went wrong — please try again.</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-btn bg-primary px-4 py-3 font-medium text-white transition hover:bg-primary-light disabled:opacity-60"
            >
              {status === 'loading' ? 'Saving…' : 'Send me the guide'}
            </button>
          </form>
        )}

        <button
          onClick={skip}
          className="mt-4 block w-full text-center text-sm text-text-muted hover:text-primary"
        >
          No thanks, just take me to the guide
        </button>
      </div>
    </div>
  );
}
