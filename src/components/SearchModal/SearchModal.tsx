'use client'

import { useState, useEffect, useId, useMemo } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
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

const MAX_SEARCH_RESULTS = 4

export function SearchModal({ isOpen, onClose, onSelectProduct }: Props) {
  const [query, setQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const searchInputId = useId()
  const lenis = useLenis()

  useEffect(() => {
    setMounted(true)
  }, [])

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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Reset query on close
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
    }
  }, [isOpen])

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return productsData.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    )
  }, [query])

  const displayedResults = useMemo(() => {
    return matches.slice(0, MAX_SEARCH_RESULTS)
  }, [matches])

  // Top 3 curated popular picks when query is empty
  const popularPicks = useMemo(() => productsData.slice(0, 3), [])

  if (!isOpen || !mounted) return null

  const isSearching = query.trim().length > 0

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs pt-[10vh] px-4 transition-opacity animate-fade-in"
      onClick={onClose}
      data-lenis-prevent
    >
      <div
        className="animate-scale-in w-full max-w-[42rem] rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        data-lenis-prevent
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3.5 sm:px-6 sm:py-4 bg-white">
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
            Search products
          </label>
          <input
            id={searchInputId}
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ceramics, lighting, vases, throws..."
            className="min-w-0 flex-1 bg-transparent text-sm sm:text-base outline-hidden text-gray-900 placeholder:text-gray-400 font-normal"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="shrink-0 text-xs text-gray-400 hover:text-gray-600 px-1 cursor-pointer font-medium"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-xs rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600 hover:bg-gray-200 cursor-pointer transition"
          >
            Esc
          </button>
        </div>

        {/* Content Body */}
        <div className="max-h-[26rem] overflow-y-auto p-4 sm:p-5" data-lenis-prevent>
          {!isSearching ? (
            /* Empty State: Quick Suggestions & Curated Popular Picks */
            <div className="space-y-6">
              {/* Quick Collection Filters */}
              <div>
                <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-gray-500 mb-2.5">
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
                        className="rounded-full bg-[#f4f2ef] px-3.5 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-950 hover:text-white transition-colors duration-200 cursor-pointer"
                      >
                        {col.title}
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Popular Picks */}
              <div>
                <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                  Popular Right Now
                </p>
                <div className="space-y-1.5">
                  {popularPicks.map((product) => {
                    const slug = getProductSlug(product)
                    return (
                      <Link
                        key={product.id}
                        href={`/products/${slug}`}
                        onClick={() => {
                          if (onSelectProduct) onSelectProduct(product)
                          onClose()
                        }}
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
            /* No Results */
            <div className="py-10 text-center">
              <p className="text-sm text-gray-600">
                No products found matching &quot;{query}&quot;.
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Try searching for stoneware, linen, brass, or vases.
              </p>
            </div>
          ) : (
            /* Filtered Matches (Capped to MAX_SEARCH_RESULTS) */
            <div className="space-y-2">
              <div className="divide-y divide-gray-100">
                {displayedResults.map((product) => {
                  const slug = getProductSlug(product)
                  return (
                    <Link
                      key={product.id}
                      href={`/products/${slug}`}
                      onClick={() => {
                        if (onSelectProduct) onSelectProduct(product)
                        onClose()
                      }}
                      className="group flex cursor-pointer items-center justify-between py-2.5 px-2 rounded-lg hover:bg-[#f8f7f5] transition"
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
                          <h4 className="text-sm font-medium text-gray-950 group-hover:underline underline-offset-4 truncate">
                            {product.title}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right pl-4 shrink-0">
                        <span className="text-sm font-semibold text-gray-950">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.isSale && (
                          <span className="ml-2 rounded-full bg-[#5cd3c4] px-2 py-0.5 text-[0.625rem] font-bold text-gray-900">
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
                    Showing {displayedResults.length} of {matches.length} matches
                  </span>
                  <Link
                    href="/collections/all"
                    onClick={onClose}
                    className="text-xs font-semibold text-gray-950 hover:underline flex items-center gap-1 group"
                  >
                    <span>View all in Catalog</span>
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
