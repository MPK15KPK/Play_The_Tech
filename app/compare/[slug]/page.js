import fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import { one, query, POSTS, STATS } from '../../../lib/db.js'
import { longDate, isoDate } from '../../../lib/format.js'
import { renderContent, toPlainText, extractLinks } from '../../../lib/markdown.js'
import { SITE_NAME, absolute } from '../../../lib/site.js'
import PostActions from '../../../components/PostActions.js'


// Server component throughout. No 'use client' on this file or anything it
// renders — most AI crawlers do not execute JavaScript, and the table is the
// whole point of the page. GUARDRAILS R7.1, R7.2.
export const dynamic = 'force-dynamic'

async function getPost(slug) {
  return one(
    `SELECT id, slug, title, type, tool_1, tool_2, website_1, website_2,
            link_1, link_2, summary, content, author, created_at, updated_at
       FROM ${POSTS}
      WHERE slug = $1 AND published = TRUE`,
    [slug],
  )
}

/** Other comparisons, ones sharing a tool first. Internal links are how a small
 *  site gets crawled properly and how a reader finds the next page. */
async function getRelated(post) {
  try {
    return await query(
      `SELECT slug, title, type, tool_1, tool_2, summary
         FROM ${POSTS}
        WHERE published = TRUE AND slug <> $1
        ORDER BY
          (tool_1 IN ($2, $3) OR tool_2 IN ($2, $3)) DESC,
          updated_at DESC
        LIMIT 3`,
      [post.slug, post.tool_1, post.tool_2],
    )
  } catch (err) {
    console.error('related query failed:', err.message)
    return []
  }
}

const KNOWN_IMAGES = new Set([
  '11x-vs-artisan',
  'ai-sdr-vs-sales-copilot',
  'best-ai-sales-agents-2026',
  'hubspot-vs-salesforce',
  'microsoft-365-copilot-vs-salesforce-agentforce',
])

function getPostImage(slug) {
  if (KNOWN_IMAGES.has(slug)) {
    return `/images/${slug}.jpg`
  }
  try {
    if (fs.existsSync(path.join(process.cwd(), 'public', 'images', `${slug}.jpg`))) {
      return `/images/${slug}.jpg`
    }
  } catch {}
  return `/compare/${slug}/opengraph-image`
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug).catch(() => null)
  if (!post) return { title: 'Page not found', robots: { index: false, follow: false } }

  const url = absolute(`/compare/${post.slug}`)
  const description = post.summary || toPlainText(post.content, 200)
  const imageUrl = absolute(getPostImage(post.slug))

  return {
    title: post.title,
    description,
    keywords: [post.tool_1, post.tool_2, `${post.tool_1} vs ${post.tool_2}`, 'pricing', 'comparison'],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      type: 'article',
      siteName: SITE_NAME,
      publishedTime: isoDate(post.created_at),
      modifiedTime: isoDate(post.updated_at),
      authors: post.author ? [post.author] : undefined,
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          type: imageUrl.endsWith('.jpg') ? 'image/jpeg' : 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ComparePage({ params }) {
  const { slug } = await params

  let post
  try {
    post = await getPost(slug)
  } catch (err) {
    console.error('post query failed:', err.message)
    throw err
  }
  if (!post) notFound() // a real 404 status, not a 200 with an apology on it

  const url = absolute(`/compare/${post.slug}`)
  const { html, opensWithHeading, headings, faq } = renderContent(post.content, {
    caption: post.type === 'roundup' ? post.title : `${post.tool_1} compared with ${post.tool_2}`,
    verifiedFallback: post.updated_at,
  })
  const related = await getRelated(post)

  // LEFT JOIN so a post nobody has opened yet still renders zeroes.
  const stats = (await one(
    `SELECT views, upvotes, downvotes FROM ${STATS} WHERE post_id = $1`,
    [post.id],
  ).catch(() => null)) || { views: 0, upvotes: 0, downvotes: 0 }

  const sources = [
    { n: 1, tool: post.tool_1, site: post.website_1, href: post.link_1 },
    { n: 2, tool: post.tool_2, site: post.website_2, href: post.link_2 },
  ].filter((s) => s.href)

  const sections = headings.filter((h) => h.depth === 2)

  // Vendors cited in the body but not carried in link_1 / link_2. A roundup can
  // discuss seven tools while the schema holds only two links; every vendor
  // named gets listed, which is the same treatment for all of them (R1.3).
  const alsoCited = extractLinks(html, [post.link_1, post.link_2])

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary || undefined,
    author: post.author ? { '@type': 'Organization', name: post.author } : undefined,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: absolute('/') },
    datePublished: isoDate(post.created_at),
    dateModified: isoDate(post.updated_at),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    // Naming the entities compared is what lets an answer engine match this page
    // to an "X vs Y" question rather than inferring it from prose.
    about: [
      { name: post.tool_1, site: post.website_1, doc: post.link_1 },
      { name: post.tool_2, site: post.website_2, doc: post.link_2 },
    ].map((t) => ({
      '@type': 'SoftwareApplication',
      name: t.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      ...(t.site ? { url: /^https?:/.test(t.site) ? t.site : `https://${t.site}` } : {}),
      ...(t.doc ? { sameAs: [t.doc] } : {}),
    })),
    inLanguage: 'en',
    isAccessibleForFree: true,
    url,
    // No Review or AggregateRating, ever. GUARDRAILS R6.3.
  }

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
      { '@type': 'ListItem', position: 2, name: post.title, item: url },
    ],
  }

  // The biggest answer-engine win available on this page: the FAQ the post
  // already contains, expressed as data rather than only as prose.
  const faqSchema = faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null

  return (
    <>
      <div className="post-hero">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/">Comparisons</a></li>
              <li aria-current="page">{post.type === 'roundup' ? 'AI Sales Agents 2026' : `${post.tool_1} vs ${post.tool_2}`}</li>
            </ol>
          </nav>

          <h1>{post.title}</h1>

          <div className="post-meta">
            <span className="updated">
              Last updated: <time dateTime={isoDate(post.updated_at)}>{longDate(post.updated_at)}</time>
            </span>
            {post.author ? <span>By {post.author}</span> : null}
            {post.type === 'roundup' ? null : <span>{post.tool_1} vs {post.tool_2}</span>}
            <span>Verified vendor documentation</span>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="post-layout">
          <article className="post post-shell">
            <PostActions slug={post.slug} title={post.title} url={url} variant="share" />

            {post.summary ? (
              <div className="answer">
                <h2 className="answer-heading">The short answer</h2>
                <p className="lead">{post.summary}</p>
              </div>
            ) : null}

            {getPostImage(post.slug).startsWith('/images/') ? (
              <figure className="shot featured-shot">
                <img
                  src={getPostImage(post.slug)}
                  alt={`${post.title} interface breakdown`}
                  loading="eager"
                  decoding="async"
                />
                <figcaption>
                  {post.type === 'roundup'
                    ? `${post.title} — Platform analytics and command matrix`
                    : `${post.tool_1} vs ${post.tool_2} interface and workflow breakdown`}
                </figcaption>
              </figure>
            ) : null}

            {opensWithHeading ? null : (
              <h2 id="how-they-compare">
                How do {post.tool_1} and {post.tool_2} compare?
              </h2>
            )}

            {/* Markdown rendered on the server. Authored by the single admin account. */}
            <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />

            {sources.length ? (
              <section className="sources" aria-labelledby="sources-heading">
                <h2 id="sources-heading">Sources</h2>
                <ol>
                  {sources.map((s) => (
                    <li key={s.n} id={`source-${s.n}`}>
                      <span className="src-label">{s.tool} — </span>
                      <a href={s.href} rel="nofollow noopener" target="_blank">
                        {s.site || s.href}
                      </a>
                    </li>
                  ))}
                </ol>

                {alsoCited.length ? (
                  <>
                    <p className="src-more">Also cited on this page</p>
                    <ul className="src-list">
                      {alsoCited.map((l) => (
                        <li key={l.host}>
                          <a href={l.href} rel="nofollow noopener" target="_blank">{l.host}</a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </section>
            ) : null}
          </article>

          {/* Sticky rail. Fills the column a 70ch measure would otherwise leave
              empty, and keeps the contents list reachable while scrolling. */}
          <aside className="post-aside">
            <div className="aside-card">
              <p className="aside-label">At a glance</p>
              <dl className="aside-facts">
                <div>
                  <dt>Format</dt>
                  <dd>{post.type === 'roundup' ? 'Multi-tool roundup' : 'Head-to-head'}</dd>
                </div>
                <div>
                  <dt>{post.type === 'roundup' ? 'Leading tools' : 'Tools'}</dt>
                  <dd>{post.tool_1} · {post.tool_2}</dd>
                </div>
                <div>
                  <dt>Updated</dt>
                  <dd>
                    <time dateTime={isoDate(post.updated_at)}>{longDate(post.updated_at)}</time>
                  </dd>
                </div>
                <div>
                  <dt>Sourcing</dt>
                  <dd>Vendor documentation</dd>
                </div>
                {post.author ? (
                  <div>
                    <dt>By</dt>
                    <dd>{post.author}</dd>
                  </div>
                ) : null}
              </dl>
            </div>

            {sections.length > 1 ? (
              <nav className="aside-card toc" aria-labelledby="toc-label">
                <p className="aside-label" id="toc-label">On this page</p>
                <ol>
                  {sections.map((h) => (
                    <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>
                  ))}
                </ol>
              </nav>
            ) : null}

            {related.length ? (
              <div className="aside-card">
                <p className="aside-label">Related</p>
                <ul className="aside-related">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <a href={`/compare/${r.slug}`}>{r.title}</a>
                      <span>{r.type === 'roundup' ? 'Multi-tool roundup' : `${r.tool_1} vs ${r.tool_2}`}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="aside-card aside-cta">
              <p className="aside-label">Not the pair you need?</p>
              <p>Tell us which two tools you are choosing between and we will compare them.</p>
              <a className="button" href="/request">Request a comparison</a>
            </div>

          </aside>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
    </>
  )
}
