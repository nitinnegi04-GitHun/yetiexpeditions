import { client } from '@/sanity/client'
import { TREK_SLUGS_QUERY } from '@/sanity/queries/trek'
import { ARTICLES } from '@/app/journal/articles'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const treks: { slug: string; updatedAt: string }[] = await client.fetch(TREK_SLUGS_QUERY)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.yetiexpeditions.com'

  const trekUrls = treks.map(t => ({
    url: `${baseUrl}/treks/${t.slug}`,
    lastModified: t.updatedAt ? new Date(t.updatedAt) : new Date('2025-01-01'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const journalUrls = ARTICLES.map(a => ({
    url: `${baseUrl}/journal/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : new Date('2025-01-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    { url: baseUrl,                         lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${baseUrl}/treks`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/our-story`,          lastModified: new Date('2025-06-01'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/journal`,            lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    ...trekUrls,
    ...journalUrls,
  ]
}
