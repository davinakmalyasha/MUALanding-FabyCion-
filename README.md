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

## Branching

- `development` — daily work. Everything lands here first.
- `main` — production. Only receives merges from `development` on release.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo.
3. Leave the framework preset as Next.js; no environment variables are required.
4. Deploy. `main` becomes production, `development` gets a preview URL.
5. Settings → Domains → claim the free `.vercel.app` subdomain.
6. Update `site.url` in `src/content/site.ts` to match, so canonical URLs, the
   sitemap and Open Graph tags resolve correctly.
