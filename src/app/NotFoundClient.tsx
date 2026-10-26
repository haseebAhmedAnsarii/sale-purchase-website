'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import { ProductCard } from '@/components/ProductCard'
import { Footer } from '@/components/Footer'
import { SearchModal } from '@/components/SearchModal'
import { productsData } from '@/data/products'
import { collectionsData } from '@/data/collections'
import { getCollectionSlug } from '@/utils/collection'

export function NotFoundClient() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const suggestedProducts = productsData.slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main 404 Hero */}
      <main className="flex-1 py-14 sm:py-20 animate-fade-in">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            {/* Ceramic Silhouette Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f4f2ef] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#8c735f] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8c735f]" />
              <span>404 • Page Not Found</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950">
              The space you are seeking has shifted.
            </h1>

            {/* Narrative text */}
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-gray-600">
              Like clay taking a new form on the potter&apos;s wheel, some pieces find new homes. 
              The page or vessel you are looking for may have been archived or is no longer in this gallery.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/collections/all"
                className="inline-flex items-center justify-center rounded-xs bg-gray-950 px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white transition-all duration-500 hover:bg-gray-800 hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-md"
              >
                Explore Full Catalog
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xs border border-gray-300 bg-white px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-gray-900 transition-all duration-500 hover:bg-gray-50 hover:border-gray-400"
              >
                Return to Sanctuary
              </Link>
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xs border border-transparent bg-[#f4f2ef] px-5 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-gray-800 transition-all duration-500 hover:bg-[#eae6e1] cursor-pointer"
              >
                <svg
                  className="h-4 w-4 text-gray-600"
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
                <span>Search Store</span>
              </button>
            </div>

            {/* Quick Collections Navigation */}
            <div className="mt-12 pt-10 border-t border-gray-100">
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-4">
                Or browse by curated collection
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {collectionsData.map((col) => {
                  const slug = getCollectionSlug(col)
                  return (
                    <Link
                      key={col.id}
                      href={`/collections/${slug}`}
                      className="rounded-full bg-[#f4f2ef] px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-950 hover:text-white transition-colors duration-200"
                    >
                      {col.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Curated Recommendations */}
          <div className="mt-20 pt-14 border-t border-gray-100">
            <div className="mb-8 flex items-baseline justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-950">
                  Pieces you might admire
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Handcrafted stoneware and ambient lighting for serene interiors
                </p>
              </div>
              <Link
                href="/collections/all"
                className="text-xs font-semibold text-gray-900 hover:underline flex items-center gap-1 group"
              >
                <span>View all</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {suggestedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </Container>
      </main>

      {/* Footer */}
      <Footer />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  )
}
