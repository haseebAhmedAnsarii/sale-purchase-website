import type { Collection } from '@/types'
import { collectionsData } from '@/data/collections'

export function getCollectionSlug(item: Collection | string): string {
  const title = typeof item === 'string' ? item : item.title
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Pre-indexed O(1) Lookup Maps
export const collectionBySlugMap = new Map<string, Collection>(
  collectionsData.map((c) => [getCollectionSlug(c), c])
)

export const collectionByIdMap = new Map<string, Collection>(
  collectionsData.map((c) => [c.id, c])
)

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collectionBySlugMap.get(slug)
}

export function getCollectionById(id: string): Collection | undefined {
  return collectionByIdMap.get(id)
}
