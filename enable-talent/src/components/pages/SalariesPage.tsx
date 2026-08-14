import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import { absoluteUrl, localePath, SITE_NAME, SITE_URL } from "@/lib/site";
import { salaries, SALARIES_PATH, SALARIES_TEMPORAL_COVERAGE } from "@/content/salaries";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import Faq from "@/components/Faq";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { renderInline } from "@/components/InlineLinks";

/**
 * schema.org Dataset for the benchmark table. Kept deliberately minimal so
 * every property is one schema.org actually defines for Dataset.
 */
function SalaryDatasetJsonLd({ locale }: { locale: Locale }) {
  const t = salaries[locale];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: t.h1,
          description: t.seoDescription,
          url: absoluteUrl(localePath(locale, SALARIES_PATH)),
          inLanguage: locale === "en" ? "en" : "it",
          isAccessibleForFree: true,
          temporalCoverage: SALARIES_TEMPORAL_COVERAGE,
          creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          spatialCoverage: [
            { "@type": "Place", name: "Italy" },
            { "@type": "Place", name: "Germany" },
            { "@type": "Place", name: "United Kingdom" },
          ],
          measurementTechnique: "Aggregation of published salary sources",
          variableMeasured: {
            "@type": "PropertyValue",
            name: "Monthly employer cost",
            description: "Monthly employer cost of a marketing role, in the currency of the market.",
          },
        }),
      }}
    />
  );
}

export default function SalariesPage({ locale }: { locale: Locale }) {
  const t = salaries[locale];
  const cols = t.table.columns;
  const markets = [
    { key: "italy" as const, label: cols.italy },
    { key: "germany" as const, label: cols.germany },
    { key: "uk" as const, label: cols.uk },
  ];

  return (
    <>
      <SalaryDatasetJsonLd locale={locale} />
      <FaqJsonLd items={t.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: t.breadcrumb, path: localePath(locale, SALARIES_PATH) },
        ]}
      />

      <section className="bg-ink px-5 pb-16 pt-32 text-paper md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto w-full max-w-wrap">
          <Reveal>
            <p className="mb-4 font-mono text-sm text-blue-bright">{t.coverage}</p>
          </Reveal>
          {/* h1 and intro sit outside Reveal: the h1 is the LCP element and must
              paint from the server HTML, before hydration. */}
          <h1 className="text-display-xl max-w-4xl font-display font-bold">{t.h1}</h1>
          {t.intro.map((p) => (
            <p key={p.slice(0, 24)} className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
              {p}
            </p>
          ))}
        </div>
      </section>

      <Section number="01" title={t.table.title} intro={t.table.intro} theme="light" compact>
        {/* Below md the table restacks into per-row cards, so no market column
            gets clipped or hidden behind a horizontal scroll on phones. */}
        <div className="space-y-4 md:hidden">
          {t.table.rows.map((row) => (
            <div key={row.role} className="rounded-2xl border border-paper-line bg-white/60 p-5">
              <p className="font-display text-base font-semibold text-ink">
                {row.href ? (
                  <Link href={localePath(locale, row.href)} className="link-underline text-blue">
                    {row.role}
                  </Link>
                ) : (
                  row.role
                )}
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                {markets.map((m) => (
                  <div key={m.key} className="flex items-baseline justify-between gap-4">
                    <dt className="text-xs uppercase tracking-[0.14em] text-ink/65">{m.label}</dt>
                    <dd className="text-right font-medium tabular-nums text-ink">{row[m.key]}</dd>
                  </div>
                ))}
              </dl>
              {row.note ? <p className="mt-4 text-xs leading-relaxed text-ink/65">{row.note}</p> : null}
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          <table className="w-full border-separate border-spacing-0 text-left text-sm">
            <caption className="sr-only">
              {t.table.title} — {t.table.perMonth}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[34%] border-b border-paper-line pb-3 pr-6 font-display text-base font-semibold text-ink">
                  {cols.role}
                </th>
                {markets.map((m) => (
                  <th
                    key={m.key}
                    scope="col"
                    className="border-b border-paper-line pb-3 pr-6 font-display text-base font-semibold text-ink/75"
                  >
                    {m.label}
                    <span className="mt-0.5 block text-xs font-normal normal-case tracking-normal text-ink/65">
                      {t.table.perMonth}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.table.rows.map((row) => (
                <tr key={row.role}>
                  <th scope="row" className="border-b border-paper-line/70 py-4 pr-6 text-left align-top font-medium text-ink">
                    {row.href ? (
                      <Link href={localePath(locale, row.href)} className="link-underline text-blue">
                        {row.role}
                      </Link>
                    ) : (
                      row.role
                    )}
                    {row.note ? <span className="mt-1.5 block text-xs font-normal leading-relaxed text-ink/65">{row.note}</span> : null}
                  </th>
                  {markets.map((m) => (
                    <td key={m.key} className="border-b border-paper-line/70 py-4 pr-6 align-top tabular-nums text-ink/75">
                      {row[m.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink/60">{t.table.note}</p>
      </Section>

      <Section number="02" title={t.notIncluded.title} intro={t.notIncluded.intro} theme="dark" compact>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.notIncluded.items.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i, 3) * 0.07}>
              <div className="h-full rounded-2xl border border-ink-line bg-ink-soft/40 p-6">
                <span className="block h-1 w-10 rounded-full bg-amber" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold text-paper">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section number="03" title={t.vsPod.title} theme="light" compact>
        <div className="max-w-2xl space-y-5">
          {t.vsPod.body.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-base leading-relaxed text-ink/70 md:text-lg">
                {renderInline(p, "light")}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap gap-4">
            <MagneticButton href={localePath(locale, "/contact")}>{t.cta.label} →</MagneticButton>
            <MagneticButton href={localePath(locale, "/pricing")} variant="paper">
              {t.cta.pricing}
            </MagneticButton>
          </div>
        </Reveal>
      </Section>

      <Section number="04" title={t.methodology.title} theme="dark" compact>
        <div className="max-w-2xl space-y-5">
          {t.methodology.body.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-base leading-relaxed text-paper/80 md:text-lg">
                {renderInline(p, "dark")}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <div className="mt-10">
            <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-mist">{t.methodology.sourcesLabel}</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {t.methodology.sources.map((s) => (
                <li key={s} className="rounded-xl border border-ink-line/70 px-4 py-3 text-sm text-paper/80">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <Section number="05" title={t.faqTitle} theme="dark" compact>
        <Faq items={t.faq} />
      </Section>
    </>
  );
}
