import { NextResponse } from 'next/server'
import { productsData } from '@/data/products'
import { collectionsData } from '@/data/collections'
import { getProductSlug } from '@/utils/product'
import { getCollectionSlug } from '@/utils/collection'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    server: 'TERRA STUDIO MCP Server',
    description: 'Model Context Protocol endpoints for product and collection discovery.',
    tools: ['search_products', 'list_collections', 'get_product'],
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { method, params } = body

    if (method === 'tools/list') {
      return NextResponse.json({
        tools: [
          {
            name: 'search_products',
            description: 'Search ceramic tableware, vases, lighting, and home decor by keyword.',
            inputSchema: {
              type: 'object',
              properties: {
                query: { type: 'string' },
              },
              required: ['query'],
            },
          },
          {
            name: 'list_collections',
            description: 'List all curated studio collections.',
            inputSchema: { type: 'object', properties: {} },
          },
          {
            name: 'get_product',
            description: 'Get details for a product by its handle.',
            inputSchema: {
              type: 'object',
              properties: {
                handle: { type: 'string' },
              },
              required: ['handle'],
            },
          },
        ],
      })
    }

    if (method === 'tools/call') {
      const toolName = params?.name
      const args = params?.arguments || {}

      if (toolName === 'search_products') {
        const q = (args.query || '').toLowerCase()
        const matches = productsData.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        )
        return NextResponse.json({
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                matches.map((p) => ({
                  title: p.title,
                  price: p.price,
                  handle: getProductSlug(p),
                  url: `https://shariq-terra-studio-website.vercel.app/products/${getProductSlug(p)}`,
                }))
              ),
            },
          ],
        })
      }

      if (toolName === 'list_collections') {
        return NextResponse.json({
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                collectionsData.map((c) => ({
                  title: c.title,
                  handle: getCollectionSlug(c),
                  productCount: c.productIds?.length || 0,
                  url: `https://shariq-terra-studio-website.vercel.app/collections/${getCollectionSlug(c)}`,
                }))
              ),
            },
          ],
        })
      }

      if (toolName === 'get_product') {
        const found = productsData.find((p) => getProductSlug(p) === args.handle)
        if (!found) {
          return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }
        return NextResponse.json({
          content: [
            {
              type: 'text',
              text: JSON.stringify(found),
            },
          ],
        })
      }
    }

    return NextResponse.json({ error: 'Unknown method' }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
