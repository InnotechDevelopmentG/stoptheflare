# StopTheFlare.com

The honest, independent source of truth for managing autoimmune conditions. Affiliate-supported, no brand sponsorships.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with custom "Grounded Editorial" design tokens
- **@vercel/analytics**
- Content driven by typed data files in `/data` (move to MDX/CMS later)
- SEO via the native Metadata API, `sitemap.ts`, `robots.ts`, and inline JSON-LD
- Deploy target: **Vercel**

## Develop

```bash
npm install
npm run dev
```

## Structure

- `app/` — routes (homepage, 5 pillar pages + cluster sub-pages, reviews, blog, about, start-here, legal, `/go/[slug]` affiliate redirects)
- `components/` — `layout/`, `home/`, `pillar/`, `reviews/`, `cluster/`, `shared/`
- `data/` — `conditions.json`, `products.json`, `affiliates.json`, `blog.ts`, `reviews.ts`
- `lib/` — `data.ts`, `affiliates.ts`, `seo.ts`, types and helpers

## Affiliate links

All outbound affiliate links route through `/go/[slug]` (mapped in `data/affiliates.json`) and carry `rel="nofollow sponsored"`. Update destinations by editing that JSON file.

## To wire up before launch

- ConvertKit form IDs in `components/shared/NewsletterForm.tsx` (1 global + 1 per condition)
- Real affiliate URLs in `data/affiliates.json`
- Plausible analytics snippet
- Replace placeholder testimonials, product images, and cluster/blog content
