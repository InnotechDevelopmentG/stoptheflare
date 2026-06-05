import type { BlogPost } from '@/lib/types';

/* PLACEHOLDER — replace with real research articles. Body paragraphs are plain text;
   real content will move to MDX/CMS later. */
export const blogPosts: BlogPost[] = [
  {
    slug: 'selenium-and-thyroid-antibodies',
    title: 'What the Research Actually Says About Selenium and Thyroid Antibodies',
    excerpt:
      'Selenium is one of the few supplements with real randomized trial data behind it for Hashimoto\'s. Here is what those studies found — and where the hype gets ahead of the evidence.',
    category: 'Hashimoto\'s',
    conditionSlug: 'hashimotos',
    readTime: '7 min read',
    date: '2026-05-28',
    body: [
      'If you have spent any time in a Hashimoto\'s community, you have seen selenium recommended over and over. Unlike most supplement advice, this one is actually backed by randomized controlled trials — which is rare in the supplement world.',
      'Multiple studies have found that 200 mcg of selenium per day, usually as selenomethionine, can lower thyroid peroxidase (TPO) antibodies over several months. The effect is most consistent in people who are selenium-deficient to begin with.',
      'That said, antibodies are a marker, not the whole story. Lower antibodies do not always translate to feeling better, and selenium does not replace thyroid medication. The honest takeaway: selenium is a reasonable, low-risk foundation supplement at 200 mcg, but it is not a miracle.',
      'What to avoid: doses above 400 mcg per day, which provide no extra benefit and can become toxic over time. Stick to the form and dose the research used.',
    ],
  },
  {
    slug: 'choosing-a-probiotic-for-ibd',
    title: 'How to Choose a Probiotic for IBD Without Wasting Money',
    excerpt:
      'The probiotic aisle is overwhelming and most of it is marketing. Strain selection matters far more than the CFU count on the label. Here is how to think about it.',
    category: 'Gut Health',
    conditionSlug: 'gut-health',
    readTime: '8 min read',
    date: '2026-05-20',
    body: [
      'The single most important thing to understand about probiotics is that the strain matters more than the brand, the price, or the CFU count plastered on the front of the bottle.',
      'Different strains do different things. Some have evidence for supporting remission in ulcerative colitis; others have no meaningful data at all. A 50-billion CFU blend of random strains is not better than a clinically studied product at a lower count.',
      'For IBD specifically, look for products built around strains that have been studied in your condition, and introduce them slowly. If a probiotic makes you feel worse, that is real information — stop and reassess rather than pushing through.',
      'Bottom line: ignore the CFU arms race. Match the strain to the condition, start low, and give it 8 to 12 weeks.',
    ],
  },
  {
    slug: 'dao-enzyme-explained',
    title: 'The DAO Enzyme, Explained: Why Some People React to Leftovers',
    excerpt:
      'If aged cheese, leftovers, or a glass of wine sends you into flushing and a racing heart, low DAO may be the reason. Here is how the enzyme works and how supplementing it helps.',
    category: 'Histamine & MCAS',
    conditionSlug: 'histamine-mcas',
    readTime: '6 min read',
    date: '2026-05-12',
    body: [
      'Diamine oxidase, or DAO, is the enzyme your gut uses to break down histamine from food. When you do not make enough of it, dietary histamine builds up and spills into circulation — causing flushing, headaches, hives, and that unmistakable racing heart after eating.',
      'This is why leftovers are such a common trigger: histamine accumulates in food as it ages. The fresher the food, the lower the histamine load.',
      'Supplementing DAO shortly before meals gives your gut extra enzyme to degrade that histamine before it causes a reaction. It does not cure the underlying issue, but for many people it is the difference between eating freely and living on a tiny list of safe foods.',
      'One critical warning: be careful with probiotics. Strains like L. casei and L. bulgaricus actually produce histamine and can make everything worse. Choose histamine-neutral strains instead.',
    ],
  },
];
