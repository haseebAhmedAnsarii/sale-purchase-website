import type { Metadata } from 'next'
import { CollectionsAllClient } from './CollectionsAllClient'
import { productsData } from '@/data/products'
import { getProductSlug } from '@/utils/product'
import { siteConfig } from '@/config/site'

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
      '@id': `${siteConfig.url}/collections/all#webpage`,
      url: `${siteConfig.url}/collections/all`,
      name: 'All Products | TERRA STUDIO',
      description:
        'Complete catalog of handcrafted stoneware ceramics, sculptural vases, ambient lighting, and organic linen textiles.',
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
      '@id': `${siteConfig.url}/collections/all#itemlist`,
      name: 'All Products',
      numberOfItems: productsData.length,
      itemListElement: productsData.map((prod, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: prod.title,
        url: `${siteConfig.url}/products/${getProductSlug(prod)}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteConfig.url}/collections/all#breadcrumbs`,
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
