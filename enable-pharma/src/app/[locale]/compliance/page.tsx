import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { compliance } from "@/content/compliance";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { getPathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import { home } from "@/content/home";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import Marquee from "@/components/motion/Marquee";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = compliance[locale].meta;
  return pageMetadata({
    locale,
    pathname: "/compliance",
    title: meta.title,
    description: meta.description,
  });
}

export default async function CompliancePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = compliance[locale];

  const crumbs = breadcrumbSchema([
    {
      name: "Enable Pharma",
      url: siteConfig.url + getPathname({ locale, href: "/" }),
    },
    {
      name: t.hero.kicker,
      url: siteConfig.url + getPathname({ locale, href: "/compliance" }),
    },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />

      <section className="px-gutter pt-40 pb-16 md:pt-48 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className="eyebrow text-accent-deep">{t.hero.kicker}</p>
            <h1 className="font-display mt-5 max-w-5xl text-[length:var(--text-display-2)]">
              {t.hero.title}
            </h1>
            <p className="prose-copy mt-7 text-ink-soft">{t.hero.subtitle}</p>
          </FadeUp>
        </div>
      </section>

      <Marquee items={home[locale].marquee} />

      <section className="px-gutter py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <h2 className="font-display-soft text-2xl md:text-3xl">
              {t.intro.title}
            </h2>
            {t.intro.body.map((p) => (
              <p key={p.slice(0, 24)} className="prose-copy mt-5 text-ink-soft">
                {p}
              </p>
            ))}
          </Reveal>

          <div className="mt-20 space-y-14">
            {t.pillars.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                className="grid gap-8 border-t border-line pt-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16"
              >
                <div>
                  <p className="eyebrow text-accent-deep">{pillar.ref}</p>
                  <h2 className="font-display-soft mt-4 text-2xl md:text-3xl">
                    {pillar.title}
                  </h2>
                  <span
                    aria-hidden="true"
                    className="section-number mt-6 hidden lg:block"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p className="prose-copy text-ink-soft">{pillar.body}</p>
                  <ul className="mt-8 grid gap-x-8 gap-y-3 text-sm leading-relaxed md:grid-cols-2">
                    {pillar.practices.map((practice) => (
                      <li key={practice} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="font-mono text-accent"
                        >
                          ✓
                        </span>
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark bg-ink px-gutter py-20 text-paper md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display-soft max-w-2xl text-3xl md:text-4xl">
              {t.forBuyer.title}
            </h2>
            <p className="prose-copy mt-5 text-paper/70">{t.forBuyer.intro}</p>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {t.forBuyer.items.map((item, i) => (
              <Reveal key={item.role} delay={i * 0.06}>
                <h3 className="font-display-soft border-t-2 border-accent-ondark pt-4 text-xl">
                  {item.role}
                </h3>
                <p className="mt-3 leading-relaxed text-paper/75">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-gutter py-20 md:py-28">
        <div className="mx-auto max-w-7xl text-center">
          <Reveal>
            <h2 className="font-display mx-auto max-w-3xl text-[length:var(--text-title)]">
              {t.closing.title}
            </h2>
            <p className="prose-copy mx-auto mt-6 text-ink-soft">
              {t.closing.body}
            </p>
            <div className="mt-10 flex justify-center">
              <ButtonLink href="/contatti" magnetic>
                {t.closing.cta}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
