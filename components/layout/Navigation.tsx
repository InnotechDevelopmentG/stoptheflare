'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const navItems = [
  { label: "Hashimoto's", href: '/hashimotos' },
  { label: 'Gut Health', href: '/gut-health' },
  { label: 'Eczema & Skin', href: '/eczema-psoriasis' },
  { label: 'Fibromyalgia', href: '/fibromyalgia-chronic-fatigue' },
  { label: 'Histamine & MCAS', href: '/histamine-mcas' },
  { label: 'Reviews', href: '/reviews' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* Affiliate disclosure bar */}
      <div className="bg-primary px-4 py-1.5 text-center text-caption text-white/90">
        This site contains affiliate links. We may earn a commission at no cost to you.{' '}
        <Link href="/affiliate-disclosure" className="underline">
          Learn more
        </Link>
        .
      </div>

      <header
        className={clsx(
          'sticky top-0 z-50 transition-colors duration-200',
          scrolled
            ? 'border-b border-border bg-background/95 shadow-sm backdrop-blur'
            : 'bg-background',
        )}
      >
        <nav className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="font-serif text-2xl font-semibold text-primary">
            StopTheFlare
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-small font-medium text-text-secondary transition hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/start-here"
              className="hidden rounded-btn bg-secondary px-4 py-2 text-small font-medium text-white transition hover:opacity-90 sm:inline-flex"
            >
              Get the Free Guide
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-btn text-text-primary lg:hidden"
            >
              <span className="text-2xl leading-none">{menuOpen ? '\u00d7' : '\u2630'}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-background pt-24 lg:hidden">
          <nav className="flex flex-col gap-1 px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border py-4 font-serif text-xl text-text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/start-here"
              onClick={() => setMenuOpen(false)}
              className="mt-6 rounded-btn bg-secondary px-4 py-3 text-center font-medium text-white"
            >
              Get the Free Guide
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
