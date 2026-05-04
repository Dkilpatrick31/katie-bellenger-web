import type { MetadataRoute } from 'next'
import { services } from '@/data/services'

const BASE = 'https://trainwithkatie.fit'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]

  for (const [mode, config] of Object.entries(services)) {
    entries.push({
      url: `${BASE}/${mode}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    for (const program of config.programs) {
      entries.push({
        url: `${BASE}/${mode}/${program.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return entries
}
