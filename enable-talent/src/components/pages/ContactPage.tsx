import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { shared } from "@/content/shared";
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
            <Reveal>
              <h1 className="text-display-md font-display font-bold">{t.title}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">{t.intro}</p>
            </Reveal>
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
          </div>
          <Reveal delay={0.15}>
            <LeadForm locale={locale} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
