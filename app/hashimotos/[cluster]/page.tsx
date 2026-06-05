import type { Metadata } from 'next';
import ClusterPage from '@/components/cluster/ClusterPage';
import { clusterParams, clusterMetadata } from '@/lib/clusterRoute';

const CONDITION = 'hashimotos';

export function generateStaticParams() {
  return clusterParams(CONDITION);
}

export function generateMetadata({ params }: { params: { cluster: string } }): Metadata {
  return clusterMetadata(CONDITION, params.cluster);
}

export default function Page({ params }: { params: { cluster: string } }) {
  return <ClusterPage conditionSlug={CONDITION} clusterSlug={params.cluster} />;
}
