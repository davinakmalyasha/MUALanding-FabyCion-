import type { Certification, NavLink, SocialLink, Stat } from "@/types";

/**
 * Single source of truth for brand, contact details and SEO defaults.
 * TODO(client): confirm the production domain once the Vercel subdomain is claimed.
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
   * TODO(client): swap for the real domain once a custom domain is live.
   * Used for canonical URLs, sitemap and Open Graph tags.
   */
  url: "https://fabycion-mua.vercel.app",

  contact: {
    // International format, digits only — used to build wa.me links.
    whatsapp: "6285217787182",
    phoneDisplay: "0852-1778-7182",
    phoneHref: "+6285217787182",
    email: "Fabycion@gmail.com",
    instagramHandle: "fabycions",
  },

  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/fabycions/",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/6285217787182",
    },
    {
      label: "Email",
      href: "mailto:Fabycion@gmail.com",
    },
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

/** Pre-filled WhatsApp message so enquiries arrive pre-qualified. */
export const whatsappMessage =
  "Halo Faby Cion, saya mau tanya-tanya soal jasa makeup.";
