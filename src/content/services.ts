import type { Service } from "@/types";

/**
 * Prices are taken verbatim from the client's rate card.
 * TODO(client): confirm the one-line descriptions below are accurate.
 */
export const services = [
  {
    slug: "pengantin",
    name: "Makeup Pengantin",
    description:
      "Look pengantin yang tetap natural di foto, bertahan seharian, dan disesuaikan dengan warna kulit serta bentuk wajah.",
    price: "Rp 1.900.000",
    pricePrefix: "Mulai",
    featured: true,
  },
  {
    slug: "prewedding",
    name: "Makeup Prewedding",
    description:
      "Look prewedding dari natural sampai soft glam, mulai dari persiapan hingga eksekusi sesi foto.",
    price: "Rp 750.000",
  },
  {
    slug: "bridesmaid",
    name: "Makeup Bridesmaid",
    description:
      "Riasan yang serasi dengan sang pengantin, untuk sister, bridesmaid, dan penerima tamu.",
    price: "Rp 500.000",
  },
  {
    slug: "graduasi",
    name: "Makeup Graduasi",
    description:
      "Riasan fresh dan fotogenik untuk wisuda — tetap sleek di setiap sudut.",
    price: "Rp 400.000",
  },
  {
    slug: "party",
    name: "Makeup Party / Event",
    description:
      "Untuk pesta, gathering, atau acara lainnya. Ringan, cepat, dan tetap maksimal di kamera.",
    price: "Rp 350.000",
  },
  {
    slug: "commercial",
    name: "Commercial TV & Digital",
    description:
      "Makeup untuk kebutuhan syuting iklan, konten digital, dan produksi audiovisual.",
    price: "Rp 3.000.000",
  },
] satisfies Service[];

/** Rendered verbatim from the rate card. */
export const priceDisclaimer =
  "Harga belum termasuk biaya transport dan softlens.";

export const rateCardAsset = {
  label: "Unduh Rate Card",
  href: "/images/brand/rate-card.jpg",
};
