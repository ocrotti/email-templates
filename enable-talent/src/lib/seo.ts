import type { Metadata } from "next";
import { absoluteUrl, localePath, SITE_NAME, SITE_URL, type Locale } from "./site";

interface PageSeo {
  locale: Locale;
  /** Locale-independent path, e.g. "/pricing" (EN form). */
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  /** og:type — "article" for blog posts, defaults to "website". */
  ogType?: "website" | "article";
}

/**
 * Builds per-page metadata with canonical + hreflang EN/IT/x-default
 * (x-default points at the EN version, per the brief).
 */
export function pageMetadata({ locale, path, title, description, ogTitle, ogType }: PageSeo): Metadata {
  const canonical = absoluteUrl(localePath(locale, path));
  const ogImage = `${SITE_URL}/og?title=${encodeURIComponent(ogTitle ?? title)}&locale=${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: absoluteUrl(localePath("en", path)),
        it: absoluteUrl(localePath("it", path)),
        "x-default": absoluteUrl(localePath("en", path)),
      },
    },
    openGraph: {
      title: ogTitle ?? title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_GB" : "it_IT",
      type: ogType ?? "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description,
      images: [ogImage],
    },
  };
}
