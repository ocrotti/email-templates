import Link from "next/link";
import type { Locale } from "@/lib/site";
import { CONTACT_EMAIL, localePath } from "@/lib/site";
import { shared } from "@/content/shared";
import { pageSchema } from "@/content/page-schema";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";

const copy = {
  en: {
    title: "Book a call. Get an honest answer.",
    intro:
      "Fill this in and we'll come back within one business day with a pod proposal or a straight 'a pod isn't your answer'. Both are useful.",
    points: [
      "15-minute scoping call, no deck, no pitch theatre",
      "You get a written pod proposal with pricing and SLA draft",
      "2-week trial — you pay only after it convinces you",
    ],
  },
  it: {
    title: "Prenota una call. Ricevi una risposta onesta.",
    intro:
      "Compila e torniamo entro un giorno lavorativo con una proposta di pod o con un sincero 'il pod non è la tua risposta'. Sono utili entrambe.",
    points: [
      "Call di scoping da 15 minuti, niente deck, niente teatrino",
      "Ricevi una proposta scritta con prezzi e bozza di SLA",
      "Trial di 2 settimane — paghi solo dopo che ti ha convinto",
    ],
  },
};

export default function ContactPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const c = pageSchema[locale].contact;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: shared[locale].ctaPrimary, path: localePath(locale, "/contact") },
        ]}
      />
      <section className="bg-ink px-5 pb-24 pt-32 text-paper md:px-10 md:pt-44">
        <div className="mx-auto grid w-full max-w-wrap gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            {/* h1 and intro sit outside Reveal: the h1 is the LCP element and must
                paint from the server HTML, before hydration. */}
            <h1 className="text-display-lg font-display font-bold">{t.title}</h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">{t.intro}</p>
            <Reveal delay={0.18}>
              <ul className="mt-8 space-y-3">
                {t.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-paper/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-bright" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
            {/* The form is not the only way in: the email address used to appear
                only after a failed submit, so a visitor who dislikes forms had no
                human channel at all. These three blocks also fill the column. */}
            <Reveal delay={0.24}>
              <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line">
                <div className="bg-ink p-6">
                  <h2 className="font-display text-base font-semibold text-paper">{c.emailTitle}</h2>
                  <p className="mt-2">
                    <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline text-lg font-medium text-blue-bright">
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{c.emailNote}</p>
                </div>
                <div className="bg-ink p-6">
                  <h2 className="font-display text-base font-semibold text-paper">{c.whereTitle}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{c.whereBody}</p>
                </div>
                <div className="bg-ink p-6">
                  <h2 className="font-display text-base font-semibold text-amber">{c.digitalTitle}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{c.digitalBody}</p>
                  <p className="mt-3">
                    <Link
                      href={localePath(locale, "/enable-digital")}
                      className="link-underline text-sm font-medium text-amber"
                    >
                      {c.digitalCta} →
                    </Link>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <LeadForm locale={locale} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
