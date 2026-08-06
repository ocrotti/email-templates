export type Lang = 'it' | 'en';

/**
 * Mappa unica dei percorsi IT ↔ EN.
 * È la fonte di verità per: hreflang, language switcher, nav e footer.
 */
export const routes = {
  home: { it: '/it/', en: '/en/' },
  howWeWork: { it: '/it/come-lavoriamo/', en: '/en/how-we-work/' },
  services: { it: '/it/servizi/', en: '/en/services/' },
  serviceCompliance: {
    it: '/it/servizi/compliance-governance-digitale/',
    en: '/en/services/compliance-digital-governance/',
  },
  serviceData: {
    it: '/it/servizi/dati-intelligenza-artificiale/',
    en: '/en/services/data-artificial-intelligence/',
  },
  serviceCrm: {
    it: '/it/servizi/crm-martech/',
    en: '/en/services/crm-martech/',
  },
  serviceWeb: {
    it: '/it/servizi/web-ecommerce/',
    en: '/en/services/web-ecommerce/',
  },
  products: { it: '/it/prodotti/', en: '/en/products/' },
  caseStudies: { it: '/it/casi-studio/', en: '/en/case-studies/' },
  about: { it: '/it/chi-siamo/', en: '/en/about/' },
  resources: { it: '/it/risorse/', en: '/en/resources/' },
  resourceNis2: {
    it: '/it/risorse/nis2-guida-pmi/',
    en: '/en/resources/nis2-sme-guide/',
  },
  resourceAi: {
    it: '/it/risorse/ai-per-pmi-guida/',
    en: '/en/resources/ai-for-smes-guide/',
  },
  contact: { it: '/it/contatti/', en: '/en/contact/' },
  privacy: { it: '/it/privacy/', en: '/en/privacy/' },
  cookies: { it: '/it/cookie-policy/', en: '/en/cookie-policy/' },
  accessibility: { it: '/it/accessibilita/', en: '/en/accessibility/' },
} as const;

export type RouteKey = keyof typeof routes;

export function path(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'it' ? 'en' : 'it';
}
