import type { Metadata } from 'next';
import { getCondition } from '@/lib/data';
import { canonical } from '@/lib/seo';

export function pillarMetadata(slug: string): Metadata {
  const c = getCondition(slug);
  if (!c) return {};
  const title = `${c.name} Supplements & Protocol`;
  const description = `${c.tagline} Honest, research-backed supplement guidance for ${c.shortName} — no brand sponsorships.`;
  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: canonical(`/${c.slug}`) },
    openGraph: {
      title: `${title} | StopTheFlare`,
      description: c.tagline,
      url: canonical(`/${c.slug}`),
      type: 'article',
    },
  };
}
