import type { Metadata } from 'next';
import PillarPage from '@/components/pillar/PillarPage';
import { pillarMetadata } from '@/lib/pillarMeta';

const SLUG = 'hashimotos';
export const metadata: Metadata = pillarMetadata(SLUG);

export default function Page() {
  return <PillarPage slug={SLUG} />;
}
