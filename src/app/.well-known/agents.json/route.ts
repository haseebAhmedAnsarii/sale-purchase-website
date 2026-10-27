import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      $schema: 'https://agentsjson.org/schema.json',
      name: 'TERRA STUDIO Agent Interface',
      description: 'Intent mapping and API flows for AI shopping and research assistants.',
      version: '1.0.0',
      documentation: 'https://shariq-terra-studio-website.vercel.app/llms.txt',
      intents: [
        {
          name: 'browse_catalog',
          description: 'Browse the complete catalog of handcrafted ceramics and home goods',
          method: 'GET',
          endpoint: '/collections/all',
        },
        {
          name: 'view_collection',
          description:
            'View items in a specific curated collection (stoneware, vases, lighting, etc.)',
          method: 'GET',
          endpoint: '/collections/{handle}',
        },
        {
          name: 'view_product',
          description: 'Inspect product dimensions, pricing, craftsmanship, and materials',
          method: 'GET',
          endpoint: '/products/{handle}',
        },
        {
          name: 'get_studio_info',
          description:
            'Read studio philosophy, provenance, and design principles',
          method: 'GET',
          endpoint: '/about',
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
