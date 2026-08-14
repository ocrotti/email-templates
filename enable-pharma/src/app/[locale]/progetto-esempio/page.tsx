import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { caseStudy } from "@/content/case-study";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { getPathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import Counter from "@/components/motion/Counter";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = caseStudy[locale].meta;
  return pageMetadata({
    locale,
    pathname: "/progetto-esempio",
    title: meta.title,
    description: meta.description,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = caseStudy[locale];

  const crumbs = breadcrumbSchema([
    {
      name: "Enable Pharma",
      url: siteConfig.url + getPathname({ locale, href: "/" }),
    },
    {
      name: t.hero.kicker,
      url:
        siteConfig.url + getPathname({ locale, href: "/progetto-esempio" }),
    },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />

      <section className="px-gutter pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className="eyebrow text-accent-deep">{t.hero.kicker}</p>
            <h1 className="font-display mt-5 max-w-5xl text-[length:var(--text-display-2)]">
              {t.hero.title}
            </h1>
            <p className="prose-copy mt-7 text-ink-soft">{t.hero.subtitle}</p>
            <p className="mt-8 max-w-3xl border-l-2 border-accent pl-5 text-sm leading-relaxed text-ink-soft">
              {t.hero.disclaimer}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="px-gutter py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-20">
          <Reveal>
            <h2 className="font-display-soft text-2xl md:text-3xl">
              {t.scenario.title}
            </h2>
            {t.scenario.body.map((p) => (
              <p key={p.slice(0, 24)} className="prose-copy mt-5 text-ink-soft">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="on-dark h-fit bg-ink p-8 text-paper">
            <h3 className="eyebrow text-accent-ondark">
              {t.scenario.constraintsTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-paper/85">
              {t.scenario.constraints.map((c) => (
                <li key={c} className="flex gap-3">
                  <span aria-hidden="true" className="font-mono text-accent-ondark">
                    ✓
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="px-gutter py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display max-w-3xl text-[length:var(--text-title)]">
              {t.blocksTitle}
            </h2>
          </Reveal>
          <div className="mt-12 space-y-10">
            {t.blocks.map((block) => (
              <Reveal
                key={block.index}
                className="grid gap-6 border-t border-line pt-8 lg:grid-cols-[80px_minmax(0,420px)_1fr] lg:gap-12"
              >
                <span
                  aria-hidden="true"
                  className="section-number text-[clamp(3rem,6vw,5.5rem)]"
                >
                  {block.index}
                </span>
                <div>
                  <h3 className="font-display-soft text-xl md:text-2xl">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {block.body}
                  </p>
                </div>
                <ul className="space-y-2 text-sm leading-relaxed text-ink-soft lg:mt-1">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-accent">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOL scoring matrix */}
      <section className="on-dark bg-ink px-gutter py-20 text-paper md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display-soft max-w-2xl text-3xl md:text-4xl">
              {t.scoring.title}
            </h2>
            <p className="prose-copy mt-5 text-paper/70">{t.scoring.intro}</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {t.scoring.axes.map((axis, i) => (
              <Reveal
                key={axis.name}
                delay={i * 0.07}
                className="border border-line-dark p-7"
              >
                <p className="eyebrow text-accent-ondark">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display-soft mt-3 text-lg">{axis.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/75">
                  {axis.body}
                </p>
              </Reveal>
            ))}
          </div>
          <h3 className="eyebrow mt-16 text-accent-ondark">
            {t.scoring.tiersTitle}
          </h3>
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line-dark bg-line-dark md:grid-cols-3">
            {t.scoring.tiers.map((tier) => (
              <div key={tier.name} className="bg-ink p-7">
                <h4 className="font-display-soft text-lg">{tier.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-paper/75">
                  {tier.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPI */}
      <section className="px-gutter py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display-soft max-w-2xl text-3xl md:text-4xl">
              {t.results.title}
            </h2>
            <p className="prose-copy mt-5 text-ink-soft">{t.results.intro}</p>
          </Reveal>
          <dl className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {t.results.kpis.map((kpi) => (
              <Reveal key={kpi.label} as="div" className="flex flex-col border-t border-line pt-5">
                <dt className="order-2 mt-3 text-sm leading-snug text-ink-soft">
                  {kpi.label}
                </dt>
                <dd className="font-display order-1 flex flex-wrap items-baseline gap-x-2 text-5xl text-accent-deep md:text-6xl">
                  <Counter
                    value={kpi.value}
                    prefix={kpi.prefix}
                    suffix={kpi.suffix}
                  />
                  {kpi.unit ? (
                    <span className="text-2xl md:text-3xl">{kpi.unit}</span>
                  ) : null}
                </dd>
              </Reveal>
            ))}
          </dl>
          <p className="mt-12 max-w-3xl text-sm leading-relaxed text-ink-soft">
            {t.results.note}
          </p>
        </div>
      </section>

      <section className="border-t border-line px-gutter py-20 md:py-28">
        <div className="mx-auto max-w-7xl text-center">
          <Reveal>
            <h2 className="font-display mx-auto max-w-3xl text-[length:var(--text-title)]">
              {t.closing.title}
            </h2>
            <p className="prose-copy mx-auto mt-6 text-ink-soft">
              {t.closing.body}
            </p>
            <div className="mt-10 flex justify-center">
              <ButtonLink href="/contatti" magnetic>
                {t.closing.cta}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
