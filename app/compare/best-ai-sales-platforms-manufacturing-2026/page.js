import { getAllPlatforms, CRITERIA, VERIFIED_ON, NOT_PUBLISHED } from '../../../lib/platforms.js'
import { SITE_NAME, absolute } from '../../../lib/site.js'
import { longDate } from '../../../lib/format.js'
import PostActions from '../../../components/PostActions.js'
import OwnershipDisclosure from '../../../components/OwnershipDisclosure.js'

// A static segment under /compare, so it takes precedence over the DB-driven
// [slug] route. Nothing here touches Postgres — it prerenders at build time.
const SLUG = 'best-ai-sales-platforms-manufacturing-2026'
const URL = absolute(`/compare/${SLUG}`)

const TITLE =
  'Best AI Sales Platforms for Manufacturing in 2026: Salezx vs Salesforce vs Microsoft vs ServiceNow'
const META_TITLE = 'AI Sales for Manufacturing (2026)'
const META_DESCRIPTION =
  'Six AI platforms benchmarked for complex B2B manufacturing across ERP connectivity, quoting, margin and channel — verified against vendor documentation.'

const SUMMARY =
  'SAP Joule wins inside S/4HANA because it runs in the ERP rather than connecting to it. Salezx is the only platform publishing seat-independent pricing and a 48-hour go-live. Dynamics 365 Sales Enterprise bundles Copilot at $105/user. Agentforce is strongest on Salesforce data but metered. ServiceNow and UiPath are not sales tools.'

const FAQ = [
  {
    q: 'Which of these platforms actually connects to SAP?',
    a: 'SAP Joule does not connect to SAP — it runs inside SAP S/4HANA Cloud Public and Private Edition, so there is no connector, no replication and no integration project. UiPath publishes the deepest third-party SAP coverage, naming S/4HANA, SAP BTP and SAP Build Process Automation across order-to-cash, procure-to-pay and inventory replenishment. Of the remaining four, none names a certified SAP connector on its own site. Salezx states it reads "ERP reports" without naming a vendor; Salesforce sells MuleSoft as a separate product; Microsoft has its own ERP family; ServiceNow describes zero-copy data access without naming an ERP.',
  },
  {
    q: 'What would Agentforce cost a 50-rep manufacturing sales team?',
    a: 'It depends entirely on which of the four buying models you pick, which is the core difficulty with it. The Agentforce add-on for Sales is $125 per user per month, so 50 reps is $6,250 a month before the underlying Salesforce licence. Consumption is the alternative: Flex Credits cost $500 per 100,000 and each Agentforce action consumes 20 Credits, so Salesforce’s own published example of one user running 20 requests a day works out at $120 a month. Agentforce 1 Editions start at $550 per user per month and include 2.5 million Flex Credits per org per year.',
  },
  {
    q: 'If we already run Dynamics 365, do we need anything else?',
    a: 'Dynamics 365 Sales Enterprise at $105 per user per month already includes Copilot in Dynamics 365 and prebuilt agents such as the Sales Close Agent, so the AI is bundled rather than metered. Two published limits matter for manufacturers: Microsoft states the Sales agent "is not available on Microsoft Dynamics 365 Customer Engagement (on-premises)" and "is not supported in Government Community Cloud (GCC), including USG, and Department of Defense (DoD)". Microsoft also publishes nothing about catalogue depth, quoting, margin or dealer management on the Sales pricing page.',
  },
  {
    q: 'Does ServiceNow handle manufacturing quoting?',
    a: 'Not as published. ServiceNow’s nearest product, Sales and Order Management, is scoped in its own product name to technology providers rather than manufacturers. The AI Agents suite is genuinely strong at coordinating processes that cross IT, customer service and HR, and it is included at no additional cost for Pro Plus and Enterprise Plus customers. But if the problem is a rep quoting a configured product against a tiered contract price, ServiceNow publishes nothing that addresses it.',
  },
  {
    q: 'Why does so much of this comparison say "Not published"?',
    a: 'Because it is true, and because the pattern is the finding. Across six platforms and nine criteria there are 54 cells, and most vendors publish an answer for fewer than half. Margin protection and dealer/distributor management are the emptiest columns of all. Any comparison that fills those cells with confident scores is inventing them, since the vendors themselves have not written them down. We mark unknowns rather than guessing, per our sourcing policy.',
  },
  {
    q: 'Which platform is fastest to get live?',
    a: 'Salezx is the only one of the six that publishes an implementation time at all: a 48-hour go-live, staged as "30 min Trial → 2 hours Setup → 2 days Complete Go-Live". Salesforce, Microsoft, ServiceNow, UiPath and SAP publish no deployment duration for these products. That is not evidence they are slow — it is evidence you cannot plan around a published number, and should insist on one in writing during procurement.',
  },
]

const VERDICT = [
  {
    who: 'Choose SAP Joule if',
    detail:
      'your sellers work inside SAP S/4HANA and the questions are about quotations, expiring prices and sales order status. Nothing else here can match an assistant that lives in the ERP itself. Accept that no price is published anywhere in SAP’s capabilities guide.',
    platform: 'sap-joule',
  },
  {
    who: 'Choose Microsoft Dynamics 365 + Copilot if',
    detail:
      'you want the most predictable annual cost. At $105 per user per month, Sales Enterprise bundles Copilot and prebuilt agents into the seat price instead of metering them — provided you are not on Dynamics 365 CE on-premises or in GCC/DoD, both of which Microsoft excludes.',
    platform: 'microsoft-dynamics-365-copilot',
  },
  {
    who: 'Choose Salesforce Agentforce if',
    detail:
      'your customer, pricing and order data already lives in Salesforce and you want agents acting directly on it. Budget carefully: it is the only platform here priced per action, and the manufacturing-specific work sits in separately licensed products.',
    platform: 'salesforce-agentforce',
  },
  {
    who: 'Choose Salezx if',
    detail:
      'your reps live in Microsoft Teams, your catalogue is deep, and the constraint is that per-seat AI pricing makes it unaffordable to give inside sales, field sales and customer service the same access. It is the only platform here that publishes pricing scaled to transactions rather than headcount. Scope the ERP connection properly first — Salezx names no ERP vendor on its own site.',
    platform: 'salezx',
  },
  {
    who: 'Choose ServiceNow AI Agents if',
    detail:
      'you already hold Pro Plus or Enterprise Plus and the problem crosses departments rather than sitting with a seller. It arrives at no additional licence cost. Do not buy it to solve manufacturing quoting.',
    platform: 'servicenow-ai-agents',
  },
  {
    who: 'Choose UiPath if',
    detail:
      'the bottleneck is behind the order, not in front of it — order-to-cash, invoice processing, inventory replenishment against SAP. It is not a seller-facing tool and does not pretend to be.',
    platform: 'uipath',
  },
]

export const metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: URL,
    siteName: SITE_NAME,
    type: 'article',
    locale: 'en_US',
    images: [
      {
        url: absolute(`/compare/${SLUG}/opengraph-image`),
        width: 1200,
        height: 630,
        alt: META_TITLE,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [absolute(`/compare/${SLUG}/opengraph-image`)],
  },
}

export default function ManufacturingBenchmarkPage() {
  const platforms = getAllPlatforms()
  const verified = new Date(`${VERIFIED_ON}T00:00:00Z`).toISOString()

  // The honesty metric the page leads on: how many of the 54 cells any vendor
  // has actually written down. Computed, not asserted.
  const totalCells = platforms.length * CRITERIA.length
  const publishedCells = platforms.reduce(
    (n, p) => n + CRITERIA.filter((c) => p.criteria[c.key]?.value !== NOT_PUBLISHED).length,
    0,
  )

  const allSources = platforms.flatMap((p) => p.sources.map((s) => ({ ...s, platform: p.name })))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: META_DESCRIPTION,
    url: URL,
    datePublished: VERIFIED_ON,
    dateModified: verified,
    author: { '@type': 'Organization', name: `${SITE_NAME} Editorial Research Team` },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: absolute('/') },
    about: platforms.map((p) => ({
      '@type': 'SoftwareApplication',
      name: p.name,
      applicationCategory: 'BusinessApplication',
      url: p.homepage,
      publisher: { '@type': 'Organization', name: p.vendor },
    })),
    citation: allSources.map((s) => s.url),
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
      { '@type': 'ListItem', position: 2, name: 'Comparisons', item: absolute('/') },
      { '@type': 'ListItem', position: 3, name: 'AI Sales Platforms for Manufacturing', item: URL },
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
              <li aria-current="page">AI Sales Platforms for Manufacturing</li>
            </ol>
          </nav>

          <p className="eyebrow">Multi-Platform Benchmark &mdash; Complex B2B Sales</p>
          <h1>{TITLE}</h1>

          <div className="post-meta">
            <span className="updated">
              Last updated: <time dateTime={verified}>{longDate(verified)}</time>
            </span>
            <span>By {SITE_NAME} Editorial Team</span>
            <span>6 platforms &middot; 9 criteria</span>
            <span>{allSources.length} primary sources</span>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="post-layout">
          <article className="post post-shell">
            <PostActions slug={SLUG} title={TITLE} url={URL} variant="share" />

            {/* GUARDRAILS 1.1 — above the comparison table, not below it. */}
            <OwnershipDisclosure />

            <div className="answer">
              <h2 className="answer-heading">The Short Answer</h2>
              <p className="lead">{SUMMARY}</p>
            </div>

            <section className="industry-section" data-reveal>
              <h2>The question this page answers</h2>
              <p>
                &ldquo;Which AI tool is best?&rdquo; is unanswerable. The useful question for an industrial
                seller is narrower: <strong>which AI platform still works when your team sells thousands of
                SKUs, configured products and ERP-dependent stock against tiered contract pricing?</strong>{' '}
                That question eliminates most of the AI sales category before the comparison starts, because
                most of it is built for software companies selling one product to a named contact.
              </p>
              <p>
                Six platforms are benchmarked here across nine criteria. Every figure was read from the
                vendor&rsquo;s own site or documentation on {longDate(verified)}. Nothing came from another
                comparison site, and where a vendor publishes no answer the cell reads
                &ldquo;{NOT_PUBLISHED}&rdquo; rather than a guess.
              </p>
              <p className="stat-callout">
                Of the <strong>{totalCells}</strong> platform-criterion cells in the matrix below, vendors
                publish an answer for <strong>{publishedCells}</strong>. Margin protection and dealer
                management are the two emptiest columns in the category.
              </p>
            </section>

            <section className="industry-section" data-reveal>
              <h2>The benchmark matrix</h2>

              {/* Phones read the matrix criterion by criterion; a seven-column
                  table at 360px is a sideways scroll nobody performs. */}
              <div className="mobile-only">
                {CRITERIA.map((c) => (
                  <div key={c.key} className="rank-card criterion-card">
                    <div className="rank-card-head">
                      <div className="rank-card-name">
                        <h3>{c.label}</h3>
                      </div>
                    </div>
                    <dl className="rank-card-facts">
                      {platforms.map((p) => {
                        const cell = p.criteria[c.key]
                        return (
                          <div key={p.slug}>
                            <dt>
                              <a href={`/platform/${p.slug}`}>{p.shortName}</a>
                            </dt>
                            <dd>
                              {cell.value === NOT_PUBLISHED
                                ? <span className="not-published">{NOT_PUBLISHED}</span>
                                : cell.value}
                            </dd>
                          </div>
                        )
                      })}
                    </dl>
                  </div>
                ))}
              </div>

              <div className="table-wrap desktop-only">
                <table className="spec matrix">
                  <caption>
                    AI sales platforms for manufacturing and complex B2B &mdash; nine criteria, read from
                    vendor documentation on {longDate(verified)}
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Criterion</th>
                      {platforms.map((p) => (
                        <th key={p.slug} scope="col">
                          <a href={`/platform/${p.slug}`}>{p.shortName}</a>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CRITERIA.map((c) => (
                      <tr key={c.key}>
                        <th scope="row" className="cell">{c.label}</th>
                        {platforms.map((p) => {
                          const cell = p.criteria[c.key]
                          return (
                            <td key={p.slug} className="cell">
                              {cell.value === NOT_PUBLISHED
                                ? <span className="not-published">{NOT_PUBLISHED}</span>
                                : cell.value}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                    <tr>
                      <th scope="row" className="cell">Entry price published</th>
                      {platforms.map((p) => {
                        const first = p.pricing.tiers.find((t) => t.price !== NOT_PUBLISHED)
                        return (
                          <td key={p.slug} className="cell">
                            {first ? <strong>{first.price}</strong> : <span className="not-published">{NOT_PUBLISHED}</span>}
                          </td>
                        )
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="table-note">
                Values are the vendor&rsquo;s published position, not a score. Full evidence for every cell,
                including the exact wording it came from, sits on each platform profile.
              </p>
            </section>

            <section className="industry-profiles" data-reveal>
              <h2>What each platform is, in one paragraph</h2>

              {platforms.map((p) => {
                const published = CRITERIA.filter((c) => p.criteria[c.key]?.value !== NOT_PUBLISHED).length
                const entry = p.pricing.tiers.find((t) => t.price !== NOT_PUBLISHED)
                return (
                  <div key={p.slug} className="tool-profile">
                    <div className="tool-profile-header">
                      <div className="tool-profile-title">
                        <h3><a href={`/platform/${p.slug}`}>{p.name}</a></h3>
                        <span className="tool-profile-type">{p.category}</span>
                      </div>
                      {p.ownedByUs ? <span className="pill pill-rose">Shared ownership</span> : null}
                    </div>

                    <div className="tool-profile-body">
                      <p>{p.oneLine}</p>
                      <div className="profile-fact-row">
                        <span className="profile-fact-label">Entry price:</span>
                        <span className="profile-fact-val">
                          {entry ? entry.price : NOT_PUBLISHED}
                          {entry ? ` — ${entry.plan}` : ''}
                        </span>
                      </div>
                      <div className="profile-fact-row">
                        <span className="profile-fact-label">ERP:</span>
                        <span className="profile-fact-val">{p.criteria.erpConnectivity.note}</span>
                      </div>
                      <div className="profile-fact-row">
                        <span className="profile-fact-label">Criteria published:</span>
                        <span className="profile-fact-val">{published} of {CRITERIA.length}</span>
                      </div>

                      <div className="skip-note-box">
                        <strong>Skip it if:</strong> {p.skipIf}
                      </div>

                      <p>
                        <a className="profile-more" href={`/platform/${p.slug}`}>
                          Full {p.name} profile, pricing table and sources &rarr;
                        </a>
                      </p>
                    </div>
                  </div>
                )
              })}
            </section>

            <section className="industry-section" data-reveal>
              <h2>Three differences that actually decide this</h2>

              <h3>1. Two of the six are not sales tools</h3>
              <p>
                ServiceNow and UiPath belong in the evaluation because manufacturers genuinely shortlist them,
                and both are excellent at what they do. Neither addresses the seller. ServiceNow&rsquo;s nearest
                product is scoped in its own name to technology providers; UiPath does not name quoting among
                the processes it automates and holds no CRM. If the problem is a rep who cannot get a stock
                figure during a call, four platforms remain.
              </p>

              <h3>2. The pricing models are not comparable, and that is the point</h3>
              <p>
                Microsoft bundles Copilot into a $105 per user per month seat. Salesforce meters it at $500 per
                100,000 Flex Credits with actions costing 20 Credits each, or $2 per conversation, or $125 per
                user per month unmetered, or $550 per user per month for Agentforce 1. Salezx prices annual AI
                transactions with the explicit claim that &ldquo;cost scales with transactions, not
                headcount&rdquo;. SAP publishes no price at all. A manufacturer with 40 inside reps, 30 field
                reps and 20 customer service agents will get wildly different answers depending on which model
                it walks into, and the seat-count-independent models are the ones that survive giving everyone
                access.
              </p>

              <h3>3. &ldquo;ERP integration&rdquo; means four different things here</h3>
              <p>
                SAP Joule does not integrate with the ERP — it is inside it. UiPath automates ERP processes
                from outside with named SAP products. ServiceNow reaches data through zero-copy integrations
                without naming an ERP. Salezx reads &ldquo;ERP reports&rdquo; over secure API without naming a
                vendor. Those are four materially different guarantees, and a procurement checklist with one
                row called &ldquo;ERP integration&rdquo; will score them identically. That row should be split
                before you shortlist.
              </p>
            </section>

            <section className="industry-section verdict-section" data-reveal>
              <h2>Verdict</h2>
              <p>
                There is no single winner, because the six are not competing for the same job. Match the
                platform to where your sellers already work and where your pricing data already lives.
              </p>
              <ul className="verdict-list">
                {VERDICT.map((v) => (
                  <li key={v.who}>
                    <strong><a href={`/platform/${v.platform}`}>{v.who}</a></strong> {v.detail}
                  </li>
                ))}
              </ul>
            </section>

            <section className="industry-section" data-reveal>
              <h2>Frequently asked questions</h2>
              {FAQ.map((f) => (
                <div key={f.q} className="faq-item">
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </section>

            <section className="sources" data-reveal>
              <h2>Sources</h2>
              <ol>
                {allSources.map((s, i) => (
                  <li key={s.url} id={`source-${i + 1}`}>
                    <span className="src-label">{s.platform} &mdash; {s.label}</span>{' '}
                    <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">{s.url}</a>
                  </li>
                ))}
              </ol>
              <p className="src-more">
                Every figure on this page was read from these pages on {longDate(verified)}. No figure was
                taken from another comparison site. Vendor pricing changes without notice &mdash; verify before
                you sign.
              </p>
            </section>

            <section className="industry-related" data-reveal>
              <h2>Related benchmarks</h2>
              <ul className="related-links-list">
                <li>
                  <a href="/industry/manufacturing-distribution">
                    <strong>Manufacturing &amp; Distribution sector benchmark</strong> &mdash; the bottlenecks
                    behind these criteria
                  </a>
                </li>
                <li>
                  <a href="/platform">
                    <strong>All platform profiles</strong> &mdash; pricing tables and sources per vendor
                  </a>
                </li>
                <li>
                  <a href="/compare/best-ai-sales-agents-2026">
                    <strong>Best AI Sales Agents (2026)</strong> &mdash; the wider category roundup
                  </a>
                </li>
              </ul>
            </section>
          </article>

          <aside className="post-aside" aria-label="Benchmark facts and platform links">
            <div className="aside-card">
              <p className="aside-label">Benchmark at a glance</p>
              <dl className="aside-facts">
                <div>
                  <dt>Platforms</dt>
                  <dd>{platforms.length}</dd>
                </div>
                <div>
                  <dt>Criteria</dt>
                  <dd>{CRITERIA.length}</dd>
                </div>
                <div>
                  <dt>Cells published</dt>
                  <dd>{publishedCells} of {totalCells}</dd>
                </div>
                <div>
                  <dt>Primary sources</dt>
                  <dd>{allSources.length}</dd>
                </div>
                <div>
                  <dt>Verified</dt>
                  <dd>{longDate(verified)}</dd>
                </div>
              </dl>
            </div>

            <div className="aside-card">
              <p className="aside-label">Platform profiles</p>
              <ul className="aside-related">
                {platforms.map((p) => (
                  <li key={p.slug}>
                    <a href={`/platform/${p.slug}`}>{p.name}</a>
                    <span>{p.vendor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="aside-card aside-cta">
              <p className="aside-label">Custom benchmark</p>
              <p>Tell us your ERP, CRM and team shape. We will map the shortlist against your stack.</p>
              <a className="button" href="/request">Request a comparison</a>
            </div>
          </aside>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    </>
  )
}
