import { one, POSTS, STATS, VIEWS } from '../../../lib/db.js'
import { rateLimit, clientIp } from '../../../lib/ratelimit.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Anonymous view counting and up/down votes.
 *
 * Honest about what this is: there are no accounts, so a vote is guarded by
 * the caller's own localStorage plus an IP rate limit. Someone determined can
 * clear storage and vote again. That is acceptable because nothing depends on
 * the number — it is reader signal for the editor, not a rating.
 *
 * These counts are never emitted as Review or AggregateRating schema.
 * GUARDRAILS R6.3 still applies.
 */

/** pg hands BIGINT back as a string. Normalise before it reaches the client. */
function numeric(row) {
  return {
    views: Number(row?.views) || 0,
    upvotes: Number(row?.upvotes) || 0,
    downvotes: Number(row?.downvotes) || 0,
  }
}

async function ensureRow(postId) {
  await one(
    `INSERT INTO ${STATS} (post_id) VALUES ($1)
     ON CONFLICT (post_id) DO NOTHING
     RETURNING post_id`,
    [postId],
  )
}

export async function POST(req) {
  const ip = clientIp(req)

  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Bad request.' }, { status: 400 })
  }

  const slug = String(body?.slug || '').slice(0, 120)
  const action = String(body?.action || '')
  if (!slug) return Response.json({ error: 'Bad request.' }, { status: 400 })

  // Views are cheap and frequent; votes are rare and worth guarding harder.
  const limit = action === 'view'
    ? rateLimit(`view:${ip}`, 60, 60_000)
    : rateLimit(`vote:${ip}`, 15, 60_000)
  if (!limit.ok) {
    return Response.json({ error: 'Slow down.' }, { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } })
  }

  const post = await one(`SELECT id FROM ${POSTS} WHERE slug = $1 AND published = TRUE`, [slug])
  if (!post) return Response.json({ error: 'Not found.' }, { status: 404 })

  try {
    await ensureRow(post.id)

    if (action === 'view') {
      // The browser tells us whether this is its first look at this post today.
      const first = body?.unique === true

      // Running total, and the per-hour bucket that makes it readable over time.
      const [row] = await Promise.all([
        one(
          `UPDATE ${STATS} SET views = views + 1 WHERE post_id = $1
           RETURNING views, upvotes, downvotes`,
          [post.id],
        ),
        one(
          `INSERT INTO ${VIEWS} (post_id, day, hour, views, uniques)
           VALUES ($1, CURRENT_DATE, EXTRACT(HOUR FROM NOW())::smallint, 1, $2)
           ON CONFLICT (post_id, day, hour) DO UPDATE
              SET views = ${VIEWS}.views + 1,
                  uniques = ${VIEWS}.uniques + $2
           RETURNING post_id`,
          [post.id, first ? 1 : 0],
        ),
      ])
      return Response.json({ ok: true, ...numeric(row) })
    }

    if (action === 'vote') {
      const to = Number(body.vote)     //  1, -1, or 0 to clear
      const from = Number(body.from) || 0
      if (![1, -1, 0].includes(to) || ![1, -1, 0].includes(from)) {
        return Response.json({ error: 'Bad vote.' }, { status: 400 })
      }

      // Net change per column, so switching up→down is one statement.
      const up = (to === 1 ? 1 : 0) - (from === 1 ? 1 : 0)
      const down = (to === -1 ? 1 : 0) - (from === -1 ? 1 : 0)

      const row = await one(
        `UPDATE ${STATS}
            SET upvotes   = GREATEST(0, upvotes + $2),
                downvotes = GREATEST(0, downvotes + $3),
                updated_at = NOW()
          WHERE post_id = $1
      RETURNING views, upvotes, downvotes`,
        [post.id, up, down],
      )
      return Response.json({ ok: true, ...numeric(row) })
    }

    return Response.json({ error: 'Unknown action.' }, { status: 400 })
  } catch (err) {
    console.error('stats update failed:', err.message)
    return Response.json({ error: 'Could not record that.' }, { status: 500 })
  }
}
