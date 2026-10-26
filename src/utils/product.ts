import type { Product } from '@/types'

export function getProductSlug(item: Product | string): string {
  const title = typeof item === 'string' ? item : item.title
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
