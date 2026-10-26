import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TERRA STUDIO | Scandinavian Ceramics & Interior Home Decor',
  description: 'Handcrafted stoneware, sculptural vases, and warm ambient lighting rooted in Scandinavian minimalism and slow living.',
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
