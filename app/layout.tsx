import type { Metadata, Viewport } from 'next';
import { docsMetadata, siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  ...docsMetadata,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name} Docs`,
  },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}