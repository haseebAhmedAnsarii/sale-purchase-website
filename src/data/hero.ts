export interface HeroData {
  title: string
  description: string
  buttonText: string
  buttonHref: string
  imageSrc: string
  imageAlt: string
}

export const heroData: HeroData = {
  title: 'Main Headline Title',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  buttonText: 'Shop products',
  buttonHref: '/collections/all',
  imageSrc: '/images/placeholder-hero.svg',
  imageAlt: 'Hero placeholder image',
}
