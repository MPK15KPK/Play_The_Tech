import { cookies } from 'next/headers'
import { COOKIE_NAME, createToken, cookieOptions } from '../../../lib/auth.js'
import { rateLimit, clientIp } from '../../../lib/ratelimit.js'
import { checkCredentials } from '../../../lib/credentials.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// One message for every failure. Never reveal whether the email or the
// password was the wrong one. BUILD-SPEC §3.
const GENERIC = 'Email or password is incorrect.'

export async function POST(req) {
  const ip = clientIp(req)

  // Without this the password is brute-forceable and nothing else guards the
  // door. R7.4.
  const limit = rateLimit(`login:${ip}`, 5, 60_000)
  if (!limit.ok) {
    return Response.json(
      { error: 'Too many attempts. Wait a minute and try again.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  const { ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_SECRET } = process.env
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !SESSION_SECRET) {
    console.error('login: ADMIN_EMAIL, ADMIN_PASSWORD or SESSION_SECRET is unset')
    return Response.json({ error: 'Sign-in is not configured on this server.' }, { status: 500 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: GENERIC }, { status: 400 })
  }

  const email = String(body?.email || '').trim().toLowerCase()
  const password = String(body?.password || '')

  // Stored credentials first, environment as the recovery path.
  const result = await checkCredentials(email, password)
  if (!result.ok) {
    return Response.json({ error: GENERIC }, { status: 401 })
  }

  const token = await createToken(result.email, SESSION_SECRET)
  const jar = await cookies()
  jar.set(COOKIE_NAME, token, cookieOptions())

  return Response.json({ ok: true, redirect: '/admin' })
}
