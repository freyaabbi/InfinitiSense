import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, ReferenceDot } from 'recharts'
import { SectionHeading, Reveal } from '../components/ui.jsx'
import { SOLAR_CAPACITY, MARKET_STATS, MARKET_SOURCES } from '../lib/data.js'
import { useApp } from '../lib/store.jsx'

const target = SOLAR_CAPACITY.find((d) => d.target)

export default function Market() {
  const { reducedMotion } = useApp()
  return (
    <section id="market" className="section-pad border-t border-white/[0.07]">
      <div className="container-max">
        <SectionHeading
          title="India's solar base is on track for 292 GW by 2030"
          subtitle="Installed solar capacity has crossed 164 GW (MNRE, Jul 2026) and targets ~292 GW by 2029–30. Every panel is a cleaning cycle — a fast-expanding base for autonomous cleaning."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="surface rounded-panel p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="label">Installed solar capacity (GW)</p>
                <p className="font-mono text-caption text-accent-400">2020 → 2030</p>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SOLAR_CAPACITY} margin={{ top: 12, right: 16, left: -12, bottom: 0 }}>
                    <defs>
                      <linearGradient id="solarFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f7b733" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#f7b733" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke="#1f2735" vertical={false} />
                    <XAxis dataKey="year" stroke="#616b7d" fontSize={12} tickLine={false} />
                    <YAxis stroke="#616b7d" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      cursor={{ stroke: '#f7b733', strokeWidth: 1, strokeDasharray: '3 3' }}
                      contentStyle={{ background: '#0c1019', border: '1px solid #1f2735', borderRadius: 8, fontSize: 12 }}
                      formatter={(v, _n, p) => [`${v} GW${p?.payload?.target ? ' (target)' : ''}`, 'Capacity']}
                    />
                    <Area
                      type="monotone"
                      dataKey="gw"
                      stroke="#f7b733"
                      strokeWidth={2.5}
                      fill="url(#solarFill)"
                      isAnimationActive={!reducedMotion}
                      animationDuration={1400}
                    />
                    {target && (
                      <ReferenceDot x={target.year} y={target.gw} r={4} fill="#f7b733" stroke="#0c1019" strokeWidth={2} />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="caption mt-3 font-mono">
                Source:{' '}
                <a href={MARKET_SOURCES.mnre.url} target="_blank" rel="noopener noreferrer" className="text-accent-400 underline-offset-2 hover:underline">
                  MNRE
                </a>{' '}
                (actuals) &amp;{' '}
                <a href={MARKET_SOURCES.cea.url} target="_blank" rel="noopener noreferrer" className="text-accent-400 underline-offset-2 hover:underline">
                  CEA
                </a>{' '}
                (2030 target).
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-white/[0.07] bg-white/[0.07]">
              {MARKET_STATS.map((s, i) => {
                const src = MARKET_SOURCES[s.ref]
                const spanFull = i === MARKET_STATS.length - 1 && MARKET_STATS.length % 2 === 1
                return (
                  <a
                    key={s.label}
                    href={src?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={src?.label}
                    className={`group flex flex-col justify-center bg-navy-900 p-5 transition-colors hover:bg-navy-850 ${spanFull ? 'col-span-2' : ''}`}
                  >
                    <p className="font-display text-3xl font-semibold text-ink-100">{s.value}</p>
                    <p className="mt-1 text-caption text-ink-300">{s.label}</p>
                    <p className="mt-1 font-mono text-[11px] text-ink-500 group-hover:text-accent-400">{s.sub} ↗</p>
                  </a>
                )
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="label">References</span>
            {Object.values(MARKET_SOURCES).map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-caption text-ink-400 underline-offset-2 transition-colors hover:text-accent-400 hover:underline"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
