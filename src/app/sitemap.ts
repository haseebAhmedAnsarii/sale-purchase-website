import type { MetadataRoute } from 'next'
import { productsData } from '@/data/products'
import { collectionsData } from '@/data/collections'
import { getProductSlug } from '@/utils/product'
import { getCollectionSlug } from '@/utils/collection'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shariq-terra-studio-website.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/collections/all', '/about'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date('2026-10-27T00:00:00Z'),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const collectionRoutes = collectionsData.map((col) => ({
    url: `${SITE_URL}/collections/${getCollectionSlug(col)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const productRoutes = productsData.map((prod) => ({
    url: `${SITE_URL}/products/${getProductSlug(prod)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...collectionRoutes, ...productRoutes]
}
