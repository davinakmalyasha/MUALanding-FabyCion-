import type { Certification, NavLink, SocialLink, Stat } from "@/types";

const WHATSAPP_NUMBER = "6285217787182";
const INSTAGRAM_HANDLE = "fabycions";
const EMAIL = "Fabycion@gmail.com";

export const whatsappMessage =
  "Halo Faby Cion, saya mau tanya-tanya soal jasa makeup.";

/** Builds a wa.me deep link with a pre-filled message. */
export function waLink(message: string = whatsappMessage): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Single source of truth for brand, contact details and SEO defaults.
 *
 * TODO(client): confirm the production domain. NEXT_PUBLIC_SITE_URL is set in
 * the Vercel project so the URL can change without a code deploy.
 */
export const site = {
  name: "Faby Cion",
  brandLine: "FABY CION",
  role: "Professional Makeup Artist",
  city: "Jakarta",
  tagline: "Tampil memukau di hari terpenting Anda.",
  description:
    "Faby Cion adalah jasa makeup artist profesional bersertifikat di Jakarta. Melayani makeup pengantin, prewedding, bridesmaid, wisuda, party, hingga commercial TV & digital.",

  /**
   * Drives canonical URLs, og:url, the sitemap and robots.txt.
   * Set NEXT_PUBLIC_SITE_URL in Vercel to override without a code deploy.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://muafabycion.vercel.app",

  contact: {
    /** International format, digits only — used to build wa.me links. */
    whatsapp: WHATSAPP_NUMBER,
    phoneDisplay: "0852-1778-7182",
    phoneHref: "+6285217787182",
    email: EMAIL,
    instagramHandle: INSTAGRAM_HANDLE,
    instagramUrl: `https://www.instagram.com/${INSTAGRAM_HANDLE}/`,
  },

  socials: [
    { label: "Instagram", href: `https://www.instagram.com/${INSTAGRAM_HANDLE}/` },
    { label: "WhatsApp", href: waLink() },
    { label: "Email", href: `mailto:${EMAIL}` },
  ] satisfies SocialLink[],

  certifications: [
    { issuer: "Hefty Makeup Academy", program: "Professional Makeup" },
    { issuer: "Foxy Beauty", program: "Korean Eyelash Extension" },
  ] satisfies Certification[],

  /**
   * Left empty on purpose — the client asked us not to publish unconfirmed
   * figures yet. Add entries and the Stats section renders automatically.
   */
  stats: [] as Stat[],

  navLinks: [
    { label: "Tentang", href: "#tentang" },
    { label: "Layanan", href: "#layanan" },
    { label: "Portofolio", href: "#portofolio" },
    { label: "Cara Booking", href: "#cara-booking" },
    { label: "FAQ", href: "#faq" },
  ] satisfies NavLink[],
} as const;
