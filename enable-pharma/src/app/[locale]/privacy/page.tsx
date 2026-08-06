import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { privacy } from "@/content/privacy";
import { pageMetadata } from "@/lib/seo";
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
  const meta = privacy[locale].meta;
  return {
    ...pageMetadata({
      locale,
      pathname: "/privacy",
      title: meta.title,
      description: meta.description,
    }),
    robots: { index: false },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = privacy[locale];

  return (
    <section className="px-gutter pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <h1 className="font-display max-w-4xl text-[length:var(--text-display-2)]">
            {t.title}
          </h1>
          <p className="eyebrow mt-6 text-ink-soft">{t.updated}</p>
        </FadeUp>
        <div className="mt-14 max-w-3xl space-y-10">
          {t.sections.map((section) => (
            <Reveal key={section.heading}>
              <h2 className="font-display-soft text-2xl">{section.heading}</h2>
              {section.body.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="prose-copy mt-4 text-ink-soft"
                >
                  {p}
                </p>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
