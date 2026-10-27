import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      $schema: 'https://modelcontextprotocol.io/schema.json',
      name: 'TERRA STUDIO MCP Server',
      description:
        'Model Context Protocol server for TERRA STUDIO. Query handcrafted Scandinavian stoneware, sculptural vases, and artisan decor.',
      servers: [
        {
          name: 'terra-studio-catalog',
          url: 'https://shariq-terra-studio-website.vercel.app/api/mcp',
          description: 'Search products, browse collections, and query artisanal materials.',
        },
      ],
      tools: [
        {
          name: 'search_products',
          description: 'Search ceramic tableware, vases, lighting, and home decor by keyword or material.',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: "Search query keyword (e.g. 'vase', 'plate', 'flax')",
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'list_collections',
          description: 'List all studio collections and curation categories.',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'get_product',
          description:
            'Get detailed specifications, dimensions, care instructions, and materials for a specific product handle.',
          inputSchema: {
            type: 'object',
            properties: {
              handle: {
                type: 'string',
                description: "Product slug handle (e.g. 'speckled-ceramic-dinner-plate-set')",
              },
            },
            required: ['handle'],
          },
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    }
  )
}
