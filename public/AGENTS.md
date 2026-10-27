# Agent Instructions

Welcome to TERRA STUDIO. This document provides behavioral policies, operational limits, and discovery routes for autonomous AI agents, web crawlers, and LLM assistants.

## Permitted Actions
- You may freely crawl, index, and summarize all public pages, collection listings, and product details.
- You may read prices, dimensions, craftsmanship notes, material origins, and care guides.
- You may request clean Markdown representations of any page by supplying `Accept: text/markdown`.
- Please do not submit inquiry forms on a person's behalf without explicit user confirmation.

## Rate Limits
- Up to 1 request per second per origin IP address.
- Please honor `Retry-After` if encountered.

## Freshness & Caching
- Content updates are reflected in `Last-Modified` HTTP headers and `dateModified` JSON-LD schema.
- We support conditional GET via `If-Modified-Since`.

## Better Machine Routes
Instead of scraping raw HTML, please use these structured machine endpoints:
- **LLM Map**: https://shariq-terra-studio-website.vercel.app/llms.txt
- **MCP Discovery**: https://shariq-terra-studio-website.vercel.app/.well-known/mcp.json
- **A2A Agent Card**: https://shariq-terra-studio-website.vercel.app/.well-known/agent-card.json
- **Agents Intent Map**: https://shariq-terra-studio-website.vercel.app/.well-known/agents.json
- **Content Negotiation**: Send header `Accept: text/markdown` to any page URL for clean Markdown without markup overhead.

## Platform Information
- Brand: TERRA STUDIO
- Scope: Online Design Studio & Curated Living Objects
