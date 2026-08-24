/**
 * Server-rendered charts. No charting library, no client JavaScript — the admin
 * is behind auth and does not need a 100KB dependency to draw fourteen bars.
 *
 * Both take `day` as a plain 'YYYY-MM-DD' string. The SQL casts it with to_char
 * for exactly that reason: pg parses a `date` column into a Date at *local*
 * midnight, so reading it back out in UTC shifts the whole series a day west.
 */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Splits the string rather than parsing it, so no timezone gets a vote. */
function parts(day) {
  const [y, m, d] = String(day).slice(0, 10).split('-').map(Number)
  return { day: d, label: `${d} ${MONTHS[m - 1]}`, full: `${d} ${MONTHS[m - 1]} ${y}` }
}

/**
 * An axis top that leaves the midpoint a whole number, so the scale never reads
 * "3.5 views". Two significant figures is as precise as a 14-bar chart needs.
 */
function niceMax(peak) {
  if (peak <= 0) return 4
  const unit = 2 * Math.max(1, 10 ** Math.floor(Math.log10(peak) - 1))
  return Math.ceil(peak / unit) * unit
}

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`

/** The 14-bar row sparkline. Thin marks, one series, no chrome. */
export function Sparkline({ series, width = 96, height = 24, label }) {
  const values = series.map((d) => Number(d.views) || 0)
  const max = Math.max(1, ...values)
  const gap = 2
  const barW = Math.max(1, (width - gap * (values.length - 1)) / values.length)

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={label}
      className="spark"
    >
      {values.map((v, i) => {
        // A measured zero is drawn as a stub on the baseline. Absence of a bar
        // would read as missing data, which is a different claim.
        const h = v === 0 ? 2 : Math.max(3, (v / max) * (height - 2))
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={height - h}
            width={barW}
            height={h}
            rx="2"
            fill={v === 0 ? 'var(--rule-2)' : 'var(--mark)'}
          />
        )
      })}
    </svg>
  )
}

/**
 * The site-wide chart. Uniques nest inside the total because every unique is
 * also a view — a part of a whole, not a second series racing the first.
 */
export function DayChart({ series, height = 130 }) {
  if (!series.length) return null

  const rows = series.map((d) => ({
    key: String(d.day).slice(0, 10),
    views: Number(d.views) || 0,
    uniques: Number(d.uniques) || 0,
    ...parts(d.day),
  }))

  const max = niceMax(Math.max(...rows.map((r) => r.views)))
  const ticks = [max, max / 2, 0]
  const quiet = rows.every((r) => r.views === 0)

  return (
    <figure className="daychart">
      <div className="daychart-frame" style={{ '--plot-h': `${height}px` }}>
        <div className="daychart-scale" aria-hidden="true">
          {ticks.map((t) => (
            <span key={t} className="daychart-tick">{t}</span>
          ))}
        </div>

        <div className="daychart-area">
          <div className="daychart-plot">
            {ticks.filter((t) => t > 0).map((t) => (
              <span
                key={t}
                className="daychart-rule"
                style={{ bottom: `${(t / max) * 100}%` }}
                aria-hidden="true"
              />
            ))}
            <div className="daychart-bars">
              {rows.map((r) => (
                <div
                  key={r.key}
                  className={`daychart-col${r.views ? '' : ' is-zero'}`}
                  tabIndex={0}
                  aria-label={`${r.full}: ${plural(r.views, 'view')}, ${plural(r.uniques, 'unique browser')}`}
                >
                  <span
                    className="daychart-total"
                    style={{ height: r.views ? `${(r.views / max) * 100}%` : '2px' }}
                  >
                    <span className="daychart-tip" aria-hidden="true">
                      <strong>{r.label}</strong>
                      {r.views} views · {r.uniques} unique
                    </span>
                    {r.views ? <span className="daychart-value">{r.views}</span> : null}
                    {r.uniques ? (
                      <span
                        className="daychart-unique"
                        style={{ height: `${(r.uniques / r.views) * 100}%` }}
                      />
                    ) : null}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="daychart-days" aria-hidden="true">
            {rows.map((r) => (
              <span key={r.key}>{r.day}</span>
            ))}
          </div>
        </div>
      </div>

      <figcaption className="daychart-key">
        <span className="key-item"><span className="key-swatch key-total" />total views</span>
        <span className="key-item"><span className="key-swatch key-unique" />unique browsers</span>
        {quiet ? <span className="key-quiet">Nothing recorded in this window yet.</span> : null}
      </figcaption>
    </figure>
  )
}
