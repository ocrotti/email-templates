import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { insight } from "@/content/insight";
import { articles, getArticleBySlug, sortedArticles } from "@/content/insights";
import { renderRichText } from "@/components/ui/RichText";
import { pageMetadata } from "@/lib/seo";
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import { getPathname, Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import { ButtonLink } from "@/components/ui/Button";
import type { ArticleSection } from "@/content/types";

export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  return articles.map((article) => ({
    slug: article.slug[locale],
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, locale);
  if (!article) return {};
  const lang = article.content[locale];
  return pageMetadata({
    locale,
    pathname: "/insight/[slug]",
    slugByLocale: article.slug,
    title: lang.metaTitle,
    description: lang.metaDescription,
    ogType: "article",
    publishedTime: article.date,
  });
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-GB", {
    dateStyle: "long",
  }).format(new Date(date));
}

/**
 * Sections generated with both paragraphs and a list interleave as:
 * lead paragraph → list → remaining paragraphs (the lead introduces
 * the list; later paragraphs comment on it).
 */
function SectionBody({ section }: { section: ArticleSection }) {
  const [lead, ...rest] = section.paragraphs;
  const list = section.list?.length ? (
    <ul className="prose-copy mt-5 space-y-3">
      {section.list.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="shrink-0 text-accent">
            —
          </span>
          <span>{renderRichText(item)}</span>
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <>
      {lead ? (
        <p className="prose-copy mt-5 text-ink-2">{renderRichText(lead)}</p>
      ) : null}
      {list}
      {rest.map((p) => (
        <p key={p.slice(0, 32)} className="prose-copy mt-5 text-ink-2">
          {renderRichText(p)}
        </p>
      ))}
    </>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticleBySlug(slug, locale);
  if (!article) notFound();

  const t = insight[locale];
  const lang = article.content[locale];
  const url =
    siteConfig.url +
    getPathname({
      locale,
      href: { pathname: "/insight/[slug]", params: { slug } },
    });

  const schemas = [
    articleSchema(article, locale, url),
    breadcrumbSchema([
      {
        name: "Enable Pharma",
        url: siteConfig.url + getPathname({ locale, href: "/" }),
      },
      {
        name: t.hero.kicker,
        url: siteConfig.url + getPathname({ locale, href: "/insight" }),
      },
      { name: lang.title, url },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      <article className="px-gutter pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <header>
            <FadeUp>
              <p className="eyebrow flex flex-wrap gap-x-5 gap-y-1 text-ink-soft">
                <Link
                  href="/insight"
                  className="text-accent-deep transition-colors hover:text-accent"
                >
                  ← {t.backLabel}
                </Link>
                <time dateTime={article.date}>
                  {formatDate(article.date, locale)}
                </time>
                <span>{t.readingTime(article.readingMinutes)}</span>
              </p>
              <h1 className="font-display mt-6 max-w-4xl text-[length:var(--text-display-2)]">
                {lang.title}
              </h1>
              <p className="prose-copy mt-7 text-lg text-ink-soft">
                {lang.excerpt}
              </p>
            </FadeUp>
          </header>

          <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_minmax(0,320px)]">
            {/* 40rem ≈ 62 Archivo-ch: keeps dense regulatory long-form
                inside the 45–75 chars-per-line comfort band. */}
            <div className="min-w-0 max-w-[40rem]">
              {lang.sections.map((section) => (
                <section key={section.heading} className="mt-12 first:mt-0">
                  <h2 className="font-display-soft text-2xl md:text-3xl">
                    {section.heading}
                  </h2>
                  <SectionBody section={section} />
                </section>
              ))}

              {lang.sources?.length ? (
                <aside className="mt-16 border-t border-line pt-8">
                  <h2 className="eyebrow text-accent-deep">
                    {t.sourcesTitle}
                  </h2>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
                    {lang.sources.map((source) => (
                      <li key={source.label}>
                        {source.url ? (
                          <a
                            href={source.url}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="font-medium text-ink underline decoration-accent underline-offset-3 transition-colors hover:text-accent-deep"
                          >
                            {source.label}
                          </a>
                        ) : (
                          <span className="font-medium text-ink">
                            {source.label}
                          </span>
                        )}
                        {source.note ? ` — ${source.note}` : null}
                      </li>
                    ))}
                  </ul>
                </aside>
              ) : null}

              {/* Contextual internal linking: authority flows between
                  articles instead of pooling in nav and footer. */}
              <aside className="mt-12 border-t border-line pt-8">
                <h2 className="eyebrow text-accent-deep">{t.relatedTitle}</h2>
                <ul className="mt-4 space-y-3">
                  {sortedArticles
                    .filter((a) => a.slug[locale] !== slug)
                    .slice(0, 3)
                    .map((a) => (
                      <li key={a.slug[locale]}>
                        <Link
                          href={{
                            pathname: "/insight/[slug]",
                            params: { slug: a.slug[locale] },
                          }}
                          className="group inline-block"
                        >
                          <span className="font-medium underline decoration-accent underline-offset-3 transition-colors group-hover:text-accent-deep">
                            {a.content[locale].title}
                          </span>
                          <span className="ml-3 text-sm text-ink-soft">
                            {formatDate(a.date, locale)}
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </aside>
            </div>

            <aside className="h-fit lg:sticky lg:top-28">
              <div className="on-dark bg-ink p-8 text-paper">
                <h2 className="font-display-soft text-xl">
                  {t.articleCtaTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-paper/75">
                  {t.articleCtaBody}
                </p>
                <div className="mt-6">
                  <ButtonLink href="/contatti" variant="primaryOnDark">
                    {t.articleCta}
                  </ButtonLink>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
