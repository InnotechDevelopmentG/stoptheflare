import affiliatesData from '@/data/affiliates.json';
import type { AffiliateLink } from './types';

const affiliates = affiliatesData as Record<string, AffiliateLink>;

export function getAffiliate(slug: string): AffiliateLink | undefined {
  return affiliates[slug];
}

/** Internal redirect path for an affiliate slug. */
export function goLink(slug: string): string {
  return `/go/${slug}`;
}

export const AFFILIATE_REL = 'nofollow sponsored';
export const AFFILIATE_TITLE = 'Affiliate link — we may earn a commission';
