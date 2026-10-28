import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { collectionsData } from '@/data/collections'
import { productsData } from '@/data/products'
import { getProductSlug } from '@/utils/product'
import { getCollectionSlug, getCollectionBySlug } from '@/utils/collection'
import { siteConfig } from '@/config/site'
import { CollectionDetailClient } from './CollectionDetailClient'

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
  const collection = getCollectionBySlug(handle)

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
  const collection = getCollectionBySlug(handle)

  if (!collection) {
    notFound()
  }

  const products = productsData.filter((product) =>
    collection.productIds?.includes(product.id)
  )

  const collectionUrl = `${siteConfig.url}/collections/${handle}`

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
          '@id': `${siteConfig.url}/#website`,
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
          url: `${siteConfig.url}/products/${getProductSlug(prod)}`,
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
            item: siteConfig.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Collections',
            item: `${siteConfig.url}/collections/all`,
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
