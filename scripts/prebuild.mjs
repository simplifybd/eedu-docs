#!/usr/bin/env node
// Build-time generation of static assets for the Cloudflare Pages static export:
//   1. /search/search-index.json   – Fumadocs static search index (i18n)
//   2. /robots.txt                 – static robots (Next route handlers are unavailable in export)
//   3. /sitemap.xml                – every localized docs page
//   4. /manifest.webmanifest       – PWA manifest (previously a Next metadata route)
// Everything is written into `public/` so `next build` copies it to `out/`.
//
// Run as part of `pnpm build` (see package.json).

import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { createI18nSearchAPI } from "fumadocs-core/search/server";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.eedu.bd";
const CONTENT_DIR = join(process.cwd(), "content/docs");
const PUBLIC_DIR = join(process.cwd(), "public");
const LANGUAGES = ["en", "bn"];

const ROOT_TITLES = {
  en: "eEdu.bd Help Center",
  bn: "eEdu.bd হেল্প সেন্টার",
};

// ---------- content extraction ----------

function stripFrontmatter(mdx) {
  const match = mdx.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return { frontmatter: "", body: mdx };
  return { frontmatter: match[1], body: mdx.slice(match[0].length) };
}

function parseFrontmatter(frontmatter) {
  const get = (key) => {
    const line = frontmatter
      .split("\n")
      .find((l) => l.startsWith(`${key}:`) || l.startsWith(`${key} :`));
    return line
      ? line
          .split(":")
          .slice(1)
          .join(":")
          .trim()
          .replace(/^["']|["']$/g, "")
      : undefined;
  };
  return { title: get("title"), description: get("description") };
}

function toText(body) {
  return body
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> label
    .replace(/<[^>]+>/g, " ") // html
    .replace(/^---.*$/gm, " ") // remaining frontmatter
    .replace(/[#>*|_~-]/g, " ") // markers
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function listMdx(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMdx(full));
    else if (entry.name.endsWith(".mdx")) out.push(full);
  }
  return out;
}

function slugFromPath(localeFile, lang) {
  const rel = relative(join(CONTENT_DIR, lang), localeFile)
    .split(sep)
    .join("/");
  const file = rel.replace(/\.mdx$/, "");
  if (file === "index") return "";
  return file
    .split("/")
    .map((seg) => (seg === "index" ? "" : seg))
    .filter(Boolean)
    .join("/");
}

// ---------- assets ----------

function buildSearchIndex() {
  const indexes = [];

  for (const lang of LANGUAGES) {
    const dir = join(CONTENT_DIR, lang);
    if (!dirExists(dir)) continue;

    for (const file of listMdx(dir)) {
      const mdx = readFileSync(file, "utf8");
      const { frontmatter, body } = stripFrontmatter(mdx);
      const { title, description } = parseFrontmatter(frontmatter);
      const slug = slugFromPath(file, lang);
      const url = `/${lang}/docs${slug ? `/${slug}` : ""}`;

      indexes.push({
        title: title ?? slug.split("/").pop() ?? lang,
        description,
        breadcrumbs: [ROOT_TITLES[lang]],
        content: toText(body),
        url,
        locale: lang,
      });
    }
  }

  const search = createI18nSearchAPI("simple", {
    i18n: { languages: LANGUAGES, defaultLanguage: "en" },
    indexes,
  });

  return search.export().then((data) => JSON.stringify(data));
}

function buildSitemap(pages) {
  const items = pages.map(
    ({ url }) => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.join("\n")}
</urlset>
`;
}

const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

const manifest = JSON.stringify(
  {
    name: "eEdu.bd Docs",
    short_name: "eEdu.bd",
    description:
      "Step-by-step help for eEdu.bd — connect biometric devices, run attendance, collect fees, manage exams, payroll, and your school website.",
    start_url: "/en/docs",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    lang: "en-BD",
    categories: ["education", "business", "reference"],
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  },
  null,
  2,
);

const redirects = `/  /en/docs  302
/docs  /en/docs  302
/en  /en/docs  302
/bn  /bn/docs  302
`;

// ---------- helpers ----------

function dirExists(dir) {
  try {
    return readdirSync(dir).length >= 0;
  } catch {
    return false;
  }
}

// ---------- run ----------

function collectPages() {
  const pages = [];
  for (const lang of LANGUAGES) {
    const dir = join(CONTENT_DIR, lang);
    if (!dirExists(dir)) continue;
    for (const file of listMdx(dir)) {
      const slug = slugFromPath(file, lang);
      pages.push({ url: `/${lang}/docs${slug ? `/${slug}` : ""}` });
    }
  }
  return pages;
}

async function main() {
  mkdirSync(join(PUBLIC_DIR, "search"), { recursive: true });

  const searchIndex = await buildSearchIndex();
  writeFileSync(join(PUBLIC_DIR, "search", "search-index.json"), searchIndex);

  const pages = collectPages();
  writeFileSync(join(PUBLIC_DIR, "robots.txt"), robots);
  writeFileSync(join(PUBLIC_DIR, "sitemap.xml"), buildSitemap(pages));
  writeFileSync(join(PUBLIC_DIR, "manifest.webmanifest"), manifest);
  writeFileSync(join(PUBLIC_DIR, "_redirects"), redirects);

  console.log(
    `[prebuild] wrote search-index.json (${pages.length} pages), robots.txt, sitemap.xml, manifest.webmanifest, _redirects`,
  );
}

main().catch((err) => {
  console.error("[prebuild] failed:", err);
  process.exit(1);
});