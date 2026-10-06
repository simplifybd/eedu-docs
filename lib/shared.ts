import { i18n } from './i18n';

export const appName = "eEdu.bd Docs";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.eedu.bd";
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: "simplifybd",
  repo: "eedu-docs",
  branch: "main",
};

const joinSegments = (parts: string[]) =>
  `/${parts.filter((part) => part.length > 0).join('/')}`;

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const lang = page.locale ?? i18n.defaultLanguage;
  const segments = [lang, ...page.slugs, 'content.md'];

  return { segments, url: joinSegments([docsContentRoute, ...segments]) };
}

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const lang = page.locale ?? i18n.defaultLanguage;
  const segments = [lang, ...page.slugs, 'image.png'];

  return { segments, url: joinSegments([docsImageRoute, ...segments]) };
}