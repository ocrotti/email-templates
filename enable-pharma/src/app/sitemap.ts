import type { MetadataRoute } from "next";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { articles } from "@/content/insights";
import { siteConfig } from "@/lib/site-config";

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
  const urlFor = (locale: Locale) =>
    siteConfig.url +
    getPathname({
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
    ...staticPages.flatMap((p) => entries(p)),
    ...articles.flatMap((article) =>
      entries("/insight/[slug]", { slug: article.slug }, article.date),
    ),
  ];
}
