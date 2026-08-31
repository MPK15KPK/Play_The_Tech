import Logo from './Logo.js'
import MobileNavLazy from './MobileNavLazy.js'
import { INDUSTRIES, COMPARISONS } from './nav-data.js'

export default function Header() {
  return (
    <header className="site-header">
      {/* ==================================================== desktop chrome */}
      <div className="hdr-desktop">
        <div className="shell hdr-desktop-bar">
          <div className="masthead">
            <a className="wordmark" href="/" aria-label="playthetech, home">
              <Logo />
            </a>
            <p className="masthead-note">
              Independent B2B software &amp; AI sales comparisons, benchmarked by industry and verified against vendor documentation.
            </p>
          </div>

          <nav className="site-nav" aria-label="Main">
            <a href="/">Comparisons</a>
            <a href="/industry">Industries</a>
            <a href="/faq">AI Answers</a>
            <a href="/compare/best-ai-sales-agents-2026">Rankings</a>
            <a className="cta" href="/request">Request comparison</a>
          </nav>
        </div>

        {/* Industry subbar for public editorial pages */}
        <div className="hdr-subbar">
          <div className="shell hdr-subbar-inner">
            <span className="hdr-subbar-label">Industry Guides</span>
            <div className="hdr-subbar-links">
              {INDUSTRIES.map((ind) => (
                <a key={ind.href} href={ind.href}>
                  {ind.name}
                </a>
              ))}
              <span className="hdr-subbar-div" aria-hidden="true" />
              {COMPARISONS.slice(1).map((c) => (
                <a key={c.href} href={c.href}>
                  {c.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================== mobile chrome */}
      <div className="hdr-mobile">
        <div className="shell hdr-mobile-bar">
          <a className="hdr-mobile-brand" href="/" aria-label="playthetech, home">
            <Logo size={26} />
          </a>

          <MobileNavLazy />
        </div>
      </div>
    </header>
  )
}
