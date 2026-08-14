import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { home, marqueeItems } from "@/content/home";
import { enableDigital } from "@/content/enable-digital";
import { roles, roleSlugs } from "@/content/roles";
import { pageSchema } from "@/content/page-schema";
import { FaqJsonLd, OrganizationJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import Counter from "@/components/Counter";
import ComparisonTable from "@/components/ComparisonTable";
import Faq from "@/components/Faq";
import HeroReveal from "@/components/HeroReveal";
import LeadForm from "@/components/LeadForm";
import MagneticButton from "@/components/MagneticButton";
import Marquee from "@/components/Marquee";
import PodVisual from "@/components/PodVisual";
import Reveal from "@/components/Reveal";
import RoleCard from "@/components/RoleCard";
import SavingsCalculator from "@/components/SavingsCalculator";
import Section from "@/components/Section";
import Timeline from "@/components/Timeline";
import Link from "next/link";

export default function HomePage({ locale }: { locale: Locale }) {
  const t = home[locale];
  const roleData = roles[locale];
  const bridge = enableDigital[locale];
  const schema = pageSchema[locale];

  return (
    <>
      <OrganizationJsonLd />
      <ServiceJsonLd
        name={schema.service.home.name}
        description={schema.service.home.description}
        path={localePath(locale, "/")}
      />
      <FaqJsonLd items={t.faq.items} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink px-5 pb-20 pt-32 text-paper md:px-10 md:pb-28 md:pt-44">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-blue/15 blur-[120px]" />
        <div className="mx-auto grid w-full max-w-wrap items-center gap-16 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <Reveal y={16}>
              <p className="mb-6 inline-block rounded-full border border-ink-line px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-mist">
                {t.hero.eyebrow}
              </p>
            </Reveal>
            <HeroReveal lines={t.hero.titleLines} className="text-display-lg font-display font-bold" />
            {/* Not wrapped in Reveal: this paragraph is the LCP element, so it has
                to paint from the server HTML rather than wait for hydration. */}
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist md:text-xl">{t.hero.sub}</p>
            <Reveal delay={0.52} y={20}>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {t.hero.diff.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm text-paper/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-bright" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.62} y={20}>
              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticButton href={localePath(locale, "/contact")}>{t.hero.ctaPrimary} →</MagneticButton>
                <MagneticButton href="#contact" variant="ghost">
                  {t.hero.ctaSecondary}
                </MagneticButton>
              </div>
            </Reveal>
          </div>
          <div className="hidden lg:block">
            <PodVisual tiles={t.hero.podTiles} qaLabel={t.hero.podQa} />
          </div>
        </div>
      </section>

      <Marquee items={marqueeItems} label={t.marqueeLabel} />

      {/* 01 — Problem */}
      <Section number={t.problem.number} title={t.problem.title} intro={t.problem.intro} theme="dark">
        <div className="grid gap-6 md:grid-cols-3">
          {t.problem.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.12}>
              <div className="h-full rounded-2xl border border-ink-line bg-ink-soft/50 p-7">
                <span className="font-mono text-sm text-blue-bright">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-paper">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 02 — Solution */}
      <Section number={t.solution.number} title={t.solution.title} intro={t.solution.intro} theme="light">
        <div className="grid gap-6 md:grid-cols-3">
          {t.solution.inside.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12}>
              <div className="h-full rounded-2xl border border-paper-line bg-white/60 p-7">
                <span className="block h-1 w-10 rounded-full bg-blue" aria-hidden />
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-10 rounded-2xl border border-amber-deep/30 bg-amber/10 p-7">
            <h3 className="font-display text-lg font-semibold text-ink">{t.solution.notTitle}</h3>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {t.solution.not.map((item) => (
                <div key={item.title}>
                  {/* amber-ink, not amber-deep: this is text on a peach ground. */}
                  <p className="font-semibold text-amber-ink">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 03 — Comparison */}
      <Section number={t.comparison.number} title={t.comparison.title} intro={t.comparison.intro} theme="dark">
        <ComparisonTable columns={t.comparison.columns} rows={t.comparison.rows} note={t.comparison.note} />
      </Section>

      {/* 04 — Calculator */}
      <Section number={t.calculator.number} title={t.calculator.title} intro={t.calculator.intro} theme="dark">
        <SavingsCalculator
          roleLabel={t.calculator.roleLabel}
          marketLabel={t.calculator.marketLabel}
          markets={t.calculator.markets}
          roles={t.calculator.roles}
          localLabel={t.calculator.localLabel}
          podLabel={t.calculator.podLabel}
          savingsLabel={t.calculator.savingsLabel}
          noSavingLabel={t.calculator.noSavingLabel}
          noSavingBody={t.calculator.noSavingBody}
          perMonth={t.calculator.perMonth}
          disclaimer={t.calculator.disclaimer}
          locale={locale}
        />
        <p className="mt-6 text-sm text-mist">
          <Link href={localePath(locale, "/marketing-salaries")} className="link-underline text-blue-bright">
            {locale === "en"
              ? "Where these figures come from: European salary benchmarks"
              : "Da dove vengono questi numeri: i benchmark salariali europei"}{" "}
            →
          </Link>
        </p>
      </Section>

      {/* 05 — How it works teaser */}
      <Section number={t.how.number} title={t.how.title} intro={t.how.intro} theme="light">
        <Timeline steps={t.how.steps} theme="light" />
        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
            <MagneticButton href={localePath(locale, "/how-it-works")} variant="paper">
              {t.how.cta} →
            </MagneticButton>
            <Link
              href={localePath(locale, "/white-label-marketing")}
              className="link-underline text-sm font-medium text-blue"
            >
              {locale === "en" ? "How white-label delivery works" : "Come funziona la delivery white label"} →
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* Roles grid — an index, not a step in the 01→09 argument, so it renders
          outside the numbered gutter grid instead of sitting in it unnumbered. */}
      <section data-theme="dark" className="relative bg-ink px-5 py-20 text-paper transition-colors duration-700 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-wrap">
          <Reveal>
            <h2 className="text-display-sm max-w-3xl font-display font-bold">
              {locale === "en" ? "Built from six roles." : "Costruito da sei ruoli."}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {roleSlugs.map((slug, i) => {
              const role = roleData[slug];
              return (
                <Reveal key={slug} delay={i * 0.08}>
                  <RoleCard
                    href={localePath(locale, `/roles/${slug}`)}
                    name={role.name}
                    tagline={role.tagline}
                    band={role.savings.band}
                    index={i}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 06 — Proof */}
      <Section number={t.proof.number} title={t.proof.title} intro={t.proof.body} theme="dark" compact>
        <Reveal>
          <figure className="rounded-3xl border border-ink-line bg-ink-soft/50 p-8 md:p-12">
            <blockquote className="max-w-3xl font-display text-xl font-medium leading-snug text-paper md:text-2xl">
              “{t.proof.quote}”
            </blockquote>
            <figcaption className="mt-5 text-sm text-mist">— {t.proof.quoteAuthor}</figcaption>
          </figure>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
          {t.proof.stats.map((stat) => (
            <div key={stat.label} className="bg-ink p-7">
              <p className="font-display text-4xl font-bold text-blue-bright">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} locale={locale} />
              </p>
              <p className="mt-2 text-sm leading-snug text-mist">{stat.label}</p>
            </div>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-10">
            <Link href={localePath(locale, "/case-study")} className="link-underline text-sm font-medium text-blue-bright">
              {t.proof.cta} →
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* 07 — Guarantee */}
      <Section number={t.guarantee.number} title={t.guarantee.title} intro={t.guarantee.intro} theme="light">
        <div className="grid gap-6 md:grid-cols-2">
          {t.guarantee.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="flex h-full gap-5 rounded-2xl border border-paper-line bg-white/70 p-7">
                <span className="mt-1 block h-10 w-1 shrink-0 rounded-full bg-blue" aria-hidden />
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-12">
            <MagneticButton href={localePath(locale, "/guarantee")} variant="paper">
              {t.guarantee.cta} →
            </MagneticButton>
          </div>
        </Reveal>
      </Section>

      {/* 08 — FAQ */}
      <Section number={t.faq.number} title={t.faq.title} theme="dark">
        <Faq items={t.faq.items} />
        <p className="mt-6 text-sm text-mist">
          <Link href={localePath(locale, "/guarantee")} className="link-underline text-blue-bright">
            {t.faq.cta} →
          </Link>
        </p>
      </Section>

      {/* Bridge to Enable Digital — routes PM / senior-Italian demand to the sister agency */}
      <Section theme="dark">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-3xl border border-amber/30 bg-amber/5 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold text-amber">{bridge.teaser.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">{bridge.teaser.body}</p>
            </div>
            <MagneticButton href={localePath(locale, "/enable-digital")} variant="ghost" className="shrink-0">
              {bridge.teaser.cta} →
            </MagneticButton>
          </div>
        </Reveal>
      </Section>

      {/* 09 — Final CTA */}
      <Section number={t.finalCta.number} title={t.finalCta.title} intro={t.finalCta.sub} theme="dark" id="contact">
        <div className="max-w-3xl">
          <LeadForm locale={locale} />
        </div>
      </Section>
    </>
  );
}
