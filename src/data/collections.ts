import type { Collection } from '@/types'

export const collectionsData: Collection[] = [
  {
    id: 'col-1',
    title: 'Stoneware & Dining',
    description: 'Artisanal speckled dinnerware, handcrafted serving bowls, and organic stoneware designed for slow dining and mindful gatherings.',
    imageSrc: '/images/collection-stoneware.jpg',
    imageAlt: 'Handcrafted stoneware dining plates and bowls in neutral Scandinavian tones',
    productIds: ['prod-1', 'prod-4'],
  },
  {
    id: 'col-2',
    title: 'Sculptural Vases',
    description: 'Architectural silhouettes and raw earthy textures created to bring understated luxury and organic geometry to any space.',
    imageSrc: '/images/collection-vases.jpg',
    imageAlt: 'Architectural ceramic vases with fluted terracotta and natural textures',
    productIds: ['prod-2', 'prod-5'],
  },
  {
    id: 'col-3',
    title: 'Ambient Lighting',
    description: 'Warm brushed brass accents and diffused glowing lighting that create an immediate cozy, tranquil sanctuary.',
    imageSrc: '/images/collection-lighting.jpg',
    imageAlt: 'Warm ambient interior lighting with brushed brass lamp and soft evening glow',
    productIds: ['prod-3'],
  },
]

