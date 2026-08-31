import { getAllPlatforms, CRITERIA, VERIFIED_ON, NOT_PUBLISHED } from '../../lib/platforms.js'
import { SITE_NAME, absolute } from '../../lib/site.js'
import { longDate } from '../../lib/format.js'

const TITLE = 'AI Sales Platform Profiles (2026)'
const DESCRIPTION =
  'Verified vendor profiles of AI enterprise sales platforms: Salezx, Agentforce, Dynamics 365, SAP Joule, ServiceNow, and UiPath with pricing and limits.'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absolute('/platform') },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absolute('/platform'),
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [
      { url: absolute('/opengraph-image'), width: 1200, height: 630, alt: TITLE, type: 'image/png' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [absolute('/opengraph-image')],
  },
}

export default function PlatformIndexPage() {
  const platforms = getAllPlatforms()
  const verified = new Date(`${VERIFIED_ON}T00:00:00Z`).toISOString()

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: TITLE,
    itemListElement: platforms.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absolute(`/platform/${p.slug}`),
      name: p.name,
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
      { '@type': 'ListItem', position: 2, name: 'Platform Profiles', item: absolute('/platform') },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="post-header-band">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumbs">
            <a href="/">Home</a>
            <span className="sep">/</span>
            <span aria-current="page">Platforms</span>
          </nav>
          <p className="eyebrow">Vendor-Documented Platform Profiles</p>
          <h1>{TITLE}</h1>
          <p className="lead">
            One page per platform, built only from what the vendor publishes about itself. Pricing tiers,
            named integrations, implementation time and governance &mdash; with &ldquo;{NOT_PUBLISHED}&rdquo;
            wherever the vendor has not written it down. All figures read on {longDate(verified)}.
          </p>
          <p className="lead">
            Benchmarked head to head in the{' '}
            <a href="/compare/best-ai-sales-platforms-manufacturing-2026">
              manufacturing and complex B2B comparison
            </a>
            .
          </p>
        </div>
      </div>

      <div className="shell industry-hub-shell">
        <div className="industry-hub-grid">
          {platforms.map((p) => {
            const published = CRITERIA.filter((c) => p.criteria[c.key]?.value !== NOT_PUBLISHED).length
            const entry = p.pricing.tiers.find((t) => t.price !== NOT_PUBLISHED)
            return (
              <a key={p.slug} className="industry-hub-card" href={`/platform/${p.slug}`} data-reveal>
                <div className="industry-card-top">
                  <span className="industry-top-badge">{p.vendor}</span>
                  {p.ownedByUs ? <span className="pill pill-rose">Shared ownership</span> : null}
                </div>
                <h2 className="industry-card-title">{p.name}</h2>
                <p className="industry-card-desc">{p.oneLine}</p>
                <div className="industry-card-meta">
                  <span>
                    {entry ? entry.price : NOT_PUBLISHED} &middot; {published}/{CRITERIA.length} criteria published
                  </span>
                  <span className="industry-arrow">Read the profile &rarr;</span>
                </div>
              </a>
            )
          })}
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    </>
  )
}
