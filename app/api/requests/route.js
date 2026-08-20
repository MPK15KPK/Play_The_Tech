import { one, REQUESTS } from '../../../lib/db.js'
import { requireSession } from '../../../lib/session.js'
import { rateLimit, clientIp } from '../../../lib/ratelimit.js'
import { validateRequest, REQUEST_STATUSES } from '../../../lib/validate.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Public. A form with no rate limit fills with spam inside a week. R7.4. */
export async function POST(req) {
  const ip = clientIp(req)
  const limit = rateLimit(`request:${ip}`, 5, 10 * 60_000)
  if (!limit.ok) {
    return Response.json(
      { errors: ['That is several requests in a row from one address. Try again later.'] },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ errors: ['Could not read the submitted form.'] }, { status: 400 })
  }

  // Bots fill every field they find, including one nobody can see.
  if (String(body?.company || '').trim()) return Response.json({ ok: true })

  const { row, errors } = validateRequest(body)
  if (errors.length) return Response.json({ errors }, { status: 400 })

  try {
    await one(
      `INSERT INTO ${REQUESTS} (tool_1, tool_2, industry, note, email, status)
       VALUES ($1, $2, $3, $4, $5, 'new')
       RETURNING id`,
      [row.tool_1, row.tool_2, row.industry || null, row.note || null, row.email || null],
    )
    return Response.json({ ok: true })
  } catch (err) {
    console.error('request insert failed:', err.message)
    return Response.json({ errors: ['We could not save that just now. Try again shortly.'] }, { status: 500 })
  }
}

/** Admin only — set the status of one request. */
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
  const status = String(body?.status || '')
  if (!Number.isInteger(id) || id <= 0) return Response.json({ error: 'Bad id.' }, { status: 400 })
  if (!REQUEST_STATUSES.includes(status)) return Response.json({ error: 'Bad status.' }, { status: 400 })

  const row = await one(
    `UPDATE ${REQUESTS} SET status = $1 WHERE id = $2 RETURNING id, status`,
    [status, id],
  )
  if (!row) return Response.json({ error: 'Not found.' }, { status: 404 })
  return Response.json({ ok: true, id: row.id, status: row.status })
}
