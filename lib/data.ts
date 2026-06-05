import conditionsData from '@/data/conditions.json';
import productsData from '@/data/products.json';
import type { Condition, Product, BlogPost, Review } from './types';
import { blogPosts } from '@/data/blog';
import { reviews } from '@/data/reviews';

export const conditions = conditionsData as Condition[];
export const products = productsData as Product[];

export function getConditions(): Condition[] {
  return conditions;
}

export function getCondition(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCondition(slug: string): Product[] {
  return products.filter((p) => p.conditions.includes(slug));
}

export function getFeaturedProducts(limit = 8): Product[] {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getReviews(): Review[] {
  return reviews;
}

export function getReview(slug: string): Review | undefined {
  return reviews.find((r) => r.slug === slug);
}
