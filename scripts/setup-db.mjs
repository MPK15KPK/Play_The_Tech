#!/usr/bin/env node
/**
 * Applies schema.sql. Equivalent to `psql "$DATABASE_URL" -f schema.sql`, for
 * machines without psql installed.
 *
 *   node scripts/setup-db.mjs           apply the schema
 *   node scripts/setup-db.mjs --check   report what exists, change nothing
 *
 * Reads DATABASE_URL, or the five POSTGRES_* parts, from .env.
 * Everything in schema.sql is IF NOT EXISTS / OR REPLACE — running it twice is
 * safe, and it touches only the two playtheTech* tables.
 */

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import pg from 'pg'

const root = process.cwd()
const checkOnly = process.argv.includes('--check')

/** Minimal .env reader — no dependency, no Node version flag needed. */
async function loadEnv() {
  let text
  try {
    text = await readFile(path.join(root, '.env'), 'utf8')
  } catch {
    return
  }
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/i)
    if (!m) continue
    const key = m[1]
    if (process.env[key] !== undefined) continue
    process.env[key] = m[2].trim().replace(/^["']|["']$/g, '')
  }
}

function connectionString() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL
  const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DATABASE } = process.env
  if (!POSTGRES_USER || !POSTGRES_HOST || !POSTGRES_DATABASE) return null
  const user = encodeURIComponent(POSTGRES_USER)
  const pass = encodeURIComponent(POSTGRES_PASSWORD || '')
  return `postgres://${user}:${pass}@${POSTGRES_HOST}:${POSTGRES_PORT || 5432}/${POSTGRES_DATABASE}?sslmode=require`
}

const TABLES = ['playtheTechCompariosinPosts', 'playtheTechComparisonRequests']

async function report(client) {
  const { rows } = await client.query(
    `SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = ANY($1)`,
    [TABLES],
  )
  const found = rows.map((r) => r.table_name)
  for (const t of TABLES) {
    console.log(`  ${found.includes(t) ? 'present' : 'missing'}  "${t}"`)
  }
  if (found.length === TABLES.length) {
    for (const t of TABLES) {
      const { rows: c } = await client.query(`SELECT COUNT(*)::int AS n FROM "${t}"`)
      console.log(`  ${String(c[0].n).padStart(7)}  rows in "${t}"`)
    }
  }
  return found
}

async function main() {
  await loadEnv()

  const cs = connectionString()
  if (!cs) {
    console.error('No DATABASE_URL, and POSTGRES_HOST/USER/DATABASE are not all set.')
    process.exit(1)
  }

  const target = cs.replace(/:\/\/([^:]+):[^@]*@/, '://$1:***@')
  console.log(`database → ${target}\n`)

  const client = new pg.Client({
    // Same reason as lib/db.js: ssl is set explicitly, so sslmode in the URL is
    // redundant and only triggers a pg deprecation warning.
    connectionString: cs.replace(/([?&])sslmode=[^&]*(&|$)/gi, (_, l, t) => (t === '&' ? l : '')).replace(/[?&]$/, ''),
    ssl: /@(localhost|127\.0\.0\.1)/.test(cs) ? false : { rejectUnauthorized: false },
  })

  await client.connect()
  try {
    console.log('before:')
    await report(client)

    if (checkOnly) return

    const sql = await readFile(path.join(root, 'schema.sql'), 'utf8')
    console.log('\napplying schema.sql …')
    await client.query(sql)

    console.log('\nafter:')
    await report(client)
    console.log('\ndone')
  } finally {
    await client.end()
  }
}

main().catch((err) => {
  console.error(`\nfailed: ${err.message}`)
  process.exit(1)
})
