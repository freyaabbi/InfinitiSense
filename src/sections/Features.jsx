import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeading } from '../components/ui.jsx'
import { FEATURES } from '../lib/data.js'

export default function Features() {
  const [active, setActive] = useState(0)
  const feature = FEATURES[active]
  const n = FEATURES.length

  return (
    <section id="features" className="section-pad border-t border-white/[0.07]">
      <div className="container-max">
        <SectionHeading
          eyebrow="Features"
          title="A closed loop that runs on the edge"
          subtitle="Sense → Decide → Act, on-device. Select a node to see what each stage does."
        />

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Loop diagram — static, calm */}
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="absolute inset-10 rounded-full border border-white/[0.09]" />
            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/[0.09] bg-navy-850 text-center">
              <span className="font-display text-sm font-semibold text-ink-100">EdgeAI</span>
              <span className="caption mt-0.5">core</span>
            </div>

            {FEATURES.map((f, i) => {
              const angle = (i / n) * 2 * Math.PI - Math.PI / 2
              const r = 42
              const left = 50 + Math.cos(angle) * r
              const top = 50 + Math.sin(angle) * r
              const isActive = i === active
              return (
                <button
                  key={f.id}
                  onClick={() => setActive(i)}
                  aria-label={f.node}
                  aria-pressed={isActive}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <span
                    className={`flex h-18 w-18 items-center justify-center rounded-full border px-2 text-center text-caption font-medium transition-colors ${
                      isActive
                        ? 'border-accent-400 bg-accent-500/12 text-accent-200'
                        : 'border-white/10 bg-navy-850 text-ink-300 hover:border-white/25'
                    }`}
                    style={{ width: 72, height: 72 }}
                  >
                    {f.node}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Detail */}
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="label text-accent-400">{feature.node}</span>
                <h3 className="h2 mt-3 text-[1.75rem] sm:text-[2rem]">{feature.heading}</h3>
                <p className="lead mt-4">{feature.body}</p>
                <ul className="mt-6 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                  {feature.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 py-3 text-[0.9375rem] text-ink-200">
                      <span className="text-accent-400">—</span>
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex gap-1.5">
                  {FEATURES.map((f, i) => (
                    <button
                      key={f.id}
                      onClick={() => setActive(i)}
                      aria-label={`Go to ${f.node}`}
                      className={`h-1 rounded-full transition-all ${i === active ? 'w-8 bg-accent-400' : 'w-4 bg-white/15'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
