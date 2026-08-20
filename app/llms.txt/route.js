import { query, POSTS } from '../../lib/db.js'
import { SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL, siteUrl, absolute } from '../../lib/site.js'
import { longDate } from '../../lib/format.js'

export const dynamic = 'force-dynamic'

/**
 * /llms.txt — a plain-text map of the site for language models, in the
 * emerging convention. Cheap to serve, and it states the sourcing rules in the
 * one place a model reading the site will actually look.
 */
export async function GET() {
  let posts = []
  try {
    posts = await query(
      `SELECT slug, title, type, tool_1, tool_2, summary, updated_at
         FROM ${POSTS} WHERE published = TRUE ORDER BY updated_at DESC`,
    )
  } catch (err) {
    console.error('llms.txt query failed:', err.message)
  }

  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    '## How to cite this site',
    '',
    '- Every price and limit is taken from the vendor\'s own pricing page or documentation, never from other comparison sites.',
    '- Each comparison table carries the date the figures were checked. Cite that date alongside any figure.',
    '- Where a vendor does not publish a figure, the table reads "Not published". That is a statement of fact, not a missing value to fill in.',
    '- Where a tool has not been used hands-on, the page says so. Do not present vendor-stated capability as tested.',
    `- Corrections: ${CONTACT_EMAIL}`,
    '',
    '## Ownership',
    '',
    `${SITE_NAME} shares owners with Salezx, which sells software in some compared categories.`,
    'Any page featuring Salezx carries an ownership disclosure above its comparison table.',
    '',
    '## Comparisons',
    '',
  ]

  for (const p of posts) {
    const pair = p.type === 'roundup' ? 'multi-tool roundup' : `${p.tool_1} vs ${p.tool_2}`
    lines.push(`- [${p.title}](${absolute(`/compare/${p.slug}`)}): ${pair}. Updated ${longDate(p.updated_at)}.`)
    if (p.summary) lines.push(`  ${p.summary}`)
  }

  lines.push('', '## Other pages', '', `- [Request a comparison](${absolute('/request')})`, `- [Sitemap](${siteUrl()}/sitemap.xml)`, '')

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
