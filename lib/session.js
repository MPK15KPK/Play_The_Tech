import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME, verifyToken } from './auth.js'

/**
 * Node-runtime session read, for route handlers and server components.
 * middleware.js guards /admin/*, but it does not cover /api/*, so every
 * mutating route calls this itself.
 */
export async function currentSession() {
  const jar = await cookies()
  const token = jar.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token, process.env.SESSION_SECRET)
}

export async function requireSession() {
  const session = await currentSession()
  if (!session) {
    return {
      session: null,
      denied: Response.json({ error: 'Not signed in.' }, { status: 401 }),
    }
  }
  return { session, denied: null }
}

/**
 * Page-level guard for /admin/*. Route handlers want requireSession's 401
 * body; a page wants the sign-in screen instead, with `next` so LoginForm
 * can send the editor back where they were headed.
 */
export async function requireAdmin(next = '/admin') {
  const session = await currentSession()
  if (!session) redirect(`/admin/login?next=${encodeURIComponent(next)}`)
  return session
}
