import type { CSSProperties } from "react";
import type { Metadata, Viewport } from "next";
import { Playfair, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteMetadata } from "@/lib/seo";
import { buildJsonLd } from "@/lib/schema";
import { HEADER_HEIGHT } from "@/lib/constants";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
      style={{ "--header-height": `${HEADER_HEIGHT}px` } as CSSProperties}
    >
      <body className="flex min-h-full flex-col bg-ivory text-charcoal">
        <a
          href="#main"
          className="sr-only rounded-full focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-70 focus:bg-charcoal focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
        >
          Lewati ke konten utama
        </a>

        <MotionProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>

        <script
          type="application/ld+json"
          // Structured data is built from our own typed content config.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </body>
    </html>
  );
}
