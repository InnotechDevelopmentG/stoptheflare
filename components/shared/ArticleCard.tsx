import Link from 'next/link';
import type { BlogPost } from '@/lib/types';

export default function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-card border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="mb-3 inline-flex w-fit rounded-pill bg-surface-warm px-3 py-1 text-caption font-medium text-primary">
        {post.category}
      </span>
      <h3 className="mb-2 font-serif text-xl font-medium leading-snug text-text-primary group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mb-4 flex-1 text-small text-text-secondary">{post.excerpt}</p>
      <div className="flex items-center gap-2 text-caption text-text-muted">
        <span>{post.readTime}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
      </div>
    </Link>
  );
}
