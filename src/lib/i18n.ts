import type { Lang, RouteKey } from './routes';

/** Stringhe UI condivise (nav, footer, form, 404). Il copy di pagina vive nelle pagine. */
export const ui = {
  it: {
    skipLink: 'Salta al contenuto',
    navLabel: 'Navigazione principale',
    menuOpen: 'Apri il menu',
    menuClose: 'Chiudi il menu',
    langLabel: 'Lingua',
    langSwitch: 'Read in English',
    breadcrumbLabel: 'Percorso di navigazione',
    breadcrumbHome: 'Home',
    nav: {
      howWeWork: 'Come lavoriamo',
      services: 'Servizi',
      products: 'Prodotti',
      caseStudies: 'Casi studio',
      about: 'Chi siamo',
      resources: 'Risorse',
      contact: 'Contatti',
    },
    cta: {
      bookAudit: 'Prenota l’audit',
      startFixed: 'Inizia con un passo a prezzo fisso',
      allServices: 'Tutti i servizi',
      readGuide: 'Leggi la guida',
      discover: 'Scopri di più',
    },
    footer: {
      tagline:
        'Il tuo partner digitale senior, accountable sul risultato — non un’agenzia di junior.',
      services: 'Servizi',
      company: 'Azienda',
      resources: 'Risorse',
      legal: 'Note legali',
      group: 'Parte di Enable Digital, con enable.luxury.',
      vat: '[PLACEHOLDER: ragione sociale, P.IVA e indirizzo]',
      rights: 'Tutti i diritti riservati.',
    },
    form: {
      name: 'Nome e cognome',
      company: 'Azienda',
      email: 'Email di lavoro',
      phone: 'Telefono (facoltativo)',
      topic: 'Di cosa hai bisogno?',
      topicOptions: {
        audit: 'Digital & Compliance Audit',
        ai: 'AI Readiness Assessment',
        crm: 'CRM/Martech Sprint',
        eaa: 'Accessibility (EAA) Sprint',
        retainer: 'Retainer / partnership continuativa',
        other: 'Altro / non lo so ancora',
      },
      message: 'Raccontaci il contesto',
      messagePlaceholder:
        'Dimensione azienda, settore, cosa non sta funzionando, scadenze normative…',
      privacy: 'Ho letto l’informativa privacy e acconsento al trattamento dei dati.',
      submit: 'Invia la richiesta',
      note: 'Rispondiamo entro 24 ore lavorative. Sempre una persona, mai un autoresponder.',
    },
    notFound: {
      title: 'Pagina non trovata',
      text: 'La pagina che cerchi non esiste o è stata spostata.',
      back: 'Torna alla home',
    },
  },
  en: {
    skipLink: 'Skip to content',
    navLabel: 'Main navigation',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    langLabel: 'Language',
    langSwitch: 'Leggi in italiano',
    breadcrumbLabel: 'Breadcrumb',
    breadcrumbHome: 'Home',
    nav: {
      howWeWork: 'How we work',
      services: 'Services',
      products: 'Products',
      caseStudies: 'Case studies',
      about: 'About',
      resources: 'Resources',
      contact: 'Contact',
    },
    cta: {
      bookAudit: 'Book your audit',
      startFixed: 'Start with a fixed-price step',
      allServices: 'All services',
      readGuide: 'Read the guide',
      discover: 'Learn more',
    },
    footer: {
      tagline:
        'Your senior digital partner, accountable for the outcome — not an agency of juniors.',
      services: 'Services',
      company: 'Company',
      resources: 'Resources',
      legal: 'Legal',
      group: 'Part of Enable Digital, alongside enable.luxury.',
      vat: '[PLACEHOLDER: legal name, VAT no. and address]',
      rights: 'All rights reserved.',
    },
    form: {
      name: 'Full name',
      company: 'Company',
      email: 'Work email',
      phone: 'Phone (optional)',
      topic: 'What do you need?',
      topicOptions: {
        audit: 'Digital & Compliance Audit',
        ai: 'AI Readiness Assessment',
        crm: 'CRM/Martech Sprint',
        eaa: 'Accessibility (EAA) Sprint',
        retainer: 'Retainer / ongoing partnership',
        other: 'Something else / not sure yet',
      },
      message: 'Tell us about your context',
      messagePlaceholder:
        'Company size, sector, what is not working, regulatory deadlines…',
      privacy: 'I have read the privacy policy and consent to data processing.',
      submit: 'Send request',
      note: 'We reply within one business day. Always a person, never an autoresponder.',
    },
    notFound: {
      title: 'Page not found',
      text: 'The page you are looking for does not exist or has been moved.',
      back: 'Back to home',
    },
  },
} as const;

export function t(lang: Lang) {
  return ui[lang];
}

/** Voci di navigazione principali, in ordine. */
export const navItems: { key: RouteKey; label: keyof (typeof ui)['it']['nav'] }[] = [
  { key: 'howWeWork', label: 'howWeWork' },
  { key: 'services', label: 'services' },
  { key: 'products', label: 'products' },
  { key: 'caseStudies', label: 'caseStudies' },
  { key: 'about', label: 'about' },
  { key: 'resources', label: 'resources' },
];
