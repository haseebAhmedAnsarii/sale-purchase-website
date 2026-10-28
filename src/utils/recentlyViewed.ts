'use client'

import { useState, useEffect } from 'react'
import { getProductById } from '@/utils/product'
import type { Product } from '@/types'

const STORAGE_KEY = 'terra_recently_viewed'
const MAX_RECENT_ITEMS = 6

export function getRecentlyViewedIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function addRecentlyViewed(id: string): void {
  if (typeof window === 'undefined' || !id) return
  try {
    const existing = getRecentlyViewedIds().filter((item) => item !== id)
    const updated = [id, ...existing].slice(0, MAX_RECENT_ITEMS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // Ignore storage quota errors
  }
}

export function useRecentlyViewed(excludeId?: string): Product[] {
  const [recentProducts, setRecentProducts] = useState<Product[]>([])

  useEffect(() => {
    const ids = getRecentlyViewedIds()
    const filteredIds = excludeId ? ids.filter((id) => id !== excludeId) : ids
    const found = filteredIds
      .map((id) => getProductById(id))
      .filter((p): p is Product => Boolean(p))

    setRecentProducts(found)
  }, [excludeId])

  return recentProducts
}
