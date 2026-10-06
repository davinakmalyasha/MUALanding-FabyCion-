import { site } from "@/content/site";
import { portfolio } from "@/content/portfolio";
import { services, priceDisclaimer } from "@/content/services";
import { faqs } from "@/content/faq";
import type { FaqItem, PortfolioImage, Service } from "@/types";

type Json = Record<string, unknown>;

const absolute = (path: string) => new URL(path, site.url).toString();

const organization = {
  "@type": "BeautySalon",
  "@id": `${site.url}/#business`,
  name: site.name,
  description: site.description,
  url: site.url,
  image: absolute("/images/portfolio/profile.jpg"),
  telephone: site.contact.phoneHref,
  email: site.contact.email,
  priceRange: "Rp 350.000 - Rp 3.000.000",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "ID",
  },
  areaServed: {
    "@type": "City",
    name: site.city,
  },
  sameAs: [
    `https://www.instagram.com/${site.contact.instagramHandle}/`,
  ],
} satisfies Json;

const person = {
  "@type": "Person",
  "@id": `${site.url}/#founder`,
  name: site.name,
  jobTitle: site.role,
  image: absolute("/images/portfolio/profile.jpg"),
  worksFor: { "@id": `${site.url}/#business` },
  hasCredential: site.certifications.map((cert) => ({
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certificate",
    recognizedBy: {
      "@type": "EducationalOrganization",
      name: cert.issuer,
    },
  })),
} satisfies Json;

function offerCatalog(items: Service[]): Json {
  return {
    "@type": "OfferCatalog",
    "@id": `${site.url}/#rate-card`,
    name: "Rate Card Faby Cion",
    description: priceDisclaimer,
    itemListElement: items.map((service) => ({
      "@type": "Offer",
      "@id": `${site.url}/#service-${service.slug}`,
      name: service.name,
      description: service.description,
      category: site.name,
      priceCurrency: "IDR",
      price: service.price.replace(/[^0-9]/g, ""),
      availability: "https://schema.org/InStock",
      seller: { "@id": `${site.url}/#business` },
    })),
  };
}

function faqPage(items: FaqItem[]): Json {
  return {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function imageGallery(images: PortfolioImage[]): Json {
  return {
    "@type": "ImageGallery",
    "@id": `${site.url}/#portofolio`,
    name: "Portofolio Hasil Makeup Faby Cion",
    associatedMedia: images.map((image) => ({
      "@type": "ImageObject",
      contentUrl: absolute(image.src),
      caption: image.alt,
    })),
  };
}

/**
 * Emitted as a single @graph so the nodes can reference each other by @id.
 */
export function buildJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@graph": [organization, person, offerCatalog(services), faqPage(faqs), imageGallery(portfolio)],
  };
}
