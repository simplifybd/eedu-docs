import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { isMarkdownPreferred } from "fumadocs-core/negotiation";
import { i18n } from "@/lib/i18n";
import { docsContentRoute } from "@/lib/shared";

const i18nMiddleware = createI18nMiddleware(i18n);

// strip `/en|/bn` prefix and optional rest, keeping the language
function parseLocalizedDocs(pathname: string): { lang: string; rest: string } | null {
  const match = pathname.match(/^\/(en|bn)\/docs(?:\/(.+))?$/);
  if (!match) return null;
  return { lang: match[1], rest: match[2] ?? "" };
}

function contentUrl(lang: string, rest: string) {
  const slug = rest ? `${rest}/content.md` : "content.md";
  return `${docsContentRoute}/${lang}/${slug}`;
}

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const i18nResult = await i18nMiddleware(request, undefined as never);
  if (
    i18nResult &&
    "status" in i18nResult &&
    (i18nResult.status === 307 || i18nResult.status === 308)
  ) {
    return i18nResult;
  }

  const parsed = parseLocalizedDocs(pathname);

  // `/docs/<path>.md` → raw markdown content
  if (parsed && parsed.rest.endsWith(".md")) {
    const target = contentUrl(parsed.lang, parsed.rest.slice(0, -3));
    return NextResponse.rewrite(new URL(target, request.nextUrl));
  }

  // `Accept: text/markdown` → raw markdown content
  if (parsed && isMarkdownPreferred(request)) {
    const target = contentUrl(parsed.lang, parsed.rest);
    return NextResponse.rewrite(new URL(target, request.nextUrl), {
      headers: { Vary: "Accept" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // exclude API/static assets and standalone non-locale route handlers
    "/((?!api|_next|og|llms|images|robots.txt|sitemap.xml|manifest.webmanifest|favicon.ico|apple-icon.png|icon.png).*)",
  ],
};