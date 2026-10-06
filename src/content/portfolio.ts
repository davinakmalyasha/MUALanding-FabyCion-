import type { PortfolioCategoryMeta, PortfolioImage } from "@/types";

export const portfolioCategories = [
  { id: "all", label: "Semua" },
  { id: "pengantin", label: "Pengantin" },
  { id: "prewedding", label: "Prewedding" },
  { id: "party", label: "Party & Glam" },
  { id: "formal", label: "Formal" },
] satisfies PortfolioCategoryMeta[];

/**
 * All photographs supplied by the client, grouped by look type.
 * Every gallery image is 2:3 portrait (1066x1600).
 *
 * TODO(client): formal-01 and formal-02 feature a different model than the rest
 * of the set. Swap the files in place — no code change needed.
 */
export const portfolio = [
  {
    src: "/images/portfolio/bridal-01.jpg",
    alt: "Makeup pengantin Faby Cion dengan look bridal lembut, gaun putih, aksesoris bunga lily, dan kalung berlapis.",
    category: "pengantin",
    width: 854,
    height: 1280,
  },
  {
    src: "/images/portfolio/bridal-02.jpg",
    alt: "Makeup pengantin Faby Cion bergaya Korea natural flawless dengan gaun bertekstur putih dan anting mutiara.",
    category: "pengantin",
    width: 1066,
    height: 1600,
  },
  {
    src: "/images/portfolio/bridal-03.jpg",
    alt: "Makeup pengantin Faby Cion dengan gaun tulle mutiara dan selendang.",
    category: "pengantin",
    width: 1066,
    height: 1600,
  },
  {
    src: "/images/portfolio/prewedding-01.jpg",
    alt: "Makeup prewedding Faby Cion dengan ombre hair, gaun putih, dan aksesoris berlapis.",
    category: "prewedding",
    width: 854,
    height: 1280,
  },
  {
    src: "/images/portfolio/prewedding-02.jpg",
    alt: "Makeup prewedding natural Faby Cion dengan riasan kulit cerah dan blus berruffle putih.",
    category: "prewedding",
    width: 1066,
    height: 1600,
  },
  {
    src: "/images/portfolio/glam-01.jpg",
    alt: "Makeup glam Faby Cion dengan gaun one-shoulder hitam dan lashes dramatis.",
    category: "party",
    width: 1066,
    height: 1600,
  },
  {
    src: "/images/portfolio/glam-02.jpg",
    alt: "Makeup glam Faby Cion dengan lipstick merah pekat, rambut bergelombang, dan anting berlian.",
    category: "party",
    width: 1066,
    height: 1600,
  },
  {
    src: "/images/portfolio/glam-03.jpg",
    alt: "Makeup party Faby Cion dengan gaun pita hitam, updo elegan, dan anting statement.",
    category: "party",
    width: 1066,
    height: 1600,
  },
  {
    src: "/images/portfolio/glam-04.jpg",
    alt: "Makeup glam Faby Cion dengan gaun berbulu hitam, rambut bergelombang, dan soft glam.",
    category: "party",
    width: 1066,
    height: 1600,
  },
  {
    src: "/images/portfolio/party-01.jpg",
    alt: "Makeup party Faby Cion dengan gaun putih, gaya natural, dan anting perak.",
    category: "party",
    width: 1066,
    height: 1600,
  },
  {
    src: "/images/portfolio/formal-01.jpg",
    alt: "Makeup formal Faby Cion dengan gaun sequin navy, kalung berlian, dan tampilan elegan.",
    category: "formal",
    width: 1066,
    height: 1600,
  },
  {
    src: "/images/portfolio/formal-02.jpg",
    alt: "Makeup formal Faby Cion dengan gaun sequin perak, natural makeup, dan aksesoris sederhana.",
    category: "formal",
    width: 1066,
    height: 1600,
  },
] satisfies PortfolioImage[];

export const profileImage = {
  src: "/images/portfolio/profile.jpg",
  alt: "Potret Faby Cion, makeup artist profesional di Jakarta.",
  width: 1086,
  height: 1448,
};
