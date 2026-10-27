import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      $schema: 'https://a2a.dev/schemas/agent-card.json',
      name: 'TERRA STUDIO Concierge Agent',
      description:
        'Artisan catalog assistant for discovering handcrafted stoneware ceramics, sculptural interior vessels, and modern Scandinavian decor.',
      url: 'https://shariq-terra-studio-website.vercel.app/.well-known/agent-card.json',
      version: '1.0.0',
      provider: {
        name: 'TERRA STUDIO',
        url: 'https://shariq-terra-studio-website.vercel.app',
      },
      capabilities: {
        streaming: false,
        pushNotifications: false,
      },
      skills: [
        {
          id: 'search-catalog',
          name: 'Search Catalog',
          description:
            'Search through ceramic dinnerware, vases, ambient lamps, and organic linen throws.',
          input: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description:
                  'Keywords to match against product titles, collections, and materials.',
              },
            },
            required: ['query'],
          },
        },
        {
          id: 'get-care-guide',
          name: 'Ceramic Care Guide',
          description:
            'Provide care instructions for stoneware, unglazed terracotta, and travertine surfaces.',
          input: {
            type: 'object',
            properties: {
              material: {
                type: 'string',
                description: 'Material type: stoneware, terracotta, travertine, or linen.',
              },
            },
            required: ['material'],
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
