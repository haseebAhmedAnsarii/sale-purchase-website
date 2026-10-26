'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import { ProductCard } from '@/components/ProductCard'
import { ScrollReveal } from '@/components/ScrollReveal'
import { SortDropdown, type SortOption } from '@/components/SortDropdown'
import { Footer } from '@/components/Footer'
import { SearchModal } from '@/components/SearchModal'
import type { Collection, Product } from '@/types'

interface Props {
  collection: Collection
  products: Product[]
}

export function CollectionDetailClient({ collection, products }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('featured')

  const sortedProducts = useMemo(() => {
    const list = [...products]
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => a.price - b.price)
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => b.price - a.price)
    }
    return list
  }, [products, sortBy])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 py-8 sm:py-12 animate-fade-in">
        <Container>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 text-xs text-gray-500">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-black transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/collections/all" className="hover:text-black transition-colors duration-200">
                  Collections
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium truncate" aria-current="page">
                {collection.title}
              </li>
            </ol>
          </nav>

          {/* Page Title & Sort Row */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-gray-100 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950">
                {collection.title}
              </h1>
              {collection.description && (
                <p className="mt-2 text-sm text-gray-600 max-w-xl">
                  {collection.description}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {/* Client-side Sort Dropdown */}
            {products.length > 0 && (
              <SortDropdown
                id="collection-sort-by"
                value={sortBy}
                onChange={setSortBy}
              />
            )}
          </div>

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-500">
              No products found in this collection.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {sortedProducts.map((product, idx) => (
                <ScrollReveal key={product.id} delay={(idx % 4) * 80}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          )}
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
