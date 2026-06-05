import Link from 'next/link';
import ArticleCard from '@/components/shared/ArticleCard';
import { getBlogPosts } from '@/lib/data';

export default function RecentArticles() {
  const posts = getBlogPosts().slice(0, 3);
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">Latest Research &amp; Guides</h2>
          <Link href="/blog" className="hidden font-medium text-primary hover:underline sm:block">
            View All Articles →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="font-medium text-primary hover:underline">
            View All Articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
