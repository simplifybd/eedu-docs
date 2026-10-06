import type { Metadata } from 'next';
import { appName, siteUrl } from './shared';

export const siteConfig = {
  name: 'eEdu.bd',
  title: appName,
  url: siteUrl,
  description:
    'Step-by-step help for eEdu.bd — connect biometric devices, run attendance, collect fees, manage exams, payroll, and your school website.',
  keywords: [
    'eEdu.bd',
    'edu.bd documentation',
    'eEdu.bd help center',
    'school management documentation',
    'attendance device setup',
    'biometric setup Bangladesh',
    'school website custom domain',
    'how to collect school fees online',
  ],
  supportEmail: 'support@eedu.bd',
  supportPhone: '+8809696600240',
  ogImage: '/images/logo.png',
  twitterHandle: '@eedubdofficial',
  social: {
    facebook: 'https://www.facebook.com/eedubdofficial',
    instagram: 'https://www.instagram.com/eedubdofficial',
    linkedin: 'https://www.linkedin.com/company/eedubdofficial',
    youtube: 'https://www.youtube.com/@eedubdofficial',
  },
};

export const absoluteUrl = (path = '/') =>
  new URL(path, `${siteConfig.url}/`).toString();

export const docsMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  generator: 'Fumadocs',
  category: 'education',
  keywords: siteConfig.keywords,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    url: siteConfig.url,
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
};