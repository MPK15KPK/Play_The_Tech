import { query, POSTS } from '../../lib/db.js'
import { SITE_NAME, SITE_DESCRIPTION, absolute } from '../../lib/site.js'

export const dynamic = 'force-dynamic'

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** RSS. Feed readers and several indexing pipelines still discover through it. */
export async function GET() {
  let posts = []
  try {
    posts = await query(
      `SELECT slug, title, summary, author, updated_at, created_at
         FROM ${POSTS} WHERE published = TRUE ORDER BY updated_at DESC LIMIT 50`,
    )
  } catch (err) {
    console.error('feed query failed:', err.message)
  }

  const items = posts.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${esc(absolute(`/compare/${p.slug}`))}</link>
      <guid isPermaLink="true">${esc(absolute(`/compare/${p.slug}`))}</guid>
      <description>${esc(p.summary)}</description>
      <pubDate>${new Date(p.created_at).toUTCString()}</pubDate>
    </item>`).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_NAME)}</title>
    <link>${esc(absolute('/'))}</link>
    <description>${esc(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${esc(absolute('/feed.xml'))}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
