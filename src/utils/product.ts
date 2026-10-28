import type { Product } from '@/types'
import { productsData } from '@/data/products'

export function getProductSlug(item: Product | string): string {
  const title = typeof item === 'string' ? item : item.title
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Pre-indexed O(1) Lookup Maps
export const productBySlugMap = new Map<string, Product>(
  productsData.map((p) => [getProductSlug(p), p])
)

export const productByIdMap = new Map<string, Product>(
  productsData.map((p) => [p.id, p])
)

export function getProductBySlug(slug: string): Product | undefined {
  return productBySlugMap.get(slug)
}

export function getProductById(id: string): Product | undefined {
  return productByIdMap.get(id)
}
