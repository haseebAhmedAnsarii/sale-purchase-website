import { NextResponse } from 'next/server'
import { productsData } from '@/data/products'
import { collectionsData } from '@/data/collections'
import { getProductSlug } from '@/utils/product'
import { getCollectionSlug } from '@/utils/collection'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') || '/'
  const cleanPath = path.replace(/\/$/, '') || '/'

  let markdown = ''

  if (cleanPath === '/') {
    markdown = `# TERRA STUDIO | Scandinavian Ceramics & Modern Home Decor
> Handcrafted stoneware, sculptural vases, and warm ambient lighting rooted in Scandinavian minimalism and slow living.

## Curated Collections
${collectionsData
  .map(
    (c) =>
      `- [${c.title}](/collections/${getCollectionSlug(c)}): ${c.description} (${c.productIds?.length || 0} pieces)`
  )
  .join('\n')}
- [Complete Catalog](/collections/all): Explore all studio ceramics and interior decor.

## Featured Pieces
${productsData
  .map(
    (p) =>
      `### [${p.title}](/products/${getProductSlug(p)})
- **Price**: $${p.price.toFixed(2)}${p.compareAtPrice ? ` (Original: $${p.compareAtPrice.toFixed(2)})` : ''}
- **Overview**: ${p.description}
${p.features && p.features.length > 0 ? `- **Features**: ${p.features.join(' • ')}` : ''}`
  )
  .join('\n\n')}

## Craftsmanship & Philosophy
Every TERRA STUDIO vessel begins as raw, mineral-rich stoneware clay sourced from historic European riverbeds. Hand-thrown on the wheel by master potters and twice-fired at 1,280°C, our dinnerware and vessels achieve unmatched structural density, chip resistance, and organic tactile surfaces.

## Studio Details
- **Platform**: Online Design Studio & Curated Living Objects
- **Machine Discovery**: [llms.txt](/llms.txt) • [AGENTS.md](/AGENTS.md) • [MCP Server](/.well-known/mcp.json)
`
  } else if (cleanPath.startsWith('/products/')) {
    const handle = cleanPath.replace('/products/', '')
    const product = productsData.find((p) => getProductSlug(p) === handle)

    if (!product) {
      markdown = `# 404 Product Not Found\nThe requested vessel or product is no longer available in the studio catalog.\n\nBrowse all pieces at [/collections/all](/collections/all).`
    } else {
      markdown = `# ${product.title}
- **Price**: $${product.price.toFixed(2)}${product.compareAtPrice ? ` (Compare at: $${product.compareAtPrice.toFixed(2)})` : ''}${product.isSale ? ' (Sale)' : ''}
- **Brand**: TERRA STUDIO
- **Availability**: In Stock (Handmade in small batches)

## Description
${product.description}

${
  product.features && product.features.length > 0
    ? `## Specifications & Features\n${product.features.map((f) => `- ${f}`).join('\n')}`
    : ''
}

## Care & Maintenance
All glazed stoneware plates and bowls are dishwasher and microwave safe. For unglazed sculptural vases and raw terra cotta vessels, hand washing with warm water and mild soap is recommended to preserve natural surface patinas.

## Studio
- Platform: Online Design Studio & Curated Living Objects
`
    }
  } else if (cleanPath.startsWith('/collections/')) {
    const handle = cleanPath.replace('/collections/', '')

    if (handle === 'all') {
      markdown = `# Complete Studio Catalog | TERRA STUDIO
Discover our complete offering of handcrafted ceramic dinnerware, sculptural vessels, ambient brass lamps, and tactile European flax linen.

## Products (${productsData.length} items)
${productsData
  .map(
    (p) =>
      `- [${p.title}](/products/${getProductSlug(p)}) — $${p.price.toFixed(2)}: ${p.description}`
  )
  .join('\n')}
`
    } else {
      const collection = collectionsData.find((c) => getCollectionSlug(c) === handle)
      if (!collection) {
        markdown = `# 404 Collection Not Found\nBrowse all pieces at [/collections/all](/collections/all).`
      } else {
        const items = productsData.filter((p) => collection.productIds?.includes(p.id))
        markdown = `# ${collection.title} | TERRA STUDIO
${collection.description}

## Pieces in Collection (${items.length} items)
${items
  .map(
    (p) =>
      `### [${p.title}](/products/${getProductSlug(p)})
- **Price**: $${p.price.toFixed(2)}
- **Description**: ${p.description}`
  )
  .join('\n\n')}
`
      }
    }
  } else if (cleanPath === '/about') {
    markdown = `# About TERRA STUDIO
> Handcrafted ceramics and living objects rooted in Danish minimalism and Japanese wabi-sabi philosophy.

## Our Story
Founded as an online design sanctuary, TERRA STUDIO operates at the intersection of architectural discipline and organic craft. Our mission is to counter transient consumer decor by creating heirloom vessels and tableware shaped slowly by hand.

## Master Craftsmanship
Every stoneware piece is thrown on manual pottery wheels by experienced European artisans, hand-trimmed, and twice-fired at 1,280°C. We celebrate organic iron speckling, micro-variations in mineral glazes, and unglazed earthy textures.

## Sustainable Materials
- **Flax Linen**: 100% OEKO-TEX Standard 100 certified European flax pre-washed with natural pumice.
- **Natural Travertine**: Solid Roman travertine honed with matte silken finishes.
- **Solid Brass**: Machined, brushed solid brass without artificial varnishes, designed to patina gracefully over time.

## Studio
Online Design Studio & Curated Living Objects
`
  } else {
    markdown = `# TERRA STUDIO
Browse handcrafted Scandinavian stoneware and modern home decor at https://shariq-terra-studio-website.vercel.app.
`
  }

  return new Response(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Last-Modified': 'Tue, 27 Oct 2026 00:00:00 GMT',
    },
  })
}
