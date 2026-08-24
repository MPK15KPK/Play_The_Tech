'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Logo from './Logo.js'
import { ICON_BY_KEY, CloseIcon } from './Icons.js'
import { INDUSTRIES, BROWSE, COMPARISONS } from './nav-data.js'

/* The drawer stays mounted 240ms after close so the slide-out can finish. */
const EXIT_MS = 240

function DrawerLink({ item, index, onNavigate, active }) {
  const Icon = ICON_BY_KEY[item.icon] || ICON_BY_KEY.layers
  return (
    <a
      href={item.href}
      className={`m-nav-item${active ? ' is-active' : ''}`}
      style={{ '--i': index }}
      onClick={onNavigate}
    >
      <span className={`m-nav-icon ic-${item.icon}`}>
        <Icon size={17} />
      </span>
      <span className="m-nav-text">
        <span className="m-nav-name">{item.name}</span>
        {item.note ? <span className="m-nav-note">{item.note}</span> : null}
      </span>
      <svg className="m-nav-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </a>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)   // drawer is in the DOM
  const [open, setOpen] = useState(false)         // drawer is animated in

  const openDrawer = useCallback(() => {
    setMounted(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
  }, [])

  const closeDrawer = useCallback(() => {
    setOpen(false)
    setTimeout(() => setMounted(false), EXIT_MS)
  }, [])

  /* Lock body scroll cleanly while drawer is open without freezing touch gestures */
  useEffect(() => {
    if (!mounted) return undefined
    const prevBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') closeDrawer()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevBodyOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [mounted, closeDrawer])

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  const isAdmin = pathname?.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'

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
              {isAdmin
                ? 'Editorial & Benchmarking Management Portal'
                : 'Independent B2B software & AI sales comparisons, benchmarked by industry and verified against vendor documentation.'}
            </p>
          </div>

          <nav className="site-nav" aria-label="Main">
            {isLoginPage ? (
              <a href="/" className="subtle-link">← Back to playthetech</a>
            ) : isAdmin ? (
              <>
                <a href="/admin" className={isActive('/admin') ? 'is-active' : ''}>Dashboard</a>
                <a href="/admin/new" className={isActive('/admin/new') ? 'is-active' : ''}>New Comparison</a>
                <a href="/admin/settings" className={isActive('/admin/settings') ? 'is-active' : ''}>Settings</a>
                <a href="/" target="_blank" rel="noreferrer">Live Site ↗</a>
              </>
            ) : (
              <>
                <a href="/" className={isActive('/') ? 'is-active' : ''}>Comparisons</a>
                <a href="/industry" className={isActive('/industry') ? 'is-active' : ''}>Industries</a>
                <a
                  href="/compare/best-ai-sales-agents-2026"
                  className={isActive('/compare/best-ai-sales-agents-2026') ? 'is-active' : ''}
                >
                  Rankings
                </a>
                <a className="cta" href="/request">Request comparison</a>
              </>
            )}
          </nav>
        </div>

        {/* Industry subbar is ONLY for public editorial pages, NEVER on admin or login */}
        {!isAdmin && (
          <div className="hdr-subbar">
            <div className="shell hdr-subbar-inner">
              <span className="hdr-subbar-label">Industry Guides</span>
              <div className="hdr-subbar-links">
                {INDUSTRIES.map((ind) => (
                  <a key={ind.href} href={ind.href} className={isActive(ind.href) ? 'is-active' : ''}>
                    {ind.name}
                  </a>
                ))}
                <span className="hdr-subbar-div" aria-hidden="true" />
                {COMPARISONS.slice(1).map((c) => (
                  <a key={c.href} href={c.href} className={isActive(c.href) ? 'is-active' : ''}>
                    {c.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================== mobile chrome */}
      {/* One compact bar. Every destination lives behind Menu, so nothing is
          stacked under the header competing with the page heading. */}
      <div className="hdr-mobile">
        <div className="shell hdr-mobile-bar">
          <a className="hdr-mobile-brand" href="/" aria-label="playthetech, home">
            <Logo size={26} />
          </a>

          <button
            type="button"
            className={`hdr-burger${mounted ? ' is-open' : ''}`}
            onClick={() => (mounted ? closeDrawer() : openDrawer())}
            aria-label={mounted ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mounted}
            aria-controls="mobile-drawer"
          >
            <span className="hdr-burger-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="hdr-burger-text">{mounted ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* ================================================== the mobile drawer */}
      {mounted ? (
        <div
          className={`m-drawer-scrim${open ? ' is-open' : ''}`}
          onClick={closeDrawer}
          role="presentation"
        >
          <div
            id="mobile-drawer"
            className={`m-drawer${open ? ' is-open' : ''}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="m-drawer-head">
              <Logo size={26} />
              <button
                type="button"
                className="m-drawer-close"
                onClick={closeDrawer}
                aria-label="Close navigation menu"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: '18px', height: '18px', display: 'block', stroke: '#0F172A' }}
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" stroke="#0F172A" strokeWidth="2.5" />
                  <line x1="6" y1="6" x2="18" y2="18" stroke="#0F172A" strokeWidth="2.5" />
                </svg>
              </button>
            </div>

            <nav className="m-drawer-body" aria-label="Mobile">
              {isAdmin ? (
                <section className="m-nav-group">
                  <p className="m-nav-heading">Editor Management</p>
                  <DrawerLink
                    item={{ href: '/admin', name: 'Dashboard', note: 'Traffic & posts manager', icon: 'analytics' }}
                    index={0}
                    active={isActive('/admin')}
                    onNavigate={closeDrawer}
                  />
                  <DrawerLink
                    item={{ href: '/admin/new', name: 'New Comparison', note: 'Create or edit benchmark', icon: 'versus' }}
                    index={1}
                    active={isActive('/admin/new')}
                    onNavigate={closeDrawer}
                  />
                  <DrawerLink
                    item={{ href: '/admin/settings', name: 'Sign-in Settings', note: 'Credentials & security', icon: 'services' }}
                    index={2}
                    active={isActive('/admin/settings')}
                    onNavigate={closeDrawer}
                  />
                  <DrawerLink
                    item={{ href: '/', name: 'View Live Site ↗', note: 'Open public website', icon: 'home' }}
                    index={3}
                    active={false}
                    onNavigate={closeDrawer}
                  />
                  <DrawerLink
                    item={{ href: '/api/logout', name: 'Sign Out', note: 'End editor session', icon: 'target' }}
                    index={4}
                    active={false}
                    onNavigate={closeDrawer}
                  />
                </section>
              ) : (
                <>
                  <section className="m-nav-group">
                    <p className="m-nav-heading">Browse</p>
                    {BROWSE.map((item, i) => (
                      <DrawerLink
                        key={item.href + item.name}
                        item={item}
                        index={i}
                        active={isActive(item.href)}
                        onNavigate={closeDrawer}
                      />
                    ))}
                  </section>

                  <section className="m-nav-group">
                    <p className="m-nav-heading">Industry benchmark guides</p>
                    {INDUSTRIES.map((ind, i) => (
                      <DrawerLink
                        key={ind.href}
                        item={{ ...ind, note: `Top pick: ${ind.pick}` }}
                        index={i + BROWSE.length}
                        active={isActive(ind.href)}
                        onNavigate={closeDrawer}
                      />
                    ))}
                  </section>

                  <section className="m-nav-group">
                    <p className="m-nav-heading">Head-to-head &amp; rankings</p>
                    {COMPARISONS.map((c, i) => (
                      <DrawerLink
                        key={c.href}
                        item={c}
                        index={i + BROWSE.length + INDUSTRIES.length}
                        active={isActive(c.href)}
                        onNavigate={closeDrawer}
                      />
                    ))}
                  </section>
                </>
              )}
            </nav>

            <div className="m-drawer-foot">
              {isAdmin ? (
                <a className="m-drawer-cta" href="/admin/new" onClick={closeDrawer}>
                  + New Comparison Post
                </a>
              ) : (
                <a className="m-drawer-cta" href="/request" onClick={closeDrawer}>
                  Request a custom comparison
                </a>
              )}
              <p className="m-drawer-fine">
                {isAdmin ? 'playthetech Editorial Management' : 'Independent. No sponsored rankings.'}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
