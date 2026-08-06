import type { Locale } from "@/lib/site";

export interface NavItem {
  label: string;
  path: string; // locale-independent path (EN form)
}

interface SharedContent {
  nav: NavItem[];
  ctaPrimary: string;
  ctaSecondary: string;
  bookCallHref: string;
  footer: {
    tagline: string;
    columns: { title: string; links: NavItem[] }[];
    bridge: { title: string; body: string; cta: string };
    legal: string;
    langSwitch: string;
  };
  form: {
    title: string;
    sub: string;
    name: string;
    email: string;
    agency: string;
    roles: string;
    rolesOptions: string[];
    teamSize: string;
    teamSizeOptions: string[];
    message: string;
    submit: string;
    privacy: string;
    success: string;
  };
}

export const shared: Record<Locale, SharedContent> = {
  en: {
    nav: [
      { label: "How it works", path: "/how-it-works" },
      { label: "Roles", path: "/roles" },
      { label: "Pricing", path: "/pricing" },
      { label: "Guarantee", path: "/guarantee" },
      { label: "Talent", path: "/talent" },
      { label: "Case study", path: "/case-study" },
      { label: "Blog", path: "/blog" },
    ],
    ctaPrimary: "Book a call",
    ctaSecondary: "Start a 2-week trial",
    bookCallHref: "/contact",
    footer: {
      tagline: "Managed marketing pods for European agencies. Built in Nairobi. QA'd in Europe.",
      columns: [
        {
          title: "Product",
          links: [
            { label: "How it works", path: "/how-it-works" },
            { label: "Pricing", path: "/pricing" },
            { label: "Guarantee", path: "/guarantee" },
            { label: "Case study", path: "/case-study" },
          ],
        },
        {
          title: "Roles",
          links: [
            { label: "Paid media", path: "/roles/paid-media" },
            { label: "SEO", path: "/roles/seo" },
            { label: "Content & social", path: "/roles/content-social" },
            { label: "Design", path: "/roles/design" },
            { label: "Marketing automation", path: "/roles/marketing-automation" },
            { label: "Development", path: "/roles/development" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "Talent & Nairobi", path: "/talent" },
            { label: "Blog", path: "/blog" },
            { label: "Contact", path: "/contact" },
          ],
        },
      ],
      bridge: {
        title: "Looking for Italian senior PMs?",
        body: "If you need project management or senior Italian specialists, our sister company Enable Digital is the right door.",
        cta: "Visit enabledigital.it",
      },
      legal: "© enable.talent. All claims on this site come from our market analysis or documented client work.",
      langSwitch: "Italiano",
    },
    form: {
      title: "Tell us what your delivery is missing",
      sub: "15 minutes on a call. We'll tell you honestly if a pod fits — and if it doesn't, we'll say so.",
      name: "Your name",
      email: "Work email",
      agency: "Agency name",
      roles: "Roles you need",
      rolesOptions: [
        "Paid media / media buying",
        "SEO",
        "Content & social",
        "Design",
        "Marketing automation",
        "Development",
        "Not sure yet",
      ],
      teamSize: "Agency team size",
      teamSizeOptions: ["1–5", "6–15", "16–40", "40+"],
      message: "What does your delivery bottleneck look like?",
      submit: "Book my call",
      privacy: "We reply within one business day. No newsletter, no drip sequence.",
      success: "Got it. We'll get back to you within one business day.",
    },
  },
  it: {
    nav: [
      { label: "Come funziona", path: "/how-it-works" },
      { label: "Ruoli", path: "/roles" },
      { label: "Prezzi", path: "/pricing" },
      { label: "Garanzia", path: "/guarantee" },
      { label: "Talento", path: "/talent" },
      { label: "Caso studio", path: "/case-study" },
      { label: "Blog", path: "/blog" },
    ],
    ctaPrimary: "Prenota una call",
    ctaSecondary: "Inizia il trial di 2 settimane",
    bookCallHref: "/contact",
    footer: {
      tagline: "Pod marketing gestiti per agenzie europee. Costruiti a Nairobi. QA in Europa.",
      columns: [
        {
          title: "Prodotto",
          links: [
            { label: "Come funziona", path: "/how-it-works" },
            { label: "Prezzi", path: "/pricing" },
            { label: "Garanzia", path: "/guarantee" },
            { label: "Caso studio", path: "/case-study" },
          ],
        },
        {
          title: "Ruoli",
          links: [
            { label: "Paid media", path: "/roles/paid-media" },
            { label: "SEO", path: "/roles/seo" },
            { label: "Content & social", path: "/roles/content-social" },
            { label: "Design", path: "/roles/design" },
            { label: "Marketing automation", path: "/roles/marketing-automation" },
            { label: "Sviluppo", path: "/roles/development" },
          ],
        },
        {
          title: "Azienda",
          links: [
            { label: "Talento & Nairobi", path: "/talent" },
            { label: "Blog", path: "/blog" },
            { label: "Contatti", path: "/contact" },
          ],
        },
      ],
      bridge: {
        title: "Cerchi PM senior italiani?",
        body: "Se ti serve project management o personale senior italiano, la porta giusta è la nostra società sorella Enable Digital.",
        cta: "Vai su enabledigital.it",
      },
      legal: "© enable.talent. Ogni claim su questo sito viene dalla nostra ricerca di mercato o da lavoro documentato con i clienti.",
      langSwitch: "English",
    },
    form: {
      title: "Dicci cosa manca alla tua delivery",
      sub: "15 minuti di call. Ti diciamo onestamente se un pod ha senso — e se non ce l'ha, te lo diciamo.",
      name: "Il tuo nome",
      email: "Email di lavoro",
      agency: "Nome agenzia",
      roles: "Ruoli che cerchi",
      rolesOptions: [
        "Paid media / media buying",
        "SEO",
        "Content & social",
        "Design",
        "Marketing automation",
        "Sviluppo",
        "Non lo so ancora",
      ],
      teamSize: "Dimensione del team",
      teamSizeOptions: ["1–5", "6–15", "16–40", "40+"],
      message: "Com'è fatto il tuo collo di bottiglia in delivery?",
      submit: "Prenota la call",
      privacy: "Rispondiamo entro un giorno lavorativo. Niente newsletter, niente sequenze automatiche.",
      success: "Ricevuto. Ti rispondiamo entro un giorno lavorativo.",
    },
  },
};
