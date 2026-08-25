import { query, POSTS } from '../lib/db.js'
import { longDate, isoDate } from '../lib/format.js'
import { renderContent, extractFirstTable } from '../lib/markdown.js'
import { SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL, absolute } from '../lib/site.js'
import { getAllIndustries } from '../lib/industries.js'

// Was force-dynamic, which put an Azure Postgres round trip in front of every
// byte of HTML — TTFB is charged straight to FCP and LCP. The index only
// changes when a post is published, and app/api/posts/route.js revalidates this
// path on save, so the window is a backstop rather than the freshness contract.
export const revalidate = 300


export const metadata = {
  title: `${SITE_NAME} — Independent B2B Software & AI Sales Agent Comparisons`,
  description: `${SITE_DESCRIPTION} Verified pricing, architecture benchmarks, and per-industry evaluations.`,
  alternates: { canonical: absolute('/'), types: { 'application/rss+xml': absolute('/feed.xml') } },
  openGraph: {
    title: `${SITE_NAME} — Independent B2B Software & AI Sales Agent Comparisons`,
    description: `${SITE_DESCRIPTION} Verified pricing, architecture benchmarks, and per-industry evaluations.`,
    url: absolute('/'),
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [
      {
        url: absolute('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Independent AI Sales Agent & B2B Software Comparisons`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Independent B2B Software & AI Sales Agent Comparisons`,
    description: SITE_DESCRIPTION,
    images: [absolute('/opengraph-image')],
  },
}

async function published() {
  try {
    return await query(
      `SELECT slug, title, type, tool_1, tool_2, summary, content, author, updated_at
         FROM ${POSTS}
        WHERE published = TRUE
        ORDER BY updated_at DESC`,
    )
  } catch (err) {
    console.error('home query failed:', err.message)
    return null
  }
}

const pairLabel = (p) => (p.type === 'roundup' ? 'Multi-tool roundup' : `${p.tool_1} vs ${p.tool_2}`)

function Head({ postCount, toolCount, lastUpdated }) {
  return (
    <div className="index-hero-wrap">
      <div className="index-head">
        <div className="index-head-left">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>Independent Benchmark 2026</span>
          </div>
          <h1>Compare B2B Software &amp; AI Agents Before You Commit Budget</h1>
          <p className="lead">
            {SITE_NAME} publishes evidence-based comparisons of AI sales agents, enterprise copilot platforms, and CRMs. Every price tier, API constraint, and capability is cross-verified against official vendor documentation.
          </p>
        </div>

        <div className="index-head-stats">
          <div className="hero-stat-card" data-reveal>
            <span className="stat-label">Published Comparisons</span>
            <span className="stat-value">{postCount}</span>
            <span className="stat-sub">Head-to-head &amp; roundups</span>
          </div>
          <div className="hero-stat-card" data-reveal>
            <span className="stat-label">Platforms Evaluated</span>
            <span className="stat-value">{toolCount}</span>
            <span className="stat-sub">Agentforce, Copilot, Salezx, 11x...</span>
          </div>
          <div className="hero-stat-card" data-reveal>
            <span className="stat-label">Verification Standard</span>
            <span className="stat-value">100%</span>
            <span className="stat-sub">Primary vendor sourced</span>
          </div>
          <div className="hero-stat-card" data-reveal>
            <span className="stat-label">Last Database Update</span>
            <span className="stat-value">{longDate(lastUpdated)}</span>
            <span className="stat-sub">Active quarterly audit</span>
          </div>
        </div>
      </div>
    </div>
  )
}

import {
  FactoryIcon,
  CloudTechIcon,
  BriefcaseIcon,
  MedicalIcon,
} from '../components/Icons.js'

function IndustryShowcase() {
  const industries = getAllIndustries()

  const iconComponents = {
    'manufacturing-distribution': FactoryIcon,
    'b2b-saas': CloudTechIcon,
    'professional-services': BriefcaseIcon,
    'healthcare-medtech': MedicalIcon,
  }

  return (
    <section className="home-section" aria-labelledby="industries-heading">
      <div className="section-head">
        <div>
          <p className="section-eyebrow">Sector Benchmarks</p>
          <h2 id="industries-heading">Industry-Specific AI Sales Evaluations</h2>
        </div>
        <a className="section-link" href="/industry">View all sectors →</a>
      </div>

      <div className="industry-hub-grid">
        {industries.map((ind) => {
          const IconComp = iconComponents[ind.slug] || FactoryIcon
          return (
            <a key={ind.slug} className="industry-hub-card" href={`/industry/${ind.slug}`} data-reveal>
              <div className="industry-card-top">
                <div className="industry-card-icon-wrap">
                  <IconComp size={22} className="industry-svg-icon" />
                </div>
                <span className="industry-top-badge">Top Pick: {ind.topPick}</span>
              </div>
              <h3 className="industry-card-title">{ind.name}</h3>
              <p className="industry-card-desc">{ind.bottleneck}</p>
              <div className="industry-card-meta">
                <span>{ind.rankings.length} evaluated tools</span>
                <span className="industry-arrow">Read benchmark →</span>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}

function Methodology() {
  return (
    <section className="method-section" aria-labelledby="method-heading">
      <div className="section-head">
        <div>
          <p className="section-eyebrow">Evaluation Standard</p>
          <h2 id="method-heading">How PlayTheTech Evaluates Enterprise Software</h2>
        </div>
      </div>

      <div className="method-grid-3">
        <div className="method-box" data-reveal>
          <div className="method-num">01</div>
          <h3>Direct Primary Sourcing</h3>
          <p>
            Every price, API tier, and feature limit is sourced directly from vendor pricing calculators, technical documentation, and product releases — never secondary aggregators.
          </p>
        </div>

        <div className="method-box" data-reveal>
          <div className="method-num">02</div>
          <h3>Total Cost of Ownership (TCO)</h3>
          <p>
            We audit the real cost of deployment, contrasting per-seat licensing penalties against transaction-based AI models and underlying infrastructure credit fees.
          </p>
        </div>

        <div className="method-box" data-reveal>
          <div className="method-num">03</div>
          <h3>Zero Sponsored Rankings</h3>
          <p>
            Vendors cannot pay for coverage, ranking positions, or favorable reviews. Where a tool lacks a capability or charges hidden fees, the matrix states it clearly.
          </p>
        </div>
      </div>
    </section>
  )
}

export default async function Home() {
  const posts = await published()

  const site = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absolute('/'),
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: absolute('/'),
      email: CONTACT_EMAIL,
      description: 'Publisher of independent software comparisons, sourced from vendor documentation.',
    },
  }

  if (posts === null || posts.length === 0) {
    return (
      <>
        <div className="shell">
          <Head postCount={0} toolCount={0} lastUpdated={new Date()} />
          <IndustryShowcase />
          <Methodology />
          <p className="empty">
            No comparisons published yet. <a href="/request">Request a comparison</a>.
          </p>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
      </>
    )
  }

  const [lead, ...rest] = posts
  const { html } = renderContent(lead.content, {
    caption: lead.type === 'roundup' ? lead.title : `${lead.tool_1} compared with ${lead.tool_2}`,
    verifiedFallback: lead.updated_at,
  })
  const leadTable = extractFirstTable(html)
  const tools = [...new Set(posts.flatMap((p) => [p.tool_1, p.tool_2]))].sort()

  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Software comparisons',
    numberOfItems: posts.length,
    itemListElement: posts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absolute(`/compare/${p.slug}`),
      name: p.title,
    })),
  }

  return (
    <>
      <div className="shell">
        <Head postCount={posts.length} toolCount={tools.length} lastUpdated={posts[0].updated_at} />

        {/* The sample spread: the newest comparison, printed with its own table. */}
        <section className="featured" id="comparisons" aria-labelledby="featured-heading" data-reveal>
          <p className="featured-label">Newest comparison</p>
          <h2 id="featured-heading">
            <a href={`/compare/${lead.slug}`}>{lead.title}</a>
          </h2>
          <p className="featured-meta">
            <span>{pairLabel(lead)}</span>
            {lead.author ? <span>By {lead.author}</span> : null}
            <span>
              <time dateTime={isoDate(lead.updated_at)}>{longDate(lead.updated_at)}</time>
            </span>
          </p>
          {lead.summary ? <p className="featured-summary">{lead.summary}</p> : null}
          {leadTable ? (
            <>
              <p className="table-hint mobile-only">Swipe the table to see every column</p>
              <div className="featured-table" dangerouslySetInnerHTML={{ __html: leadTable }} />
            </>
          ) : null}
          <p className="featured-more">
            <a href={`/compare/${lead.slug}`}>Read the full comparison and verdict →</a>
          </p>
        </section>

        {/* Dedicated Industry Hub Section */}
        <IndustryShowcase />

        {/* More Comparisons Grid */}
        {rest.length > 0 ? (
          <section className="home-section" aria-labelledby="all-heading">
            <div className="section-head">
              <div>
                <p className="section-eyebrow">Catalogue</p>
                <h2 id="all-heading">Head-to-Head &amp; Category Comparisons</h2>
              </div>
              <span className="count">{rest.length} comparisons</span>
            </div>
            <ul className="card-grid">
              {rest.map((p) => (
                <li key={p.slug} className="card" data-reveal>
                  <div className="card-top">
                    <span className={`tag ${p.type}`}>{p.type}</span>
                    <span className="card-date">
                      <time dateTime={isoDate(p.updated_at)}>{longDate(p.updated_at)}</time>
                    </span>
                  </div>
                  <div className="card-main">
                    <h3><a className="card-link" href={`/compare/${p.slug}`}>{p.title}</a></h3>
                    <p className="card-pair">{pairLabel(p)}</p>
                    {p.summary ? <p className="card-summary">{p.summary}</p> : null}
                  </div>
                  <div className="card-media">
                    <picture>
                      <source srcSet={`/images/thumbs/${p.slug}.webp`} type="image/webp" />
                      <img
                        className="card-thumb"
                        src={`/images/thumbs/${p.slug}.jpg`}
                        alt={`${p.title} benchmark preview`}
                        width={150}
                        height={88}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Tools Covered Directory */}
        <section className="home-section" aria-labelledby="tools-heading" data-reveal>
          <div className="section-head">
            <div>
              <p className="section-eyebrow">Directory</p>
              <h2 id="tools-heading">Evaluated Software Platforms</h2>
            </div>
            <span className="count">{tools.length} active platforms</span>
          </div>
          <ul className="tool-index">
            {tools.map((t) => {
              const match = posts.find((p) => p.tool_1 === t || p.tool_2 === t)
              return (
                <li key={t}>
                  <a href={`/compare/${match.slug}`}>
                    <span>{t}</span>
                    <small>Compare →</small>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Methodology Standard */}
        <Methodology />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(list) }} />
    </>
  )
}
