import Anthropic from '@anthropic-ai/sdk';

/** Shape returned by the generator — maps 1:1 to the `flare_articles` table. */
export interface GeneratedArticle {
  slug: string;
  title: string;
  seo_description: string;
  excerpt: string;
  category: string;
  condition_slug: string;
  read_time: string;
  /** Plain string = <p>. Prefix "## " = <h2>, "### " = <h3>. */
  body: string[];
  faqs: { q: string; a: string }[];
  tags: string[];
}

/** The 5 condition pillars. `category` matches the labels used in data/blog.ts. */
const PILLARS = [
  { slug: 'hashimotos', category: 'Hashimoto\u2019s', name: "Hashimoto's & thyroid health" },
  { slug: 'gut-health', category: 'Gut Health', name: 'gut health & the microbiome' },
  { slug: 'eczema-psoriasis', category: 'Eczema & Skin', name: 'eczema, psoriasis & inflammatory skin' },
  { slug: 'fibromyalgia-chronic-fatigue', category: 'Fibromyalgia & Fatigue', name: 'fibromyalgia & chronic fatigue' },
  { slug: 'histamine-mcas', category: 'Histamine & MCAS', name: 'histamine intolerance & MCAS' },
] as const;

/** Internal paths the model is allowed to link to (keeps every link valid). */
const INTERNAL_LINKS = [
  '/hashimotos',
  '/gut-health',
  '/eczema-psoriasis',
  '/fibromyalgia-chronic-fatigue',
  '/histamine-mcas',
  '/reviews',
  '/blog',
  '/start-here',
];

function dayOfYear(d: Date): number {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  return Math.floor((d.getTime() - start) / 86_400_000);
}

/** Deterministically rotate through the pillars so coverage stays balanced. */
export function pillarForDate(d = new Date()) {
  return PILLARS[dayOfYear(d) % PILLARS.length];
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[\u2019']/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 70)
    .replace(/^-|-$/g, '');
}

/**
 * Generate one full-length, SEO-targeted article for the given pillar.
 * `existingTitles` is used to steer the model away from topics already covered.
 */
export async function generateArticle(opts: {
  existingTitles?: string[];
} = {}): Promise<GeneratedArticle> {
  const now = new Date();
  const pillar = pillarForDate(now);
  const avoid = (opts.existingTitles ?? []).slice(0, 120);

  const prompt = `You are a senior health writer for StopTheFlare.com \u2014 an independent, research-backed resource that helps people manage autoimmune and inflammatory conditions. You receive NO brand sponsorships; your guidance is honest and evidence-informed.

TODAY: ${now.toISOString().split('T')[0]}
TARGET PILLAR: ${pillar.name} (category label: "${pillar.category}", condition_slug: "${pillar.slug}")

TASK: Write ONE new, genuinely useful, SEO-optimized article targeting a specific long-tail keyword within this pillar that real people search (informational intent). Pick a concrete, answerable angle (e.g. "is X safe with ${pillar.name}", "best time to take Y", a symptom checklist, a head-to-head comparison). Prefer depth and accuracy over breadth.

DO NOT duplicate or closely overlap any of these already-published titles:
${avoid.length ? avoid.map((t) => `- ${t}`).join('\n') : '(none yet)'}

CONTENT REQUIREMENTS:
- 900\u20131400 words of real, helpful substance. No fluff, no padding.
- Audience: smart non-experts managing their condition. Clear, warm, direct \u2014 like a knowledgeable friend.
- This is YMYL health content: be accurate, explain mechanisms, cite what evidence shows vs. is preliminary, and avoid overclaiming. Do NOT give individualized medical advice or specific diagnoses. Include a brief reminder to consult a clinician where relevant. Never invent statistics or studies.
- Use a clear heading hierarchy with multiple sections. In the body array, prefix "## " for an H2 and "### " for an H3; plain strings are paragraphs.
- Internal links build topical authority. Where natural, link to relevant pages using markdown [label](path). ONLY use these exact internal paths: ${INTERNAL_LINKS.join(', ')}. Always link to /${pillar.slug} at least once. Do NOT invent any other links, and do NOT add external or affiliate links.
- You may use **bold** for emphasis. Use curly apostrophes/quotes (\u2019 \u201C \u201D) and em dashes (\u2014).

Call the submit_article tool with the finished article. Provide exactly 4 FAQs.`;

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 16000,
    tools: [
      {
        name: 'submit_article',
        description: 'Submit the finished article in structured form.',
        input_schema: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'SEO headline, 50-62 chars, includes the core keyword' },
            seo_description: { type: 'string', description: 'Meta description, 150-160 chars, keyword-rich' },
            excerpt: { type: 'string', description: '1-2 sentence summary for listing cards, ~140-160 chars' },
            read_time: { type: 'string', description: "e.g. '9 min read'" },
            body: {
              type: 'array',
              items: { type: 'string' },
              description: 'Article blocks. "## " = H2, "### " = H3, plain string = paragraph.',
            },
            faqs: {
              type: 'array',
              items: {
                type: 'object',
                properties: { q: { type: 'string' }, a: { type: 'string' } },
                required: ['q', 'a'],
              },
              description: 'Exactly 4 People-Also-Ask style Q&A pairs.',
            },
            tags: { type: 'array', items: { type: 'string' }, description: '4-7 relevant search tags' },
          },
          required: ['title', 'seo_description', 'excerpt', 'read_time', 'body', 'faqs', 'tags'],
        },
      },
    ],
    tool_choice: { type: 'tool', name: 'submit_article' },
    messages: [{ role: 'user', content: prompt }],
  });

  const toolUse = message.content.find((b) => b.type === 'tool_use');
  if (!toolUse || toolUse.type !== 'tool_use') {
    const types = message.content.map((b) => b.type).join(',');
    throw new Error(
      `Generator did not return a tool_use block (stop_reason=${message.stop_reason}, blocks=[${types}])`,
    );
  }
  const parsed = toolUse.input as Record<string, unknown>;
  const body = normalizeBody(parsed.body);

  if (!parsed.title || body.length === 0) {
    const keys = Object.keys(parsed ?? {}).join(',');
    throw new Error(
      `Generator returned malformed article (stop_reason=${message.stop_reason}, keys=[${keys}], bodyType=${typeof parsed.body})`,
    );
  }

  const str = (v: unknown) => (typeof v === 'string' ? v : '');

  return {
    slug: slugify(str(parsed.title)),
    title: str(parsed.title),
    seo_description: str(parsed.seo_description) || str(parsed.excerpt),
    excerpt: str(parsed.excerpt) || str(parsed.seo_description),
    category: pillar.category,
    condition_slug: pillar.slug,
    read_time: str(parsed.read_time) || '8 min read',
    body,
    faqs: normalizeFaqs(parsed.faqs),
    tags: Array.isArray(parsed.tags)
      ? parsed.tags.filter((t): t is string => typeof t === 'string').slice(0, 8)
      : [],
  };
}

/** Accept body as a string[] or a single markdown string and return clean blocks. */
function normalizeBody(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw
      .map((b) => {
        if (typeof b === 'string') return b;
        if (b && typeof b === 'object') {
          const o = b as Record<string, unknown>;
          return typeof o.text === 'string' ? o.text : typeof o.content === 'string' ? o.content : '';
        }
        return '';
      })
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (typeof raw === 'string') {
    return raw
      .split(/\n{2,}/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeFaqs(raw: unknown): { q: string; a: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((f) => {
      const o = (f ?? {}) as Record<string, unknown>;
      return { q: typeof o.q === 'string' ? o.q : '', a: typeof o.a === 'string' ? o.a : '' };
    })
    .filter((f) => f.q && f.a)
    .slice(0, 6);
}
