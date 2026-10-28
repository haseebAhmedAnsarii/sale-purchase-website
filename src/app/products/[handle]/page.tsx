import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { productsData } from '@/data/products'
import { getProductSlug, getProductBySlug } from '@/utils/product'
import { siteConfig } from '@/config/site'
import { ProductDetailClient } from './ProductDetailClient'

export const instant = false

interface PageProps {
  params: Promise<{
    handle: string
  }>
}

export function generateStaticParams() {
  return productsData.map((product) => ({
    handle: getProductSlug(product),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params
  const product = getProductBySlug(handle)

  if (!product) {
    return {
      title: 'Product Not Found | TERRA STUDIO',
    }
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | TERRA STUDIO`,
      description: product.description,
      images: product.imageSrc
        ? [
            {
              url: product.imageSrc,
              alt: product.imageAlt || product.title,
            },
          ]
        : ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | TERRA STUDIO`,
      description: product.description,
      images: product.imageSrc ? [product.imageSrc] : ['/og-image.jpg'],
    },
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { handle } = await params
  const product = getProductBySlug(handle)

  if (!product) {
    notFound()
  }

  const productUrl = `${siteConfig.url}/products/${handle}`
  const imageUrl = product.imageSrc?.startsWith('http')
    ? product.imageSrc
    : `${siteConfig.url}${product.imageSrc || '/og-image.jpg'}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        url: productUrl,
        name: product.title,
        description: product.description,
        image: [imageUrl],
        sku: String(product.id),
        datePublished: '2026-01-01T00:00:00Z',
        dateModified: '2026-10-27T00:00:00Z',
        brand: {
          '@type': 'Brand',
          name: 'TERRA STUDIO',
        },
        offers: {
          '@type': 'Offer',
          '@id': `${productUrl}#offer`,
          url: productUrl,
          priceCurrency: 'USD',
          price: product.price,
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: 'TERRA STUDIO',
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${productUrl}#breadcrumbs`,
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
            name: 'Catalog',
            item: `${siteConfig.url}/collections/all`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.title,
            item: productUrl,
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
      <ProductDetailClient product={product} />
    </>
  )
}

