/**
 * The playthetech brand mark: A modern geometric tech emblem
 * combining the forward play vector with a benchmark tech pillar.
 */

export function LogoMark({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-mark"
      aria-hidden="true"
      focusable="false"
    >
      {/* Obsidian geometric ground */}
      <rect width="100" height="100" rx="22" fill="#0F172A" />

      {/* Tech Benchmark Pillar (P stem / comparison indicator) */}
      <rect x="22" y="24" width="12" height="52" rx="6" fill="#3B82F6" />

      {/* Forward Play / Tech Vector */}
      <path
        d="M40 25.5C40 23.1 42.7 21.6 44.7 22.8L80.7 47.3C82.5 48.5 82.5 51.5 80.7 52.7L44.7 77.2C42.7 78.4 40 76.9 40 74.5V25.5Z"
        fill="url(#play-tech-grad)"
      />

      {/* Inner Precision Core */}
      <path
        d="M48 37L68 50L48 63V37Z"
        fill="#FFFFFF"
      />

      <defs>
        <linearGradient id="play-tech-grad" x1="40" y1="22" x2="82" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Logo({ size = 32 }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo-word">
        <span className="logo-play">play</span>
        <span className="logo-rest">thetech</span>
        <span className="logo-dot">.</span>
      </span>
    </span>
  )
}
