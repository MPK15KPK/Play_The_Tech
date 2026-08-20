/* Platform marks, drawn inline. No icon-font, no third-party script, and
   nothing loaded from another origin — the CSP blocks that anyway. */

const box = { width: 16, height: 16, viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' }

export function LinkedInIcon() {
  return (
    <svg {...box} fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

export function XIcon() {
  return (
    <svg {...box} fill="currentColor">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.15h7.6l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z" />
    </svg>
  )
}

export function WhatsAppIcon() {
  return (
    <svg {...box} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.9 6.99c0 5.45-4.44 9.88-9.9 9.88M20.52 3.45A11.82 11.82 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.09.55 4.14 1.59 5.94L.07 24l6.33-1.66a11.87 11.87 0 0 0 5.65 1.44h.01c6.55 0 11.88-5.33 11.88-11.88a11.8 11.8 0 0 0-3.42-8.45" />
    </svg>
  )
}

export function RedditIcon() {
  return (
    <svg {...box} fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 6.63 5.37 12 12 12s12-5.37 12-12c0-6.63-5.37-12-12-12m6.07 12.86a1.9 1.9 0 0 1 .03.35c0 2.42-2.82 4.38-6.3 4.38s-6.3-1.96-6.3-4.38c0-.12.01-.24.03-.35a1.72 1.72 0 1 1 1.9-2.82 8.42 8.42 0 0 1 4.6-1.45l.87-4.1a.3.3 0 0 1 .36-.23l2.88.61a1.24 1.24 0 1 1-.14.6l-2.57-.55-.78 3.67a8.4 8.4 0 0 1 4.53 1.45 1.72 1.72 0 1 1 1.9 2.82M8.67 12.9a1.24 1.24 0 1 0 0-2.48 1.24 1.24 0 0 0 0 2.48m6.66 0a1.24 1.24 0 1 0 0-2.48 1.24 1.24 0 0 0 0 2.48m-.35 2.32a.32.32 0 0 0-.45 0 3.6 3.6 0 0 1-2.53.79 3.6 3.6 0 0 1-2.53-.8.32.32 0 1 0-.45.46 4.2 4.2 0 0 0 2.98.98 4.2 4.2 0 0 0 2.98-.98.32.32 0 0 0 0-.45" />
    </svg>
  )
}

export function EmailIcon() {
  return (
    <svg {...box} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  )
}

export function LinkIcon() {
  return (
    <svg {...box} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7L12 19" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg {...box} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m20 6-11 11-5-5" />
    </svg>
  )
}
