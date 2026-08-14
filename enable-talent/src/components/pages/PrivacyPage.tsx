import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { privacy } from "@/content/privacy";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

export default function PrivacyPage({ locale }: { locale: Locale }) {
  const t = privacy[locale];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: "Privacy Policy", path: localePath(locale, "/privacy") },
        ]}
      />

      <section className="bg-ink px-5 pb-16 pt-32 text-paper md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto w-full max-w-wrap">
          <Reveal>
            <p className="font-mono text-sm text-blue-bright">{t.updated}</p>
          </Reveal>
          {/* h1 and intro sit outside Reveal: the h1 is the LCP element and must
              paint from the server HTML, before hydration. */}
          <h1 className="text-display-lg mt-4 max-w-4xl font-display font-bold">{t.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-mist">{t.intro}</p>
        </div>
      </section>

      <Section theme="light">
        <div className="max-w-3xl space-y-14 md:space-y-16">
          {t.sections.map((section) => (
            <Reveal key={section.number}>
              <div className="border-t border-paper-line pt-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-blue">{section.number}</span>
                  <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">{section.title}</h2>
                </div>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)} className="text-base leading-relaxed text-ink/70">
                      {p}
                    </p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-base leading-relaxed text-ink/70">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
