import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { productsData } from '@/data/products'
import { getProductSlug } from '@/utils/product'
import { ProductDetailClient } from './ProductDetailClient'

interface PageProps {
  params: Promise<{
    handle: string
  }>
}

function findProduct(handle: string) {
  return productsData.find((p) => getProductSlug(p) === handle)
}

export function generateStaticParams() {
  return productsData.map((product) => ({
    handle: getProductSlug(product),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params
  const product = findProduct(handle)

  if (!product) {
    return {
      title: 'Product Not Found | TERRA STUDIO',
    }
  }

  return {
    title: `${product.title} | TERRA STUDIO`,
    description: product.description,
  }
}

function ProductDetailSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-white animate-pulse" aria-hidden="true">
      <div className="h-16 border-b border-gray-100 bg-gray-50/50" />
      <div className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-36 bg-gray-200 rounded mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            <div className="aspect-4/5 bg-gray-100 rounded-lg" />
            <div className="space-y-6 pt-2">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-8 w-3/4 bg-gray-200 rounded" />
              <div className="h-6 w-28 bg-gray-200 rounded" />
              <div className="h-20 w-full bg-gray-100 rounded" />
            </div>
          </div>
          <div className="mt-16 sm:mt-24 border-t border-gray-100 pt-12 sm:pt-16">
            <div className="h-6 w-44 bg-gray-200 rounded mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-3/4 bg-gray-100 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

async function ProductDetails({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product = findProduct(handle)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  )
}

