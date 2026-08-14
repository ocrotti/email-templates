import type { Locale } from "@/lib/site";

const GROUP_SEPARATOR: Record<Locale, string> = { en: ",", it: "." };

/**
 * Groups thousands the way this site writes them: "2,000" in English, "2.000" in
 * Italian.
 *
 * Deliberately not `Number.toLocaleString`. Node's ICU honours CLDR's Italian
 * `minimumGroupingDigits: 2` and renders 2000 as "2000", while Chrome renders
 * "2.000" for the same call. In static copy that is simply the wrong separator;
 * inside a client component it is a server/client text mismatch — the React #418
 * hydration error the Italian pages were throwing.
 */
export function formatNumber(value: number, locale: Locale): string {
  const rounded = Math.round(value);
  const grouped = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, GROUP_SEPARATOR[locale]);
  return rounded < 0 ? `-${grouped}` : grouped;
}
