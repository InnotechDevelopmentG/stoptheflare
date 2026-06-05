import type { Review } from '@/lib/types';

/* PLACEHOLDER — replace with full independent reviews. */
export const reviews: Review[] = [
  {
    slug: 'thorne-selenium-review',
    productId: 'thorne-selenium',
    title: 'Thorne Selenium Review: The Best Selenomethionine for Hashimoto\'s?',
    conditionSlugs: ['hashimotos'],
    updated: '2026-05-30',
    rating: 4.8,
    pros: [
      'Uses the well-absorbed selenomethionine form',
      'Clean formulation with no unnecessary fillers',
      'Dosed at the research-backed 200 mcg',
    ],
    cons: [
      'Slightly pricier than generic selenium',
      'Capsule size is on the larger side',
    ],
    bottomLine:
      'A clean, correctly dosed selenomethionine that matches what the antibody research actually used.',
    bestFor:
      'People with Hashimoto\'s who want a no-nonsense selenium at the dose studied for lowering thyroid antibodies.',
    ingredients: [
      { name: 'Selenium (as L-selenomethionine)', note: '200 mcg — the form and dose with the strongest antibody evidence.' },
      { name: 'Other ingredients', note: 'Hypoallergenic capsule, no common allergens or artificial fillers.' },
    ],
    research: [
      'Randomized trials have found that 200 mcg/day of selenomethionine can reduce TPO antibodies over 3 to 6 months, with the largest effect in selenium-deficient individuals.',
      'Benefits plateau at 200 mcg; higher doses add risk without added benefit, which is why this product\'s dosing is appropriate rather than excessive.',
    ],
    community: [
      { quote: 'My antibodies finally started trending down after switching to a real selenomethionine product.', source: 'Via Reddit r/Hashimotos' },
      { quote: 'No stomach upset, which I cannot say for the cheaper brand I tried first.', source: 'Via our community survey' },
    ],
    alternatives: [
      { name: 'Pure Encapsulations Selenium', brand: 'Pure Encapsulations', note: 'Comparable quality, similar price.' },
      { name: 'Life Extension Selenium Complex', brand: 'Life Extension', note: 'Blends three selenium forms; fine but less targeted.' },
      { name: 'Generic selenium yeast', brand: 'Various', note: 'Cheaper but form and dosing vary widely.' },
    ],
    verdict:
      'If you want the exact form and dose the research supports, Thorne Selenium is an easy recommendation. It is not magic — selenium is one piece of a broader protocol — but it is a clean, honest product that does what it claims.',
    faqs: [
      { q: 'How long until I see lower antibodies?', a: 'Most studies measured changes over 3 to 6 months. Consistency matters more than dose.' },
      { q: 'Can I take this with my thyroid medication?', a: 'Selenium is generally taken alongside medication, but space it from levothyroxine and confirm with your doctor.' },
      { q: 'Is 200 mcg enough?', a: 'Yes — this is the dose used in the antibody studies. More is not better and can be harmful.' },
      { q: 'Does it contain iodine?', a: 'No, which is appropriate for Hashimoto\'s where high-dose iodine can worsen the autoimmune attack.' },
    ],
  },
  {
    slug: 'seeking-health-histdao-review',
    productId: 'seeking-health-histdao',
    title: 'Seeking Health HistDAO Review: Does the DAO Enzyme Actually Work?',
    conditionSlugs: ['histamine-mcas'],
    updated: '2026-05-26',
    rating: 4.9,
    pros: [
      'Standardized, potent DAO enzyme units',
      'Genuinely helps with food-triggered reactions',
      'Free of common reactive fillers',
    ],
    cons: [
      'Premium price per capsule',
      'Must be timed before meals to work',
    ],
    bottomLine:
      'The flagship DAO supplement — for people with low DAO, taking it before meals can be life-changing.',
    bestFor:
      'Anyone with histamine intolerance who reacts to aged foods, leftovers, or wine and wants to expand what they can eat.',
    ingredients: [
      { name: 'Diamine oxidase (DAO)', note: 'Standardized enzyme units derived from porcine kidney — the active ingredient that degrades dietary histamine.' },
      { name: 'Other ingredients', note: 'Minimal, low-reactivity excipients suited to sensitive individuals.' },
    ],
    research: [
      'DAO is the primary enzyme responsible for breaking down histamine in the gut, and supplementation before meals has been shown to reduce symptoms in people with confirmed low DAO activity.',
      'It works locally in the digestive tract rather than systemically, which is why timing it just before eating is essential.',
    ],
    community: [
      { quote: 'First time in years I could eat leftovers without flushing and a pounding heart.', source: 'Via Reddit r/MCAS' },
      { quote: 'Not cheap, but it gave me my social life back around food.', source: 'Via our community survey' },
    ],
    alternatives: [
      { name: 'Umbrellux DAO', brand: 'Umbrellux', note: 'Another respected DAO product at a similar price point.' },
      { name: 'NaturDAO (plant-based)', brand: 'NaturDAO', note: 'Vegetarian DAO source; some prefer it for that reason.' },
      { name: 'Quercetin (adjunct)', brand: 'Various', note: 'Not a DAO source, but a complementary mast cell stabilizer.' },
    ],
    verdict:
      'For people who genuinely have low DAO, HistamineBlock is one of the few supplements that produces an obvious, repeatable effect. It is expensive and must be timed correctly, but the payoff in expanded food freedom is real.',
    faqs: [
      { q: 'When do I take it?', a: 'About 15 minutes before a meal that contains histamine, so the enzyme is active while you eat.' },
      { q: 'Will it let me eat anything?', a: 'It raises your tolerance but is not a free pass. Very high-histamine meals can still cause reactions.' },
      { q: 'Is it vegetarian?', a: 'No, this product is porcine-derived. Look at plant-based DAO if that matters to you.' },
      { q: 'Can I take it with antihistamines?', a: 'Many people do, but coordinate with your clinician since they work on different parts of the problem.' },
    ],
  },
];
