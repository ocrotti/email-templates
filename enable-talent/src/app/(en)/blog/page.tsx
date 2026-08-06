import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { blogIndex } from "@/content/blog";
import { BlogIndexPage } from "@/components/pages/BlogPages";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/blog",
  title: blogIndex.en.seoTitle,
  description: blogIndex.en.seoDescription,
});

export default function Page() {
  return <BlogIndexPage locale="en" />;
}
