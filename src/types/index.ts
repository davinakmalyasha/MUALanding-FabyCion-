export type PortfolioCategory = "pengantin" | "prewedding" | "party" | "formal";

export interface PortfolioImage {
  src: string;
  alt: string;
  category: PortfolioCategory;
  width: number;
  height: number;
}

export interface PortfolioCategoryMeta {
  id: PortfolioCategory | "all";
  label: string;
}

export interface Service {
  slug: string;
  name: string;
  description: string;
  price: string;
  pricePrefix?: string;
  featured?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  occasion: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Certification {
  issuer: string;
  program: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}
