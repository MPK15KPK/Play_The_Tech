import { HomeIcon, BriefcaseIcon, LightningIcon, ArrowRightIcon } from '../components/Icons.js'

export const metadata = {
  title: 'Page Not Found (404)',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="shell notfound-shell">
      <div className="notfound-card">
        <div className="notfound-badge">
          <span className="notfound-dot" />
          Error 404 · Page Not Found
        </div>

        <h1 className="notfound-title">We couldn&rsquo;t find that page</h1>
        <p className="notfound-lead">
          The benchmark, comparison, or tool profile you requested might have been moved,
          archived, or never published under this URL.
        </p>

        <div className="notfound-actions">
          <a className="button" href="/">
            <HomeIcon size={16} />
            <span>Return to Home</span>
          </a>
          <a className="button secondary" href="/industry">
            <BriefcaseIcon size={16} />
            <span>Industry Directories</span>
          </a>
          <a className="button secondary" href="/request">
            <LightningIcon size={16} />
            <span>Request Comparison</span>
          </a>
        </div>

        <div className="notfound-directory">
          <p className="notfound-dir-title">Popular Benchmarks &amp; Directories</p>
          <div className="notfound-grid">
            <a href="/compare/best-ai-sales-agents-2026" className="notfound-link">
              <strong>Best AI Sales Agents 2026</strong>
              <span>7 platform architectural breakdown</span>
            </a>
            <a href="/industry/manufacturing-distribution" className="notfound-link">
              <strong>Manufacturing &amp; Distribution</strong>
              <span>ERP &amp; configure-price-quote tools</span>
            </a>
            <a href="/industry/b2b-saas" className="notfound-link">
              <strong>B2B SaaS &amp; Tech Startups</strong>
              <span>Autonomous SDR &amp; pipeline copilots</span>
            </a>
            <a href="/industry/professional-services" className="notfound-link">
              <strong>Professional Services</strong>
              <span>RFP indexing &amp; deal execution</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
