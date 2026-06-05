import { notFound } from 'next/navigation';
import { getCondition } from '@/lib/data';
import { faqSchema, breadcrumbSchema, articleSchema, jsonLd } from '@/lib/seo';
import PillarHero from './PillarHero';
import ConditionOverview from './ConditionOverview';
import SupplementProtocol from './SupplementProtocol';
import ProductTable from './ProductTable';
import AvoidSection from './AvoidSection';
import CommunityInsights from './CommunityInsights';
import FAQAccordion from './FAQAccordion';
import RelatedArticles from './RelatedArticles';
import PillarNewsletter from './PillarNewsletter';
import AffiliateDisclosure from '@/components/shared/AffiliateDisclosure';

export default function PillarPage({ slug }: { slug: string }) {
  const condition = getCondition(slug);
  if (!condition) notFound();

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: condition.shortName, path: `/${condition.slug}` },
    ]),
    faqSchema(condition.faqs),
    articleSchema({
      headline: `${condition.name}: Supplement Protocol & Honest Reviews`,
      description: condition.tagline,
      path: `/${condition.slug}`,
      datePublished: '2026-01-01',
    }),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(s)}
        />
      ))}
      <PillarHero condition={condition} />
      <div className="mx-auto max-w-content px-4 pt-8 sm:px-6">
        <AffiliateDisclosure />
      </div>
      <ConditionOverview condition={condition} />
      <SupplementProtocol condition={condition} />
      <ProductTable condition={condition} />
      <AvoidSection condition={condition} />
      <CommunityInsights condition={condition} />
      <FAQAccordion faqs={condition.faqs} />
      <RelatedArticles condition={condition} />
      <PillarNewsletter condition={condition} />
    </>
  );
}
