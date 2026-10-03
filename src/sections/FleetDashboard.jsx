import { useEffect, useMemo, useRef, useState } from 'react'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeading, Reveal, Chip } from '../components/ui.jsx'
import IndiaMap from '../components/IndiaMap.jsx'
import { FLEET_SITES } from '../lib/data.js'
import { useApp } from '../lib/store.jsx'

function seedRobot(site) {
  return {
    battery: 60 + Math.round(Math.random() * 38),
    cycles: 3 + Math.round(Math.random() * 6),
    health: ['Good', 'Good', 'Good', 'Check brush'][Math.floor(Math.random() * 4)],
    fault: ['None', 'None', 'None', 'Low battery (cleared)'][Math.floor(Math.random() * 4)],
    energy: 40 + Math.round(Math.random() * 120),
    name: `KB-${site.id}-${String(1 + Math.floor(Math.random() * site.robots)).padStart(2, '0')}`,
  }
}

export default function FleetDashboard() {
  const { reducedMotion } = useApp()
  const [activeSite, setActiveSite] = useState('RJ')
  const [robot, setRobot] = useState(() => seedRobot(FLEET_SITES[0]))
  const [series, setSeries] = useState(() => Array.from({ length: 16 }, (_, i) => ({ t: i, kwh: 40 + Math.round(Math.random() * 60) })))
  const [totals, setTotals] = useState({ online: 34, energy: 1284, cycles: 128 })
  const tick = useRef(16)

  useEffect(() => {
    setRobot(seedRobot(FLEET_SITES.find((s) => s.id === activeSite)))
  }, [activeSite])

  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => {
      setSeries((prev) => [...prev.slice(1), { t: tick.current++, kwh: 35 + Math.round(Math.random() * 75) }])
      setRobot((r) => ({
        ...r,
        battery: Math.max(20, Math.min(100, r.battery + Math.round((Math.random() - 0.45) * 6))),
        energy: r.energy + Math.round(Math.random() * 4),
      }))
      setTotals((t) => ({ online: 33 + Math.round(Math.random() * 5), energy: t.energy + Math.round(Math.random() * 12), cycles: t.cycles + (Math.random() > 0.6 ? 1 : 0) }))
    }, 2500)
    return () => clearInterval(id)
  }, [reducedMotion])

  const site = useMemo(() => FLEET_SITES.find((s) => s.id === activeSite), [activeSite])

  return (
    <section id="dashboard" className="section-pad border-t border-white/[0.07]">
      <div className="container-max">
        <SectionHeading
          eyebrow="Fleet intelligence"
          title="One cloud view of every robot in the field"
          subtitle="Status, battery, cleaning cycles, faults and energy recovered — across every site in India."
        />

        <Reveal>
          <div className="mt-10 overflow-hidden rounded-panel border border-white/[0.09] bg-navy-900/70 shadow-card">
            {/* window bar */}
            <div className="flex items-center gap-2 border-b border-white/[0.07] bg-navy-850 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-mono text-caption text-ink-500">kleanbotics.cloud/fleet</span>
              <Chip tone="accent" className="ml-3 hidden sm:inline-flex">Preview · simulated data</Chip>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-data-400">
                <span className="h-1.5 w-1.5 rounded-full bg-data-400" /> LIVE
              </span>
            </div>

            <div className="grid gap-px bg-white/[0.07] lg:grid-cols-[1.1fr_1fr]">
              {/* map + totals */}
              <div className="bg-navy-900/70 p-4">
                <div className="mb-3 grid grid-cols-3 gap-px overflow-hidden rounded-card border border-white/[0.07] bg-white/[0.07]">
                  <Stat label="Robots online" value={totals.online} suffix="/44" />
                  <Stat label="Energy today" value={totals.energy.toLocaleString('en-IN')} suffix=" kWh" accent />
                  <Stat label="Cycles today" value={totals.cycles} />
                </div>
                <div className="relative mx-auto h-72 max-w-xs">
                  <IndiaMap activeSite={activeSite} onSelect={setActiveSite} />
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {FLEET_SITES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSite(s.id)}
                      className={`rounded-[6px] border px-2.5 py-1 font-mono text-[10px] transition-colors ${
                        activeSite === s.id ? 'border-accent-500/40 bg-accent-500/10 text-accent-300' : 'border-white/10 text-ink-500 hover:text-ink-300'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* robot card + chart */}
              <div className="flex flex-col gap-px bg-white/[0.07]">
                <AnimatePresence mode="wait">
                  <motion.div key={activeSite} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-navy-900/70 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="caption font-mono">{site.name} · site {site.id}</p>
                        <p className="font-display text-lg font-semibold text-ink-100">{robot.name}</p>
                      </div>
                      <Chip tone={robot.fault === 'None' ? 'data' : 'accent'}>{robot.fault === 'None' ? 'Healthy' : 'Attention'}</Chip>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-white/[0.07] bg-white/[0.07]">
                      <Gauge label="Battery" value={robot.battery} unit="%" />
                      <Metric label="Cleaning cycles" value={robot.cycles} unit=" today" />
                      <Metric label="Motor health" value={robot.health} />
                      <Metric label="Energy recovered" value={robot.energy} unit=" kWh" accent />
                    </div>
                    <div className="mt-3 rounded-[6px] border border-white/[0.07] px-3 py-2 font-mono text-[11px] text-ink-500">
                      Last fault: <span className={robot.fault === 'None' ? 'text-data-400' : 'text-accent-300'}>{robot.fault}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex-1 bg-navy-900/70 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="caption font-mono">Fleet energy recovered (kWh)</p>
                    <span className="caption font-mono text-data-400">streaming</span>
                  </div>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={series} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                        <defs>
                          <linearGradient id="kwh" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#5ec8d8" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#5ec8d8" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="t" hide />
                        <Tooltip contentStyle={{ background: '#0c1019', border: '1px solid #1f2735', borderRadius: 8, fontSize: 12 }} labelStyle={{ color: '#8792a3' }} formatter={(v) => [`${v} kWh`, 'Energy']} />
                        <Area type="monotone" dataKey="kwh" stroke="#5ec8d8" strokeWidth={2} fill="url(#kwh)" isAnimationActive={!reducedMotion} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Stat({ label, value, suffix = '', accent }) {
  return (
    <div className="bg-navy-900/70 px-3 py-2.5">
      <p className="label">{label}</p>
      <p className={`font-mono text-lg font-semibold ${accent ? 'text-accent-400' : 'text-ink-100'}`}>
        {value}<span className="text-caption text-ink-500">{suffix}</span>
      </p>
    </div>
  )
}

function Metric({ label, value, unit = '', accent }) {
  return (
    <div className="bg-navy-900/70 px-3 py-2.5">
      <p className="label">{label}</p>
      <p className={`font-mono text-base font-medium ${accent ? 'text-accent-400' : 'text-ink-100'}`}>
        {value}<span className="text-caption text-ink-500">{unit}</span>
      </p>
    </div>
  )
}

function Gauge({ label, value, unit }) {
  const color = value > 50 ? '#5ec8d8' : value > 25 ? '#f7b733' : '#ef5350'
  return (
    <div className="bg-navy-900/70 px-3 py-2.5">
      <p className="label">{label}</p>
      <p className="font-mono text-base font-medium text-ink-100">{value}<span className="text-caption text-ink-500">{unit}</span></p>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-navy-700">
        <div className="h-full transition-all duration-700" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  )
}
