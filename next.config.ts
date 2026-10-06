import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only emits the qualities listed here.
    qualities: [70, 80, 85],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
