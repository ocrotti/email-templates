import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { getPathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import FadeUp from "@/components/motion/FadeUp";
import ContactForm from "@/components/forms/ContactForm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = contact[locale].meta;
  return pageMetadata({
    locale,
    pathname: "/contatti",
    title: meta.title,
    description: meta.description,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = contact[locale];

  const crumbs = breadcrumbSchema([
    {
      name: "Enable Pharma",
      url: siteConfig.url + getPathname({ locale, href: "/" }),
    },
    {
      name: t.hero.kicker,
      url: siteConfig.url + getPathname({ locale, href: "/contatti" }),
    },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />

      <section className="px-gutter pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className="eyebrow text-accent-deep">{t.hero.kicker}</p>
            <h1 className="font-display mt-5 max-w-4xl text-[length:var(--text-display-2)]">
              {t.hero.title}
            </h1>
            <p className="prose-copy mt-7 text-ink-soft">{t.hero.subtitle}</p>
          </FadeUp>

          <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-24">
            <FadeUp delay={100}>
              <ContactForm labels={t.form} locale={locale} />
            </FadeUp>
            <FadeUp delay={200} className="h-fit lg:sticky lg:top-28">
              <div className="bg-paper-2 p-8">
                <h2 className="font-display-soft text-xl">{t.aside.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {t.aside.body}
                </p>
                <ol className="mt-6 space-y-4">
                  {t.aside.steps.map((step, i) => (
                    <li key={step} className="flex gap-4 text-sm leading-relaxed">
                      <span className="eyebrow mt-0.5 text-accent-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <p className="eyebrow mt-8 text-accent-deep">
                  {t.aside.responseNote}
                </p>
                <p className="mt-6 border-t border-line pt-5 text-sm text-ink-soft">
                  {t.aside.emailLabel}
                  <br />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-ink underline decoration-accent underline-offset-4 transition-colors hover:text-accent-deep"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
