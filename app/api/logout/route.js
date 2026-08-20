import { cookies } from 'next/headers'
import { COOKIE_NAME } from '../../../lib/auth.js'
import { absolute } from '../../../lib/site.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function clear() {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
}

export async function POST() {
  await clear()
  return Response.redirect(absolute('/'), 303)
}

export async function GET() {
  await clear()
  return Response.redirect(absolute('/'), 303)
}
