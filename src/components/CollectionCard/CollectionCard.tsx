import Link from 'next/link'
import type { Collection } from '@/types'
import { PlaceholderImage } from '../PlaceholderImage'
import { getCollectionSlug } from '@/utils/collection'

interface Props {
  collection: Collection
}

export function CollectionCard({ collection }: Props) {
  const slug = getCollectionSlug(collection)

  return (
    <Link
      href={`/collections/${slug}`}
      className="group flex flex-col cursor-pointer transition focus-visible:outline-2 focus-visible:outline-black"
    >
      {/* Visual Area with Placeholder */}
      <div className="relative w-full overflow-hidden rounded-xs bg-[#f8f9fa] p-4 sm:p-6 transition-all duration-300 group-hover:bg-[#f1f3f5] group-hover:shadow-lg">
        <PlaceholderImage
          aspectRatio="portrait"
          label="Placeholder Image"
          dimensions="800 × 1000"
          size="lg"
        />
      </div>

      {/* Label and Arrow */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm sm:text-base font-semibold text-gray-950 group-hover:underline underline-offset-4">
          {collection.title}
        </span>
        <span className="text-base sm:text-lg text-gray-950 transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  )
}
