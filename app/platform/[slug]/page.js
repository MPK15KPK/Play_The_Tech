import { notFound } from 'next/navigation'
import { getPlatform, getAllPlatforms, CRITERIA, VERIFIED_ON, NOT_PUBLISHED } from '../../../lib/platforms.js'
import { SITE_NAME, absolute } from '../../../lib/site.js'
import { longDate } from '../../../lib/format.js'
import PostActions from '../../../components/PostActions.js'

const BENCHMARK = '/compare/best-ai-sales-platforms-manufacturing-2026'

// Every word comes from lib/platforms.js, so these prerender at build time.
export function generateStaticParams() {
  return getAllPlatforms().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const p = getPlatform(slug)
  if (!p) return { title: 'Platform Not Found' }

  const url = absolute(`/platform/${p.slug}`)
  const imageUrl = absolute(`/platform/${p.slug}/opengraph-image`)

  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url,
      siteName: SITE_NAME,
      type: 'article',
      locale: 'en_US',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: p.metaTitle, type: 'image/png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: p.metaTitle,
      description: p.metaDescription,
      images: [imageUrl],
    },
  }
}

export default async function PlatformPage({ params }) {
  const { slug } = await params
  const p = getPlatform(slug)
  if (!p) notFound()

  const others = getAllPlatforms().filter((x) => x.slug !== p.slug)
  const url = absolute(`/platform/${p.slug}`)
  const verified = new Date(`${VERIFIED_ON}T00:00:00Z`).toISOString()

  const publishedCriteria = CRITERIA.filter((c) => p.criteria[c.key]?.value !== NOT_PUBLISHED)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.metaTitle,
    description: p.metaDescription,
    url,
    datePublished: VERIFIED_ON,
    dateModified: verified,
    author: { '@type': 'Organization', name: `${SITE_NAME} Editorial Research Team` },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: absolute('/') },
    // 8.04 entity resolution — the page is about a named software product with a
    // canonical vendor URL, so engines can bind it to the right entity.
    about: {
      '@type': 'SoftwareApplication',
      name: p.name,
      applicationCategory: 'BusinessApplication',
      url: p.homepage,
      publisher: { '@type': 'Organization', name: p.vendor },
    },
    citation: p.sources.map((s) => s.url),
  }

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
      { '@type': 'ListItem', position: 2, name: 'Platforms', item: absolute('/platform') },
      { '@type': 'ListItem', position: 3, name: p.name, item: url },
    ],
  }

  return (
    <>
      <div className="post-hero">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/platform">Platforms</a></li>
              <li aria-current="page">{p.name}</li>
            </ol>
          </nav>

          <p className="eyebrow">Platform Profile &mdash; Vendor-Documented</p>
          <h1>{p.name}: what the vendor actually publishes</h1>

          <div className="post-meta">
            <span className="updated">
              Last updated: <time dateTime={verified}>{longDate(verified)}</time>
            </span>
            <span>By {SITE_NAME} Editorial Team</span>
            <span>Vendor: {p.vendor}</span>
            <span>{p.sources.length} primary sources</span>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="post-layout">
          <article className="post post-shell">
            <PostActions slug={`platform-${p.slug}`} title={p.name} url={url} variant="share" />

            <div className="answer">
              <h2 className="answer-heading">The Short Answer</h2>
              <p className="lead">{p.oneLine}</p>
            </div>

            <section className="industry-section" data-reveal>
              <h2>What {p.name} is</h2>
              <p>{p.whatItIs}</p>
              <p>
                <strong>Where it runs:</strong> {p.surface}
              </p>
            </section>

            <section className="industry-section" data-reveal>
              <h2>Capabilities {p.vendor} names</h2>
              <p>
                Each entry below appears on {p.vendor}&rsquo;s own site or documentation. Nothing has been
                inferred from a category description or a third-party review.
              </p>
              <div className="challenges-grid">
                {p.capabilities.map((c) => (
                  <div key={c.name} className="challenge-card">
                    <h4>{c.name}</h4>
                    <p>{c.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="industry-section" data-reveal>
              <h2>Pricing</h2>
              <p>{p.pricing.model === NOT_PUBLISHED ? `${p.vendor} publishes no pricing model for ${p.name}.` : p.pricing.model}</p>

              <div className="table-wrap">
                <table className="spec">
                  <caption>
                    {p.name} &mdash; published pricing, read from {p.vendor} on {longDate(verified)}
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Plan</th>
                      <th scope="col">Published price</th>
                      <th scope="col">What the vendor states</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.pricing.tiers.map((t) => (
                      <tr key={t.plan}>
                        <th scope="row" className="cell">{t.plan}</th>
                        <td className="cell">
                          {t.price === NOT_PUBLISHED
                            ? <span className="not-published">{NOT_PUBLISHED}</span>
                            : <strong>{t.price}</strong>}
                        </td>
                        <td className="cell">{t.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="table-note">{p.pricing.note}</p>
            </section>

            <section className="industry-section" data-reveal>
              <h2>Data connectivity</h2>
              <dl className="aside-facts platform-facts">
                <div>
                  <dt>ERP</dt>
                  <dd>{p.integrations.erp}</dd>
                </div>
                <div>
                  <dt>CRM</dt>
                  <dd>{p.integrations.crm.length ? p.integrations.crm.join(', ') : `${NOT_PUBLISHED} — ${p.name} holds no CRM of its own.`}</dd>
                </div>
                <div>
                  <dt>Other named systems</dt>
                  <dd>{p.integrations.other.length ? p.integrations.other.join(', ') : NOT_PUBLISHED}</dd>
                </div>
                <div>
                  <dt>Implementation</dt>
                  <dd>{p.implementation === NOT_PUBLISHED ? <span className="not-published">{NOT_PUBLISHED}</span> : p.implementation}</dd>
                </div>
                <div>
                  <dt>Governance</dt>
                  <dd>{p.governance}</dd>
                </div>
              </dl>
            </section>

            <section className="industry-section" data-reveal>
              <h2>{p.name} against the nine manufacturing criteria</h2>
              <p>
                The same nine criteria are applied to all six platforms in the{' '}
                <a href={BENCHMARK}>manufacturing benchmark</a>. {p.vendor} publishes an answer for{' '}
                <strong>{publishedCriteria.length} of {CRITERIA.length}</strong>. The remainder are marked
                &ldquo;{NOT_PUBLISHED}&rdquo; rather than guessed.
              </p>

              <div className="table-wrap">
                <table className="spec">
                  <caption>{p.name} &mdash; criterion-by-criterion, from vendor sources</caption>
                  <thead>
                    <tr>
                      <th scope="col">Criterion</th>
                      <th scope="col">{p.name}</th>
                      <th scope="col">Evidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CRITERIA.map((c) => {
                      const cell = p.criteria[c.key]
                      const unknown = cell.value === NOT_PUBLISHED
                      return (
                        <tr key={c.key}>
                          <th scope="row" className="cell">{c.label}</th>
                          <td className="cell">
                            {unknown
                              ? <span className="not-published">{NOT_PUBLISHED}</span>
                              : <strong>{cell.value}</strong>}
                          </td>
                          <td className="cell">{cell.note}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="industry-section" data-reveal>
              <h2>Strengths</h2>
              <ul className="prose-list">
                {p.strengths.map((s) => <li key={s}>{s}</li>)}
              </ul>

              <h2>Limits</h2>
              <ul className="prose-list">
                {p.limits.map((s) => <li key={s}>{s}</li>)}
              </ul>

              <div className="skip-note-box">
                <strong>Skip it if:</strong> {p.skipIf}
              </div>
            </section>

            <section className="sources" data-reveal>
              <h2>Sources</h2>
              <ol>
                {p.sources.map((s, i) => (
                  <li key={s.url} id={`source-${i + 1}`}>
                    <span className="src-label">{s.label}</span>{' '}
                    <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">{s.url}</a>
                  </li>
                ))}
              </ol>
              <p className="src-more">
                All figures read from these pages on {longDate(verified)}. Vendor pricing changes without
                notice; verify before you sign.
              </p>
            </section>

            <section className="industry-related" data-reveal>
              <h2>Compare {p.name} against the field</h2>
              <ul className="related-links-list">
                <li>
                  <a href={BENCHMARK}>
                    <strong>Best AI Sales Platforms for Manufacturing (2026)</strong> &mdash; all six platforms
                    across nine criteria
                  </a>
                </li>
                <li>
                  <a href="/industry/manufacturing-distribution">
                    <strong>Manufacturing &amp; Distribution benchmark</strong> &mdash; sector bottlenecks and
                    sector-specific ranking
                  </a>
                </li>
                <li>
                  <a href="/platform">
                    <strong>All platform profiles</strong> &mdash; the same treatment for every vendor here
                  </a>
                </li>
              </ul>
            </section>
          </article>

          <aside className="post-aside" aria-label="Platform facts and related profiles">
            <div className="aside-card">
              <p className="aside-label">At a glance</p>
              <dl className="aside-facts">
                <div>
                  <dt>Vendor</dt>
                  <dd>{p.vendor}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{p.category}</dd>
                </div>
                <div>
                  <dt>Entry price</dt>
                  <dd>{p.pricing.tiers.find((t) => t.price !== NOT_PUBLISHED)?.price || NOT_PUBLISHED}</dd>
                </div>
                <div>
                  <dt>Criteria published</dt>
                  <dd>{publishedCriteria.length} of {CRITERIA.length}</dd>
                </div>
                <div>
                  <dt>Verified</dt>
                  <dd>{longDate(verified)}</dd>
                </div>
              </dl>
            </div>

            <div className="aside-card">
              <p className="aside-label">Other platform profiles</p>
              <ul className="aside-related">
                {others.map((o) => (
                  <li key={o.slug}>
                    <a href={`/platform/${o.slug}`}>{o.name}</a>
                    <span>{o.vendor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="aside-card aside-cta">
              <p className="aside-label">Missing a platform?</p>
              <p>Tell us which two tools you are choosing between and we will benchmark them the same way.</p>
              <a className="button" href="/request">Request a comparison</a>
            </div>
          </aside>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    </>
  )
}
