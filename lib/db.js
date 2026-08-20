import { Pool } from 'pg'

// Created quoted in schema.sql, so every query must quote them. Written once,
// here, and imported everywhere else — see BUILD-SPEC §2.
export const POSTS = '"playtheTechCompariosinPosts"'
export const REQUESTS = '"playtheTechComparisonRequests"'
export const STATS = '"playtheTechPostStats"'
export const SETTINGS = '"playtheTechSettings"'
export const VIEWS = '"playtheTechPostViews"'

// DATABASE_URL is the documented variable. The POSTGRES_* fallback exists
// because the deployed env currently supplies the parts rather than the URL.
function connectionString() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL
  const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DATABASE } = process.env
  if (!POSTGRES_USER || !POSTGRES_HOST || !POSTGRES_DATABASE) return null
  const user = encodeURIComponent(POSTGRES_USER)
  const pass = encodeURIComponent(POSTGRES_PASSWORD || '')
  const port = POSTGRES_PORT || 5432
  return `postgres://${user}:${pass}@${POSTGRES_HOST}:${port}/${POSTGRES_DATABASE}?sslmode=require`
}

/**
 * Drops sslmode from the URL. We set `ssl` explicitly below, which overrides it
 * anyway, and leaving it in makes pg-connection-string emit a deprecation
 * warning about 'require' being treated as 'verify-full'. One authority for the
 * TLS decision, not two.
 */
function stripSslMode(cs) {
  return cs.replace(/([?&])sslmode=[^&]*(&|$)/gi, (_, lead, tail) => (tail === '&' ? lead : ''))
           .replace(/[?&]$/, '')
}

function makePool() {
  const raw = connectionString()
  if (!raw) throw new Error('DATABASE_URL is not set')
  const cs = stripSslMode(raw)
  const local = /@(localhost|127\.0\.0\.1)/.test(cs)
  return new Pool({
    connectionString: cs,
    // Azure Postgres terminates non-SSL connections. Its chain is not always in
    // the Node trust store, so verification is off rather than SSL itself.
    ssl: local ? false : { rejectUnauthorized: false },
    max: 5, // App Service exhausts the server's limit on restart without this
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  })
}

// Survives dev hot-reload, which would otherwise open a pool per edit.
const g = globalThis
if (!g.__pttPool) g.__pttPool = null

export function pool() {
  if (!g.__pttPool) g.__pttPool = makePool()
  return g.__pttPool
}

/** Parameterised query. Never interpolate values into `text`. */
export async function query(text, params = []) {
  const res = await pool().query(text, params)
  return res.rows
}

export async function one(text, params = []) {
  const rows = await query(text, params)
  return rows[0] || null
}
