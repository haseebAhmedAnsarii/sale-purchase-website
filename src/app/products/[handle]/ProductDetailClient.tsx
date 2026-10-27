'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import { PlaceholderImage } from '@/components/PlaceholderImage'
import { ProductCard } from '@/components/ProductCard'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Footer } from '@/components/Footer'
import { SearchModal } from '@/components/SearchModal'
import { productsData } from '@/data/products'
import { businessName } from '@/data/navigation'
import { addRecentlyViewed, useRecentlyViewed } from '@/utils/recentlyViewed'
import type { Product } from '@/types'

interface Props {
  product: Product
}

export function ProductDetailClient({ product }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Track product in recently viewed
  useEffect(() => {
    addRecentlyViewed(product.id)
  }, [product.id])

  const recentlyViewed = useRecentlyViewed(product.id)

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id))
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null)
    }, 2500)
  }

  // Direct clipboard copy without browser/windows share popup
  const handleCopyPiece = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      showToast('Piece link copied to clipboard')
    } catch {
      showToast('Unable to copy link')
    }
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
          <ScrollReveal direction="none" delay={40}>
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
          </ScrollReveal>

          {/* Product Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            {/* Left: Product Image */}
            <ScrollReveal direction="up" delay={80}>
              <div className="group relative aspect-4/5 w-full overflow-hidden rounded-lg bg-[#f4f2ef] border border-gray-100 transition-all duration-1000 hover:shadow-xl">
                <div className="relative w-full h-full transition-transform duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                  {product.imageSrc ? (
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt || product.title}
                      fill
                      priority
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="p-6 sm:p-8 h-full flex items-center justify-center">
                      <PlaceholderImage
                        aspectRatio="portrait"
                        label={product.title}
                        dimensions="800 × 1000"
                        size="lg"
                      />
                    </div>
                  )}
                </div>

                {product.isSale && (
                  <span className="absolute top-6 left-6 rounded-full bg-[#5cd3c4] px-3.5 py-1 text-xs font-bold text-gray-900 tracking-wider shadow-xs transition-transform duration-500 hover:scale-105 z-10">
                    Sale
                  </span>
                )}
              </div>
            </ScrollReveal>

            {/* Right: Product Details */}
            <div className="flex flex-col space-y-6">
              {/* Brand tag & Title & Price & Copy Piece */}
              <ScrollReveal direction="up" delay={120}>
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#765b48] block mb-1">
                    {businessName}
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-950">
                    {product.title}
                  </h1>
                </div>

                <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl sm:text-2xl font-semibold text-gray-950">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-base text-gray-600 line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                    {product.isSale && (
                      <span className="rounded-full bg-[#5cd3c4] px-2.5 py-0.5 text-xs font-bold text-gray-900 transition-transform duration-300 hover:scale-105">
                        Sale
                      </span>
                    )}
                  </div>

                  {/* Copy Piece action button */}
                  <button
                    type="button"
                    onClick={handleCopyPiece}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:border-black hover:text-black hover:bg-gray-50 transition-all duration-300 active:scale-95 cursor-pointer"
                    title="Copy piece link to clipboard"
                    aria-label="Copy link to this piece"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy Piece</span>
                  </button>
                </div>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal direction="up" delay={200}>
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm leading-relaxed text-gray-700">
                    {product.description}
                  </p>
                </div>
              </ScrollReveal>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <ScrollReveal direction="up" delay={280}>
                  <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-3">
                      Key Features
                    </h2>
                    <ul className="space-y-2.5 text-sm text-gray-600">
                      {product.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2.5 transition-transform duration-300 hover:translate-x-1"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#765b48] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )}

              {/* Collapsible Details */}
              <ScrollReveal direction="up" delay={360}>
                <div className="border-t border-gray-200 pt-2 space-y-1">
                  {/* Materials & Care */}
                  <div className="border-b border-gray-100">
                    <button
                      type="button"
                      onClick={() => toggleSection('materials')}
                      aria-expanded={openSection === 'materials'}
                      className="flex w-full items-center justify-between py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-900 hover:text-black transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-black rounded-xs"
                    >
                      <span>Materials & Care</span>
                      <svg
                        className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          openSection === 'materials' ? 'rotate-180 text-black' : ''
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
                        gridTemplateRows: openSection === 'materials' ? '1fr' : '0fr',
                      }}
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        openSection === 'materials' ? 'opacity-100' : 'opacity-0'
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
                      aria-expanded={openSection === 'shipping'}
                      className="flex w-full items-center justify-between py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-900 hover:text-black transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-black rounded-xs"
                    >
                      <span>Shipping & Returns</span>
                      <svg
                        className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          openSection === 'shipping' ? 'rotate-180 text-black' : ''
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
                        gridTemplateRows: openSection === 'shipping' ? '1fr' : '0fr',
                      }}
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        openSection === 'shipping' ? 'opacity-100' : 'opacity-0'
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
              </ScrollReveal>

              {/* Back Link */}
              <ScrollReveal direction="up" delay={420}>
                <div className="border-t border-gray-200 pt-6">
                  <Link
                    href="/collections/all"
                    className="group inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-black transition"
                  >
                    <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                    <span>Back to all products</span>
                  </Link>
                </div>
              </ScrollReveal>
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

          {/* Recently Viewed pieces */}
          {recentlyViewed.length > 0 && (
            <ScrollReveal>
              <section
                className="mt-8 sm:mt-12 border-t border-gray-100 pt-8 sm:pt-10"
                aria-label="Recently viewed pieces"
              >
                <div className="mb-6 sm:mb-8">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#765b48] block mb-1">
                    Your Browsing History
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-950">
                    Recently Viewed
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {recentlyViewed.map((item, idx) => (
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

      {/* Floating Share / Copy Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-lg bg-gray-950 px-4 py-3 text-xs font-medium text-white shadow-2xl animate-fade-in border border-gray-800"
        >
          <svg className="h-4 w-4 text-[#5cd3c4] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
