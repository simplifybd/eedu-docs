export const appName = "eEdu.bd Docs";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.eedu.bd";
export const docsRoute = '/docs';

export const gitConfig = {
  user: "simplifybd",
  repo: "eedu-docs",
  branch: "main",
};

/**
 * Raw markdown source URL for a page (used by the "view as markdown" action).
 * Static export has no server route, so it points at GitHub instead.
 */
export function getPageMarkdownUrl(page: { path: string }) {
  return {
    url: `https://raw.githubusercontent.com/${gitConfig.user}/${gitConfig.repo}/${gitConfig.branch}/content/docs/${page.path}`,
  };
}