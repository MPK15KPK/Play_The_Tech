import { query, POSTS } from '../lib/db.js'
import { longDate, isoDate } from '../lib/format.js'
import { renderContent, extractFirstTable } from '../lib/markdown.js'
import { SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL, absolute } from '../lib/site.js'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `${SITE_NAME} — software comparisons with sourced pricing`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: absolute('/'), types: { 'application/rss+xml': absolute('/feed.xml') } },
  openGraph: {
    title: `${SITE_NAME} — software comparisons with sourced pricing`,
    description: SITE_DESCRIPTION,
    url: absolute('/'),
    type: 'website',
    siteName: SITE_NAME,
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

// Says plainly what the site is and how it works. A reader who cannot tell what
// a page is for leaves, and an answer engine with nothing to quote moves on.
function Method() {
  return (
    <section className="method" aria-labelledby="method-heading">
      <h2 id="method-heading">How this works</h2>
      <p>
        Every page here answers one buying question about two named tools, or about
        one category. Prices and limits are read off the vendor&rsquo;s own pricing page
        or documentation — never off another comparison site — and each table carries
        the date we checked it, so a figure that has gone stale is visible rather than
        quietly wrong.
      </p>
      <p>
        Where a vendor publishes nothing, the table says <strong>Not published</strong>
        {' '}instead of an estimate. Where we have not used a tool ourselves, the page
        says so. That is the whole method, and it is the reason a number here is worth
        checking rather than trusting.
      </p>
    </section>
  )
}

// No hero band. UI.md §5: the most characteristic thing in this subject's world
// is a table, not a headline over a gradient — so the page says what it is in
// three lines and then the catalogue starts.
function Head() {
  return (
    <div className="index-head">
      <p className="eyebrow">Independent software comparisons</p>
      <h1>Compare the tools before you commit the budget</h1>
      <p className="lead">
        {SITE_NAME} compares business software — CRMs, AI sales tools, sales
        platforms — two at a time, against the same criteria. Every price is taken
        from the vendor’s own page and stamped with the date we checked it, so you
        can verify the number instead of trusting it.
      </p>
    </div>
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
      description:
        'Publisher of independent software comparisons, sourced from vendor documentation.',
    },
  }

  if (posts === null || posts.length === 0) {
    return (
      <>
        <div className="shell">
          <Head />
          <Method />
          <p className="empty">
            {posts === null
              ? 'The comparison list could not be loaded just now. Try again shortly, or write to us and we will tell you what broke.'
              : 'No comparisons published yet.'}{' '}
            <a href="/request">Request a comparison</a>.
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

  // Gives a crawler the whole catalogue in one machine-readable object.
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
        <Head />

        <dl className="ledger">
          <div className="ledger-item">
            <dt>Comparisons</dt>
            <dd>{posts.length}</dd>
          </div>
          <div className="ledger-item">
            <dt>Tools covered</dt>
            <dd>{tools.length}</dd>
          </div>
          <div className="ledger-item">
            <dt>Last updated</dt>
            <dd>{longDate(posts[0].updated_at)}</dd>
          </div>
          <div className="ledger-item">
            <dt>Every figure</dt>
            <dd>Sourced</dd>
          </div>
        </dl>

        {/* The sample spread: the newest comparison, printed with its own table.
            States what the site is by being it, rather than describing it. */}
        <section className="featured" id="comparisons" aria-labelledby="featured-heading">
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
            <div className="featured-table" dangerouslySetInnerHTML={{ __html: leadTable }} />
          ) : null}
          <p className="featured-more">
            <a href={`/compare/${lead.slug}`}>Read the full comparison and verdict →</a>
          </p>
        </section>

        {rest.length > 0 ? (
          <section aria-labelledby="all-heading">
            <div className="section-head">
              <h2 id="all-heading">More comparisons</h2>
              <span className="count">{rest.length} more</span>
            </div>
            <ul className="card-grid">
              {rest.map((p) => (
                <li key={p.slug} className="card">
                  <div className="card-top">
                    <span className={`tag ${p.type}`}>{p.type}</span>
                    <span className="card-date">
                      <time dateTime={isoDate(p.updated_at)}>{longDate(p.updated_at)}</time>
                    </span>
                  </div>
                  <h3><a className="card-link" href={`/compare/${p.slug}`}>{p.title}</a></h3>
                  <p className="card-pair">{pairLabel(p)}</p>
                  {p.summary ? <p className="card-summary">{p.summary}</p> : null}
                  {/* No "read more" affordance: the whole row is the link, and a
                      decorative arrow repeated on every row is just noise. */}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="tools-heading">
          <div className="section-head">
            <h2 id="tools-heading">Tools covered</h2>
            <span className="count">{tools.length} tools</span>
          </div>
          <ul className="tool-index">
            {tools.map((t) => {
              const match = posts.find((p) => p.tool_1 === t || p.tool_2 === t)
              return (
                <li key={t}>
                  <a href={`/compare/${match.slug}`}>{t}</a>
                </li>
              )
            })}
          </ul>
          <p className="tool-note">
            A pair you need that is not here yet — <a href="/request">ask for it</a>.
          </p>
        </section>

        {/* The method note closes the catalogue, where a price list prints its
            terms. It is annotation; the comparisons are the page. */}
        <Method />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(list) }} />
    </>
  )
}
