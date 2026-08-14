import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { blogIndex } from "@/content/blog";
import { BlogIndexPage } from "@/components/pages/BlogPages";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/blog",
  title: blogIndex.it.seoTitle,
  description: blogIndex.it.seoDescription,
});

export default function Page() {
  return <BlogIndexPage locale="it" />;
}
