'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import { PlaceholderImage } from '@/components/PlaceholderImage'
import { ProductCard } from '@/components/ProductCard'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Footer } from '@/components/Footer'
import { SearchModal } from '@/components/SearchModal'
import { productsData } from '@/data/products'
import type { Product } from '@/types'

interface Props {
  product: Product
}

export function ProductDetailClient({ product }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const relatedProducts = useMemo(
    () => productsData.filter((item) => item.id !== product.id).slice(0, 4),
    [product.id]
  )

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
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium truncate" aria-current="page">
                {product.title}
              </li>
            </ol>
          </nav>

          {/* Product Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            {/* Left: Product Image */}
            <div className="group relative overflow-hidden rounded-lg bg-[#f8f9fa] p-6 sm:p-8 border border-gray-100 transition-all duration-1000 hover:shadow-xl">
              <div className="transition-transform duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                <PlaceholderImage
                  aspectRatio="portrait"
                  label={product.title}
                  dimensions="800 × 1000"
                  size="lg"
                />
              </div>

              {product.isSale && (
                <span className="absolute top-6 left-6 rounded-full bg-[#5cd3c4] px-3.5 py-1 text-xs font-bold text-gray-900 tracking-wider shadow-xs transition-transform duration-700 group-hover:scale-105">
                  Sale
                </span>
              )}
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="flex flex-col space-y-6">
              {/* Brand tag */}
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Business Name
                </span>
                <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-950">
                  {product.title}
                </h1>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3">
                <span className="text-xl sm:text-2xl font-semibold text-gray-950">
                  ${product.price.toFixed(2)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
                {product.isSale && (
                  <span className="rounded-full bg-[#5cd3c4] px-2.5 py-0.5 text-xs font-bold text-gray-900">
                    Sale
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm leading-relaxed text-gray-700">
                  {product.description}
                </p>
              </div>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-3">
                    Key Features
                  </h2>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-900 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Collapsible Details */}
              <div className="border-t border-gray-200 pt-2 space-y-1">
                {/* Materials & Care */}
                <div className="border-b border-gray-100">
                  <button
                    type="button"
                    onClick={() => toggleSection('materials')}
                    aria-expanded={Boolean(openSections['materials'])}
                    className="flex w-full items-center justify-between py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-900 hover:text-black transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-black rounded-xs"
                  >
                    <span>Materials & Care</span>
                    <svg
                      className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        openSections['materials'] ? 'rotate-180 text-black' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    style={{
                      gridTemplateRows: openSections['materials'] ? '1fr' : '0fr',
                    }}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      openSections['materials'] ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">
                      <p className="pb-3 pt-0.5 text-xs text-gray-600 leading-relaxed">
                        Crafted with premium durable materials designed for long-lasting performance. Wipe clean with a soft damp cloth.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping & Returns */}
                <div className="border-b border-gray-100">
                  <button
                    type="button"
                    onClick={() => toggleSection('shipping')}
                    aria-expanded={Boolean(openSections['shipping'])}
                    className="flex w-full items-center justify-between py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-900 hover:text-black transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-black rounded-xs"
                  >
                    <span>Shipping & Returns</span>
                    <svg
                      className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        openSections['shipping'] ? 'rotate-180 text-black' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    style={{
                      gridTemplateRows: openSections['shipping'] ? '1fr' : '0fr',
                    }}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      openSections['shipping'] ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">
                      <p className="pb-3 pt-0.5 text-xs text-gray-600 leading-relaxed">
                        Standard shipping delivery within 3-5 business days. Hassle-free 30-day return policy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back Link */}
              <div className="border-t border-gray-200 pt-6">
                <Link
                  href="/collections/all"
                  className="inline-flex items-center text-xs font-medium text-gray-600 hover:text-black transition"
                >
                  ← Back to all products
                </Link>
              </div>
            </div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <ScrollReveal>
              <section
                className="mt-16 sm:mt-24 border-t border-gray-100 pt-12 sm:pt-16"
                aria-label="Related products"
              >
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-950 mb-6 sm:mb-8">
                  Related products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {relatedProducts.map((item, idx) => (
                    <ScrollReveal key={item.id} delay={(idx % 4) * 80}>
                      <ProductCard product={item} />
                    </ScrollReveal>
                  ))}
                </div>
              </section>
            </ScrollReveal>
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
