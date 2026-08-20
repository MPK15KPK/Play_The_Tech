import { ImageResponse } from 'next/og'
import { one, POSTS } from '../../../lib/db.js'
import { longDate } from '../../../lib/format.js'
import { ogFonts, OG_SIZE, ogCard } from '../../../lib/og.js'

export const runtime = 'nodejs'
export const alt = 'A comparison from playthetech'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image({ params }) {
  const { slug } = await params

  let post = null
  try {
    post = await one(
      `SELECT title, tool_1, tool_2, author, updated_at FROM ${POSTS}
        WHERE slug = $1 AND published = TRUE`,
      [slug],
    )
  } catch (err) {
    console.error('og query failed:', err.message)
  }

  const footer = post
    ? [post.author ? `By ${post.author}` : null, `Updated ${longDate(post.updated_at)}`]
        .filter(Boolean).join('  ·  ')
    : 'Sourced from vendor documentation'

  return new ImageResponse(
    ogCard({
      title: post?.title || 'Tool comparison',
      pair: post ? `${post.tool_1}  vs  ${post.tool_2}` : null,
      footer,
    }),
    { ...OG_SIZE, fonts: await ogFonts() },
  )
}
