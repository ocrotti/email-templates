export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://enabletalent.com";

export const SITE_NAME = "enable.talent";

export const CONTACT_EMAIL = "hello@enabletalent.com";

export const ENABLE_DIGITAL_URL = "https://enabledigital.it";

export type Locale = "en" | "it";

export const LOCALES: Locale[] = ["en", "it"];

/** Path prefix for a locale. EN lives at the root, IT under /it. */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === "en" ? path : `/it${clean}` || "/it";
}

/**
 * Href for the current page in the other locale. `locale` is the locale being
 * viewed. Header and footer must share this: two switchers pointing at
 * different pages contradict each other and the page's own hreflang tags.
 */
export function switchLocaleHref(locale: Locale, pathname: string): string {
  const basePath = locale === "it" ? pathname.replace(/^\/it/, "") || "/" : pathname;
  return locale === "en" ? localePath("it", basePath) : basePath;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}
