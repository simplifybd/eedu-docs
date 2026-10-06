import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { siteConfig } from '@/lib/seo';

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const docsPages = source.getPages().map((page) => {
    const path = page.slugs.length
      ? `/docs/${page.slugs.join('/')}`
      : '/docs';

    return {
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1,
    };
  });

  return [
    {
      url: `${siteConfig.url}/docs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...docsPages,
  ];
}