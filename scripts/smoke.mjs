#!/usr/bin/env node
/**
 * Production smoke test. Run after every deploy AND after every infrastructure
 * change — someone enabling an Azure security feature months from now, with no
 * idea it touches SEO, is the realistic way this breaks.
 *
 *   npm run smoke -- https://playthetech.com
 *   npm run smoke -- https://playthetech.com --slug my-post
 *
 * Run it from outside Azure. A request originating inside the tenancy can pass
 * a WAF rule that a real crawler fails.
 */

const args = process.argv.slice(2)
const base = (args.find((a) => !a.startsWith('--')) || process.env.SITE_URL || 'http://localhost:3000')
  .replace(/\/+$/, '')
const slugFlag = args.indexOf('--slug')
const slug = slugFlag > -1 ? args[slugFlag + 1] : null

const AI_AGENTS = [
  'GPTBot/1.0',
  'OAI-SearchBot/1.0',
  'ClaudeBot/1.0',
  'Claude-SearchBot/1.0',
  'PerplexityBot/1.0',
  'Googlebot/2.1',
  'Bingbot/2.0',
  'CCBot/2.0',
]

const results = []

function record(name, ok, detail) {
  results.push({ name, ok, detail })
  const mark = ok ? 'PASS' : 'FAIL'
  console.log(`${mark}  ${name}${detail ? `  — ${detail}` : ''}`)
}

async function get(path, agent) {
  const res = await fetch(`${base}${path}`, {
    headers: agent ? { 'User-Agent': agent } : {},
    redirect: 'manual',
  })
  return res
}

/** The one that fails silently: blocked crawlers mean zero citations, forever. */
async function checkCrawlers() {
  for (const agent of AI_AGENTS) {
    try {
      const res = await get('/', agent)
      record(`crawler ${agent.split('/')[0]}`, res.status === 200, `HTTP ${res.status}`)
    } catch (err) {
      record(`crawler ${agent.split('/')[0]}`, false, err.message)
    }
  }
}

/** If the table is not in the raw bytes, the page does not exist to a crawler. */
async function checkTableInHtml(postSlug) {
  const res = await get(`/compare/${postSlug}`, 'ClaudeBot/1.0')
  if (res.status !== 200) {
    record('post reachable', false, `HTTP ${res.status} for /compare/${postSlug}`)
    return
  }
  record('post reachable', true, `HTTP 200`)

  const html = await res.text()
  record('table in raw HTML', /<table/i.test(html), `${html.length} bytes`)
  record('th scope in raw HTML', /<th[^>]+scope=/i.test(html))
  record('caption in raw HTML', /<caption/i.test(html))
  record('last-updated visible', /Last updated/i.test(html))
  record('canonical tag', /rel="canonical"/i.test(html))
  record('og:image', /property="og:image"/i.test(html))
  record('Article JSON-LD', /"@type"\s*:\s*"Article"/.test(html))
  // GUARDRAILS R6.3 — these must never appear.
  record('no Review schema', !/"@type"\s*:\s*"(Review|AggregateRating)"/.test(html))
  record('no /admin link', !/href="\/admin/.test(html))
}

async function findSlug() {
  if (slug) return slug
  const res = await get('/', 'ClaudeBot/1.0')
  const html = await res.text()
  const match = html.match(/href="\/compare\/([a-z0-9-]+)"/)
  return match ? match[1] : null
}

async function main() {
  console.log(`smoke test → ${base}\n`)

  await checkCrawlers()

  try {
    const robots = await get('/robots.txt')
    const text = await robots.text()
    record('robots.txt reachable', robots.status === 200, `HTTP ${robots.status}`)
    record('robots names GPTBot', /GPTBot/i.test(text))
    record('robots disallows /admin', /Disallow:\s*\/admin/i.test(text))
    record('robots references sitemap', /Sitemap:/i.test(text))
  } catch (err) {
    record('robots.txt reachable', false, err.message)
  }

  try {
    const map = await get('/sitemap.xml')
    const text = await map.text()
    record('sitemap reachable', map.status === 200, `HTTP ${map.status}`)
    record('sitemap excludes /request', !/\/request</.test(text))
    record('sitemap excludes /admin', !/\/admin/.test(text))
  } catch (err) {
    record('sitemap reachable', false, err.message)
  }

  try {
    const res = await get('/admin')
    const guarded = res.status === 307 || res.status === 302 || res.status === 308
    record('/admin redirects when signed out', guarded, `HTTP ${res.status}`)
  } catch (err) {
    record('/admin redirects when signed out', false, err.message)
  }

  try {
    const res = await get('/compare/definitely-not-a-real-post-slug')
    record('missing slug returns real 404', res.status === 404, `HTTP ${res.status}`)
  } catch (err) {
    record('missing slug returns real 404', false, err.message)
  }

  const target = await findSlug()
  if (target) {
    await checkTableInHtml(target)
  } else {
    record('post checks', false, 'no published post found on the home page — publish one, then re-run')
  }

  const failed = results.filter((r) => !r.ok)
  console.log(`\n${results.length - failed.length}/${results.length} passed`)
  if (failed.length) {
    console.log('\nFailed:')
    for (const f of failed) console.log(`  · ${f.name}${f.detail ? ` — ${f.detail}` : ''}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
