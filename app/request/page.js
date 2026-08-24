import RequestForm from './RequestForm.js'
import { SITE_NAME, absolute } from '../../lib/site.js'

// A utility page, not content. Kept out of the index and the sitemap.
export const metadata = {
  title: 'Request a Custom Comparison — playthetech',
  description: 'Tell us the two AI sales platforms or CRMs you are evaluating. We will build a verified benchmark based on primary vendor data.',
  robots: { index: false, follow: true },
  alternates: { canonical: absolute('/request') },
  openGraph: {
    title: 'Request a Custom Comparison — playthetech',
    description: 'Tell us the two AI sales platforms or CRMs you are evaluating. We will build a verified benchmark based on primary vendor data.',
    url: absolute('/request'),
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [
      {
        url: absolute('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: 'Request a Custom Comparison — playthetech',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Custom Comparison — playthetech',
    description: 'Tell us the two AI sales platforms or CRMs you are evaluating.',
    images: [absolute('/opengraph-image')],
  },
}

export default function RequestPage() {
  return (
    <div className="shell">
      <div className="request-layout">
        <div className="form-page request-card">
          <div className="request-card-head">
            <span className="eyebrow">Direct Editorial Pipeline</span>
            <h1>Request a Custom Comparison</h1>
            <p className="lead">
              Name the two tools you are choosing between. Telling us your industry, tech stack, and primary constraints produces a far more actionable benchmark than tool names alone.
            </p>
          </div>
          <RequestForm />
        </div>

        <aside className="request-aside">
          <div className="aside-card">
            <p className="aside-label">What happens next</p>
            <ol className="steps">
              <li>
                <strong>Evaluated Weekly.</strong> Requests are audited and prioritized by how frequently specific vendor pairs are submitted.
              </li>
              <li>
                <strong>100% Primary Sourced.</strong> Prices, API constraints, and limits are cross-checked against official vendor documentation.
              </li>
              <li>
                <strong>Verified Publication Date.</strong> Every published matrix displays the exact audit date so you know the pricing is current.
              </li>
              <li>
                <strong>Direct Notification.</strong> If you provide an email, we send a direct link once the benchmark is live. Zero marketing emails.
              </li>
            </ol>
          </div>

          <div className="aside-card">
            <p className="aside-label">Editorial Independence Guarantee</p>
            <p className="aside-plain">
              We accept no payment for coverage, placement, or rankings. Vendors cannot sponsor comparisons, review articles before publication, or pay to modify benchmark verdicts.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
