import type { Locale } from "@/lib/site";
import { ENABLE_DIGITAL_URL, localePath } from "@/lib/site";
import { enableDigital } from "@/content/enable-digital";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

export default function EnableDigitalPage({ locale }: { locale: Locale }) {
  const t = enableDigital[locale];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: "Enable Digital", path: localePath(locale, "/enable-digital") },
        ]}
      />

      <section className="relative overflow-hidden bg-ink px-5 pb-16 pt-32 text-paper md:px-10 md:pb-24 md:pt-44">
        <div className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-amber/12 blur-[120px]" />
        <div className="mx-auto w-full max-w-wrap">
          <Reveal>
            <p className="mb-6 inline-block rounded-full border border-amber/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-amber">
              {t.eyebrow}
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

      <Section number={t.rightDoor.number} title={t.rightDoor.title} intro={t.rightDoor.intro} theme="light" compact>
        <div className="grid gap-6 md:grid-cols-2">
          {t.rightDoor.cases.map((item, i) => {
            const toDigital = item.href === "enable-digital";
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <div
                  className={`flex h-full flex-col justify-between rounded-2xl border p-7 ${
                    toDigital ? "border-amber-deep/30 bg-amber/10" : "border-blue/30 bg-blue/5"
                  }`}
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-snug text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65">{item.body}</p>
                  </div>
                  <p
                    className={`mt-6 border-t pt-4 text-sm font-semibold ${
                      toDigital ? "border-amber-deep/25 text-amber-deep" : "border-blue/25 text-blue"
                    }`}
                  >
                    {item.verdict}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section number={t.relation.number} title={t.relation.title} theme="dark" compact>
        <div className="max-w-2xl space-y-5">
          {t.relation.body.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-base leading-relaxed text-paper/80 md:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title={t.cta.title} intro={t.cta.body} theme="dark" compact>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-4">
            <MagneticButton href={localePath(locale, "/contact")}>{t.cta.primary} →</MagneticButton>
            <a
              href={ENABLE_DIGITAL_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-amber/50 px-7 py-3.5 text-sm font-semibold tracking-wide text-amber transition-colors duration-300 hover:border-amber hover:bg-amber/10"
            >
              {t.cta.secondary} ↗
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
