import type { Lang } from './routes';

export const SITE = {
  name: 'enable.advisory',
  url: 'https://enableadvisory.com',
  parent: 'Enable Digital',
  sibling: 'https://enableluxury.com',
  email: '[PLACEHOLDER: email di contatto]',
};

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE.url).href;
}

/** Organization + ProfessionalService, sitewide (@graph). */
export function organizationSchema(lang: Lang) {
  const description =
    lang === 'it'
      ? 'Consulenza digitale senior per PMI italiane: compliance (GDPR, NIS2, EAA, AI Act), dati e AI, CRM e martech, web ed e-commerce. Un unico referente, accountable sul risultato.'
      : 'Senior digital consulting for Italian SMEs: compliance (GDPR, NIS2, EAA, AI Act), data & AI, CRM & martech, web & e-commerce. One accountable senior partner.';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        url: `${SITE.url}/`,
        logo: `${SITE.url}/og/default-it.png`,
        description,
        parentOrganization: { '@type': 'Organization', name: SITE.parent },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE.url}/#service`,
        name: SITE.name,
        url: `${SITE.url}/`,
        description,
        areaServed: { '@type': 'Country', name: 'Italy' },
        parentOrganization: { '@id': `${SITE.url}/#organization` },
        knowsAbout: [
          'GDPR',
          'NIS2',
          'European Accessibility Act',
          'AI Act',
          'Artificial Intelligence',
          'CRM',
          'Marketing technology',
          'E-commerce',
        ],
      },
    ],
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  lang: Lang;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'Italy' },
    inLanguage: opts.lang === 'it' ? 'it-IT' : 'en',
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  lang: Lang;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: opts.lang === 'it' ? 'it-IT' : 'en',
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { '@id': `${SITE.url}/#organization` },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: absoluteUrl(opts.path),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function personSchema(opts: {
  name: string;
  jobTitle: string;
  description?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: opts.name,
    jobTitle: opts.jobTitle,
    description: opts.description,
    worksFor: { '@id': `${SITE.url}/#organization` },
  };
}
