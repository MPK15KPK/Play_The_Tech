// One place for the strings that appear in more than one page.

export const SITE_NAME = 'playthetech'

export const SITE_DESCRIPTION =
  'Side-by-side comparisons of AI and SaaS tools, with prices and limits taken from vendor documentation and dated.'

// Change this to the address you actually read.
export const CONTACT_EMAIL = 'editor@playthetech.com'

/** Absolute origin, no trailing slash. Falls back so builds never emit relative canonicals. */
export function siteUrl() {
  const raw =
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    'https://playthetech.com'
  return raw.replace(/\/+$/, '')
}

export function absolute(path = '/') {
  return `${siteUrl()}${path.startsWith('/') ? path : `/${path}`}`
}
