import type { Metadata } from "next";
import { site } from "@/content/site";

const title = `${site.name} — ${site.role} ${site.city}`;

const keywords = [
  "makeup artist jakarta",
  "jasa makeup jakarta",
  "mua jakarta",
  "makeup pengantin jakarta",
  "makeup prewedding jakarta",
  "makeup wisuda jakarta",
  "makeup party jakarta",
  "faby cion",
  "mua profesional jakarta",
];

export const siteMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
