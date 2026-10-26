import Link from 'next/link'
import type { Product } from '@/types'
import { PlaceholderImage } from '../PlaceholderImage'
import { getProductSlug } from '@/utils/product'

interface Props {
  product: Product
  onClick?: (product: Product) => void
}

export function ProductCard({ product, onClick }: Props) {
  const slug = getProductSlug(product)

  return (
    <Link
      href={`/products/${slug}`}
      onClick={() => {
        if (onClick) {
          onClick(product)
        }
      }}
      className="group flex flex-col justify-between rounded-lg bg-white p-3 sm:p-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lg cursor-pointer block focus-visible:outline-2 focus-visible:outline-black"
    >
      {/* Product Image / Placeholder Container */}
      <div className="relative w-full overflow-hidden rounded-xs bg-[#f8f9fa] p-4 transition-colors duration-500 group-hover:bg-[#f1f3f5]">
        <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
          <PlaceholderImage
            aspectRatio="portrait"
            label="Placeholder Image"
            dimensions="600 × 800"
            size="md"
          />
        </div>

        {/* Sale badge */}
        {product.isSale && (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#5cd3c4] px-2.5 py-0.5 text-[0.6875rem] font-bold text-gray-900 tracking-wider shadow-xs transition-transform duration-500 group-hover:scale-105">
            Sale
          </span>
        )}
      </div>

      {/* Info Container */}
      <div className="mt-4 flex flex-col space-y-1">
        <h3 className="text-xs sm:text-sm font-medium text-gray-900 transition-colors duration-300 group-hover:text-black group-hover:underline underline-offset-4">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-xs sm:text-sm text-gray-900 font-medium">
            ${product.price.toFixed(2)}
          </span>

          {product.compareAtPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

