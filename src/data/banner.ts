export interface BannerData {
  title: string
  description: string
  buttonText: string
  buttonHref: string
  imageSrc: string
  imageAlt: string
}

export const bannerData: BannerData = {
  title: 'Section Heading Title',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  buttonText: 'Button Action',
  buttonHref: '/products/product-01',
  imageSrc: '/images/placeholder-banner.svg',
  imageAlt: 'Promo banner placeholder image',
}
