import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { SectionHeading, Reveal } from '../components/ui.jsx'
import { useCountUp } from '../lib/hooks.js'
import { MARKET_GROWTH } from '../lib/data.js'
import { useApp } from '../lib/store.jsx'

const TILES = [
  { target: 75, suffix: ' GW', label: 'Solar installed in India' },
  { target: 280, suffix: ' GW', label: 'National target by 2030' },
  { target: 75021, prefix: '₹', suffix: ' cr', label: 'PM Surya Ghar scheme' },
  { target: 1, suffix: ' crore', label: 'Rooftop households targeted' },
  { target: 30, suffix: ' GW', label: 'New rooftop capacity' },
]

export default function Market() {
  const { reducedMotion } = useApp()
  return (
    <section id="market" className="section-pad border-t border-white/[0.07]">
      <div className="container-max">
        <SectionHeading
          eyebrow="Market opportunity"
          title="A market compounding at 24.9% CAGR"
          subtitle="India's solar-panel-cleaning market is set to grow from USD 145M (2024) to ~USD 1.67B by 2035."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="surface rounded-panel p-6">
              <div className="mb-3 flex items-baseline justify-between">
                <p className="label">Market size (USD M)</p>
                <p className="font-mono text-caption text-accent-400">2024 → 2035</p>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MARKET_GROWTH} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                    <defs>
                      <linearGradient id="mkt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f7b733" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#f7b733" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke="#1f2735" vertical={false} />
                    <XAxis dataKey="year" stroke="#616b7d" fontSize={11} tickLine={false} />
                    <YAxis stroke="#616b7d" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: '#0c1019', border: '1px solid #1f2735', borderRadius: 8, fontSize: 12 }} formatter={(v) => [`USD ${v}M`, 'Market']} />
                    <Area type="monotone" dataKey="value" stroke="#f7b733" strokeWidth={2.5} fill="url(#mkt)" isAnimationActive={!reducedMotion} animationDuration={1600} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="caption mt-3 font-mono">Source: DataNext Research, India Solar Panel Cleaning Market.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-px overflow-hidden self-start rounded-panel border border-white/[0.07] bg-white/[0.07]">
            {TILES.map((t, i) => (
              <Tile key={t.label} {...t} wide={i === 4} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Tile({ target, prefix = '', suffix = '', label, wide }) {
  const [value, ref] = useCountUp(target, { prefix, suffix })
  return (
    <div ref={ref} className={`bg-navy-900/70 p-5 ${wide ? 'col-span-2' : ''}`}>
      <p className="font-display text-2xl font-semibold text-ink-100 sm:text-3xl">{value}</p>
      <p className="caption mt-1">{label}</p>
    </div>
  )
}
