import { MetadataRoute } from 'next';
import { getConditions, getReviews, getBlogPosts } from '@/lib/data';
import { listLatestArticles } from '@/lib/articles';
import { SITE_URL } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const conditions = getConditions();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/start-here`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/reviews`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/latest`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/affiliate-disclosure`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const pillarPages: MetadataRoute.Sitemap = conditions.map((c) => ({
    url: `${SITE_URL}/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const clusterPages: MetadataRoute.Sitemap = conditions.flatMap((c) =>
    c.clusters.map((cl) => ({
      url: `${SITE_URL}/${c.slug}/${cl.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  );

  const reviewPages: MetadataRoute.Sitemap = getReviews().map((r) => ({
    url: `${SITE_URL}/reviews/${r.slug}`,
    lastModified: new Date(r.updated),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getBlogPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const latestArticles = await listLatestArticles(1000);
  const latestPages: MetadataRoute.Sitemap = latestArticles.map((a) => ({
    url: `${SITE_URL}/latest/${a.slug}`,
    lastModified: new Date(a.published_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...pillarPages, ...clusterPages, ...reviewPages, ...blogPages, ...latestPages];
}
