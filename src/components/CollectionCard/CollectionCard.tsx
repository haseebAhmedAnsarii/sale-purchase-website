import Link from 'next/link'
import Image from 'next/image'
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
      className="group flex flex-col cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-black"
    >
      {/* Visual Area with Image / Placeholder */}
      <div className="relative w-full aspect-3/4 overflow-hidden rounded-xs bg-[#f4f2ef] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[#ebe7e2] group-hover:shadow-xl">
        <div className="relative w-full h-full transition-transform duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
          {collection.imageSrc ? (
            <Image
              src={collection.imageSrc}
              alt={collection.imageAlt || collection.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="p-4 sm:p-6 h-full flex items-center justify-center">
              <PlaceholderImage
                aspectRatio="portrait"
                label="Placeholder Image"
                dimensions="800 × 1000"
                size="lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* Label and Arrow */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm sm:text-base font-semibold text-gray-950 transition-colors duration-500 group-hover:underline underline-offset-4">
          {collection.title}
        </span>
        <span className="text-base sm:text-lg text-gray-950 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
          →
        </span>
      </div>
    </Link>
  )
}
