import { NextResponse } from 'next/server';
import { getAffiliate } from '@/lib/affiliates';

export const dynamic = 'force-dynamic';

export function GET(req: Request, { params }: { params: { slug: string } }) {
  const affiliate = getAffiliate(params.slug);
  if (!affiliate) {
    return NextResponse.redirect(new URL('/reviews', req.url), 302);
  }
  // 302 so affiliate destinations can change without caching issues.
  return NextResponse.redirect(affiliate.url, 302);
}
