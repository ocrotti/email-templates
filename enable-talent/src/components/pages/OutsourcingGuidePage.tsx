import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { outsourcingGuide } from "@/content/outsourcing-guide";
import { shared } from "@/content/shared";
import { pageSchema } from "@/content/page-schema";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import Faq from "@/components/Faq";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

/**
 * Renders markdown-style inline links `[text](href)` inside a content string.
 * Content strings are per-locale, so IT strings already carry `/it/...` hrefs.
 */
function renderInline(text: string): ReactNode {
  if (!text.includes("](")) return text;
  const nodes: ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\(([^()\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [, label, href] = match;
    nodes.push(
      <Link key={`${href}-${match.index}`} href={href} className="link-underline font-medium text-blue-bright">
        {label}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Same, but tuned for light sections where blue-bright loses contrast. */
function renderInlineLight(text: string): ReactNode {
  if (!text.includes("](")) return text;
  const nodes: ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\(([^()\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [, label, href] = match;
    nodes.push(
      <Link key={`${href}-${match.index}`} href={href} className="link-underline font-medium text-blue">
        {label}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Anchor id for a guide section, derived from its content number ("01" → "guide-01"). */
function sectionId(number: string): string {
  return `guide-${number}`;
}

export default function OutsourcingGuidePage({ locale }: { locale: Locale }) {
  const t = outsourcingGuide[locale];
  const s = shared[locale];
  const g = pageSchema[locale].guide;
  const path = "/outsource-digital-marketing";

  // The page runs ~10,500px; the jump list gives readers a map and a way to skip
  // to the part they came for. Labels come from the sections themselves, so they
  // are localized for free and cannot drift out of sync.
  const toc = [t.scope, t.models, t.decide, t.europe, t.geography, t.checklist].map((section) => ({
    number: section.number,
    title: section.title,
  }));

  return (
    <>
      <ArticleJsonLd
        title={t.title}
        description={t.seoDescription}
        path={localePath(locale, path)}
        datePublished="2026-08-07"
        author="enable.talent team"
      />
      <FaqJsonLd items={t.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: t.title, path: localePath(locale, path) },
        ]}
      />

      <section className="relative overflow-hidden bg-ink px-5 pb-16 pt-32 text-paper md:px-10 md:pb-24 md:pt-44">
        <div className="pointer-events-none absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-blue/15 blur-[120px]" />
        <div className="mx-auto w-full max-w-wrap">
          <Reveal>
            <p className="mb-6 inline-block rounded-full border border-blue/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-blue-bright">
              {t.kicker}
            </p>
          </Reveal>
          {/* h1 and intro sit outside Reveal: the h1 is the LCP element and must
              paint from the server HTML, before hydration. */}
          <h1 className="text-display-lg max-w-4xl font-display font-bold">{t.title}</h1>
          <div className="mt-6 max-w-2xl space-y-5">
            {t.intro.map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-mist md:text-lg">
                {p}
              </p>
            ))}
          </div>
          <Reveal delay={0.2}>
            <nav aria-labelledby="guide-toc" className="mt-12 max-w-3xl rounded-2xl border border-ink-line bg-ink-soft/50 p-6 md:p-8">
              <h2 id="guide-toc" className="text-xs uppercase tracking-[0.2em] text-mist">
                {g.tocTitle}
              </h2>
              <ol className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {toc.map((item) => (
                  <li key={item.number} className="flex gap-4 text-sm">
                    <span className="font-mono text-blue-bright" aria-hidden>
                      {item.number}
                    </span>
                    <a href={`#${sectionId(item.number)}`} className="link-underline text-paper/85">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* 01 — scope: what moves out vs what stays in */}
      <Section id={sectionId(t.scope.number)} number={t.scope.number} title={t.scope.title} intro={t.scope.intro} theme="light">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <h3 className="font-display text-lg font-semibold text-ink">{t.scope.outsourceTitle}</h3>
            </Reveal>
            <ul className="mt-5 space-y-4">
              {t.scope.outsource.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <li className="rounded-2xl border border-paper-line bg-white/70 p-5">
                    <p className="font-display text-base font-semibold text-ink">{item.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{item.body}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <Reveal>
              <h3 className="font-display text-lg font-semibold text-ink">{t.scope.keepTitle}</h3>
            </Reveal>
            <ul className="mt-5 space-y-4">
              {t.scope.keep.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <li className="rounded-2xl border border-amber/40 bg-amber/5 p-5">
                    {/* amber-ink, not amber-deep: this is text on a peach card. */}
                    <p className="font-display text-base font-semibold text-amber-ink">{item.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{item.body}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink/70">{renderInlineLight(t.scope.note)}</p>
        </Reveal>
      </Section>

      {/* 02 — the five models */}
      <Section id={sectionId(t.models.number)} number={t.models.number} title={t.models.title} intro={t.models.intro} theme="dark">
        <ol className="space-y-6">
          {t.models.items.map((model, i) => (
            <Reveal key={model.name} delay={Math.min(i, 2) * 0.08}>
              <li className="rounded-2xl border border-ink-line bg-ink-soft/50 p-7 md:p-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-blue-bright">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-xl font-semibold text-paper">{model.name}</h3>
                </div>
                <dl className="mt-5 grid gap-5 md:grid-cols-2">
                  {(
                    [
                      [t.models.labels.what, model.what],
                      [t.models.labels.cost, model.cost],
                      [t.models.labels.bestFor, model.bestFor],
                      [t.models.labels.breaks, model.breaks],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs uppercase tracking-[0.16em] text-mist/80">{label}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-paper/80">{renderInline(value)}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-3xl text-base leading-relaxed text-mist">{renderInline(t.models.note)}</p>
        </Reveal>
        {/* Mid-page CTA: the model comparison is where a reader decides, and the
            closing CTA is another ~7,000px away. */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col gap-6 rounded-2xl border border-blue/30 bg-blue/10 p-7 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="max-w-xl">
              <h3 className="font-display text-lg font-semibold text-paper">{g.midCta.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{g.midCta.body}</p>
            </div>
            <MagneticButton href={localePath(locale, "/contact")} className="shrink-0">
              {s.ctaPrimary} →
            </MagneticButton>
          </div>
        </Reveal>
      </Section>

      {/* 03 — the four success factors */}
      <Section id={sectionId(t.decide.number)} number={t.decide.number} title={t.decide.title} intro={t.decide.intro} theme="light">
        <div className="grid gap-6 md:grid-cols-2">
          {t.decide.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-paper-line bg-white/70 p-7">
                <span className="block h-1 w-10 rounded-full bg-blue" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{renderInlineLight(item.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 04 — GDPR and the European specifics */}
      <Section id={sectionId(t.europe.number)} number={t.europe.number} title={t.europe.title} theme="dark">
        <div className="max-w-2xl space-y-5">
          {t.europe.body.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-base leading-relaxed text-paper/80 md:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.europe.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.08}>
              <div className="flex h-full gap-5 rounded-2xl border border-ink-line bg-ink-soft/40 p-6">
                <span className="mt-1 block h-8 w-1 shrink-0 rounded-full bg-blue" aria-hidden />
                <div>
                  <h3 className="font-display text-base font-semibold text-paper">{point.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">{point.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 05 — geography */}
      <Section id={sectionId(t.geography.number)} number={t.geography.number} title={t.geography.title} theme="light">
        <Reveal>
          <p className="max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
            {renderInlineLight(t.geography.intro)}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.geography.places.map((place, i) => (
            <Reveal key={place.place} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-paper-line bg-white/70 p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-lg font-semibold text-ink">{place.place}</h3>
                  <span className="rounded-full border border-ink/15 px-3 py-1 font-mono text-xs text-ink/60">
                    {place.clock}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{renderInlineLight(place.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 06 — checklist */}
      <Section id={sectionId(t.checklist.number)} number={t.checklist.number} title={t.checklist.title} intro={t.checklist.intro} theme="dark">
        <ol className="space-y-4">
          {t.checklist.steps.map((step, i) => (
            <Reveal key={step.title} delay={Math.min(i, 4) * 0.06}>
              <li className="flex gap-6 rounded-2xl border border-ink-line bg-ink-soft/40 p-6">
                <span className="font-mono text-sm font-semibold text-amber">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-base font-semibold text-paper">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">{renderInline(step.body)}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section title={t.faqTitle} theme="light" compact>
        <Faq items={t.faq} theme="light" />
      </Section>

      <Section theme="dark">
        <div className="rounded-3xl border border-blue/30 bg-blue/10 p-8 md:p-12">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-paper">{t.closing.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-mist">{t.closing.body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8">
              <MagneticButton href={localePath(locale, "/contact")}>{s.ctaPrimary} →</MagneticButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
