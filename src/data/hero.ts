export interface HeroData {
  title: string
  description: string
  buttonText: string
  buttonHref: string
  imageSrc: string
  imageAlt: string
}

export const heroData: HeroData = {
  title: 'Scandinavian Ceramics & Interior Home Decor',
  description: 'Soft lighting, earthy textures, and architectural silhouettes handcrafted for serene modern sanctuaries.',
  buttonText: 'Shop products',
  buttonHref: '/collections/all',
  imageSrc: '/images/hero.jpg',
  imageAlt: 'Minimalist Scandinavian interior with handcrafted stoneware ceramics',
}
