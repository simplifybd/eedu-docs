import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata, Viewport } from 'next';
import './global.css';
import { Inter } from 'next/font/google';
import { absoluteUrl, docsMetadata, siteConfig } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  ...docsMetadata,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name} Docs`,
  },
  description: siteConfig.description,
  // The docs landing lives at /docs (where / redirects), so keep the home OG
  // pointing at the real entry page.
  openGraph: {
    ...docsMetadata.openGraph,
    url: `${siteConfig.url}/docs`,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl('/images/logo.png'),
  image: absoluteUrl(siteConfig.ogImage),
  email: siteConfig.supportEmail,
  telephone: siteConfig.supportPhone,
  address: 'Bangladesh',
  addressCountry: 'Bangladesh',
  addressLocality: 'Dhaka',
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.linkedin,
    siteConfig.social.youtube,
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${siteConfig.name} Documentation`,
  url: `${siteConfig.url}/docs`,
  inLanguage: ['en-BD', 'bn-BD'],
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className="flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}