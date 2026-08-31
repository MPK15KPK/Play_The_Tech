// One place for the strings that appear in more than one page.

export const SITE_NAME = 'playthetech'

export const SITE_DESCRIPTION =
  'Side-by-side AI comparisons of enterprise sales agents and B2B software tools. Verified pricing, limits, and architecture from vendor documentation.'

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
