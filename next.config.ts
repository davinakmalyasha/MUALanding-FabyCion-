import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * 'unsafe-inline' is required on both script-src and style-src and is a real
 * weakening, so it is deliberate rather than an oversight:
 *
 * - App Router emits inline bootstrap scripts for hydration, and the clean fix
 *   (per-request nonces via middleware) forces dynamic rendering, which would
 *   cost this site its fully static prerender. Not worth it for a landing page.
 * - Several components set inline `style` attributes, which style-src blocks
 *   without it.
 *
 * Every other directive is enforced, which is what blocks the realistic
 * attacks: injected third-party scripts, framing for clickjacking, base-tag
 * hijacking, form exfiltration, and plugin content.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // Do not advertise the framework.
  poweredByHeader: false,

  images: {
    // Next 16 only emits the qualities listed here.
    qualities: [70, 80, 85],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        // Security headers on every route. This rule deliberately sets NO
        // Cache-Control: it matches /_next/static too, and a value here would
        // clobber the `immutable` caching Next gives fingerprinted assets.
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
      {
        // Client-supplied photography lives here and is expected to change, and
        // these filenames are not fingerprinted. Deliberately NOT `immutable`:
        // a long-lived browser cache would keep serving replaced photos.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // The document. Kept short so a content edit reaches visitors promptly:
        // s-maxage is the edge TTL, stale-while-revalidate serves the old copy
        // while a fresh one is fetched.
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;