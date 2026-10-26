import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { collectionsData } from '@/data/collections'
import { productsData } from '@/data/products'
import { getCollectionSlug } from '@/utils/collection'
import { CollectionDetailClient } from './CollectionDetailClient'

interface PageProps {
  params: Promise<{
    handle: string
  }>
}

export function generateStaticParams() {
  return collectionsData.map((collection) => ({
    handle: getCollectionSlug(collection),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params
  const collection = collectionsData.find((c) => getCollectionSlug(c) === handle)

  if (!collection) {
    return {
      title: 'Collection Not Found | TERRA STUDIO',
    }
  }

  return {
    title: `${collection.title} | TERRA STUDIO`,
    description: collection.description,
  }
}

function CollectionSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-white animate-pulse" aria-hidden="true">
      <div className="h-16 border-b border-gray-100 bg-gray-50/50" />
      <div className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-36 bg-gray-200 rounded mb-8" />
          <div className="border-b border-gray-100 pb-6 mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-96 bg-gray-100 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-3/4 bg-gray-100 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

async function CollectionDetails({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const collection = collectionsData.find((c) => getCollectionSlug(c) === handle)

  if (!collection) {
    notFound()
  }

  const products = productsData.filter((product) =>
    collection.productIds?.includes(product.id)
  )

  return <CollectionDetailClient collection={collection} products={products} />
}

export default function CollectionPage({ params }: PageProps) {
  return (
    <Suspense fallback={<CollectionSkeleton />}>
      <CollectionDetails params={params} />
    </Suspense>
  )
}
