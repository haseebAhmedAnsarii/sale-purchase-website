import type { Metadata } from 'next'
import { CollectionsAllClient } from './CollectionsAllClient'
import { productsData } from '@/data/products'
import { getProductSlug } from '@/utils/product'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shariq-terra-studio-website.vercel.app'

export const metadata: Metadata = {
  title: 'Complete Catalog | All Handcrafted Ceramics & Living Decor',
  description:
    'Explore the complete TERRA STUDIO collection of handcrafted stoneware ceramics, sculptural vases, ambient brass lighting, and organic linen textiles.',
  alternates: {
    canonical: '/collections/all',
  },
  openGraph: {
    title: 'Complete Catalog | TERRA STUDIO',
    description:
      'Handcrafted Scandinavian stoneware ceramics, tableware, sculptural vessels, and ambient lighting.',
    url: '/collections/all',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/collections/all#webpage`,
      url: `${SITE_URL}/collections/all`,
      name: 'All Products | TERRA STUDIO',
      description:
        'Complete catalog of handcrafted stoneware ceramics, sculptural vases, ambient lighting, and organic linen textiles.',
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
      '@id': `${SITE_URL}/collections/all#itemlist`,
      name: 'All Products',
      numberOfItems: productsData.length,
      itemListElement: productsData.map((prod, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: prod.title,
        url: `${SITE_URL}/products/${getProductSlug(prod)}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/collections/all#breadcrumbs`,
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
          name: 'Catalog',
          item: `${SITE_URL}/collections/all`,
        },
      ],
    },
  ],
}

export default function CollectionsAllPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CollectionsAllClient />
    </>
  )
}
