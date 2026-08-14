import type { MetadataRoute } from "next";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { articles, sortedArticles } from "@/content/insights";
import { siteConfig } from "@/lib/site-config";

// Bump when the static pages' copy is revised: half the sitemap was
// shipping without a <lastmod> at all.
const SITE_LAST_UPDATED = "2026-08-14";

const staticPages: AppPathname[] = [
  "/",
  "/compliance",
  "/progetto-esempio",
  "/insight",
  "/contatti",
];

/**
 * Emits one <url> per locale, not one per page. The Italian and English
 * routes are distinct URLs with distinct content, so listing only the
 * default locale would leave every English page out of the sitemap.
 * Each entry carries the full alternates set, including x-default.
 */
function entries(
  pathname: AppPathname,
  params?: Record<string, Record<Locale, string>>,
  lastModified?: string,
): MetadataRoute.Sitemap {
  const urlFor = (locale: Locale) => {
    const path = getPathname({
      locale,
      href: params
        ? ({
            pathname,
            params: Object.fromEntries(
              Object.entries(params).map(([k, v]) => [k, v[locale]]),
            ),
          } as never)
        : (pathname as never),
    });
    // Root must serialize identically here and in the canonical tag or
    // crawler validators flag a mismatch on the home. Next's metadata
    // pipeline normalizes the canonical to the bare origin (no trailing
    // slash), so the sitemap emits the same form.
    return path === "/" || path === "" ? siteConfig.url : siteConfig.url + path;
  };

  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((locale) => [locale, urlFor(locale)]),
  );
  languages["x-default"] = urlFor(routing.defaultLocale);

  return routing.locales.map((locale) => ({
    url: urlFor(locale),
    lastModified: lastModified ? new Date(lastModified) : undefined,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPages.flatMap((p) =>
      entries(
        p,
        undefined,
        // The index is only as fresh as its newest article.
        p === "/insight" ? sortedArticles[0].date : SITE_LAST_UPDATED,
      ),
    ),
    ...articles.flatMap((article) =>
      entries("/insight/[slug]", { slug: article.slug }, article.date),
    ),
  ];
}
