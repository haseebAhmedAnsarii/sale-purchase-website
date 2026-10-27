import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const accept = request.headers.get('accept') || ''
  const { pathname } = request.nextUrl

  // Handle explicit .md path requests for markdown
  if (pathname.endsWith('.md')) {
    const cleanPath = pathname.replace(/\.md$/, '') || '/'
    const url = request.nextUrl.clone()
    url.pathname = '/api/markdown'
    url.searchParams.set('path', cleanPath)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-markdown-path', cleanPath)
    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    })
  }

  // Ignore internal next.js files, api routes, and static file extensions
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Content negotiation: When AI agent asks for text/markdown, rewrite to markdown API handler
  if (accept.includes('text/markdown')) {
    const url = request.nextUrl.clone()
    url.pathname = '/api/markdown'
    url.searchParams.set('path', pathname)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-markdown-path', pathname)
    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
