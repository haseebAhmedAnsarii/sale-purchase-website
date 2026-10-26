'use client'

import type { Product } from '@/types'
import { PlaceholderImage } from '../PlaceholderImage'

interface Props {
  product: Product | null
  onClose: () => void
}

export function ProductQuickView({ product, onClose }: Props) {
  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-[56rem] flex-col md:flex-row overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
        >
          ✕
        </button>

        {/* Product Image Placeholder Preview Column */}
        <div className="flex w-full md:w-[48%] items-center justify-center bg-gray-50 p-6 md:p-10">
          <PlaceholderImage
            aspectRatio="portrait"
            label="Placeholder Image"
            dimensions="800 × 1000"
            size="lg"
          />
        </div>

        {/* Product Details Column */}
        <div className="flex w-full md:w-[52%] flex-col justify-start p-6 md:p-8">
          <div>
            {product.isSale && (
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 mb-2">
                Sale
              </span>
            )}

            <h2 id="quick-view-title" className="text-2xl font-bold tracking-tight text-gray-950">
              {product.title}
            </h2>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              {product.description}
            </p>

            {/* Feature List */}
            {product.features && product.features.length > 0 && (
              <div className="mt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Features
                </label>
                <ul className="mt-2 space-y-1.5 text-xs text-gray-600">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-black" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
