import type { Metadata, Viewport } from 'next'
import { SmoothScroll } from '@/components/SmoothScroll'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shariq-terra-studio-website.vercel.app'

export const viewport: Viewport = {
  themeColor: '#1c1917',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'TERRA STUDIO',
      description: 'Scandinavian Ceramics & Modern Home Decor',
      inLanguage: 'en-US',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'TERRA STUDIO',
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      image: `${SITE_URL}/og-image.jpg`,
      description: 'Handcrafted stoneware, sculptural vases, and warm ambient lighting rooted in Scandinavian minimalism and slow living.',
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
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}

