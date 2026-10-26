'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import { ProductCard } from '@/components/ProductCard'
import { ScrollReveal } from '@/components/ScrollReveal'
import { SortDropdown, type SortOption } from '@/components/SortDropdown'
import { Footer } from '@/components/Footer'
import { SearchModal } from '@/components/SearchModal'
import { productsData } from '@/data/products'

export default function CollectionsAllPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('featured')

  const sortedProducts = useMemo(() => {
    const list = [...productsData]
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => a.price - b.price)
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => b.price - a.price)
    }
    return list
  }, [sortBy])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 py-10 sm:py-14 animate-fade-in">
        <Container>
          {/* Page Title & Sort Row */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-gray-100 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950">
                Products
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                {productsData.length} products
              </p>
            </div>

            {/* Client-side Sort Dropdown */}
            <SortDropdown
              id="all-products-sort-by"
              value={sortBy}
              onChange={setSortBy}
            />
          </div>

          {/* All Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={(idx % 4) * 80}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
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
