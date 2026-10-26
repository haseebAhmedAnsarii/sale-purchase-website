import type { Collection } from '@/types'

export function getCollectionSlug(item: Collection | string): string {
  const title = typeof item === 'string' ? item : item.title
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
