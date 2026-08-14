import type { MetadataRoute } from "next";
import { absoluteUrl, localePath, LOCALES } from "@/lib/site";
import { roleSlugs } from "@/content/roles";
import { blogPosts } from "@/content/blog";

/**
 * Date the marketing copy last changed. Bump it when you edit content —
 * it is deliberately not `new Date()`, because a build-time timestamp would
 * claim every page changed on every deploy and make lastmod worthless.
 */
const CONTENT_UPDATED = "2026-08-07";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/how-it-works",
    "/white-label-marketing",
    "/outsource-digital-marketing",
    "/marketing-salaries",
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
  const postDates = new Map(blogPosts.en.map((post) => [`/blog/${post.slug}`, post.date]));
  const allPaths = [...staticPaths, ...rolePaths, ...postDates.keys()];

  return allPaths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified: new Date(postDates.get(path) ?? CONTENT_UPDATED),
      changeFrequency: path.startsWith("/blog/") ? ("monthly" as const) : ("weekly" as const),
      priority:
        path === "/"
          ? 1
          : path.startsWith("/roles/") || path === "/white-label-marketing"
            ? 0.8
            : path === "/privacy"
              ? 0.3
              : 0.7,
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
