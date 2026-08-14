import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { caseStudy } from "@/content/case-study";
import { shared } from "@/content/shared";
import { pageSchema } from "@/content/page-schema";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

export default function CaseStudyPage({ locale }: { locale: Locale }) {
  const t = caseStudy[locale];
  const s = shared[locale];
  const schema = pageSchema[locale];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: schema.breadcrumb.caseStudy, path: localePath(locale, "/case-study") },
        ]}
      />

      <section className="bg-ink px-5 pb-16 pt-32 text-paper md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto w-full max-w-wrap">
          <Reveal>
            <p className="mb-6 inline-block rounded-full border border-blue/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-blue-bright">
              {t.eyebrow}
            </p>
          </Reveal>
          {/* h1 and intro sit outside Reveal: the h1 is the LCP element and must
              paint from the server HTML, before hydration. */}
          <h1 className="text-display-xl max-w-4xl font-display font-bold">{t.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{t.intro}</p>
        </div>
      </section>

      <Section number={t.context.number} title={t.context.title} theme="dark" compact>
        <div className="max-w-2xl space-y-5">
          {t.context.body.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-base leading-relaxed text-paper/80 md:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section number={t.setup.number} title={t.setup.title} intro={t.setup.body} theme="light" compact>
        <dl className="max-w-3xl divide-y divide-paper-line rounded-2xl border border-paper-line bg-white/60">
          {t.setup.items.map((item) => (
            <div key={item.label} className="grid gap-1 px-6 py-4 md:grid-cols-[220px_1fr] md:gap-6">
              <dt className="text-sm font-semibold text-ink">{item.label}</dt>
              <dd className="text-sm text-ink/65">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section number={t.operations.number} title={t.operations.title} theme="dark" compact>
        <div className="max-w-2xl space-y-5">
          {t.operations.body.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-base leading-relaxed text-paper/80">{p}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section number={t.results.number} title={t.results.title} intro={t.results.intro} theme="light" compact>
        <div className="grid gap-6 md:grid-cols-2">
          {t.results.metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-paper-line bg-white/70 p-7">
                <p className="font-display text-lg font-semibold text-blue">{metric.value}</p>
                <p className="mt-2 text-sm text-ink/65">{metric.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink/65">{t.results.note}</p>
      </Section>

      <Section title={t.next.title} intro={t.next.body} theme="dark" compact>
        <Reveal delay={0.1}>
          <MagneticButton href={localePath(locale, "/contact")}>{s.ctaPrimary} →</MagneticButton>
        </Reveal>
      </Section>
    </>
  );
}
