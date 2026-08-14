import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { guarantee } from "@/content/guarantee";
import { pageSchema } from "@/content/page-schema";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import Faq from "@/components/Faq";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { shared } from "@/content/shared";

export default function GuaranteePage({ locale }: { locale: Locale }) {
  const t = guarantee[locale];
  const s = shared[locale];
  const schema = pageSchema[locale];

  return (
    <>
      <ServiceJsonLd
        name={schema.service.guarantee}
        description={t.seoDescription}
        path={localePath(locale, "/guarantee")}
      />
      <FaqJsonLd items={t.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: schema.breadcrumb.guarantee, path: localePath(locale, "/guarantee") },
        ]}
      />

      {/* Hero h1 and intro sit outside Reveal: the h1 is the LCP element and must
          paint from the server HTML, before hydration. */}
      <section className="bg-ink px-5 pb-16 pt-32 text-paper md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto w-full max-w-wrap">
          <h1 className="text-display-xl max-w-4xl font-display font-bold">{t.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-mist">{t.intro}</p>
        </div>
      </section>

      <Section number="01" theme="dark">
        <div className="grid gap-6 md:grid-cols-2">
          {t.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-blue/30 bg-blue/5 p-8">
                <h2 className="font-display text-xl font-semibold text-blue-bright">{pillar.title}</h2>
                <p className="mt-3 text-base text-paper/85">{pillar.body}</p>
                <p className="mt-3 text-sm leading-relaxed text-mist">{pillar.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section number={t.sla.number} title={t.sla.title} intro={t.sla.intro} theme="light" compact>
        <div className="max-w-3xl divide-y divide-paper-line rounded-2xl border border-paper-line bg-white/60">
          {t.sla.items.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-6 px-6 py-4">
              <span className="text-sm text-ink/70">{item.label}</span>
              <span className="text-right font-display text-sm font-semibold text-ink">{item.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-ink/60">{t.sla.note}</p>
      </Section>

      <Section number={t.gdpr.number} title={t.gdpr.title} theme="dark" compact>
        <div className="max-w-2xl space-y-4">
          {t.gdpr.body.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-base leading-relaxed text-paper/80">{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {t.gdpr.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-ink-line bg-ink-soft/50 p-7">
                <span className="block h-1 w-10 rounded-full bg-amber" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold text-paper">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section number={t.process.number} title={t.process.title} intro={t.process.intro} theme="light" compact>
        <div className="grid gap-6 md:grid-cols-2">
          {t.process.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-paper-line bg-white/70 p-7">
                <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title={locale === "en" ? "Guarantee FAQ" : "FAQ sulla garanzia"} theme="dark" compact>
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
