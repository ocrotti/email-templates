import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { talent } from "@/content/talent";
import { shared } from "@/content/shared";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import Faq from "@/components/Faq";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

export default function TalentPage({ locale }: { locale: Locale }) {
  const t = talent[locale];
  const s = shared[locale];

  return (
    <>
      <FaqJsonLd items={t.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: "Talent", path: localePath(locale, "/talent") },
        ]}
      />

      {/* Hero — the page where the warm Nairobi accent leads */}
      <section className="relative overflow-hidden bg-ink px-5 pb-16 pt-32 text-paper md:px-10 md:pb-24 md:pt-44">
        <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-amber/15 blur-[120px]" />
        <div className="mx-auto w-full max-w-wrap">
          <Reveal>
            <p className="mb-6 inline-block rounded-full border border-amber/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-amber">
              Nairobi · Silicon Savannah
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-display-lg max-w-4xl font-display font-bold">{t.title}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{t.intro}</p>
          </Reveal>
        </div>
      </section>

      <Section number={t.nairobi.number} title={t.nairobi.title} theme="dark" compact>
        <div className="max-w-2xl space-y-5">
          {t.nairobi.body.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-base leading-relaxed text-paper/80 md:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
          {t.nairobi.facts.map((fact) => (
            <div key={fact.label} className="bg-ink p-7">
              <p className="font-display text-3xl font-bold text-amber">{fact.value}</p>
              <p className="mt-2 text-sm leading-snug text-mist">{fact.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section number={t.vetting.number} title={t.vetting.title} intro={t.vetting.intro} theme="light" compact>
        <ol className="space-y-4">
          {t.vetting.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <li className="flex gap-6 rounded-2xl border border-paper-line bg-white/70 p-6 md:items-center">
                <span className="font-mono text-sm font-semibold text-amber-deep">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{step.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section number={t.fairPay.number} title={t.fairPay.title} theme="dark" compact>
        <div className="max-w-2xl space-y-5">
          {t.fairPay.body.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-base leading-relaxed text-paper/80 md:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.fairPay.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-amber/30 bg-amber/5 p-7">
                <h3 className="font-display text-lg font-semibold text-amber">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section number={t.reputation.number} title={t.reputation.title} theme="light" compact>
        <div className="max-w-2xl space-y-5">
          {t.reputation.body.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-base leading-relaxed text-ink/70 md:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title={locale === "en" ? "Talent FAQ" : "FAQ sul talento"} theme="dark" compact>
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
