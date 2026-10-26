import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://terra-studio.vercel.app'),
  title: {
    default: 'TERRA STUDIO | Scandinavian Ceramics & Interior Home Decor',
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
  openGraph: {
    title: 'TERRA STUDIO | Scandinavian Ceramics & Interior Home Decor',
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
    title: 'TERRA STUDIO | Scandinavian Ceramics & Interior Home Decor',
    description: 'Soft lighting, earthy textures, and architectural silhouettes handcrafted for serene modern sanctuaries.',
    images: ['/og-image.jpg'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
