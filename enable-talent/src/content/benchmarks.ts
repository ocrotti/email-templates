import type { Locale } from "@/lib/site";

/**
 * THE one place European salary data lives.
 *
 * The homepage calculator, the /marketing-salaries table and the savings bands on
 * the role pages all derive from this array. They used to be four hand-maintained
 * copies and they had already drifted into an arithmetic contradiction and a
 * negative "saving", so treat this file as the source and everything else as a view.
 *
 * WHAT THE FIGURES ARE: monthly GROSS SALARY in EUR, midpoint of the band in the
 * 2025 market analysis. They are NOT fully-loaded employer cost — employer
 * contributions, recruiting, ramp-up, tooling and management sit on top and are
 * deliberately excluded, because the analysis does not price them per market and
 * we will not invent a multiplier. The comparison against a pod seat is therefore
 * conservative: the real gap is wider than anything we publish.
 *
 * UK figures are converted at ~1.17 EUR/GBP, the rate the analysis used.
 *
 * Run `node scripts/check-claims.mjs` after editing. It fails if any published
 * claim stops matching the data.
 */

export type MarketKey = "it" | "de" | "uk";

export interface RoleBenchmark {
  /** Stable key. Also the calculator's select value. */
  key: string;
  /** Matching /roles/<slug> page, where one exists. */
  roleSlug?: string;
  label: Record<Locale, string>;
  /** Monthly gross salary, EUR, midpoint of the analysis band. */
  markets: Record<MarketKey, number>;
  /** The published band, verbatim, so the derivation stays auditable. */
  bandSource: Record<MarketKey, string>;
  /** Monthly price of the equivalent pod seat, EUR, all-in. */
  pod: number;
  /** Where the numbers come from, per locale. */
  note: Record<Locale, string>;
}

export const benchmarks: RoleBenchmark[] = [
  {
    key: "digital",
    label: {
      en: "Digital marketing specialist",
      it: "Specialista digital marketing",
    },
    markets: { it: 2550, de: 4300, uk: 6700 },
    bandSource: {
      it: "€2,400–2,700 (€28.5–32k/yr)",
      de: "~€4,300 (€51.9k/yr, paid media)",
      uk: "~£5,740/month (social)",
    },
    pod: 2000,
    note: {
      en: "Italy from a €28.5–32k annual band; Germany from a €51.9k paid-media annual; UK a monthly social-media figure. Sources: Glassdoor, PayScale, ERI.",
      it: "Italia da una fascia annua di €28,5–32k; Germania da un annuo paid media di €51,9k; UK una cifra mensile su social media. Fonti: Glassdoor, PayScale, ERI.",
    },
  },
  {
    key: "paid",
    roleSlug: "paid-media",
    label: { en: "Paid media / media buyer", it: "Paid media / media buyer" },
    markets: { it: 2250, de: 4400, uk: 5550 },
    bandSource: {
      it: "€2,000–2,500",
      de: "€3,600–5,200 (€43.5–62k/yr)",
      uk: "£4,000–5,500",
    },
    note: {
      en: "Germany derived from a €43.5–62k annual media-buyer band. Sources: Glassdoor, PayScale, ERI.",
      it: "Germania derivata da una fascia annua media buyer di €43,5–62k. Fonti: Glassdoor, PayScale, ERI.",
    },
    pod: 2000,
  },
  {
    key: "seo",
    roleSlug: "seo",
    label: { en: "SEO specialist", it: "Specialista SEO" },
    // TechCompenso puts the median Italian SEO gross annual at ~€35,000. Italian
    // contracts commonly pay it over 13 or 14 instalments, which is €2,500–2,700
    // a month — the €2,400 previously published here contradicted the very annual
    // figure printed beside it.
    markets: { it: 2600, de: 4000, uk: 4950 },
    bandSource: {
      it: "€2,500–2,700 (median gross annual ~€35,000 over 13–14 instalments)",
      de: "€3,500–4,500",
      uk: "£3,500–5,000",
    },
    pod: 2000,
    note: {
      en: "Italy derived from a ~€35,000 median gross annual (TechCompenso), spread over the 13–14 monthly instalments Italian contracts commonly use.",
      it: "Italia derivata da una RAL mediana di ~€35.000 (TechCompenso), distribuita sulle 13–14 mensilità comuni nei contratti italiani.",
    },
  },
  {
    key: "content",
    roleSlug: "content-social",
    label: { en: "Content & social", it: "Content & social" },
    markets: { it: 1750, de: 3300, uk: 4400 },
    bandSource: { it: "€1,500–2,000", de: "€3,000–3,600", uk: "£3,000–4,500" },
    pod: 2000,
    note: {
      en: "The lowest-paid role in the set, and the one where an Italian salary alone undercuts a managed pod seat. Sources: Glassdoor, PayScale, ERI.",
      it: "Il ruolo pagato meno del gruppo, e l'unico dove il solo stipendio italiano costa meno di un posto in pod gestito. Fonti: Glassdoor, PayScale, ERI.",
    },
  },
  {
    key: "dev",
    roleSlug: "development",
    label: { en: "Developer (mid-level)", it: "Sviluppatore (mid-level)" },
    markets: { it: 3500, de: 5750, uk: 7000 },
    bandSource: { it: "€3,000–4,000", de: "€5,000–6,500", uk: "£5,000–7,000" },
    pod: 2400,
    note: {
      en: "The only role with a higher pod seat price, because the bench rate is higher too. Sources: Glassdoor, PayScale, ERI.",
      it: "L'unico ruolo con un posto in pod più caro, perché lo è anche la tariffa di bench. Fonti: Glassdoor, PayScale, ERI.",
    },
  },
];

/**
 * Saving on salary alone, as a whole percentage. Negative when a pod seat costs
 * more than the local gross salary — which is a real outcome for content & social
 * in Italy, and the site says so rather than hiding it.
 */
export function savingsPercent(role: RoleBenchmark, market: MarketKey): number {
  const local = role.markets[market];
  return Math.round(((local - role.pod) / local) * 100);
}

/** Width of the pod bar relative to the local bar, clamped so it cannot overflow. */
export function podBarPercent(role: RoleBenchmark, market: MarketKey): number {
  return Math.min(Math.round((role.pod / role.markets[market]) * 100), 100);
}

export function benchmarkByKey(key: string): RoleBenchmark {
  const found = benchmarks.find((b) => b.key === key);
  if (!found) throw new Error(`Unknown benchmark key: ${key}`);
  return found;
}

/**
 * The savings claim published in the hero and on the role pages.
 *
 * It is stated against Western employer cost, which is the comparison the market
 * analysis actually supports — not against a bare Italian salary, where the
 * calculator openly shows a much thinner spread.
 */
export const PUBLISHED_SAVINGS_BAND = { min: 40, max: 70 } as const;

/**
 * Every role/market pair whose salary-only saving falls BELOW the published floor.
 *
 * These are declared, not hidden: `scripts/check-claims.mjs` recomputes the list
 * from the data and fails if it stops matching, so a figure cannot drift out of
 * the claim unnoticed. The Italian column is thin across the board because these
 * are bare gross salaries — the band is stated against fully-loaded Western
 * employer cost, and the calculator shows the salary-only truth per market.
 */
export const BELOW_BAND: { role: string; market: MarketKey }[] = [
  { role: "digital", market: "it" },
  { role: "paid", market: "it" },
  { role: "seo", market: "it" },
  { role: "content", market: "it" },
  { role: "content", market: "de" },
  { role: "dev", market: "it" },
];
