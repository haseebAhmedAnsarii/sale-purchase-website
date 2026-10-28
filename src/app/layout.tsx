import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { SmoothScroll } from '@/components/SmoothScroll'
import { NavigationProgressBar } from '@/components/NavigationProgressBar'
import { BackToTop } from '@/components/BackToTop'
import { SearchProvider } from '@/context'
import { siteConfig } from '@/config/site'
import './globals.css'

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

export const viewport: Viewport = {
  themeColor: '#1c1917',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'x-default': '/',
    },
  },
  title: {
    default: 'TERRA STUDIO | Scandinavian Ceramics & Modern Home Decor',
    template: '%s | TERRA STUDIO',
  },
  description: 'Handcrafted stoneware, sculptural vases, and warm ambient lighting rooted in Scandinavian minimalism and slow living.',
  keywords: [
    'Scandinavian ceramics',
    'interior home decor',
    'stoneware dining',
    'sculptural vases',
    'ambient lighting',
    'slow living',
    'minimalist home',
    'nordic design',
  ],
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'TERRA STUDIO | Scandinavian Ceramics & Modern Home Decor',
    description: 'Soft lighting, earthy textures, and architectural silhouettes handcrafted for serene modern sanctuaries.',
    url: '/',
    siteName: 'TERRA STUDIO',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TERRA STUDIO - Scandinavian Ceramics & Interior Home Decor',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@terrastudio',
    creator: '@terrastudio',
    title: 'TERRA STUDIO | Scandinavian Ceramics & Modern Home Decor',
    description: 'Soft lighting, earthy textures, and architectural silhouettes handcrafted for serene modern sanctuaries.',
    images: [
      {
        url: '/og-image.jpg',
        alt: 'TERRA STUDIO - Scandinavian Ceramics & Interior Home Decor',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  other: {
    'og:updated_time': '2026-10-27T00:00:00Z',
    'article:modified_time': '2026-10-27T00:00:00Z',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: 'TERRA STUDIO',
      description: 'Scandinavian Ceramics & Modern Home Decor',
      inLanguage: 'en-US',
      datePublished: '2026-01-01T00:00:00Z',
      dateModified: '2026-10-27T00:00:00Z',
      publisher: {
        '@id': `${siteConfig.url}/#organization`,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: 'TERRA STUDIO',
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.png`,
      image: `${siteConfig.url}/og-image.jpg`,
      description: 'Handcrafted stoneware, sculptural vases, and warm ambient lighting rooted in Scandinavian minimalism and slow living.',
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteConfig.url}/#faq`,
      datePublished: '2026-01-01T00:00:00Z',
      dateModified: '2026-10-27T00:00:00Z',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How should I care for handcrafted stoneware and unglazed terracotta?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'All glazed stoneware plates and bowls are dishwasher and microwave safe. For unglazed sculptural vases and raw terra cotta vessels, we recommend hand washing with warm water and mild botanical soap to preserve natural surface patinas. Travertine trays should be wiped clean with a damp cloth and mild neutral pH soap.',
          },
        },
        {
          '@type': 'Question',
          name: 'What defines the Scandinavian slow living philosophy behind your decor?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Slow living centers on curating fewer, more meaningful objects that elevate daily rituals. Rather than transient seasonal decor, our ceramics, lamps, and linen throws are designed to age gracefully alongside you, grounding living rooms, dining tables, and bedrooms with tactile simplicity and timeless serenity.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are your organic linen throws and bouclé textiles sustainably crafted?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our linen is woven exclusively from OEKO-TEX Standard 100 certified European flax cultivated without harmful synthetic pesticides. Pre-washed with natural pumice stones for immediate cloud-soft drape, our throws provide breathable, hypoallergenic year-round insulation.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`
            [data-scroll-reveal],
            .opacity-0 {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body className={`min-h-full flex flex-col bg-white text-gray-900 ${sansFont.variable} font-sans`}>
        <Suspense fallback={null}>
          <NavigationProgressBar />
        </Suspense>
        <SearchProvider>
          <SmoothScroll>
            {children}
            <BackToTop />
          </SmoothScroll>
        </SearchProvider>
        <div className="paper-grain-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}

