export interface Product {
  id: string
  title: string
  price: number
  compareAtPrice?: number
  isSale?: boolean
  badge?: string
  description: string
  features: string[]
  imageSrc?: string
  imageAlt?: string
}

export interface Collection {
  id: string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  productIds?: string[]
}

export interface NavLink {
  label: string
  href: string
  mobileLabel?: string
}

export interface QuickLink {
  label: string
  href: string
}
