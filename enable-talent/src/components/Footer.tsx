import Link from "next/link";
import type { Locale } from "@/lib/site";
import { ENABLE_DIGITAL_URL, localePath } from "@/lib/site";
import { shared } from "@/content/shared";

export default function Footer({ locale }: { locale: Locale }) {
  const t = shared[locale];

  return (
    <footer className="border-t border-ink-line bg-ink px-5 pb-10 pt-16 text-paper md:px-10 md:pt-24">
      <div className="mx-auto w-full max-w-wrap">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href={localePath(locale, "/")} className="font-display text-2xl font-bold tracking-tight">
              enable<span className="text-blue-bright">.talent</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">{t.footer.tagline}</p>

            {/* Bridge to enabledigital.it — deliberate CTA, not a blind redirect */}
            <div className="mt-8 max-w-sm rounded-2xl border border-amber/30 bg-amber/5 p-5">
              <p className="font-display text-sm font-semibold text-amber">{t.footer.bridge.title}</p>
              <p className="mt-2 text-sm text-mist">{t.footer.bridge.body}</p>
              <a
                href={ENABLE_DIGITAL_URL}
                target="_blank"
                rel="noopener"
                className="link-underline mt-3 inline-block text-sm font-medium text-amber"
              >
                {t.footer.bridge.cta} ↗
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {t.footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-mist">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        href={localePath(locale, link.path)}
                        className="link-underline text-sm text-paper/75 hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink-line/60 pt-6 text-xs text-mist md:flex-row md:items-center md:justify-between">
          <p>{t.footer.legal}</p>
          <Link
            href={locale === "en" ? "/it" : "/"}
            hrefLang={locale === "en" ? "it" : "en"}
            className="link-underline w-fit"
          >
            {t.footer.langSwitch}
          </Link>
        </div>
      </div>
    </footer>
  );
}
