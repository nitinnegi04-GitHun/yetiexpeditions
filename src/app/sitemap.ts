import { client } from '@/sanity/client'
import { TREK_SLUGS_QUERY } from '@/sanity/queries/trek'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const treks = await client.fetch(TREK_SLUGS_QUERY)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!

  const trekUrls = treks.map((t: { slug: string }) => ({
    url: `${baseUrl}/treks/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/treks`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/journal`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...trekUrls,
  ]
}
