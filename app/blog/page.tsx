import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/data';
import { canonical } from '@/lib/seo';
import ArticleCard from '@/components/shared/ArticleCard';

export const metadata: Metadata = {
  title: 'Research & Guides',
  description:
    'Research-backed guides on supplements and protocols for autoimmune conditions — written for you, not for the brands.',
  alternates: { canonical: canonical('/blog') },
};

export default function BlogIndex() {
  const posts = getBlogPosts();
  return (
    <div className="bg-background">
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <h1 className="font-serif text-4xl font-semibold md:text-5xl">Research &amp; Guides</h1>
          <p className="mt-4 max-w-2xl text-white/85">
            Honest, research-backed writing on the supplements and protocols that actually help.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
