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

- **URL scheme:** `docs.eedu.bd/en/docs/...` and `docs.eedu.bd/bn/docs/...`. Hitting `/` or `/docs` auto-redirects to the browser's preferred language.
- **Content:** every document exists twice, under `content/docs/en/` (English) and `content/docs/bn/` (Bangla). Section folders and file names match across languages so slugs align.
- **Config:** `lib/i18n.ts` holds the `defineI18n({ languages: ['en','bn'], parser: 'dir' })` config plus Bangla UI (search/theme/pagination) string translations.
- **Routing:** pages/layouts live under `app/[lang]/`. `proxy.ts` runs the i18n middleware (locale redirect) plus `Accept: text/markdown` and `.md`-suffix content negotiation.
- **SEO:** each page emits a canonical URL plus `hreflang` alternates (`en`, `bn`, `x-default`); sitemap and OG images are generated per locale.

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

## Deployment

Single Next.js app, statically pre-rendered (SSG). Typical flow for `docs.eedu.bd`:

1. `pnpm build`
2. Serve `pnpm start` (Node) — or export/`output: 'export'` if fully static hosting is preferred.
3. Set `NEXT_PUBLIC_SITE_URL=https://docs.eedu.bd` in the environment.

## Deployment

`docs.eedu.bd` follows the same containerized, Traefik-proxied, VPS pipeline as [`eedu-web`](https://github.com/simplifybd/eedu-web) and [`eedu-api`](https://github.com/simplifybd/eedu-api):

- **`next.config.mjs`** — `output: "standalone"` produces a self-contained server bundle for Docker.
- **`app/api/health/route.ts`** — `/api/health` used by Docker + Traefik health checks.
- **`Dockerfile`** — two-stage `node:24-slim`: `pnpm install --frozen-lockfile` → `pnpm build`; runner runs the standalone `server.js` as non-root user `nextjs`. Ports are **single-source**: build arg `PORT` (default `3007`) drives `EXPOSE`, the `PORT` env and Traefik. Build arg `NEXT_PUBLIC_SITE_URL` bakes canonical URLs/`metadataBase`/sitemap.
- **`docker-compose.yaml`** — Traefik v3 labels: router `docs.eedu.bd` (websecure/letsencrypt), service `eedu-docs-svc` on `3007`, health check on `/api/health`, edge rate-limit + retry middlewares, resource limits, `no-new-privileges` + `cap_drop`, external `proxy`/`eedu-internal` networks.
- **`.github/workflows/ci.yml`** — push/PR on `development`: frozen-lockfile install → `pnpm types:check` → `pnpm build`. (Lint step is best-effort/`continue-on-error` because this template's TS 7.0.2 toolchain is not yet supported by typescript-eslint.)
- **`.github/workflows/deploy.yml`** — push to `main`: verify gate → `docker/build-push-action` to `ghcr.io/<repo>:latest` (build arg `NEXT_PUBLIC_SITE_URL`) → SSH to the VPS → sync `docker-compose.yaml` to `/srv/apps/eedu/docs` → write `.env` from secrets → `docker compose up -d --force-recreate --scale eedu-docs=N` → poll the Docker/Traefik health check.

### Deploying manually

```bash
# 1. Build locally (or pull from GHCR) — PORT defaults to 3007, override via .env
docker compose build --build-arg NEXT_PUBLIC_SITE_URL=https://docs.eedu.bd

# 2. Run on a host that already has the external `proxy` + `eedu-internal` networks
export NEXT_PUBLIC_SITE_URL=https://docs.eedu.bd
docker compose up -d
docker compose ps
```

`PORT` is a single variable — set it once in `.env` (or `export PORT=…`) and it flows to the container env, the Docker `EXPOSE`, the compose `expose`, the Traefik load-balancer target and the health check. No host port is published (the service sits behind Traefik), so there are never host-port conflicts to manage.

### GitHub Actions secrets

| Secret | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL baked at build + runtime (`https://docs.eedu.bd`) |
| `VPS_HOST`, `VPS_USERNAME`, `VPS_SSH_KEY` | SSH target for the deploy container |
| `VPS_SUDO_PASSWORD` | Optional — used to run docker via `sudo` on the VPS |

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