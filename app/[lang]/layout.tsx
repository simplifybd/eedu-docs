import { RootProvider } from 'fumadocs-ui/provider/next';
import { i18nProvider } from 'fumadocs-ui/i18n';
import { translations } from '@/lib/i18n';
import { absoluteUrl, siteConfig } from '@/lib/seo';
import { Inter } from 'next/font/google';
import '../global.css';

const inter = Inter({
  subsets: ['latin'],
});

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

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
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
        <RootProvider i18n={i18nProvider(translations, lang)}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}