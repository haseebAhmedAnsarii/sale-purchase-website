'use client'

import { useState, useEffect, useId, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLenis } from 'lenis/react'
import type { Product } from '@/types'
import { productsData } from '@/data/products'
import { collectionsData } from '@/data/collections'
import { getProductSlug } from '@/utils/product'
import { getCollectionSlug } from '@/utils/collection'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelectProduct?: (product: Product) => void
}

const MAX_SEARCH_RESULTS = 5
const RECENT_SEARCHES_KEY = 'terra_recent_searches'

export function SearchModal({ isOpen, onClose, onSelectProduct }: Props) {
  const [query, setQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const searchInputId = useId()
  const lenis = useLenis()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Load recent searches from localStorage
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed.slice(0, 5))
        }
      }
    } catch {
      // ignore
    }
  }, [isOpen])

  const saveRecentSearch = (term: string) => {
    const clean = term.trim()
    if (!clean) return
    try {
      const updated = [clean, ...recentSearches.filter((s) => s.toLowerCase() !== clean.toLowerCase())].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
    } catch {
      // ignore
    }
  }

  const clearRecentSearches = () => {
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY)
      setRecentSearches([])
    } catch {
      // ignore
    }
  }

  // Prevent background and Lenis scroll when search modal is open
  useEffect(() => {
    if (!isOpen) return

    lenis?.stop()
    const originalBodyOverflow = document.body.style.overflow
    const originalBodyPadding = document.body.style.paddingRight
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.body.style.paddingRight = originalBodyPadding
      lenis?.start()
    }
  }, [isOpen, lenis])

  // Reset query and selection index on open/close
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setSelectedIndex(-1)
    } else {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(-1)
  }, [query])

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return productsData.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q)) ||
        item.features.some((f) => f.toLowerCase().includes(q))
    )
  }, [query])

  const displayedResults = useMemo(() => {
    return matches.slice(0, MAX_SEARCH_RESULTS)
  }, [matches])

  // Top 3 curated popular picks when query is empty
  const popularPicks = useMemo(() => productsData.slice(0, 3), [])

  // Keyboard navigation (ArrowDown, ArrowUp, Enter, Escape)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        if (displayedResults.length > 0) {
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % displayedResults.length)
        }
      } else if (e.key === 'ArrowUp') {
        if (displayedResults.length > 0) {
          e.preventDefault()
          setSelectedIndex((prev) => (prev <= 0 ? displayedResults.length - 1 : prev - 1))
        }
      } else if (e.key === 'Enter') {
        if (displayedResults.length > 0) {
          e.preventDefault()
          const targetIndex = selectedIndex >= 0 ? selectedIndex : 0
          const chosen = displayedResults[targetIndex]
          if (chosen) {
            saveRecentSearch(query || chosen.title)
            if (onSelectProduct) onSelectProduct(chosen)
            onClose()
            router.push(`/products/${getProductSlug(chosen)}`)
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, displayedResults, selectedIndex, query, router, onSelectProduct])

  if (!isOpen || !mounted) return null

  const isSearching = query.trim().length > 0

  const handleSelect = (product: Product) => {
    saveRecentSearch(query || product.title)
    if (onSelectProduct) onSelectProduct(product)
    onClose()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 backdrop-blur-sm pt-[8vh] sm:pt-[10vh] px-4 transition-opacity animate-fade-in"
      onClick={onClose}
      data-lenis-prevent
    >
      <div
        className="animate-scale-in w-full max-w-[42rem] rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search catalog"
        data-lenis-prevent
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3.5 sm:px-6 sm:py-4 bg-white shrink-0">
          <svg
            className="h-5 w-5 text-gray-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <label htmlFor={searchInputId} className="sr-only">
            Search products and collections
          </label>
          <input
            ref={inputRef}
            id={searchInputId}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ceramics, lighting, vases, throws..."
            className="min-w-0 flex-1 bg-transparent text-sm sm:text-base outline-hidden text-gray-950 placeholder:text-gray-400 font-normal"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
              className="shrink-0 text-xs text-gray-400 hover:text-gray-700 px-1 cursor-pointer font-medium transition"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-[11px] rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-600 hover:bg-gray-200 cursor-pointer transition"
          >
            Esc
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-5 flex-1" data-lenis-prevent>
          {!isSearching ? (
            /* Empty State: Recent Searches + Trending Chips + Collections + Popular Pieces */
            <div className="space-y-6">
              {/* Recent Searches (if available) */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Recent Searches</span>
                    </p>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-[11px] text-gray-400 hover:text-gray-700 cursor-pointer transition"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setQuery(term)
                          inputRef.current?.focus()
                        }}
                        className="rounded-full border border-gray-200 bg-gray-50/80 px-3 py-1 text-xs text-gray-700 hover:border-gray-900 hover:bg-gray-950 hover:text-white transition-colors duration-200 cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Collection Links */}
              <div>
                <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  Explore Collections
                </p>
                <div className="flex flex-wrap gap-2">
                  {collectionsData.map((col) => {
                    const slug = getCollectionSlug(col)
                    return (
                      <Link
                        key={col.id}
                        href={`/collections/${slug}`}
                        onClick={onClose}
                        className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 hover:border-gray-900 hover:text-gray-950 transition-colors duration-200"
                      >
                        {col.title}
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Popular Curated Pieces */}
              <div>
                <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  Featured Pieces
                </p>
                <div className="space-y-1.5">
                  {popularPicks.map((product) => {
                    const slug = getProductSlug(product)
                    return (
                      <Link
                        key={product.id}
                        href={`/products/${slug}`}
                        onClick={() => handleSelect(product)}
                        className="group flex cursor-pointer items-center justify-between p-2.5 rounded-lg hover:bg-[#f8f7f5] transition"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {product.imageSrc ? (
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xs bg-[#f4f2ef]">
                              <Image
                                src={product.imageSrc}
                                alt={product.imageAlt || product.title}
                                fill
                                sizes="48px"
                                className="object-cover object-center"
                              />
                            </div>
                          ) : (
                            <div className="h-12 w-12 shrink-0 rounded-xs bg-[#f4f2ef]" />
                          )}
                          <div className="min-w-0">
                            <h4 className="text-sm font-medium text-gray-950 group-hover:underline underline-offset-4 truncate">
                              {product.title}
                            </h4>
                            <p className="text-xs text-gray-500 line-clamp-1">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : matches.length === 0 ? (
            /* No Results Found State */
            <div className="py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-3">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">
                No artisanal pieces found for &quot;{query}&quot;.
              </p>
              <p className="mt-1 text-xs text-gray-500 max-w-sm mx-auto">
                Try searching by material or form (stoneware, terracotta, brass, vases, throws).
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Stoneware', 'Sculptural', 'Vase', 'Lamp'].map((alt) => (
                  <button
                    key={alt}
                    type="button"
                    onClick={() => {
                      setQuery(alt)
                      inputRef.current?.focus()
                    }}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200 transition"
                  >
                    {alt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Filtered Matches List */
            <div className="space-y-3">
              <div className="px-1">
                <span className="text-xs font-medium text-gray-500">
                  Found {matches.length} {matches.length === 1 ? 'piece' : 'pieces'}
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {displayedResults.map((product, idx) => {
                  const slug = getProductSlug(product)
                  const isHighlighted = selectedIndex === idx
                  return (
                    <Link
                      key={product.id}
                      href={`/products/${slug}`}
                      onClick={() => handleSelect(product)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`group flex cursor-pointer items-center justify-between py-2.5 px-3 rounded-lg transition-all ${
                        isHighlighted
                          ? 'bg-[#f4f2ef] border-l-2 border-[#765b48]'
                          : 'hover:bg-[#f8f7f5]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {product.imageSrc ? (
                          <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-xs bg-[#f4f2ef]">
                            <Image
                              src={product.imageSrc}
                              alt={product.imageAlt || product.title}
                              fill
                              sizes="52px"
                              className="object-cover object-center"
                            />
                          </div>
                        ) : (
                          <div className="h-13 w-13 shrink-0 rounded-xs bg-[#f4f2ef]" />
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium text-gray-950 group-hover:underline underline-offset-4 truncate">
                              {product.title}
                            </h4>
                            {product.badge && (
                              <span className="shrink-0 text-[10px] uppercase tracking-wider font-semibold text-[#765b48]">
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {product.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right pl-4 shrink-0 flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-950">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.isSale && (
                          <span className="rounded-full bg-[#5cd3c4] px-2 py-0.5 text-[0.625rem] font-bold text-gray-900">
                            Sale
                          </span>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Bottom bar when matches exceed preview limit */}
              {matches.length > MAX_SEARCH_RESULTS && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between px-2">
                  <span className="text-xs text-gray-500">
                    Showing {displayedResults.length} of {matches.length} pieces
                  </span>
                  <Link
                    href="/collections/all"
                    onClick={onClose}
                    className="text-xs font-semibold text-gray-950 hover:underline flex items-center gap-1 group"
                  >
                    <span>View all in Exhibition</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
