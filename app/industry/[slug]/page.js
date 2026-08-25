import { notFound } from 'next/navigation'
import { getIndustry, getAllIndustries } from '../../../lib/industries.js'
import { SITE_NAME, absolute } from '../../../lib/site.js'
import { longDate } from '../../../lib/format.js'
import PostActions from '../../../components/PostActions.js'


export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const ind = getIndustry(slug)
  if (!ind) return { title: 'Industry Not Found' }

  const url = absolute(`/industry/${ind.slug}`)
  const imageUrl = absolute(`/industry/${ind.slug}/opengraph-image`)

  return {
    title: ind.title,
    description: ind.description,
    alternates: { canonical: url },
    openGraph: {
      title: ind.title,
      description: ind.description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      locale: 'en_US',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ind.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ind.title,
      description: ind.description,
      images: [imageUrl],
    },
  }
}

export default async function IndustryPage({ params }) {
  const { slug } = await params
  const ind = getIndustry(slug)
  if (!ind) notFound()

  const all = getAllIndustries()
  const otherIndustries = all.filter((i) => i.slug !== ind.slug)
  const url = absolute(`/industry/${ind.slug}`)
  const updatedDate = new Date().toISOString()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: ind.title,
    description: ind.description,
    url,
    datePublished: '2026-08-20',
    dateModified: updatedDate,
    author: {
      '@type': 'Organization',
      name: `${SITE_NAME} Editorial Research Team`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: absolute('/'),
    },
  }

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
      { '@type': 'ListItem', position: 2, name: 'Industry Guides', item: absolute('/#industries') },
      { '@type': 'ListItem', position: 3, name: ind.title, item: url },
    ],
  }

  return (
    <>
      <div className="post-hero">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/industry">Industry Benchmarks</a></li>
              <li aria-current="page">{ind.shortName}</li>
            </ol>
          </nav>

          <p className="eyebrow">Industry Benchmark &amp; Analysis</p>
          <h1>{ind.title}</h1>

          <div className="post-meta">
            <span className="updated">
              Last updated: <time dateTime={updatedDate}>{longDate(updatedDate)}</time>
            </span>
            <span>By {SITE_NAME} Editorial Team</span>
            <span>Sector: {ind.name}</span>
            <span>Verified vendor documentation</span>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="post-layout">
          <article className="post post-shell">
            <PostActions slug={`industry-${ind.slug}`} title={ind.title} url={url} variant="share" />

            <div className="answer">
              <h2 className="answer-heading">The Industry Short Answer</h2>
              <p className="lead">{ind.heroSummary}</p>
            </div>

            <section className="industry-section" data-reveal>
              <h2>Top Ranked AI Sales Tools for {ind.shortName} (2026)</h2>
              <p>
                In {ind.name}, software selection depends on core architecture and data connectivity.
                Below is our verified comparison matrix across the leading solutions:
              </p>

              {/* Phones read the matrix as a ranked stack; a five-column table
                  at 360px is a sideways scroll nobody performs. */}
              <ol className="rank-cards mobile-only">
                {ind.rankings.map((tool) => (
                  <li key={tool.name} className={`rank-card${tool.rank === 1 ? ' is-top' : ''}`}>
                    <div className="rank-card-head">
                      <span className="rank-num">#{tool.rank}</span>
                      <div className="rank-card-name">
                        <h3>
                          <a href={tool.url} target="_blank" rel="noopener noreferrer">{tool.name}</a>
                        </h3>
                        <p>{tool.type}</p>
                      </div>
                      {tool.rank === 1 ? <span className="rank-flag">Top pick</span> : null}
                    </div>
                    <dl className="rank-card-facts">
                      <div>
                        <dt>ERP / CRM connectivity</dt>
                        <dd>{tool.erpSupport}</dd>
                      </div>
                      <div>
                        <dt>Pricing basis</dt>
                        <dd>{tool.rank === 1 ? <strong>{tool.pricing}</strong> : tool.pricing}</dd>
                      </div>
                      <div>
                        <dt>Best for</dt>
                        <dd>{tool.bestFor}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ol>

              <div className="table-wrap desktop-only">
                <table className="spec">
                  <caption>
                    {ind.name} — AI Sales Platform Comparison &amp; Architecture Matrix
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Rank &amp; Tool</th>
                      <th scope="col">Architecture</th>
                      <th scope="col">ERP / CRM Connectivity</th>
                      <th scope="col">Pricing Basis</th>
                      <th scope="col">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ind.rankings.map((tool) => (
                      <tr key={tool.name} className={tool.rank === 1 ? 'win' : ''}>
                        <th scope="row" className="cell">
                          {tool.rank === 1 ? (
                            <span className="win-mark" aria-hidden="true">
                              ▸{' '}
                            </span>
                          ) : null}
                          <a href={tool.url} target="_blank" rel="noopener noreferrer">
                            <strong>#{tool.rank} {tool.name}</strong>
                          </a>
                        </th>
                        <td className="cell">{tool.type}</td>
                        <td className="cell">{tool.erpSupport}</td>
                        <td className="cell">
                          <a href={tool.url} target="_blank" rel="noopener noreferrer">
                            {tool.rank === 1 ? <strong>{tool.pricing}</strong> : tool.pricing}
                          </a>
                        </td>
                        <td className="cell">{tool.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="industry-profiles">
              <h2>In-Depth Platform Profiles &amp; Fit Analysis</h2>

              {ind.rankings.map((tool) => (
                <div key={tool.name} className="tool-profile" data-reveal>
                  <div className="tool-profile-header">
                    <div className="tool-profile-title">
                      <h3>#{tool.rank} {tool.name}</h3>
                      <span className="tool-profile-type">{tool.type}</span>
                    </div>
                    {tool.rank === 1 ? (
                      <span className="pill pill-blue">#1 Top Pick</span>
                    ) : null}
                  </div>

                  <div className="tool-profile-body">
                    <div className="profile-fact-row">
                      <span className="profile-fact-label">Why it wins:</span>
                      <span className="profile-fact-val">{tool.winReason}</span>
                    </div>
                    <div className="profile-fact-row">
                      <span className="profile-fact-label">Pricing model:</span>
                      <span className="profile-fact-val">{tool.pricing}</span>
                    </div>
                    <div className="profile-fact-row">
                      <span className="profile-fact-label">Integration:</span>
                      <span className="profile-fact-val">{tool.erpSupport}</span>
                    </div>

                    <div className="skip-note-box">
                      <strong>Skip it if:</strong> {tool.skipIf}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section className="industry-challenges">
              <h2>Key Sales Bottlenecks in {ind.name}</h2>
              <div className="challenges-grid">
                {ind.challenges.map((c) => (
                  <div key={c.title} className="challenge-card" data-reveal>
                    <h4>{c.title}</h4>
                    <p>{c.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="industry-related" data-reveal>
              <h2>Related AI Sales &amp; CRM Comparisons</h2>
              <ul className="related-links-list">
                <li>
                  <a href="/compare/best-ai-sales-agents-2026">
                    <strong>Best AI Sales Agents (2026)</strong> — Comprehensive 7-tool category overview
                  </a>
                </li>
                <li>
                  <a href="/compare/ai-sdr-vs-sales-copilot">
                    <strong>AI SDR vs Sales Copilot (11x vs Salezx)</strong> — Outbound volume vs in-deal acceleration
                  </a>
                </li>
                <li>
                  <a href="/compare/hubspot-vs-salesforce">
                    <strong>HubSpot vs Salesforce</strong> — Core CRM benchmark for scaling teams
                  </a>
                </li>
              </ul>
            </section>
          </article>

          <aside className="post-aside" aria-label="Page navigation and sector facts">
            <div className="aside-card">
              <p className="aside-label">Sector at a glance</p>
              <dl className="aside-facts">
                <div>
                  <dt>Sector</dt>
                  <dd>{ind.name}</dd>
                </div>
                <div>
                  <dt>Top Pick</dt>
                  <dd><strong>{ind.topPick}</strong></dd>
                </div>
                <div>
                  <dt>Core Constraint</dt>
                  <dd>{ind.bottleneck}</dd>
                </div>
                <div>
                  <dt>Verified</dt>
                  <dd>August 2026</dd>
                </div>
              </dl>
            </div>

            <div className="aside-card">
              <p className="aside-label">Other Industry Fits</p>
              <ul className="aside-related">
                {otherIndustries.map((other) => (
                  <li key={other.slug}>
                    <a href={`/industry/${other.slug}`}>{other.name}</a>
                    <span>Top: {other.topPick}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="aside-card aside-cta">
              <p className="aside-label">Custom Benchmark</p>
              <p>Tell us your tech stack and team size. We will map the right AI tools for your sector.</p>
              <a className="button" href="/request">Request a comparison</a>
            </div>

          </aside>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
    </>
  )
}
