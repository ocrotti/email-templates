import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { articles, getArticleBySlug } from "@/content/insights";
import { insight } from "@/content/insight";
import type { Locale } from "@/i18n/routing";

export const alt = "Enable Pharma — Insight";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Per-article share card.
 *
 * Every URL used to share the same brand image, so ten pieces of writing
 * looked like one page in a feed. This one carries the headline, the
 * date and the reading time — the three things that decide whether a
 * link gets opened.
 */
export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  return articles.map((article) => ({ slug: article.slug[locale] }));
}

export default async function ArticleOgImage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, locale);
  if (!article) notFound();

  const title = article.content[locale].title;
  const date = new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-GB", {
    dateStyle: "long",
  }).format(new Date(article.date));
  const reading = insight[locale].readingTime(article.readingMinutes);

  const [bold, medium] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/og/Archivo-Expanded-Bold.ttf")),
    readFile(join(process.cwd(), "src/fonts/og/Archivo-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f0e6",
          color: "#1a1712",
          padding: "72px 80px",
          fontFamily: "ArchivoMedium",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 30,
          }}
        >
          <div style={{ display: "flex", fontFamily: "ArchivoBold" }}>
            Enable Pharma
            <div style={{ color: "#c73b16" }}>.</div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#57503f" }}>
            enablepharma.it
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#c73b16",
              marginBottom: 24,
            }}
          >
            {`Insight · ${date}`}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "ArchivoBold",
              // Long headlines still have to fit four lines at 630px.
              fontSize: title.length > 62 ? 54 : 64,
              lineHeight: 1.06,
              letterSpacing: "-1.5px",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#57503f",
            borderTop: "2px solid #d9d2c0",
            paddingTop: 28,
          }}
        >
          {reading}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "ArchivoBold", data: bold, style: "normal", weight: 700 },
        { name: "ArchivoMedium", data: medium, style: "normal", weight: 500 },
      ],
    },
  );
}
