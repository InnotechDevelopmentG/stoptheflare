export const SITE_URL = 'https://stoptheflare.com';
export const SITE_NAME = 'StopTheFlare';

export function canonical(path = ''): string {
  return `${SITE_URL}${path}`;
}

interface FaqItem {
  q: string;
  a: string;
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: canonical(opts.path),
    datePublished: opts.datePublished,
    author: { '@type': 'Organization', name: 'StopTheFlare Research Team' },
    publisher: { '@type': 'Organization', name: SITE_NAME },
  };
}

export function reviewSchema(opts: {
  productName: string;
  brand: string;
  rating: number;
  path: string;
  datePublished: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: opts.productName,
      brand: { '@type': 'Brand', name: opts.brand },
      description: opts.description,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: opts.rating,
      bestRating: 5,
    },
    author: { '@type': 'Organization', name: 'StopTheFlare Research Team' },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    datePublished: opts.datePublished,
    url: canonical(opts.path),
  };
}

/** Helper to render JSON-LD safely in a script tag. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data) };
}
