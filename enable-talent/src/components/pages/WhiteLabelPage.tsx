import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { whiteLabel } from "@/content/white-label";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import Faq from "@/components/Faq";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

/**
 * Renders markdown-style inline links `[text](href)` inside a content string.
 * Content strings are per-locale, so IT strings already carry their `/it/...` paths.
 */
function renderInline(text: string, theme: "dark" | "light" = "dark"): ReactNode {
  if (!text.includes("](")) return text;
  const className = `link-underline font-medium ${theme === "dark" ? "text-blue-bright" : "text-blue"}`;
  const nodes: ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\(([^()\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [, label, href] = match;
    nodes.push(
      <Link key={`${href}-${match.index}`} href={href} className={className}>
        {label}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function WhiteLabelPage({ locale }: { locale: Locale }) {
  const t = whiteLabel[locale];

  return (
    <>
      <ServiceJsonLd
        name={t.serviceName}
        description={t.seoDescription}
        path={localePath(locale, "/white-label-marketing")}
      />
      <FaqJsonLd items={t.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: t.breadcrumbLabel, path: localePath(locale, "/white-label-marketing") },
        ]}
      />

      {/* Hero */}
      <section className="bg-ink px-5 pb-16 pt-32 text-paper md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto w-full max-w-wrap">
          <Reveal>
            <p className="mb-6 inline-block rounded-full border border-ink-line px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-mist">
              {t.kicker}
            </p>
          </Reveal>
          {/* h1 and intro sit outside Reveal: the h1 is the LCP element and must
              paint from the server HTML, before hydration. */}
          <h1 className="text-display-lg max-w-4xl font-display font-bold">{t.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-mist">{t.intro}</p>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton href={localePath(locale, "/contact")}>{t.heroPrimary} →</MagneticButton>
              <MagneticButton href={localePath(locale, "/pricing")} variant="ghost">
                {t.heroSecondary}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 01 — The four conditions */}
      <Section
        number={t.requirements.number}
        title={t.requirements.title}
        intro={t.requirements.intro}
        theme="dark"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {t.requirements.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-blue/30 bg-blue/5 p-8">
                <span className="font-mono text-xs text-blue-bright">{`0${i + 1}`}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-paper">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-mist">
            {renderInline(t.requirements.note, "dark")}
          </p>
        </Reveal>
      </Section>

      {/* 02 — Pod vs per-service white label */}
      <Section number={t.models.number} title={t.models.title} intro={t.models.intro} theme="light">
        <div className="grid gap-6 md:grid-cols-2">
          {t.models.columns.map((col, i) => (
            <Reveal key={col.name} delay={i * 0.1}>
              <div
                className={`h-full rounded-3xl border p-8 ${
                  i === 0 ? "border-paper-line bg-white/60" : "border-blue/40 bg-blue/5"
                }`}
              >
                <h3 className="font-display text-xl font-semibold text-ink">{col.name}</h3>
                <p className="mt-2 text-sm font-medium text-blue">{col.tagline}</p>
                <ul className="mt-6 space-y-3">
                  {col.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                      <span className="mt-2 block h-1 w-3 shrink-0 rounded-full bg-blue/60" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="mt-10 max-w-3xl text-base leading-relaxed text-ink/70">
            {renderInline(t.models.verdict, "light")}
          </p>
        </Reveal>
      </Section>

      {/* 03 — How invisibility is enforced */}
      <Section
        number={t.invisibility.number}
        title={t.invisibility.title}
        intro={t.invisibility.intro}
        theme="dark"
        compact
      >
        <div className="grid gap-6 md:grid-cols-2">
          {t.invisibility.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-ink-line bg-ink-soft/50 p-7">
                <span className="block h-1 w-10 rounded-full bg-amber" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold text-paper">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{renderInline(item.body, "dark")}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 04 — Pricing */}
      <Section number={t.cost.number} title={t.cost.title} intro={t.cost.intro} theme="light" compact>
        <div className="max-w-3xl divide-y divide-paper-line rounded-2xl border border-paper-line bg-white/60">
          {t.cost.points.map((point) => (
            <p key={point} className="px-6 py-4 text-sm leading-relaxed text-ink/70">
              {point}
            </p>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-ink/60">{renderInline(t.cost.note, "light")}</p>
        <Reveal delay={0.15}>
          <div className="mt-10">
            <MagneticButton href={localePath(locale, "/pricing")} variant="paper">
              {t.cost.cta} →
            </MagneticButton>
          </div>
        </Reveal>
      </Section>

      {/* 05 — FAQ */}
      <Section number={t.faqNumber} title={t.faqTitle} theme="dark" compact>
        <Faq items={t.faq} />
      </Section>

      {/* Closing CTA */}
      <Section theme="light">
        <Reveal>
          <div className="rounded-3xl border border-paper-line bg-white/70 p-8 md:p-12">
            <h2 className="max-w-2xl font-display text-3xl font-bold text-ink md:text-4xl">{t.closing.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/70">{t.closing.body}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <MagneticButton href={localePath(locale, "/contact")}>{t.closing.primary} →</MagneticButton>
              <MagneticButton href={localePath(locale, "/pricing")} variant="paper">
                {t.closing.secondary}
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
