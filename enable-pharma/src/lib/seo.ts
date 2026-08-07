import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { siteConfig } from "./site-config";

interface PageMetaArgs {
  locale: Locale;
  pathname: AppPathname;
  params?: Record<string, string>;
  /** Per-locale slugs for dynamic routes (canonical differs per locale) */
  slugByLocale?: Record<Locale, string>;
  title: string;
  description: string;
  ogType?: "website" | "article";
  /** ISO date — emitted as article:published_time when ogType=article */
  publishedTime?: string;
  modifiedTime?: string;
}

function absoluteUrl(
  locale: Locale,
  pathname: AppPathname,
  params?: Record<string, string>,
) {
  const href = params
    ? ({ pathname, params } as never)
    : (pathname as never);
  const path = getPathname({ locale, href });
  // Next's metadata pipeline serializes the root canonical as the bare
  // origin regardless of a trailing slash here; the sitemap mirrors
  // that form (see sitemap.ts) so the two always match.
  return path === "/" || path === "" ? siteConfig.url : siteConfig.url + path;
}

/**
 * Builds complete page metadata: title/description, canonical,
 * hreflang alternates (it/en/x-default), Open Graph and Twitter cards.
 */
export function pageMetadata({
  locale,
  pathname,
  params,
  slugByLocale,
  title,
  description,
  ogType = "website",
  publishedTime,
  modifiedTime,
}: PageMetaArgs): Metadata {
  const urlFor = (l: Locale) =>
    absoluteUrl(
      l,
      pathname,
      slugByLocale ? { slug: slugByLocale[l] } : params,
    );

  const canonical = urlFor(locale);
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, urlFor(l)]),
  ) as Record<string, string>;
  languages["x-default"] = urlFor(routing.defaultLocale);

  // The generated OG image lives at src/app/[locale]/opengraph-image.tsx.
  // Next only auto-attaches it to that segment's own page, so every other
  // route has to reference it explicitly or it ships without og:image.
  // The default locale has no path prefix, so /it/... would 302 through
  // the middleware — crawlers get a redirect instead of an image.
  const ogPrefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const ogImage = {
    url: `${siteConfig.url}${ogPrefix}/opengraph-image`,
    width: 1200,
    height: 630,
    // The generated image shows the brand + claim; the page title often
    // contains the brand too, so composing both duplicated it.
    alt: "Enable Pharma — disease awareness, compliant by design",
  };

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: locale === "it" ? "it_IT" : "en_US",
      type: ogType,
      images: [ogImage],
      // Next serializes these into article:published_time /
      // article:modified_time only when type === "article".
      ...(ogType === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}
