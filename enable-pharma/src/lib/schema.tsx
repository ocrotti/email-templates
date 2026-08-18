import type { Locale } from "@/i18n/routing";
import type { Article, FaqItem } from "@/content/types";
import { siteConfig } from "./site-config";

/**
 * Schema.org JSON-LD builders. Rendered via <JsonLd /> in pages.
 */

export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legal.companyName || siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    email: siteConfig.email,
    sameAs: [siteConfig.linkedin],
    // Filled in from site-config once the legal identity is confirmed;
    // an empty address object would be worse than none.
    ...(siteConfig.legal.vatId ? { vatID: siteConfig.legal.vatId } : {}),
    ...(siteConfig.legal.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.legal.address,
            addressCountry: "IT",
          },
        }
      : {}),
    description:
      locale === "it"
        ? "Enable Pharma costruisce e gestisce piattaforme di disease awareness istituzionali (unbranded) come servizio ricorrente per le aziende della salute."
        : "Enable Pharma builds and runs institutional (unbranded) disease awareness platforms as a recurring service for healthcare companies.",
  };
}

export function professionalServiceSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#service`,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    areaServed: ["IT", "EU"],
    availableLanguage: ["it", "en"],
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
    description:
      locale === "it"
        ? "Piattaforme di disease awareness compliant as-a-service: audit normativo, hub di patologia, podcast, community management e farmacovigilanza."
        : "Compliant disease awareness platforms as a service: regulatory audit, condition hubs, podcasts, community management and pharmacovigilance.",
    makesOffer: [
      {
        "@type": "Offer",
        name:
          locale === "it"
            ? "Awareness & Compliance Audit"
            : "Awareness & Compliance Audit",
        description:
          locale === "it"
            ? "Audit di patologia, stakeholder e perimetro normativo a prezzo fisso, 4–6 settimane."
            : "Fixed-price condition, stakeholder and regulatory-scope audit, 4–6 weeks.",
      },
      {
        "@type": "Offer",
        name:
          locale === "it"
            ? "Piattaforma di Awareness as-a-service"
            : "Awareness Platform as a service",
        description:
          locale === "it"
            ? "Piattaforma di awareness unbranded gestita in retainer: contenuti, community, farmacovigilanza, reporting."
            : "Unbranded awareness platform on retainer: content, community, pharmacovigilance, reporting.",
      },
    ],
  };
}

// FAQ answers carry inline [label](/path) links for the rendered page;
// the structured data has to be clean text.
const stripLinks = (s: string) => s.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: stripLinks(item.answer) },
    })),
  };
}

export function articleSchema(article: Article, locale: Locale, url: string) {
  const lang = article.content[locale];
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    // Google truncates headlines past ~110 chars; fall back to the SEO
    // title (always <= 60) rather than emit an over-long headline.
    headline: lang.title.length <= 110 ? lang.title : lang.metaTitle,
    description: lang.metaDescription,
    image: [`${siteConfig.url}${locale === "it" ? "" : "/en"}/opengraph-image`],
    // A bare date is ambiguous to a crawler; pin it to a wall-clock time
    // in the publication's own timezone.
    datePublished: `${article.date}T09:00:00+02:00`,
    dateModified: `${article.date}T09:00:00+02:00`,
    inLanguage: locale,
    mainEntityOfPage: url,
    keywords: article.keywords[locale].join(", "),
    author: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(d).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
