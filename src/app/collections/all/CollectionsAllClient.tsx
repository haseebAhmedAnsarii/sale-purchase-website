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
import { collectionsData } from '@/data/collections'
import { useRecentlyViewed } from '@/utils/recentlyViewed'

export function CollectionsAllClient() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const recentlyViewed = useRecentlyViewed()

  // Filter products by selected collection category
  const filteredProducts = useMemo(() => {
    let list = [...productsData]
    if (selectedCategory !== 'all') {
      const collection = collectionsData.find((c) => c.id === selectedCategory)
      if (collection && collection.productIds) {
        list = list.filter((p) => collection.productIds!.includes(p.id))
      }
    }
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => a.price - b.price)
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => b.price - a.price)
    }
    return list
  }, [selectedCategory, sortBy])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 py-10 sm:py-14 animate-fade-in">
        <Container>
          {/* Page Title & Sort Row */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-gray-100 pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#765b48] block mb-1">
                The Complete Exhibition
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950">
                Products
              </h1>
              <p className="mt-1 text-xs text-gray-500">
                Showing {filteredProducts.length} of {productsData.length} pieces
              </p>
            </div>

            {/* Client-side Sort Dropdown */}
            <SortDropdown
              id="all-products-sort-by"
              value={sortBy}
              onChange={setSortBy}
            />
          </div>

          {/* Category Filter Pills */}
          <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Filter by collection">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-[#f4f2ef] text-gray-700 hover:bg-gray-200 hover:text-black'
              }`}
              role="tab"
              aria-selected={selectedCategory === 'all'}
            >
              All Pieces ({productsData.length})
            </button>
            {collectionsData.map((col) => {
              const count = col.productIds ? col.productIds.length : 0
              const isSelected = selectedCategory === col.id
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setSelectedCategory(col.id)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white shadow-xs'
                      : 'bg-[#f4f2ef] text-gray-700 hover:bg-gray-200 hover:text-black'
                  }`}
                  role="tab"
                  aria-selected={isSelected}
                >
                  {col.title} ({count})
                </button>
              )
            })}
          </div>

          {/* All Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product, idx) => (
                <ScrollReveal key={product.id} delay={(idx % 4) * 80}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-sm text-gray-500 mb-4">No pieces found in this category.</p>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-semibold text-black underline underline-offset-4"
              >
                Reset filter to all pieces
              </button>
            </div>
          )}

          {/* Recently Viewed Section */}
          {recentlyViewed.length > 0 && (
            <section
              className="mt-12 sm:mt-16 border-t border-gray-100 pt-10 sm:pt-12"
              aria-label="Recently viewed pieces"
            >
              <div className="flex items-baseline justify-between mb-6 sm:mb-8">
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#765b48] block mb-1">
                    Your Browsing History
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-950">
                    Recently Viewed
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {recentlyViewed.map((item, idx) => (
                  <ScrollReveal key={item.id} delay={(idx % 4) * 80}>
                    <ProductCard product={item} />
                  </ScrollReveal>
                ))}
              </div>
            </section>
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
