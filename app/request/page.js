import RequestForm from './RequestForm.js'

// A utility page, not content. Kept out of the index and the sitemap.
export const metadata = {
  title: 'Request a comparison',
  description: 'Ask for two specific tools to be compared.',
  robots: { index: false, follow: true },
}

export default function RequestPage() {
  return (
    <div className="shell">
      <div className="request-layout">
        <div className="form-page">
          <h1>Request a comparison</h1>
          <p>
            Name the two tools you are choosing between. Telling us the industry and
            what the decision hinges on is what makes the answer useful — &ldquo;we quote
            from site visits and need it to work offline&rdquo; produces a far better
            comparison than the tool names alone.
          </p>
          <RequestForm />
        </div>

        <aside className="request-aside">
          <div className="aside-card">
            <p className="aside-label">What happens next</p>
            <ol className="steps">
              <li>
                <strong>Read weekly.</strong> Requests are worked into the schedule by
                how often the same pair comes up.
              </li>
              <li>
                <strong>Researched from source.</strong> Prices and limits are taken
                from each vendor&rsquo;s own pricing page or documentation, never from
                another comparison site.
              </li>
              <li>
                <strong>Published with a date.</strong> The table carries the day we
                checked every figure, so you can tell whether it has gone stale.
              </li>
              <li>
                <strong>You hear back.</strong> If you leave an email address, we tell
                you when it is live. It is used for nothing else.
              </li>
            </ol>
          </div>

          <div className="aside-card">
            <p className="aside-label">What we will not do</p>
            <p className="aside-plain">
              We take no payment for coverage or ranking position, run no ads, and carry
              no affiliate links. Vendors do not see a comparison before it is published
              and cannot ask for one to be changed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
