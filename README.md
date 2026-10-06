# eEdu.bd Docs (docs.eedu.bd)

The official **User & Integration documentation website** for [eEdu.bd](https://eedu.bd) — the enterprise education management platform for Bangladeshi schools, colleges, madrasas, universities and coaching centers.

The site is built with **Next.js (App Router) + Fumadocs (MDX)** and is written from the end-user and device-technician's perspective: step-by-step guides for hardware setup, custom domains, everyday school operations, and troubleshooting.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Docs framework | Fumadocs (`fumadocs-mdx`, `fumadocs-core`, `fumadocs-ui`) |
| Content | MDX, authored in `content/docs/` |
| Styling | Tailwind CSS v4 |
| Icons | `lucide-react` |
| Package manager | `pnpm` |

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 — the root `/` redirects straight to **`/docs`** (there is no landing page).

### Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build (`next build`) |
| `pnpm start` | Serve the production build |
| `pnpm types:check` | Route type generation + `tsc --noEmit` |
| `pnpm lint` | ESLint (currently broken at the toolchain level — see Troubleshooting) |

## Project layout

```
app/
  layout.tsx                  Root layout: site metadata, JSON-LD, fonts
  page.tsx                    Redirects / → /docs
  docs/[[...slug]]/page.tsx   Docs page render + per-page metadata/OG
  robots.ts                   /robots.txt
  sitemap.ts                  /sitemap.xml (all doc pages)
  manifest.ts                 /manifest.webmanifest (PWA)
  api/search/route.ts         Fumadocs search API
  og/docs/[...slug]/route.tsx Generated per-page OpenGraph images
  favicon.ico · icon.png · apple-icon.png   (copied from eedu-web)
content/
  docs/                       All documentation MDX + sidebar meta.json files
lib/
  source.ts                   Fumadocs content source (loader + llms)
  shared.ts                   appName, siteUrl, docsRoutes, gitConfig
  layout.shared.tsx           Docs layout options (brand logo + GitHub link)
  seo.ts                      siteConfig + shared metadata (OG/Twitter/robots)
components/
  mdx.tsx                     MDX component mapping
public/
  images/logo.png             Sidebar / OG brand logo
  images/icon.png             Square app icon
```

## Internationalization (English & Bangla)

The site is fully bilingual — `en` and `bn` — with a **language switcher** in the docs nav.

- **URL scheme:** `docs.eedu.bd/en/docs/...` and `docs.eedu.bd/bn/docs/...`. `/`, `/docs`, `/en` and `/bn` are 302-redirected with `public/_redirects` (`/` → `/en/docs`, etc.). Browser `Accept-Language` negotiation is intentionally not used (fully static export).
- **Content:** every document exists twice, under `content/docs/en/` (English) and `content/docs/bn/` (Bangla). Section folders and file names match across languages so slugs align.
- **Config:** `lib/i18n.ts` holds the `defineI18n({ languages: ['en','bn'], parser: 'dir' })` config plus Bangla UI (search/theme/pagination) string translations.
- **Routing:** pages/layouts live under `app/[lang]/`. The docs are a **static export** (`output: 'export'`), so there is no middleware; locale redirects hang off the static `_redirects` file.
- **SEO:** each page emits a canonical URL plus `hreflang` alternates (`en`, `bn`, `x-default`). `robots.txt`, `sitemap.xml` and `manifest.webmanifest` are generated into `public/` by `scripts/prebuild.mjs` at build time.

To add a new page: write the `.mdx` in **both** `content/docs/en/<section>/` and `content/docs/bn/<section>/`, list it in the matching `meta.json` `pages` array, and keep the file names identical.

## Authoring content

### Adding a page

1. Create an `.mdx` file under `content/docs/<section>/`.
2. Add frontmatter:

```mdx
---
title: Page Title
description: One-line description shown under the heading and in search.
icon: House
---

...markdown content...
```

3. Register the page in that section's `meta.json` `pages` array to set the sidebar order and (optionally) a folder `icon`.

### Section structure

```
content/docs/
  en/                             English docs
    index.mdx · meta.json         Docs landing + sidebar order
    hardware-guide/               Device & Biometric Setup
    website-and-domain/           Custom Domain & Website
    school-operations/            Everyday School Operations
    troubleshooting/              Troubleshooting & FAQ
  bn/                             বাংলা ডকুমেন্টেশন (same structure)
```

### Writing conventions

- **Task-oriented** — walk users through Step 1, Step 2, Step 3.
- **No internals** — never mention server code, databases, or API endpoints in user docs. The only exception is the device **push URL**, which is a device-level setting technicians must type in.
- Use callouts where helpful:

```mdx
> [!NOTE]
> Short neutral note.

> [!TIP]
> A helpful best practice.

> [!WARNING]
> Warn about a risky action.

> [!DANGER]
> Warn about data loss or security.
```

- Use `<Cards>`/`<Card>` and tables for navigation and reference content.
- Screenshot and diagram placeholders are written as visible `> [!NOTE]` boxes so an editor knows what to add later.

### Icons

Meta `icon` values are **lucide-react** component names. Note that newer lucide versions renamed icons — verify first with:

```bash
node -e "const {icons}=require('lucide-react'); console.log('House' in icons, 'FingerprintPattern' in icons)"
```

Known renames: `Home → House`, `Fingerprint → FingerprintPattern`.

## SEO & branding

- **Site URL** — override with `NEXT_PUBLIC_SITE_URL` (default `https://docs.eedu.bd`). It drives `metadataBase`, canonical URLs, OG absolute URLs, sitemap and robots.
- **Repo** — the nav GitHub icon and "view on GitHub" link use `gitConfig` in `lib/shared.ts` (`simplifybd/eedu-docs`). Point it at the real repository if it moves.
- Every page gets: a `title | eEdu.bd Docs` tab title, description, canonical URL, and a generated per-page OG image (`/og/docs/...`).
- The root layout injects `Organization` + `WebSite` JSON-LD.
- `robots.txt`, `sitemap.xml` and `manifest.webmanifest` are generated at build time.

## Coordinating with eedu-web

- Icons (`favicon.ico`, `icon.png`, `apple-icon.png`) and the brand images are copied from the `eedu-web` project — re-copy when the brand changes.
- The eEdu.bd public site links to `https://docs.eedu.bd` from the landing **footer** ("Documentation & Help Center") and the **FAQ page**.
- `siteConfig` in `lib/seo.ts` mirrors eedu-web's `lib/seo/site.ts` (name, socials, support contact, OG image) — keep them in sync.

## Deployment (Cloudflare)

`docs.eedu.bd` is a **fully static Next.js export** — `output: 'export'`, no server runtime, no middleware, no Node-only route handlers. Everything generates into `out/` and Cloudflare serves it at the edge.

- **`next.config.mjs`** — `output: 'export'` + `images: { unoptimized: true }`.
- **`scripts/prebuild.mjs`** — runs before `next build` (npm/pnpm `prebuild` hook) and generates into `public/`:
  - `search/search-index.json` — Fumadocs **static search index** (i18n, unified ZBSearch export) built with `createI18nSearchAPI('simple', …)`.
  - `robots.txt`, `sitemap.xml` (all localized pages), `manifest.webmanifest`.
  - `_redirects` — `/ → /en/docs`, `/docs → /en/docs`, `/en → /en/docs`, `/bn → /bn/docs` (302s).
- **Search** — the built-in search dialog is switched to the static client via `RootProvider search={{ options: { type: 'static', api: '/search/search-index.json' } }}` in `app/[lang]/layout.tsx`. It downloads the index and searches 100% client-side, with per-locale filtering.
- **`public/_redirects`**, **`public/manifest.webmanifest`**, **`public/robots.txt`**, **`public/sitemap.xml`** replace the Next.js metadata/route handlers that don't exist in static export.
- **`wrangler.jsonc`** — committed Cloudflare config. Because the build pipeline runs `npx wrangler deploy`, wrangler is pointed at the static export as **Worker Static Assets** (`assets: { directory: "out" }`) so it never falls into the OpenNext/`output:'standalone'` flow.
- **`.github/workflows/ci.yml`** — freeze-install → `pnpm types:check` → `pnpm build`.

### Deploy

This pipeline uses the **build command `pnpm run build`** then the **deploy command `npx wrangler deploy`**:

```bash
pnpm build          # prebuild generates static assets, then exports to out/
pnpm deploy         # wrangler deploy  → uploads out/ as Worker Static Assets
pnpm preview        # wrangler pages dev out  (local static preview)
```

`wrangler deploy --dry-run` (no auth) already validates: `Read 266 files from the assets directory out` — the OpenNext auto-config is bypassed because `wrangler.jsonc` is committed.

> **Why not OpenNext?** An earlier build log showed `wrangler deploy` auto-detecting Next.js, running `@opennextjs/cloudflare migrate`, and failing on
> `ENOENT: .next/standalone/.next/server/pages-manifest.json` — OpenNext requires `output: 'standalone'`, which is incompatible with our static export. Committing `wrangler.jsonc` with `assets.directory` prevents that.

### Alternative: Cloudflare Pages dashboard

If you deploy from the Pages Git panel instead of wrangler:

| Setting | Value |
| --- | --- |
| Framework preset | **Next.js (Static HTML Export)** |
| Build command | `pnpm build` |
| Build output directory | `out` |
| Node version | `NODE_VERSION=22` (as env var, or `.node-version`) |
| Environment variables | `NEXT_PUBLIC_SITE_URL=https://docs.eedu.bd` |
| Compatibility flags | None (no `nodejs_compat` needed — pure static) |

### Notes / tradeoffs of full static export

- **No middleware**: `Accept-Language` negotiation and `Accept: text/markdown`/`.md` content negotiation were removed. Unprefixed paths redirect to English via `_redirects`; visitors switch language with the nav dropdown.
- **No per-page OG route**: all pages share the static `/images/logo.png` social preview image.
- **No server search**: search is client-side against the prebuilt index (fast, fully static).
- Dynamic/Image optimization is off (`unoptimized`) since there is no server to resize images.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `A tree hydrated but some attributes…` with `cz-shortcut-listen` | Browser extension modifying `<body>`; `suppressHydrationWarning` is already set on `<body>` |
| `metadataBase` warning | `metadataBase` is set in `lib/seo.ts` via `NEXT_PUBLIC_SITE_URL` |
| `pnpm lint` fails (`typescript-eslint does not support TS 7.0`) | Pre-existing toolchain incompatibility in this template; verify with `pnpm types:check` instead |
| GitHub icon missing from nav | Confirm `gitConfig` is the real repo in `lib/shared.ts` and rebuild (stale `.next` cache hides changes) |

## Learn more

- [Fumadocs Docs](https://fumadocs.dev)
- [Fumadocs MDX (Macro API)](https://fumadocs.dev/docs/mdx)
- [Next.js Documentation](https://nextjs.org/docs)