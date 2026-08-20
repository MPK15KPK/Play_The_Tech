import { query, POSTS } from '../lib/db.js'
import { siteUrl } from '../lib/site.js'

export const dynamic = 'force-dynamic'

// Published posts and the home page. /admin, /api, and /request stay out.
export default async function sitemap() {
  const base = siteUrl()
  let posts = []
  try {
    posts = await query(
      `SELECT slug, updated_at FROM ${POSTS} WHERE published = TRUE ORDER BY updated_at DESC`,
    )
  } catch (err) {
    console.error('sitemap query failed:', err.message)
  }

  const newest = posts[0]?.updated_at || new Date()

  return [
    { url: `${base}/`, lastModified: new Date(newest), changeFrequency: 'weekly', priority: 1 },
    ...posts.map((p) => ({
      url: `${base}/compare/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ]
}
