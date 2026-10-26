import type { Metadata } from 'next'
import { NotFoundClient } from './NotFoundClient'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page or vessel you are looking for has been moved or is no longer part of our collection.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return <NotFoundClient />
}
