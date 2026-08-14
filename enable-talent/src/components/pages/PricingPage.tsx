import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { pricing } from "@/content/pricing";
import { pageSchema } from "@/content/page-schema";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import Faq from "@/components/Faq";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import Link from "next/link";

export default function PricingPage({ locale }: { locale: Locale }) {
  const t = pricing[locale];
  const schema = pageSchema[locale];

  return (
    <>
      <ServiceJsonLd
        name={schema.service.pricing}
        description={t.seoDescription}
        path={localePath(locale, "/pricing")}
      />
      <FaqJsonLd items={t.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: schema.breadcrumb.pricing, path: localePath(locale, "/pricing") },
        ]}
      />

      {/* Hero h1 and intro sit outside Reveal: the h1 is the LCP element and must
          paint from the server HTML, before hydration. */}
      <section className="bg-ink px-5 pb-16 pt-32 text-paper md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto w-full max-w-wrap">
          <h1 className="text-display-lg max-w-4xl font-display font-bold">{t.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{t.intro}</p>
        </div>
      </section>

      <Section theme="dark">
        <div className="grid gap-6 lg:grid-cols-2">
          {t.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.12}>
              <div
                className={`flex h-full flex-col rounded-3xl border p-8 md:p-10 ${
                  tier.highlighted
                    ? "border-blue/50 bg-blue/10 shadow-glow-blue"
                    : "border-ink-line bg-ink-soft/50"
                }`}
              >
                <h2 className="font-display text-xl font-semibold text-paper">{tier.name}</h2>
                <p className="mt-4">
                  <span
                    className={`whitespace-nowrap font-display text-4xl font-bold md:text-5xl ${
                      tier.highlighted ? "text-blue-bright" : "text-paper"
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span className="mt-1 block text-sm text-mist sm:ml-2 sm:mt-0 sm:inline-block">{tier.priceNote}</span>
                </p>
                <p className="mt-5 text-sm leading-relaxed text-mist md:text-base">{tier.description}</p>
                <ul className="mt-7 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-paper/85">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${tier.highlighted ? "bg-blue-bright" : "bg-amber"}`} aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-9">
                  <MagneticButton href={localePath(locale, "/contact")} variant={tier.highlighted ? "primary" : "ghost"}>
                    {tier.cta} →
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title={t.included.title} intro={t.included.intro} theme="light" compact>
        {/* Below md the table restacks into cards so no value gets clipped on phones. */}
        <div className="space-y-4 md:hidden">
          {t.included.rows.map((row) => (
            <div key={row.label} className="rounded-2xl border border-paper-line bg-white/60 p-5">
              <p className="font-display text-base font-semibold text-ink">{row.label}</p>
              <dl className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-blue">{schema.pricingTable.starter}</dt>
                  <dd className="mt-1 text-ink/70">{row.starter}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-ink/60">{schema.pricingTable.full}</dt>
                  <dd className="mt-1 text-ink/70">{row.full}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left text-sm">
            <caption className="sr-only">{schema.pricingTable.caption}</caption>
            <thead>
              <tr>
                {/* Empty corner cell: a th here would announce as a header for the row labels. */}
                <td className="border-b border-paper-line pb-3 pr-6" />
                <th scope="col" className="border-b border-paper-line pb-3 pr-6 font-display text-base font-semibold text-blue">
                  {schema.pricingTable.starter}
                </th>
                <th scope="col" className="border-b border-paper-line pb-3 font-display text-base font-semibold text-ink">
                  {schema.pricingTable.full}
                </th>
              </tr>
            </thead>
            <tbody>
              {t.included.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="border-b border-paper-line/70 py-3.5 pr-6 text-left font-medium text-ink">
                    {row.label}
                  </th>
                  <td className="border-b border-paper-line/70 py-3.5 pr-6 text-ink/65">{row.starter}</td>
                  <td className="border-b border-paper-line/70 py-3.5 text-ink/65">{row.full}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={t.why.title} theme="dark" compact>
        <div className="max-w-2xl space-y-5">
          {t.why.body.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-base leading-relaxed text-paper/80 md:text-lg">{p}</p>
            </Reveal>
          ))}
          <Reveal>
            <p className="text-sm text-mist">
              <Link href={localePath(locale, "/marketing-salaries")} className="link-underline text-blue-bright">
                {locale === "en"
                  ? "Compare against European salary benchmarks"
                  : "Confronta con i benchmark salariali europei"}{" "}
                →
              </Link>
            </p>
          </Reveal>
        </div>
      </Section>

      <Section title={locale === "en" ? "Pricing FAQ" : "FAQ sui prezzi"} theme="dark" compact>
        <Faq items={t.faq} />
      </Section>
    </>
  );
}
