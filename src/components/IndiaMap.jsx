import { FLEET_SITES } from '../lib/data.js'
import { useApp } from '../lib/store.jsx'

// Stylized (not geographically exact) India silhouette for the fleet map.
const INDIA_PATH =
  'M40 8 L52 10 L58 6 L62 12 L58 18 L66 20 L74 16 L78 22 L72 30 L80 34 L76 42 L84 46 L78 52 L82 60 ' +
  'L74 64 L70 60 L64 66 L68 74 L60 78 L58 88 L52 100 L48 112 L44 100 L46 88 L40 82 L34 76 L30 66 ' +
  'L22 62 L18 54 L22 48 L18 40 L24 34 L20 26 L28 22 L26 14 L34 14 Z'

export default function IndiaMap({ activeSite, onSelect }) {
  const { reducedMotion } = useApp()
  return (
    <svg viewBox="0 0 100 120" className="h-full w-full" role="img" aria-label="Map of India with Kleanbotics robot sites">
      <path d={INDIA_PATH} fill="#0f1420" stroke="#2b3545" strokeWidth="0.6" />

      {FLEET_SITES.map((s) => {
        const active = activeSite === s.id
        return (
          <g key={s.id} transform={`translate(${s.x} ${s.y})`} onClick={() => onSelect(s.id)} className="cursor-pointer" role="button" aria-label={`${s.name}: ${s.robots} robots`}>
            {!reducedMotion && (
              <circle r="2.8" fill="#f7b733" opacity="0.18">
                <animate attributeName="r" values="2.2;4;2.2" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2.6s" repeatCount="indefinite" />
              </circle>
            )}
            <circle r="1.6" fill={active ? '#f7b733' : '#5ec8d8'} stroke="#080b12" strokeWidth="0.4" />
            <text x="2.8" y="1" fontSize="2.6" fill={active ? '#ffd166' : '#8792a3'} fontFamily="JetBrains Mono, monospace">{s.id}</text>
          </g>
        )
      })}
    </svg>
  )
}
