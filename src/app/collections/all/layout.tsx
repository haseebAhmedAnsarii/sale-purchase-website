import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Explore the complete catalog of handcrafted Scandinavian stoneware ceramics, sculptural architectural vases, warm ambient lighting, and organic textiles.',
  openGraph: {
    title: 'All Products | TERRA STUDIO',
    description: 'Explore the complete catalog of handcrafted Scandinavian stoneware ceramics, architectural vases, and ambient lighting.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Products | TERRA STUDIO',
    description: 'Explore the complete catalog of handcrafted Scandinavian stoneware ceramics, architectural vases, and ambient lighting.',
    images: ['/og-image.jpg'],
  },
}

export default function CollectionsAllLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
