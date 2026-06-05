import type { Metadata, Viewport } from 'next';
import { Lora, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-lora',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2C5F2E',
};

export const metadata: Metadata = {
  title: {
    default: 'StopTheFlare — Honest, research-backed autoimmune supplement guides',
    template: '%s | StopTheFlare',
  },
  description:
    'The most trusted independent source for people managing autoimmune conditions. No brand sponsorships — just honest, research-backed supplement and product guidance.',
  metadataBase: new URL('https://stoptheflare.com'),
  alternates: {
    canonical: 'https://stoptheflare.com',
  },
  openGraph: {
    title: 'StopTheFlare — Honest autoimmune supplement guides',
    description:
      'No sponsored reviews. No miracle cures. Just real research on supplements and protocols that actually help.',
    url: 'https://stoptheflare.com',
    siteName: 'StopTheFlare',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StopTheFlare — Honest autoimmune supplement guides',
    description: 'No sponsored reviews. Just research-backed supplement guidance.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="bg-background text-text-primary font-sans">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
