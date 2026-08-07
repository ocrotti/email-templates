import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, faqSchema } from "@/lib/schema";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import Marquee from "@/components/motion/Marquee";
import Counter from "@/components/motion/Counter";
import HeroVisual from "@/components/motion/HeroVisualLazy";
import SectionShell from "@/components/sections/SectionShell";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import FAQAccordion from "@/components/sections/FAQAccordion";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = home[locale].meta;
  return pageMetadata({
    locale,
    pathname: "/",
    title: meta.title,
    description: meta.description,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = home[locale];

  return (
    <>
      <JsonLd data={faqSchema(t.faq.items)} />

      {/* ------------------------------------------------------- Hero */}
      <section className="relative flex min-h-svh flex-col justify-center overflow-clip px-gutter pt-28 pb-16">
        <HeroVisual />
        <div className="relative mx-auto w-full max-w-7xl">
          <FadeUp>
            <p className="eyebrow text-accent-deep">{t.hero.kicker}</p>
          </FadeUp>
          <SplitReveal
            lines={t.hero.titleLines}
            className="font-display mt-6 text-[length:var(--text-display)]"
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-20">
            <FadeUp delay={220}>
              <p className="prose-copy text-ink-soft">{t.hero.subtitle}</p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <ButtonLink href="/contatti" magnetic>
                  {t.hero.ctaPrimary}
                </ButtonLink>
                <ArrowLink href="/progetto-esempio">
                  {t.hero.ctaSecondary}
                </ArrowLink>
              </div>
            </FadeUp>
            <FadeUp delay={320}>
              <ul className="grid gap-5 border-l border-line pl-6 sm:grid-cols-3 sm:border-none sm:pl-0 lg:grid-cols-1 lg:border-l lg:pl-6">
                {t.hero.proofPoints.map((p, i) => (
                  <li key={p.title}>
                    <p className="eyebrow text-accent-deep">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-semibold">{p.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {p.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      <Marquee items={t.marquee} />

      {/* ----------------------------------------------- 01 · Problem */}
      <SectionShell
        number={t.problem.number}
        label={t.problem.label}
        title={t.problem.title}
        id="problema"
      >
        <div className="grid gap-10 md:grid-cols-3">
          {t.problem.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.08}>
              <p className="eyebrow text-accent-deep">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display-soft mt-3 text-xl">{point.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{point.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14">
          <p className="prose-copy max-w-3xl border-l-2 border-accent pl-6 font-medium">
            {t.problem.outcome}
          </p>
        </Reveal>
      </SectionShell>

      {/* ---------------------------------------------- 02 · Solution */}
      <SectionShell
        number={t.solution.number}
        label={t.solution.label}
        title={t.solution.title}
        intro={t.solution.intro}
        id="soluzione"
      >
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
          {t.solution.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <h3 className="font-display-soft border-t-2 border-ink pt-4 text-lg">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {pillar.body}
              </p>
            </Reveal>
          ))}
        </div>

        <h3 className="font-display-soft mt-20 text-2xl">
          {t.solution.modulesTitle}
        </h3>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {t.solution.modules.map((mod, i) => (
            <Reveal
              key={mod.title}
              delay={i * 0.08}
              className={`card-sweep flex flex-col p-8 ${
                i === 1 ? "bg-ink text-paper on-dark" : "bg-paper-2"
              }`}
            >
              <p
                className={`eyebrow ${
                  i === 1 ? "text-accent-ondark" : "text-accent-deep"
                }`}
              >
                {mod.tag}
              </p>
              <h4 className="font-display-soft mt-4 text-xl">{mod.title}</h4>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  i === 1 ? "text-paper/75" : "text-ink-soft"
                }`}
              >
                {mod.body}
              </p>
              <ul
                className={`mt-6 space-y-2 border-t pt-5 text-sm leading-relaxed ${
                  i === 1
                    ? "border-line-dark text-paper/85"
                    : "border-line text-ink-soft"
                }`}
              >
                {mod.items.map((item) => (
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
      </SectionShell>

      {/* ----------------------------------------------- 03 · Process */}
      <SectionShell
        number={t.process.number}
        label={t.process.label}
        title={t.process.title}
        intro={t.process.intro}
        id="processo"
      >
        <ProcessTimeline
          phases={t.process.phases}
          deliverablesLabel={locale === "it" ? "Deliverable" : "Deliverables"}
        />
        <Reveal className="mt-12">
          <ArrowLink href="/compliance">{t.process.complianceLink}</ArrowLink>
        </Reveal>
      </SectionShell>

      {/* ------------------------------------------- 04 · Case teaser */}
      <SectionShell
        number={t.caseTeaser.number}
        label={t.caseTeaser.label}
        title={t.caseTeaser.title}
        intro={t.caseTeaser.body}
        dark
        id="progetto"
      >
        <dl className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {t.caseTeaser.kpis.map((kpi) => (
            <Reveal key={kpi.label} as="div" className="flex flex-col">
              <dt className="order-2 mt-3 block text-sm leading-snug text-paper/70">
                {kpi.label}
              </dt>
              <dd className="font-display order-1 flex flex-wrap items-baseline gap-x-2 text-5xl text-accent-ondark md:text-6xl">
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
        <p className="eyebrow mt-10 text-paper/50">{t.caseTeaser.kpiNote}</p>
        <Reveal className="mt-10">
          <ButtonLink href="/progetto-esempio" variant="primaryOnDark" magnetic>
            {t.caseTeaser.cta}
          </ButtonLink>
        </Reveal>
      </SectionShell>

      {/* -------------------------------------------- 05 · Areas */}
      <SectionShell
        number={t.areas.number}
        label={t.areas.label}
        title={t.areas.title}
        intro={t.areas.intro}
        id="aree"
      >
        <div className="divide-y divide-line border-y border-line">
          {t.areas.list.map((area, i) => (
            <Reveal key={area.title} className="grid gap-4 py-8 md:grid-cols-[minmax(0,340px)_1fr] md:gap-12">
              <h3 className="font-display-soft flex items-baseline gap-4 text-2xl">
                <span className="eyebrow text-accent-deep">
                  {String.fromCharCode(65 + i)}
                </span>
                {area.title}
              </h3>
              <p className="prose-copy text-ink-soft">{area.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <p className="prose-copy max-w-3xl border-l-2 border-accent pl-6 text-ink-soft">
            {t.areas.rationale}
          </p>
        </Reveal>
      </SectionShell>

      {/* --------------------------------------- 06 · Investment */}
      <SectionShell
        number={t.investment.number}
        label={t.investment.label}
        title={t.investment.title}
        intro={t.investment.intro}
        id="investimento"
      >
        <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {t.investment.timeline.map((step) => (
            <li key={step.phase} className="bg-paper p-6">
              <p className="eyebrow text-accent-deep">{step.weeks}</p>
              <h3 className="font-display-soft mt-2 text-lg">{step.phase}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <h3 className="font-display-soft mt-16 text-2xl">
          {t.investment.pricingTitle}
        </h3>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {t.investment.tiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 0.08}
              className={`card-sweep flex flex-col p-8 md:p-10 ${
                tier.highlighted
                  ? "on-dark bg-ink text-paper"
                  : "border border-line"
              }`}
            >
              <h4 className="font-display-soft text-xl">{tier.name}</h4>
              <p
                className={`font-display mt-5 text-4xl md:text-5xl ${
                  tier.highlighted ? "text-accent-ondark" : "text-accent-deep"
                }`}
              >
                {tier.price}
              </p>
              <p
                className={`eyebrow mt-2 ${
                  tier.highlighted ? "text-paper/60" : "text-ink-soft"
                }`}
              >
                {tier.priceNote}
              </p>
              <p
                className={`mt-5 text-sm leading-relaxed ${
                  tier.highlighted ? "text-paper/75" : "text-ink-soft"
                }`}
              >
                {tier.body}
              </p>
              <ul
                className={`mt-6 space-y-2 border-t pt-5 text-sm leading-relaxed ${
                  tier.highlighted
                    ? "border-line-dark text-paper/85"
                    : "border-line text-ink-soft"
                }`}
              >
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent">
                      —
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              {/* Conversion CTA at the moment of highest intent: a price
                  card without a next step strands the reader mid-funnel. */}
              <div className="mt-8 pt-2">
                <ButtonLink
                  href="/contatti"
                  variant={tier.highlighted ? "primaryOnDark" : "primary"}
                >
                  {tier.cta}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-soft">
          {t.investment.transparencyNote}
        </p>
      </SectionShell>

      {/* --------------------------------------------- 07 · Why us */}
      <SectionShell
        number={t.why.number}
        label={t.why.label}
        title={t.why.title}
        id="perche"
      >
        <div className="grid gap-10 md:grid-cols-3">
          {t.why.differentiators.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.08}>
              <h3 className="font-display-soft border-t-2 border-accent pt-4 text-lg">
                {d.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {d.body}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 bg-paper-2 p-8 md:p-10">
          <h3 className="eyebrow text-accent-deep">{t.why.trustTitle}</h3>
          <ul className="mt-6 grid gap-x-10 gap-y-3 text-sm leading-relaxed md:grid-cols-2">
            {t.why.trustSignals.map((signal) => (
              <li key={signal} className="flex gap-3">
                <span aria-hidden="true" className="font-mono text-accent">
                  ✓
                </span>
                {signal}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ArrowLink href="/contatti">{t.why.cta}</ArrowLink>
          </div>
        </Reveal>
      </SectionShell>

      {/* ------------------------------------------------ 08 · FAQ */}
      <SectionShell
        number={t.faq.number}
        label={t.faq.label}
        title={t.faq.title}
        dark
        id="faq"
      >
        <FAQAccordion items={t.faq.items} />
        <Reveal className="mt-12">
          <ArrowLink href="/insight">{t.faq.insightLink}</ArrowLink>
        </Reveal>
      </SectionShell>
    </>
  );
}
