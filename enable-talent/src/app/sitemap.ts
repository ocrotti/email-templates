import type { MetadataRoute } from "next";
import { absoluteUrl, localePath, LOCALES } from "@/lib/site";
import { roleSlugs } from "@/content/roles";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/how-it-works",
    "/roles",
    "/pricing",
    "/guarantee",
    "/talent",
    "/case-study",
    "/blog",
    "/enable-digital",
    "/contact",
    "/privacy",
  ];

  const rolePaths = roleSlugs.map((slug) => `/roles/${slug}`);
  const blogPaths = blogPosts.en.map((post) => `/blog/${post.slug}`);
  const allPaths = [...staticPaths, ...rolePaths, ...blogPaths];

  return allPaths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified: new Date(),
      changeFrequency: path.startsWith("/blog") ? ("monthly" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : path.startsWith("/roles/") ? 0.8 : 0.7,
      alternates: {
        languages: {
          en: absoluteUrl(localePath("en", path)),
          it: absoluteUrl(localePath("it", path)),
          "x-default": absoluteUrl(localePath("en", path)),
        },
      },
    }))
  );
}
