import { NextResponse } from 'next/server'
import { COOKIE_NAME, verifyToken } from './lib/auth.js'

// Edge runtime — which is why lib/auth.js uses Web Crypto rather than
// node:crypto. BUILD-SPEC §3 calls this file middleware.js; Next 16 renamed the
// convention to proxy.js and deprecated the old name, so it lives here now.
// The export must be named `proxy` — Next looks for exactly that.
export async function proxy(req) {
  const { pathname, search } = req.nextUrl

  if (pathname === '/admin/login') return NextResponse.next()

  const token = req.cookies.get(COOKIE_NAME)?.value
  const session = await verifyToken(token, process.env.SESSION_SECRET)

  if (!session) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    url.search = ''
    // Where to return after signing in. Kept relative so it cannot be used as
    // an open redirect to another host.
    const next = `${pathname}${search}`
    if (next !== '/admin') url.searchParams.set('next', next)
    return NextResponse.redirect(url)
  }

  const res = NextResponse.next()
  res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return res
}

export const config = { matcher: ['/admin/:path*'] }
