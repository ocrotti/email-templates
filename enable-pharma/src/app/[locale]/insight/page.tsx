import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { insight } from "@/content/insight";
import { sortedArticles } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { getPathname, Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = insight[locale].meta;
  return pageMetadata({
    locale,
    pathname: "/insight",
    title: meta.title,
    description: meta.description,
  });
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-GB", {
    dateStyle: "long",
  }).format(new Date(date));
}

export default async function InsightIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = insight[locale];

  const crumbs = breadcrumbSchema([
    {
      name: "Enable Pharma",
      url: siteConfig.url + getPathname({ locale, href: "/" }),
    },
    {
      name: t.hero.kicker,
      url: siteConfig.url + getPathname({ locale, href: "/insight" }),
    },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />

      <section className="px-gutter pt-40 pb-16 md:pt-48 md:pb-20">
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

      <section className="px-gutter pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="divide-y divide-line border-y border-line">
            {sortedArticles.map((article, i) => {
              const lang = article.content[locale];
              return (
                <Reveal key={article.slug.it} delay={i * 0.05}>
                  <article>
                    <Link
                      href={{
                        pathname: "/insight/[slug]",
                        params: { slug: article.slug[locale] },
                      }}
                      className="group grid gap-4 py-10 transition-colors md:grid-cols-[minmax(0,200px)_1fr_auto] md:gap-10"
                    >
                      <div className="eyebrow flex flex-row gap-4 text-ink-soft md:flex-col md:gap-2">
                        <time dateTime={article.date}>
                          {formatDate(article.date, locale)}
                        </time>
                        <span>{t.readingTime(article.readingMinutes)}</span>
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-display-soft text-2xl transition-colors group-hover:text-accent-deep md:text-3xl">
                          {lang.title}
                        </h2>
                        <p className="prose-copy mt-3 text-ink-soft">
                          {lang.excerpt}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="hidden self-center text-2xl text-accent transition-transform duration-300 group-hover:translate-x-2 md:block"
                      >
                        →
                      </span>
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
