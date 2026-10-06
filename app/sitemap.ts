import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { siteConfig } from '@/lib/seo';

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));
}