import type { Metadata } from 'next';
import { getCondition } from '@/lib/data';
import { canonical } from '@/lib/seo';

export function clusterParams(conditionSlug: string) {
  const c = getCondition(conditionSlug);
  return (c?.clusters ?? []).map((cl) => ({ cluster: cl.slug }));
}

export function clusterMetadata(conditionSlug: string, clusterSlug: string): Metadata {
  const c = getCondition(conditionSlug);
  const cluster = c?.clusters.find((cl) => cl.slug === clusterSlug);
  if (!c || !cluster) return {};
  return {
    title: cluster.title,
    description: `${cluster.title} — research-backed, independent guidance from the StopTheFlare ${c.shortName} guide.`.slice(0, 160),
    alternates: { canonical: canonical(`/${c.slug}/${cluster.slug}`) },
  };
}
