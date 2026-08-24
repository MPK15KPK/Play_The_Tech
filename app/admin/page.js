import { query, POSTS, REQUESTS, STATS, VIEWS } from '../../lib/db.js'
import { shortDate } from '../../lib/format.js'
import { REQUEST_STATUSES } from '../../lib/validate.js'
import StatusControl from './StatusControl.js'
import PostControls from '../../components/PostControls.js'
import { Sparkline, DayChart } from '../../components/Sparkline.js'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admin', robots: { index: false, follow: false, nocache: true } }

export default async function AdminPage({ searchParams }) {
  const sp = await searchParams
  const filter = REQUEST_STATUSES.includes(sp?.status) ? sp.status : 'new'
  const showAll = sp?.status === 'all'

  const [posts, requests, daily, perPost] = await Promise.all([
    query(`SELECT p.id, p.slug, p.title, p.tool_1, p.tool_2, p.published, p.updated_at,
                  COALESCE(s.views, 0) AS views,
                  COALESCE(s.upvotes, 0) AS upvotes,
                  COALESCE(s.downvotes, 0) AS downvotes
             FROM ${POSTS} p
             LEFT JOIN ${STATS} s ON s.post_id = p.id
            ORDER BY p.updated_at DESC`),
    showAll
      ? query(`SELECT id, tool_1, tool_2, industry, note, email, status, created_at
                 FROM ${REQUESTS} ORDER BY created_at DESC LIMIT 200`)
      : query(`SELECT id, tool_1, tool_2, industry, note, email, status, created_at
                 FROM ${REQUESTS} WHERE status = $1 ORDER BY created_at DESC LIMIT 200`, [filter]),

    // Site-wide daily series, last 14 days, zero-filled so gaps show as gaps.
    // The day comes back as text: pg parses a `date` column into a Date at
    // *local* midnight, which lands on the previous day once read back in UTC.
    query(`SELECT to_char(d, 'YYYY-MM-DD') AS day,
                  COALESCE(SUM(v.views), 0)::int   AS views,
                  COALESCE(SUM(v.uniques), 0)::int AS uniques
             FROM generate_series(CURRENT_DATE - 13, CURRENT_DATE, '1 day') d
             LEFT JOIN ${VIEWS} v ON v.day = d::date
            GROUP BY d ORDER BY d`),

    // Per-post, last 14 days, for the row sparklines.
    query(`SELECT post_id, to_char(day, 'YYYY-MM-DD') AS day,
                  SUM(views)::int AS views, SUM(uniques)::int AS uniques
             FROM ${VIEWS} WHERE day >= CURRENT_DATE - 13
            GROUP BY post_id, day ORDER BY day`),
  ])

  // Bucket the per-post rows into a 14-slot series each.
  const days = daily.map((d) => d.day)
  const byPost = new Map()
  for (const r of perPost) {
    if (!byPost.has(r.post_id)) byPost.set(r.post_id, new Map())
    byPost.get(r.post_id).set(r.day, r)
  }
  const seriesFor = (id) =>
    days.map((d) => ({ day: d, views: byPost.get(id)?.get(d)?.views || 0 }))

  const totalViews = daily.reduce((n, d) => n + Number(d.views), 0)
  const totalUniques = daily.reduce((n, d) => n + Number(d.uniques), 0)

  const live = posts.filter((p) => p.published).length

  return (
    <div className="shell admin-shell">
      <div className="admin-bar">
        <div className="admin-bar-head">
          <strong>Admin Dashboard</strong>
          <span className="admin-count">{live} published / {posts.length} total</span>
        </div>
        <span className="spacer" />
        <div className="admin-bar-actions">
          <a className="button" href="/admin/new">+ New Comparison</a>
          <a className="button secondary" href="/admin/settings">Settings</a>
          <a className="button secondary" href="/api/logout">Sign out</a>
        </div>
      </div>

      <section className="admin-section">
        <h2>Traffic — last 14 days</h2>
        <div className="traffic-panel">
          <div className="traffic-head">
            <div className="traffic-stat">
              <span className="traffic-n">{totalViews.toLocaleString('en-GB')}</span>
              <span className="traffic-label">views</span>
            </div>
            <div className="traffic-stat">
              <span className="traffic-n">{totalUniques.toLocaleString('en-GB')}</span>
              <span className="traffic-label">unique browsers</span>
            </div>
            <p className="traffic-note">
              Counted in the browser, so crawlers and bots are excluded. A unique is one
              browser opening one post once a day — clearing storage reads as new.
            </p>
          </div>
          <DayChart series={daily} />
        </div>
      </section>

      <section className="admin-section">
        <h2>Posts</h2>
        {posts.length === 0 ? (
          <p className="empty">
            Nothing written yet. <a href="/admin/new">Start the first comparison</a>.
          </p>
        ) : (
          <div className="table-wrap">
            <table className="list posts-list">
              <caption className="vh">All comparison posts, newest edit first</caption>
              <thead>
                <tr>
                  <th scope="col">Comparison</th>
                  <th scope="col">Views · 14 days</th>
                  <th scope="col">Useful?</th>
                  <th scope="col">Manage</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id}>
                    {/* Title, pair, state and date are one identity — one cell,
                        not four columns to scan across. */}
                    <th scope="row" className="wrap">
                      <span className="post-cell">
                        <span className="post-title">{p.title}</span>
                        <span className="post-meta">
                          <span className={`badge ${p.published ? 'live' : 'draft'}`}>
                            {p.published ? 'published' : 'draft'}
                          </span>
                          <span className="post-pair-chip">{p.tool_1} vs {p.tool_2}</span>
                          <span className="post-date-chip">Updated {shortDate(p.updated_at)}</span>
                          {p.published ? (
                            <a className="view-link" href={`/compare/${p.slug}`}>View ↗</a>
                          ) : null}
                        </span>
                      </span>
                    </th>
                    <td>
                      <span className="views-cell">
                        <span className="views-left">
                          <span className="views-n">{Number(p.views).toLocaleString('en-GB')}</span>
                          <span className="votes-inline">
                            {Number(p.upvotes) || Number(p.downvotes)
                              ? `${p.upvotes} helpful / ${p.downvotes} unhelpful`
                              : 'no feedback yet'}
                          </span>
                        </span>
                        <Sparkline
                          series={seriesFor(p.id)}
                          label={`Daily views for ${p.title} over the last 14 days`}
                        />
                      </span>
                    </td>
                    <td className="votes-col">
                      {Number(p.upvotes) || Number(p.downvotes)
                        ? <span className="votes">{p.upvotes} yes / {p.downvotes} no</span>
                        : <span className="np">no votes</span>}
                    </td>
                    <td>
                      <PostControls
                        id={p.id}
                        slug={p.slug}
                        title={p.title}
                        published={p.published}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-section">
        <h2>Requests</h2>
        <div className="filter-row">
          {['new', ...REQUEST_STATUSES.filter((s) => s !== 'new')].map((s) => (
            <a key={s} href={`/admin?status=${s}`} aria-current={!showAll && filter === s ? 'page' : undefined}>
              {s}
            </a>
          ))}
          <a href="/admin?status=all" aria-current={showAll ? 'page' : undefined}>all</a>
        </div>

        {requests.length === 0 ? (
          <p className="empty">
            {showAll ? 'No requests have come in yet.' : `Nothing with status "${filter}".`}
          </p>
        ) : (
          <div className="table-wrap">
            <table className="list requests-list">
              <caption className="vh">Comparison requests from readers, newest first</caption>
              <thead>
                <tr>
                  <th scope="col">Request</th>
                  <th scope="col">Note</th>
                  <th scope="col">From</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id}>
                    <th scope="row" className="wrap">
                      <span className="post-cell">
                        <span className="post-title">{r.tool_1} vs {r.tool_2}</span>
                        <span className="post-meta">
                          <span>{r.industry || 'Industry not given'}</span>
                          <span className="sep" aria-hidden="true">·</span>
                          <span>{shortDate(r.created_at)}</span>
                        </span>
                      </span>
                    </th>
                    <td className="wrap">{r.note || <span className="np">not given</span>}</td>
                    <td className="wrap">
                      {r.email
                        ? <a href={`mailto:${r.email}`}>{r.email}</a>
                        : <span className="np">no email</span>}
                    </td>
                    <td><StatusControl id={r.id} status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
