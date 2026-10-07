# Faby Cion MUA — Landing Page

One-page marketing site for **Faby Cion**, a professional makeup artist in Jakarta.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · deployed on Vercel.

See [PLAN.md](./PLAN.md) for the full build plan and rationale.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | Lint + typecheck together |

## Editing content — no component changes needed

Everything the visitor reads lives in `src/content/`:

| File | Holds |
| --- | --- |
| `site.ts` | Brand, contact details, socials, certifications, nav links, stats |
| `services.ts` | The rate card (prices, names, descriptions) |
| `portfolio.ts` | Gallery images, categories and `alt` text |
| `process.ts` | The five booking steps |
| `faq.ts` | Questions and answers (also drives the `FAQPage` schema) |
| `testimonials.ts` | Client reviews |

Two sections are **self-hiding** by design and will appear the moment you add
content, with no code change:

- `Stats` renders only while `site.stats` is non-empty.
- `Testimonials` renders only while `testimonials` is non-empty.

The FAQ, service pricing and portfolio are wired into the structured data
automatically, so adding an entry there updates the JSON-LD too.

## Swapping a photo

Replace the file in place — keep the same filename. Dimensions are declared in
`portfolio.ts`; update `width`/`height` if you use a different aspect ratio.

> `formal-01.jpg` and `formal-02.jpg` feature a different model than the rest of
> the set. Swap them out whenever the client sends replacements.

## Brand tokens

Declared once in `src/app/globals.css` under `@theme`:

| Token | Value | Used for |
| --- | --- | --- |
| `ivory` | `#faf7f2` | Page background |
| `ivory-deep` | `#f2ece1` | Alternating sections |
| `charcoal` | `#1b1a18` | Text, dark sections |
| `champagne` | `#b08d4f` | Decorative rules and borders, text on dark |
| `gold` | `#7d5f28` | Accent text on light backgrounds |

`champagne` is deliberately **not** used for copy on light backgrounds — it only
reaches 2.9:1 contrast there. `gold` is the accessible accent for light surfaces.

## Icons

`src/app/icon.svg` is the source of truth: a geometric `F` monogram built from
rectangles, so it renders identically everywhere without depending on a font
being installed. It is the App Router's icon route, and Next emits the `<link>`
tags for it automatically.

`favicon.ico` (16/32/48) and `apple-icon.png` (180) are generated from that same
SVG. If the monogram changes, regenerate them rather than hand-editing, or the
three will drift.

There is no `.ico` fallback beyond the generated file. Browsers without SVG icon
support fall back to `favicon.ico`, which is why it exists.

## Security headers and caching

Both live in `next.config.ts`.

**Headers.** `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy` and `Permissions-Policy` are applied to every route, and
`poweredByHeader` is off.

The CSP allows `'unsafe-inline'` on `script-src` and `style-src`. That is a real
weakening, and it is deliberate:

- App Router emits inline bootstrap scripts for hydration. The clean fix is
  per-request nonces via middleware, but that forces dynamic rendering and costs
  this site its fully static prerender — a bad trade for a landing page.
- Several components set inline `style` attributes, which `style-src` blocks.

Everything else is enforced: `object-src 'none'`, `base-uri 'self'`,
`form-action 'self'`, `frame-ancestors 'none'`, `upgrade-insecure-requests`.

**Caching.** Fingerprinted assets under `/_next/static` already get
`max-age=31536000, immutable` from Next and are left alone. The security rule
matches those routes too, so it must never set `Cache-Control` or it would
override that.

Two rules are added:

| Route | Cache-Control | Why |
| --- | --- | --- |
| `/` | `max-age=0, s-maxage=3600, stale-while-revalidate=86400` | Short edge TTL so a content edit reaches visitors quickly |
| `/images/*` | `max-age=86400, stale-while-revalidate=604800` | Client photography |

`/images/*` is deliberately **not** `immutable`. Those filenames are not
fingerprinted and the client is expected to replace `formal-01/02` and the rate
card, so a long-lived browser cache would keep serving the old files.

## Branching

- `development` — daily work. Everything lands here first.
- `main` — production. Only receives merges from `development` on release.

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs lint, typecheck and
a production build on every push and pull request to either branch, so a broken
change can't reach `main` unseen.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo.
3. Leave the framework preset as Next.js.
4. Deploy. `main` becomes production, `development` gets a preview URL.
5. Settings → Domains → set the domain you want.
6. Settings → Environment Variables → set `NEXT_PUBLIC_SITE_URL` to that domain,
   so canonical URLs, the sitemap, robots.txt and the Open Graph card all resolve
   to the real host. This is the only variable the site uses.

Two things to check on a fresh project, both of which will otherwise look like
"the site is broken" to a visitor:

- **Settings → Deployment Protection → Vercel Authentication → Disabled.**
  While enabled, every visit redirects to a Vercel login page.
- `NEXT_PUBLIC_SITE_URL` must match the live domain. If it doesn't, the page
  still renders but `og:image` and `canonical` point at the wrong host, so link
  previews on WhatsApp and Instagram come up blank.
