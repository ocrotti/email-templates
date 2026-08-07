import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { howItWorks } from "@/content/how-it-works";
import { shared } from "@/content/shared";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import Faq from "@/components/Faq";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import Timeline from "@/components/Timeline";

export default function HowItWorksPage({ locale }: { locale: Locale }) {
  const t = howItWorks[locale];
  const s = shared[locale];

  return (
    <>
      <ServiceJsonLd
        name="Managed pod onboarding process"
        description={t.seoDescription}
        path={localePath(locale, "/how-it-works")}
      />
      <FaqJsonLd items={t.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: t.title, path: localePath(locale, "/how-it-works") },
        ]}
      />

      <section className="bg-ink px-5 pb-16 pt-32 text-paper md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto w-full max-w-wrap">
          <Reveal>
            <h1 className="text-display-lg max-w-4xl font-display font-bold">{t.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{t.intro}</p>
          </Reveal>
        </div>
      </section>

      <Section number="01" theme="dark">
        {/* sr-only heading keeps the outline h1→h2→h3 (the steps render as h3). */}
        <h2 className="sr-only">{locale === "en" ? "The 14-day timeline" : "La timeline di 14 giorni"}</h2>
        <Timeline steps={t.timeline} theme="dark" />
      </Section>

      <Section number={t.qa.number} title={t.qa.title} theme="light">
        <div className="max-w-2xl space-y-4">
          {t.qa.body.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-base leading-relaxed text-ink/70 md:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.qa.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-paper-line bg-white/70 p-7">
                <span className="block h-1 w-10 rounded-full bg-amber-deep" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section number={t.matching.number} title={t.matching.title} intro={t.matching.body} theme="dark">
        <ol className="grid gap-6 md:grid-cols-2">
          {t.matching.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <li className="h-full rounded-2xl border border-ink-line bg-ink-soft/50 p-7">
                <span className="font-mono text-sm text-blue-bright">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-paper">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section number={t.ongoing.number} title={t.ongoing.title} theme="dark" compact>
        <div className="grid gap-6 md:grid-cols-2">
          {t.ongoing.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="flex h-full gap-5 rounded-2xl border border-ink-line bg-ink-soft/40 p-6">
                <span className="mt-1 block h-8 w-1 shrink-0 rounded-full bg-blue" aria-hidden />
                <div>
                  <h3 className="font-display text-base font-semibold text-paper">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section number={t.whenItBreaks.number} title={t.whenItBreaks.title} intro={t.whenItBreaks.body} theme="light">
        <div className="grid gap-6 md:grid-cols-2">
          {t.whenItBreaks.scenarios.map((sc, i) => (
            <Reveal key={sc.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-paper-line bg-white/70 p-7">
                <h3 className="font-display text-lg font-semibold text-ink">{sc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{sc.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title={t.faqTitle} theme="dark" compact>
        <Faq items={t.faq} />
        <Reveal delay={0.15}>
          <div className="mt-12">
            <MagneticButton href={localePath(locale, "/contact")}>{s.ctaPrimary} →</MagneticButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
