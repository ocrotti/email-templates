import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { blogPosts } from "@/content/blog";
import { BlogPostPage } from "@/components/pages/BlogPages";

export function generateStaticParams() {
  return blogPosts.en.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.en.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMetadata({
    locale: "en",
    path: `/blog/${slug}`,
    title: post.seoTitle,
    description: post.description,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.en.find((p) => p.slug === slug);
  if (!post) notFound();
  return <BlogPostPage locale="en" post={post!} />;
}
