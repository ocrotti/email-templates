import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/content/site";
import { contact } from "@/content/contact";
import { siteConfig } from "@/lib/site-config";
import ContactForm from "@/components/forms/ContactForm";
import FooterFormGate from "./FooterFormGate";

export default function Footer({ locale }: { locale: Locale }) {
  const t = site[locale];
  const formLabels = contact[locale].form;

  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-gutter py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div>
            <p className="font-display max-w-xl text-[length:var(--text-display-2)]">
              {t.footer.claim.split(",")[0]},
              <span className="text-accent-ondark">
                {t.footer.claim.split(",").slice(1).join(",")}
              </span>
            </p>
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="eyebrow text-paper/50">
                  {t.footer.navTitle}
                </h2>
                <ul className="mt-4 space-y-2">
                  {t.nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-block py-1 text-paper/80 transition-colors hover:text-accent-ondark"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/privacy"
                      className="inline-block py-1 text-paper/80 transition-colors hover:text-accent-ondark"
                    >
                      {t.footer.privacyLabel}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="eyebrow text-paper/50">
                  {t.footer.contactTitle}
                </h2>
                <ul className="mt-4 space-y-2 text-paper/80">
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-block py-1 transition-colors hover:text-accent-ondark"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={siteConfig.linkedin}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="inline-block py-1 transition-colors hover:text-accent-ondark"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <FooterFormGate
            fallback={
              <div>
                <h2 className="font-display-soft text-2xl">
                  {t.footer.formTitle}
                </h2>
                <p className="prose-copy mt-3 text-paper/70">
                  {contact[locale].aside.emailLabel}
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-display-soft mt-4 inline-block text-xl text-accent-ondark underline-offset-4 transition-colors hover:text-paper hover:underline"
                >
                  {siteConfig.email}
                </a>
                <p className="eyebrow mt-6 text-paper/50">
                  {t.footer.responseNote}
                </p>
              </div>
            }
          >
            <div>
              <h2 className="font-display-soft text-2xl">
                {t.footer.formTitle}
              </h2>
              <p className="prose-copy mt-3 mb-8 text-paper/70">
                {t.footer.formIntro}
              </p>
              <ContactForm labels={formLabels} locale={locale} compact onDark />
            </div>
          </FooterFormGate>
        </div>

        <div className="mt-20 border-t border-line-dark pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-paper/50">
            {t.footer.legalNote}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-paper/50">
            <p>
              © {new Date().getFullYear()}{" "}
              {siteConfig.legal.companyName || siteConfig.name}.{" "}
              {t.footer.rights}
              {/* Legal identity (art. 35 DPR 633/72) — renders once the
                  fields in site-config.ts are filled in. */}
              {[siteConfig.legal.vatId, siteConfig.legal.address]
                .filter(Boolean)
                .map((part) => (
                  <span key={part}> · {part}</span>
                ))}
            </p>
            <p>{t.footer.accessibilityNote}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
