import { ADDRESS, BRAND, CONTACT, HOURS, SOCIAL, STATS } from "@pestosot/config";
import { faqs } from "./content";

/** Organization + LocalBusiness JSON-LD for the homepage. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${BRAND.url}/#organization`,
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: BRAND.url,
    description: BRAND.description,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    foundingDate: String(BRAND.foundedYear),
    areaServed: { "@type": "City", name: ADDRESS.city },
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.state,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ADDRESS.geo.lat,
      longitude: ADDRESS.geo.lng,
    },
    openingHoursSpecification: HOURS.schemaSpec.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: STATS.googleRating,
      reviewCount: STATS.googleReviews,
    },
    sameAs: Object.values(SOCIAL),
  };
}

/** WebSite JSON-LD — improves entity understanding for search & answer engines. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BRAND.url}/#website`,
    url: BRAND.url,
    name: BRAND.name,
    description: BRAND.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${BRAND.url}/#organization` },
  };
}

/** FAQPage JSON-LD. */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Service JSON-LD for a service detail page. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  category: string;
  faqs?: { q: string; a: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.category,
    url: opts.url,
    areaServed: { "@type": "City", name: ADDRESS.city },
    provider: { "@id": `${BRAND.url}/#organization`, name: BRAND.name },
    ...(opts.faqs?.length
      ? {
          mainEntityOfPage: {
            "@type": "FAQPage",
            mainEntity: opts.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        }
      : {}),
  };
}

/** BreadcrumbList JSON-LD. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Render-ready <script> JSON for a schema object. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data) };
}
