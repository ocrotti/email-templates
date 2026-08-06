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

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}
