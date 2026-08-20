import { countWords } from './format.js'

export const LIMITS = {
  title: 200, slug: 120, tool: 120, website: 200, link: 500,
  summary: 1200, content: 6_000_000, author: 120, // content holds inlined images
  industry: 120, note: 2000, email: 200,
}

export function str(value, max) {
  if (value === null || value === undefined) return ''
  return String(value).trim().slice(0, max)
}

export function isHttpUrl(value) {
  try {
    const u = new URL(String(value))
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/**
 * Server-side gate for a post. The browser form checks the same things, but
 * the browser is not where this is enforced — BUILD-SPEC §5.
 */
export function validatePost(input) {
  const errors = []
  const post = {
    title: str(input.title, LIMITS.title),
    slug: str(input.slug, LIMITS.slug).toLowerCase(),
    type: str(input.type, 20) || 'comparison',
    tool_1: str(input.tool_1, LIMITS.tool),
    tool_2: str(input.tool_2, LIMITS.tool),
    website_1: str(input.website_1, LIMITS.website),
    website_2: str(input.website_2, LIMITS.website),
    link_1: str(input.link_1, LIMITS.link),
    link_2: str(input.link_2, LIMITS.link),
    summary: str(input.summary, LIMITS.summary),
    content: str(input.content, LIMITS.content),
    author: str(input.author, LIMITS.author),
    published: input.published === true || input.published === 'true' || input.published === 'on',
  }

  if (!post.title) errors.push('Title is required.')
  if (!post.slug) errors.push('Slug is required.')
  else if (!SLUG_RE.test(post.slug)) {
    errors.push('Slug must be lowercase letters, numbers, and single hyphens — no spaces or trailing hyphen.')
  }
  if (!['comparison', 'roundup'].includes(post.type)) errors.push('Type must be comparison or roundup.')
  if (!post.tool_1) errors.push('Tool 1 is required.')
  if (!post.tool_2) errors.push('Tool 2 is required.')

  // The links are what make a price claim checkable. R2.3.
  if (!isHttpUrl(post.link_1)) errors.push('Link 1 must be a full URL to the vendor page the facts came from.')
  if (!isHttpUrl(post.link_2)) errors.push('Link 2 must be a full URL to the vendor page the facts came from.')

  // A named author is worth roughly 2x in AI citations. R5.3.
  if (!post.author) errors.push('Author is required — a real name, not a role.')

  const words = countWords(post.summary)
  if (words < 20 || words > 80) {
    errors.push(`Summary must be 20–80 words; it is currently ${words}. Aim for 40–60.`)
  }

  if (!post.content) errors.push('Content is required.')

  return { post, errors }
}

export function validateRequest(input) {
  const errors = []
  const row = {
    tool_1: str(input.tool_1, LIMITS.tool),
    tool_2: str(input.tool_2, LIMITS.tool),
    industry: str(input.industry, LIMITS.industry),
    note: str(input.note, LIMITS.note),
    email: str(input.email, LIMITS.email),
  }

  if (!row.tool_1) errors.push('Name the first tool.')
  if (!row.tool_2) errors.push('Name the second tool.')
  if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
    errors.push('That email address does not look right. Leave it blank if you would rather not give one.')
  }
  return { row, errors }
}

export const REQUEST_STATUSES = ['new', 'planned', 'done', 'rejected']
