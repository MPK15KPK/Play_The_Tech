'use client'

import dynamic from 'next/dynamic'

// Lazy-load the full MobileNav so its 50 KiB chunk (icons, drawer, scroll-lock)
// is deferred until after hydration. The hamburger button is invisible on desktop
// (CSS `display:none` on `.hdr-mobile`) so no visual impact on initial paint.
const MobileNav = dynamic(() => import('./MobileNav.js'), { ssr: false })

export default function MobileNavLazy() {
  return <MobileNav />
}
