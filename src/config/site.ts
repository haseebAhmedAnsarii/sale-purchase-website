export const siteConfig = {
  name: 'TERRA STUDIO',
  tagline: 'Scandinavian Ceramics & Modern Home Decor',
  description:
    'Handcrafted stoneware, sculptural vases, and warm ambient lighting rooted in Scandinavian minimalism and slow living.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://shariq-terra-studio-website.vercel.app',
  ogImage: '/og-image.jpg',
  creator: '@terrastudio',
  links: {
    github: 'https://github.com/haseebAhmedAnsarii/sale-purchase-website',
  },
} as const

export type SiteConfig = typeof siteConfig
