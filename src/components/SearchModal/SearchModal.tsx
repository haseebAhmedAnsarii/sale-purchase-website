import { useState, useEffect, useId } from 'react'
import Link from 'next/link'
import type { Product } from '@/types'
import { productsData } from '@/data/products'
import { getProductSlug } from '@/utils/product'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelectProduct?: (product: Product) => void
}

export function SearchModal({ isOpen, onClose, onSelectProduct }: Props) {
  const [query, setQuery] = useState('')
  const searchInputId = useId()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filtered = productsData.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs pt-[10vh] px-4 transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="animate-scale-in w-full max-w-[40rem] rounded-xl bg-white shadow-2xl overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-gray-200 px-3.5 py-3 sm:px-5 sm:py-4">
          <svg
            className="h-5 w-5 text-gray-500 shrink-0"
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
            placeholder="Search products, models, features..."
            className="min-w-0 flex-1 bg-transparent text-sm sm:text-base outline-hidden text-gray-900 placeholder:text-gray-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="shrink-0 text-xs text-gray-400 hover:text-gray-600 px-1 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-xs rounded-md bg-gray-100 px-2.5 py-1 text-gray-600 hover:bg-gray-200 cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[22rem] overflow-y-auto p-4 divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">
              No products found matching &quot;{query}&quot;.
            </div>
          ) : (
            filtered.map((product) => {
              const slug = getProductSlug(product)
              return (
                <Link
                  key={product.id}
                  href={`/products/${slug}`}
                  onClick={() => {
                    if (onSelectProduct) {
                      onSelectProduct(product)
                    }
                    onClose()
                  }}
                  className="group flex cursor-pointer items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-black">
                      {product.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                  <div className="text-right pl-4">
                    <span className="text-sm font-semibold text-gray-900">
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
            })
          )}
        </div>
      </div>
    </div>
  )
}

