/**
 * Layered SVG of the actual product — a technical, line-led illustration
 * (reads as "designed", not a decorative blob). `state` tints the status LED.
 */
export default function RobotSVG({ className = '', state = 'clean', showSensor = false, onClick }) {
  const led =
    state === 'rain' ? '#5ec8d8' : state === 'stop' ? '#ef5350' : state === 'park' ? '#f7b733' : '#7fc88a'

  return (
    <svg viewBox="0 0 220 140" className={className} onClick={onClick} role="img" aria-label="Kleanbotics cleaning robot">
      <defs>
        <linearGradient id="deck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f2735" />
          <stop offset="1" stopColor="#11161f" />
        </linearGradient>
      </defs>

      {/* chassis */}
      <rect x="30" y="46" width="160" height="50" rx="8" fill="url(#deck)" stroke="#2b3545" strokeWidth="1.5" />
      {/* top deck */}
      <rect x="44" y="36" width="132" height="20" rx="5" fill="#161c28" stroke="#2b3545" strokeWidth="1.2" />
      <g stroke="#2b3545" strokeWidth="1">
        <line x1="77" y1="36" x2="77" y2="56" />
        <line x1="110" y1="36" x2="110" y2="56" />
        <line x1="143" y1="36" x2="143" y2="56" />
      </g>

      {/* sensor housing */}
      {showSensor && <circle cx="110" cy="71" r="15" fill={led} opacity="0.12" />}
      <circle cx="110" cy="71" r="9" fill="#0c1019" stroke="#3a465a" strokeWidth="1.5" />
      <circle cx="110" cy="71" r="3.4" fill={led} />

      {/* status LEDs */}
      <circle cx="168" cy="59" r="2.6" fill={led} />
      <circle cx="52" cy="59" r="2.6" fill={led} opacity="0.55" />

      {/* brush roller */}
      <rect x="34" y="92" width="152" height="8" rx="4" fill="#0c1019" stroke="#2b3545" strokeWidth="1" />
      <g stroke="#f7b733" strokeWidth="1.6" strokeLinecap="round" opacity="0.9">
        <line x1="48" y1="100" x2="48" y2="110" />
        <line x1="68" y1="100" x2="68" y2="112" />
        <line x1="88" y1="100" x2="88" y2="110" />
        <line x1="108" y1="100" x2="108" y2="112" />
        <line x1="128" y1="100" x2="128" y2="110" />
        <line x1="148" y1="100" x2="148" y2="112" />
        <line x1="168" y1="100" x2="168" y2="110" />
      </g>

      {/* wheels */}
      <circle cx="62" cy="110" r="11" fill="#0c1019" stroke="#3a465a" strokeWidth="1.5" />
      <circle cx="158" cy="110" r="11" fill="#0c1019" stroke="#3a465a" strokeWidth="1.5" />
      <circle cx="62" cy="110" r="3.4" fill="#3a465a" />
      <circle cx="158" cy="110" r="3.4" fill="#3a465a" />
    </svg>
  )
}
