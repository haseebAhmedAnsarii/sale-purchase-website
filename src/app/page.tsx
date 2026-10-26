'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { PromoBanner } from '@/components/PromoBanner'
import { Collections } from '@/components/Collections'
import { Footer } from '@/components/Footer'
import { SearchModal } from '@/components/SearchModal'
import { ProductQuickView } from '@/components/ProductQuickView'
import type { Product } from '@/types'

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header with Search icon only and no Contact */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Middle 50/50 banner */}
        <PromoBanner />

        {/* Collections */}
        <Collections />
      </main>

      {/* Footer without Contact, Resources, or Visa row */}
      <Footer />

      {/* Interactive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Interactive Product Quick View Modal */}
      <ProductQuickView
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
