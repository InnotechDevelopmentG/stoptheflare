export type BadgeColor = 'primary' | 'secondary' | 'flare' | 'warning';

export interface ProtocolItem {
  name: string;
  why: string;
  dose: string;
  lookFor: string;
  productSlug: string;
}

export interface Condition {
  slug: string;
  name: string;
  shortName: string;
  navLabel: string;
  badgeColor: BadgeColor;
  tagline: string;
  homeHeadline: string;
  homeBullets: string[];
  stats: { affected: string; topSearched: string; updated: string };
  overview: string;
  quickFacts: {
    affects: string;
    symptoms: string;
    conventional: string;
    whySupplements: string;
    keyNutrients: string;
  };
  protocol: { tier1: ProtocolItem[]; tier2: ProtocolItem[]; tier3: ProtocolItem[] };
  avoid: string[];
  community: { quote: string; source: string }[];
  faqs: { q: string; a: string }[];
  clusters: { slug: string; title: string }[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  conditions: string[];
  rating: number;
  affiliateSlug: string;
  price: string;
  verdict: string;
  bestFor: string;
  dose: string;
  image: string;
  amazon: boolean;
  direct: boolean;
}

export interface AffiliateLink {
  url: string;
  brand: string;
  product: string;
  type: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  conditionSlug: string;
  readTime: string;
  date: string;
  /** Plain strings = <p>. Prefix with "## " for <h2>, "### " for <h3>. */
  body: string[];
  faqs?: { q: string; a: string }[];
}

export interface Review {
  slug: string;
  productId: string;
  title: string;
  conditionSlugs: string[];
  updated: string;
  rating: number;
  pros: string[];
  cons: string[];
  bottomLine: string;
  bestFor: string;
  ingredients: { name: string; note: string }[];
  research: string[];
  community: { quote: string; source: string }[];
  alternatives: { name: string; brand: string; note: string }[];
  verdict: string;
  faqs: { q: string; a: string }[];
}
