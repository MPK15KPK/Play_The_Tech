import { revalidatePath } from 'next/cache'
import { query, one, POSTS } from '../../../lib/db.js'
import { requireSession } from '../../../lib/session.js'
import { validatePost } from '../../../lib/validate.js'

/**
 * The public pages are ISR now (app/page.js), so a save has to say so or the
 * index sits on a stale copy until its window expires. From a route handler
 * this only marks the paths — the rebuild happens on the next visit.
 * Slugs are passed in because an edit can rename one, and the page under the
 * old address has to go too.
 */
function publishedPagesChanged(...slugs) {
  revalidatePath('/')
  revalidatePath('/sitemap.xml')
  revalidatePath('/feed.xml')
  for (const slug of new Set(slugs.filter(Boolean))) {
    revalidatePath(`/compare/${slug}`)
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// middleware.js guards /admin/*, not /api/*. This route guards itself.
export async function POST(req) {
  const { denied } = await requireSession()
  if (denied) return denied

  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ errors: ['Could not read the submitted form.'] }, { status: 400 })
  }

  const { post, errors } = validatePost(body)
  if (errors.length) return Response.json({ errors }, { status: 400 })

  const id = Number.parseInt(body.id, 10)
  const editing = Number.isInteger(id) && id > 0

  // Parameterised in both branches. The admin form is still user input. R7.5.
  const values = [
    post.slug, post.title, post.type,
    post.website_1 || null, post.website_2 || null,
    post.tool_1, post.tool_2,
    post.link_1, post.link_2,
    post.summary, post.content, post.author, post.published,
  ]

  try {
    let row
    let previousSlug = null
    if (editing) {
      previousSlug = (await one(`SELECT slug FROM ${POSTS} WHERE id = $1`, [id]))?.slug || null
      row = await one(
        `UPDATE ${POSTS}
            SET slug = $1, title = $2, type = $3,
                website_1 = $4, website_2 = $5,
                tool_1 = $6, tool_2 = $7,
                link_1 = $8, link_2 = $9,
                summary = $10, content = $11, author = $12, published = $13
          WHERE id = $14
      RETURNING id, slug`,
        [...values, id],
      )
      if (!row) return Response.json({ errors: ['That post no longer exists.'] }, { status: 404 })
    } else {
      row = await one(
        `INSERT INTO ${POSTS}
           (slug, title, type, website_1, website_2, tool_1, tool_2,
            link_1, link_2, summary, content, author, published)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING id, slug`,
        values,
      )
    }
    publishedPagesChanged(row.slug, previousSlug)
    return Response.json({ ok: true, id: row.id, slug: row.slug })
  } catch (err) {
    if (err.code === '23505') {
      return Response.json(
        { errors: [`The slug "${post.slug}" is already used by another post.`] },
        { status: 409 },
      )
    }
    console.error('post save failed:', err.message)
    return Response.json({ errors: ['The database rejected that save. Nothing was changed.'] }, { status: 500 })
  }
}

export async function GET(req) {
  const { denied } = await requireSession()
  if (denied) return denied

  const id = Number.parseInt(new URL(req.url).searchParams.get('id'), 10)
  if (!Number.isInteger(id) || id <= 0) {
    const rows = await query(
      `SELECT id, slug, title, published, updated_at FROM ${POSTS} ORDER BY updated_at DESC`,
    )
    return Response.json({ posts: rows })
  }
  const row = await one(`SELECT * FROM ${POSTS} WHERE id = $1`, [id])
  if (!row) return Response.json({ error: 'Not found.' }, { status: 404 })
  return Response.json({ post: row })
}

/** Toggle published without opening the editor. */
export async function PATCH(req) {
  const { denied } = await requireSession()
  if (denied) return denied

  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Could not read that.' }, { status: 400 })
  }

  const id = Number.parseInt(body?.id, 10)
  if (!Number.isInteger(id) || id <= 0) {
    return Response.json({ error: 'Bad id.' }, { status: 400 })
  }
  if (typeof body?.published !== 'boolean') {
    return Response.json({ error: 'published must be true or false.' }, { status: 400 })
  }

  const row = await one(
    `UPDATE ${POSTS} SET published = $1 WHERE id = $2 RETURNING id, slug, published`,
    [body.published, id],
  )
  if (!row) return Response.json({ error: 'Not found.' }, { status: 404 })
  publishedPagesChanged(row.slug)
  return Response.json({ ok: true, ...row })
}

/**
 * Permanent. The stats row goes with it via ON DELETE CASCADE.
 * Requires the exact slug as confirmation, so a mis-aimed id cannot quietly
 * destroy the wrong post.
 */
export async function DELETE(req) {
  const { denied } = await requireSession()
  if (denied) return denied

  const params = new URL(req.url).searchParams
  const id = Number.parseInt(params.get('id'), 10)
  const confirm = params.get('slug') || ''
  if (!Number.isInteger(id) || id <= 0) {
    return Response.json({ error: 'Bad id.' }, { status: 400 })
  }

  const existing = await one(`SELECT id, slug, title FROM ${POSTS} WHERE id = $1`, [id])
  if (!existing) return Response.json({ error: 'Not found.' }, { status: 404 })
  if (confirm !== existing.slug) {
    return Response.json(
      { error: 'Confirmation did not match the post. Nothing was deleted.' },
      { status: 409 },
    )
  }

  await one(`DELETE FROM ${POSTS} WHERE id = $1 RETURNING id`, [id])
  console.log(`post deleted: #${existing.id} ${existing.slug}`)
  publishedPagesChanged(existing.slug)
  return Response.json({ ok: true, deleted: existing.slug })
}
