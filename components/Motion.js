'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Site-wide smooth navigation helper without forced layout shifts or hiding content.
 */
export default function Motion() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('motion-on')
  }, [pathname])

  return null
}
