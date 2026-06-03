import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { POST_SLUGS_QUERY } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let postSlugs: Array<{ slug: string }> = []
  try {
    const slugs = await client
      .withConfig({ perspective: 'published', stega: false })
      .fetch(POST_SLUGS_QUERY)
    postSlugs = (slugs ?? []).filter(
      (s): s is { slug: string } => typeof s?.slug === 'string'
    )
  } catch {
    // graceful fallback: sitemap senza articoli
  }

  const postUrls: MetadataRoute.Sitemap = postSlugs.map(({ slug }) => ({
    url: `https://cultivara.it/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: 'https://cultivara.it',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://cultivara.it/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://cultivara.it/normativa-ue-2023-564',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://cultivara.it/dlgs-150-2012',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://cultivara.it/guida-agea',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...postUrls,
  ]
}
