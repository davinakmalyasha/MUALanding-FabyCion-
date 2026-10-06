# PLAN.md — Faby Cion MUA Landing Page

Single-page, SEO-optimised marketing site for **Faby Cion**, a professional makeup artist
in Jakarta. Content structure modelled on the client reference (devymua.com) but rebuilt as a
fast, modern Next.js app instead of WordPress. Deploys to Vercel.

---

## 1. Locked decisions

| Decision | Choice |
| --- | --- |
| Framework | Next.js 16.3.8 — App Router, Server Components by default |
| Language | **TypeScript**, `strict: true`, no `any` |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`) |
| Animation | `motion` (Framer Motion v12) via `LazyMotion` + `domAnimation` |
| "Dynamic one page" | One scrolling page, **all content in typed config files**, scroll-reveal animations, filterable gallery + lightbox |
| Language of content | Indonesian only (`lang="id"`) |
| WhatsApp | `+62 852-1778-7182` → `https://wa.me/6285217787182` |
| Photos | All 13, grouped by look type, filterable |
| Palette | Ivory · champagne gold · deep charcoal |
| Domain | Free Vercel subdomain (`.vercel.app`) for now — real domain later |
| Git | Two branches: **`development`** (daily work) and **`main`** (production) |
| Hosting | Vercel |

### Branch strategy

- `development` — default working branch. All feature work lands here.
- `main` — production. Only receives merges from `development` when a release is approved.
- Deploy `main` → production URL, `development` → preview build (automatic on Vercel).

---

## 2. Client data extracted from the flyer

Source: `Image/WhatsApp Image 2026-10-06 at 4.19.34 PM.jpeg`

- **Brand:** Faby Cion — "Professional Makeup Artist Jakarta"
- **Email:** Fabycion@gmail.com
- **Instagram:** @Fabycions
- **WhatsApp:** 0852-1778-7182
- **Certifications:** Hefty Makeup Academy · Foxy Beauty Korean Eyelash Extension

### Rate card → `src/content/services.ts`

| Service | Price |
| --- | --- |
| Makeup Pengantin (Wedding) | mulai Rp 1.900.000 |
| Makeup Prewedding | Rp 750.000 |
| Makeup Bridesmaid | Rp 500.000 |
| Makeup Graduasi (Wisuda) | Rp 400.000 |
| Makeup Party / Event | Rp 350.000 |
| Commercial TV & Digital | Rp 3.000.000 |

Disclaimer, rendered verbatim: *"Harga belum termasuk biaya transport dan softlens."*

---

## 3. Project structure

```
MUALandingPage/
├── public/
│   ├── images/
│   │   ├── portfolio/           # 13 renamed .jpg
│   │   └── brand/rate-card.jpg  # downloadable flyer
│   ├── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx           # fonts, metadata, JSON-LD
│   │   ├── page.tsx             # assembles sections
│   │   ├── globals.css          # Tailwind + @theme tokens
│   │   ├── opengraph-image.tsx  # dynamic OG via ImageResponse
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── manifest.ts
│   ├── components/
│   │   ├── layout/    Header, Footer, MobileNav
│   │   ├── sections/  Hero, Stats, About, Services, Portfolio,
│   │   │              Process, Testimonials, Faq, CtaBanner
│   │   └── ui/        Button, Container, Section, Reveal,
│   │                  Lightbox, Accordion, FilterTabs, Icon
│   ├── content/       # ← the "dynamic" layer. Zero JSX.
│   │   ├── site.ts
│   │   ├── services.ts
│   │   ├── portfolio.ts
│   │   ├── testimonials.ts
│   │   ├── faq.ts
│   │   └── process.ts
│   ├── lib/
│   │   ├── seo.ts
│   │   ├── schema.ts
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── hooks/
│   │   ├── useScrollSpy.ts
│   │   ├── useLockBodyScroll.ts
│   │   └── useMediaQuery.ts
│   └── types/index.ts
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
├── .env.example
└── PLAN.md
```

**Core principle:** components render from `content/*`. Editing prices, photos, testimonials
or FAQ never requires touching a `.tsx` file. This is what makes the page "dynamic" without
needing a CMS.

---

## 4. Page sections

1. **Header** — sticky; transparent over hero → solid + blur on scroll; anchor nav with
   scroll-spy; WhatsApp CTA
2. **Hero** — name, tagline, portrait; primary WhatsApp CTA + "Lihat Portofolio"
3. **Stats strip** — years / clients / looks / rating
4. **About + Sertifikasi** — bio, two certification badges
5. **Layanan & Rate Card** — six pricing cards + disclaimer + "Unduh Rate Card"
6. **Portofolio** — filter tabs, grid, click → lightbox with keyboard nav
7. **Cara Booking** — numbered steps
8. **Testimoni** — quote cards
9. **FAQ** — accordion, drives `FAQPage` schema
10. **CTA Banner + Footer** — contact, hours, service area, socials

---

## 5. Image pipeline

Semantic slugs so URLs and `alt` text stay meaningful:

| Source | New path | Category |
| --- | --- | --- |
| `MUA.jpeg` | `portfolio/profile.jpg` | About / hero portrait |
| `15.03.33.jpeg` | `portfolio/bridal-01.jpg` | Pengantin |
| `15.03.35.jpeg` | `portfolio/bridal-02.jpg` | Pengantin |
| `15.05.15.jpeg` | `portfolio/bridal-03.jpg` | Pengantin |
| `15.03.33 (1).jpeg` | `portfolio/prewedding-01.jpg` | Prewedding |
| `15.03.34 (2).jpeg` | `portfolio/prewedding-02.jpg` | Prewedding |
| `15.03.34.jpeg` | `portfolio/glam-01.jpg` | Party & Glam |
| `15.03.34 (1).jpeg` | `portfolio/glam-02.jpg` | Party & Glam |
| `15.03.34 (3).jpeg` | `portfolio/glam-03.jpg` | Party & Glam |
| `15.03.36.jpeg` | `portfolio/glam-04.jpg` | Party & Glam |
| `15.03.35 (1).jpeg` | `portfolio/party-01.jpg` | Party & Glam |
| `15.05.18.jpeg` | `portfolio/formal-01.jpg` | Formal |
| `15.05.18 (1).jpeg` | `portfolio/formal-02.jpg` | Formal |
| `4.19.34 PM.jpeg` | `brand/rate-card.jpg` | Download CTA |

Served with `next/image` (`fill` + `object-cover` + explicit `sizes`), `quality={80}`,
AVIF/WebP negotiated by Vercel.

> **Notes**
> - `formal-01/02` feature a visibly different, mature model versus the rest of the set. They
>   are easy to swap — replace the file, no code change.
> - No graduation or commercial photos were supplied. Those two services render without a
>   dedicated gallery image. Worth requesting from the client.

---

## 6. Design system

Tokens declared in `src/app/globals.css` under `@theme`:

- `ivory` `#FAF7F2` — page background
- `champagne` `#C9A961` — accent, rules, numerals
- `charcoal` `#1C1B1A` — text, dark sections
- `sand` `#E8D9D0` — muted blush surface

Typefaces via `next/font/google`: **Playfair Display** (display serif) +
**Plus Jakarta Sans** (body), both with `display: 'swap'`.

Principles: generous whitespace, hairline borders, no heavy shadows, fluid `clamp()` type
scale, one shared `Container` max-width. Restrained motion — reveals fade and lift ~16px,
nothing bounces or spins.

---

## 7. SEO

- **Metadata API** — `metadataBase`, title template, description, keywords, canonical,
  Open Graph + Twitter cards
- **JSON-LD** in `layout.tsx`: `BeautySalon` / `LocalBusiness` (address, geo, opening hours,
  price range), `Person`, `OfferCatalog` generated from `services.ts`, `FAQPage` from
  `faq.ts`, `ImageGallery`
- `sitemap.ts`, `robots.ts`, `manifest.ts`
- Dynamic `opengraph-image.tsx` (1200×630) rendered from site config
- Local-intent copy throughout: "MUA Jakarta", "jasa makeup artist Jakarta", district names
- Semantic landmarks, exactly one `<h1>`, descriptive `alt` per photo

---

## 8. Quality gates

- `npm run lint`, `tsc --noEmit`, `next build` — all clean, zero TypeScript errors
- Lighthouse targets: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 98 on mobile
- `prefers-reduced-motion` respected site-wide
- Keyboard-navigable lightbox (Esc / ← / →), focus trap in mobile nav, visible focus rings
- Images lazy below the fold; hero portrait `priority`

---

## 9. Implementation phases

1. **Scaffold** — Next.js 16 + TypeScript + Tailwind v4 + `src/`; install `motion`
2. **Content layer** — `content/*.ts` + `types/index.ts`; move and rename images
3. **Primitives** — `Container`, `Section`, `Button`, `Reveal`, `Icon`
4. **Sections** — Hero → Stats → About → Services → Portfolio → Process →
   Testimonials → FAQ → CTA → Footer
5. **Interactivity** — filterable gallery, lightbox, accordion, mobile nav, scroll-spy
6. **SEO** — metadata, JSON-LD, sitemap, robots, OG image
7. **A11y + polish** — reduced motion, focus states, empty states
8. **Verify** — build, responsive pass at 375 / 768 / 1440
9. **Ship** — push to GitHub → import into Vercel → claim `.vercel.app` subdomain

---

## 10. Out of scope

Blog, multi-page routes, booking/payment backend, CMS dashboard, live Instagram feed,
analytics (add Vercel Analytics later if wanted).

---

## 11. Open items

Placeholder data ships for everything below. All of it lives in `src/content/` and is
swapped in one file each once the client replies.

| # | Item | Where | Status |
| --- | --- | --- | --- |
| 1 | Real domain (currently Vercel subdomain) | `site.ts` → `url` | placeholder |
| 2 | Stats: years, clients, looks, rating | `site.ts` → `stats` | dummy |
| 3 | Real testimonials | `testimonials.ts` | dummy |
| 4 | Service area / districts covered | `site.ts` → `serviceArea` | dummy |
| 5 | Business hours | `site.ts` → `hours` | dummy |
| 6 | Logo artwork | `layout/Header`, `Footer` | text lockup |
| 7 | Wisuda + commercial photos | `portfolio.ts` | missing |

Each placeholder is tagged with a `// TODO(client):` comment so nothing is missed in review.
