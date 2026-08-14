import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { roles, rolesIndex, roleSlugs } from "@/content/roles";
import { shared } from "@/content/shared";
import { pageSchema } from "@/content/page-schema";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import Faq from "@/components/Faq";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import RoleCard from "@/components/RoleCard";
import Section from "@/components/Section";
import Link from "next/link";

export function RolesIndexPage({ locale }: { locale: Locale }) {
  const t = rolesIndex[locale];
  const roleData = roles[locale];
  const s = shared[locale];
  const cta = pageSchema[locale].rolesCta;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: t.title, path: localePath(locale, "/roles") },
        ]}
      />
      {/* Hero h1 and intro sit outside Reveal: the h1 is the LCP element and must
          paint from the server HTML, before hydration. */}
      <section className="bg-ink px-5 pb-16 pt-32 text-paper md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto w-full max-w-wrap">
          <h1 className="text-display-lg max-w-4xl font-display font-bold">{t.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{t.intro}</p>
        </div>
      </section>
      <Section theme="dark">
        {/* Keeps the heading outline h1 → h2 → h3 (RoleCard renders h3s) without changing the visual design. */}
        <h2 className="sr-only">{locale === "en" ? "Pod roles" : "Ruoli dei pod"}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        <p className="mt-8 text-sm text-mist">{t.hint}</p>
        <p className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <Link href={localePath(locale, "/marketing-salaries")} className="link-underline text-blue-bright">
            {locale === "en" ? "European salary benchmarks" : "Benchmark salariali europei"} →
          </Link>
          <Link href={localePath(locale, "/outsource-digital-marketing")} className="link-underline text-blue-bright">
            {locale === "en" ? "The full outsourcing guide" : "La guida completa all'outsourcing"} →
          </Link>
        </p>
      </Section>

      {/* Closing CTA: without it this is the only commercial page whose <main>
          offers no conversion action. */}
      <Section title={cta.title} intro={cta.body} theme="dark" compact>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-4">
            <MagneticButton href={localePath(locale, "/contact")}>{s.ctaPrimary} →</MagneticButton>
            <MagneticButton href={localePath(locale, "/pricing")} variant="ghost">
              {cta.pricing}
            </MagneticButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

export function RolePage({ locale, slug }: { locale: Locale; slug: string }) {
  const t = roles[locale][slug];
  const path = `/roles/${slug}`;

  return (
    <>
      <ServiceJsonLd name={t.name} description={t.seoDescription} path={localePath(locale, path)} />
      <FaqJsonLd items={t.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: locale === "en" ? "Roles" : "Ruoli", path: localePath(locale, "/roles") },
          { name: t.name, path: localePath(locale, path) },
        ]}
      />

      <section className="bg-ink px-5 pb-16 pt-32 text-paper md:px-10 md:pb-20 md:pt-44">
        <div className="mx-auto w-full max-w-wrap">
          <Reveal>
            <p className="mb-4 font-mono text-sm text-blue-bright">
              <Link href={localePath(locale, "/roles")} className="link-underline">
                {locale === "en" ? "Roles" : "Ruoli"}
              </Link>{" "}
              / {t.name}
            </p>
          </Reveal>
          {/* h1 and tagline sit outside Reveal: the h1 is the LCP element and must
              paint from the server HTML, before hydration. */}
          <h1 className="text-display-lg max-w-4xl font-display font-bold">{t.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{t.tagline}</p>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="rounded-full border border-amber/40 px-4 py-1.5 text-sm text-amber">{t.savings.band}</span>
              <MagneticButton href={localePath(locale, "/contact")}>{t.cta} →</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <Section number="01" theme="dark" compact>
        <div className="max-w-2xl space-y-5">
          {t.intro.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-base leading-relaxed text-paper/80 md:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section number="02" title={t.inPod.title} theme="light" compact>
        <div className="grid gap-6 md:grid-cols-2">
          {t.inPod.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-paper-line bg-white/70 p-7">
                <span className="block h-1 w-10 rounded-full bg-blue" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-10">
            <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-ink/65">{t.stack.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {t.stack.items.map((item) => (
                <li key={item} className="rounded-full border border-paper-line bg-white/60 px-4 py-1.5 text-sm text-ink/75">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <Section number="03" title={t.profile.title} theme="dark" compact>
        <Reveal>
          <div className="max-w-3xl rounded-3xl border border-ink-line bg-ink-soft/50 p-8 md:p-10">
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue to-amber font-display text-lg font-bold text-white"
              >
                {t.profile.name.charAt(0)}
              </span>
              <p className="font-display text-xl font-semibold text-paper">{t.profile.name}</p>
            </div>
            <p className="mt-5 text-base leading-relaxed text-paper/80">{t.profile.summary}</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.profile.facts.map((fact) => (
                <div key={fact.label} className="rounded-xl border border-ink-line/70 p-4">
                  <dt className="text-xs uppercase tracking-[0.15em] text-mist">{fact.label}</dt>
                  <dd className="mt-1.5 text-sm font-medium text-paper">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs text-mist">{t.profile.note}</p>
          </div>
        </Reveal>
      </Section>

      <Section number="04" title={t.savings.title} intro={t.savings.body} theme="light" compact>
        <Reveal>
          <p className="inline-block rounded-2xl border border-blue/30 bg-blue/10 px-6 py-4 font-display text-xl font-semibold text-blue">
            {t.savings.band}
          </p>
        </Reveal>
      </Section>

      <Section number="05" title={locale === "en" ? "Role FAQ" : "FAQ del ruolo"} theme="dark" compact>
        <Faq items={t.faq} />
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap gap-4">
            <MagneticButton href={localePath(locale, "/contact")}>{t.cta} →</MagneticButton>
            <MagneticButton href={localePath(locale, "/pricing")} variant="ghost">
              {locale === "en" ? "See pricing" : "Vedi i prezzi"}
            </MagneticButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
