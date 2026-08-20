import { one, SETTINGS } from '../../../lib/db.js'
import { requireSession } from '../../../lib/session.js'
import { hashPassword } from '../../../lib/auth.js'
import { checkCredentials } from '../../../lib/credentials.js'
import { rateLimit, clientIp } from '../../../lib/ratelimit.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req) {
  const { session, denied } = await requireSession()
  if (denied) return denied

  const limit = rateLimit(`settings:${clientIp(req)}`, 5, 60_000)
  if (!limit.ok) {
    return Response.json({ errors: ['Too many attempts. Wait a minute.'] }, { status: 429 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ errors: ['Could not read that.'] }, { status: 400 })
  }

  const email = String(body?.email || '').trim()
  const current = String(body?.current || '')
  const next = String(body?.password || '')
  const confirm = String(body?.confirm || '')
  const errors = []

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('That email address does not look right.')
  }

  // Changing the login requires proving you know the current one, so a stolen
  // session cookie on its own cannot lock the owner out.
  const proof = await checkCredentials(session.email, current)
  if (!proof.ok) errors.push('Current password is incorrect.')

  if (next || confirm) {
    if (next.length < 12) errors.push('New password must be at least 12 characters.')
    if (next !== confirm) errors.push('New password and confirmation do not match.')
  }

  if (errors.length) return Response.json({ errors }, { status: 400 })

  try {
    // A blank password means "change the email only" — keep the stored hash, or
    // hash the environment password so the row is complete either way.
    const existing = await one(`SELECT password_hash FROM ${SETTINGS} WHERE id = 1`)
    const hash = next
      ? await hashPassword(next)
      : existing?.password_hash || (await hashPassword(process.env.ADMIN_PASSWORD || ''))

    await one(
      `INSERT INTO ${SETTINGS} (id, admin_email, password_hash, updated_at)
       VALUES (1, $1, $2, NOW())
       ON CONFLICT (id) DO UPDATE
          SET admin_email = $1, password_hash = $2, updated_at = NOW()
       RETURNING id`,
      [email, hash],
    )
    return Response.json({ ok: true, email, passwordChanged: Boolean(next) })
  } catch (err) {
    console.error('settings save failed:', err.message)
    return Response.json({ errors: ['Could not save that. Nothing was changed.'] }, { status: 500 })
  }
}
