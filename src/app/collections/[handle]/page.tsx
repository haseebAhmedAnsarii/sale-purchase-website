import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { collectionsData } from '@/data/collections'
import { productsData } from '@/data/products'
import { getCollectionSlug } from '@/utils/collection'
import { getProductSlug } from '@/utils/product'
import { CollectionDetailClient } from './CollectionDetailClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shariq-terra-studio-website.vercel.app'

export const instant = false

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
    title: collection.title,
    description: collection.description,
    openGraph: {
      title: `${collection.title} | TERRA STUDIO`,
      description: collection.description,
      images: collection.imageSrc
        ? [
            {
              url: collection.imageSrc,
              alt: collection.imageAlt || collection.title,
            },
          ]
        : ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${collection.title} | TERRA STUDIO`,
      description: collection.description,
      images: collection.imageSrc ? [collection.imageSrc] : ['/og-image.jpg'],
    },
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { handle } = await params
  const collection = collectionsData.find((c) => getCollectionSlug(c) === handle)

  if (!collection) {
    notFound()
  }

  const products = productsData.filter((product) =>
    collection.productIds?.includes(product.id)
  )

  const collectionUrl = `${SITE_URL}/collections/${handle}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${collectionUrl}#webpage`,
        url: collectionUrl,
        name: collection.title,
        description: collection.description,
        datePublished: '2026-01-01T00:00:00Z',
        dateModified: '2026-10-27T00:00:00Z',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: 'TERRA STUDIO',
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${collectionUrl}#itemlist`,
        name: collection.title,
        description: collection.description,
        numberOfItems: products.length,
        itemListElement: products.map((prod, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: prod.title,
          url: `${SITE_URL}/products/${getProductSlug(prod)}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${collectionUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Collections',
            item: `${SITE_URL}/collections/all`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: collection.title,
            item: collectionUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CollectionDetailClient collection={collection} products={products} />
    </>
  )
}
