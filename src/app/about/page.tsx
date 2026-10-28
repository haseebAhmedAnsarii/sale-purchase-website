import type { Metadata } from 'next'
import { AboutClient } from './AboutClient'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'About Our Studio & Artisanal Provenance',
  description:
    'Discover the story of TERRA STUDIO. Handcrafted stoneware ceramics, organic linen textiles, and architectural home decor rooted in Scandinavian minimalism and slow living.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About TERRA STUDIO | Nordic Craftsmanship & Slow Living',
    description:
      'Shaped slowly by hand in European workshops using mineral clays, unglazed terracotta, and natural linen fibers.',
    url: '/about',
    type: 'website',
  },
}

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${siteConfig.url}/about#webpage`,
  url: `${siteConfig.url}/about`,
  name: 'About TERRA STUDIO',
  description:
    'Handcrafted stoneware ceramics, sculptural vases, and warm ambient lighting rooted in Scandinavian minimalism and slow living.',
  datePublished: '2026-01-01T00:00:00Z',
  dateModified: '2026-10-27T00:00:00Z',
  mainEntity: {
    '@type': 'Organization',
    name: 'TERRA STUDIO',
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutClient />
    </>
  )
}
