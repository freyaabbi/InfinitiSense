import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading, Reveal, Chip } from '../components/ui.jsx'
import { PROBLEM_CARDS } from '../lib/data.js'

export default function Problem() {
  const [dustDays, setDustDays] = useState(15)
  const lossPct = Math.min(28, +(dustDays * 0.62).toFixed(1))
  const rupeesLost = Math.round((lossPct / 28) * 280000)
  const brightness = 1 - (lossPct / 28) * 0.6

  return (
    <section id="problem" className="section-pad">
      <div className="container-max">
        <SectionHeading
          eyebrow="The problem"
          title="Dust is quietly stealing your sunlight"
          subtitle="Soiling drains generation on every solar asset in India. Drag to add dusty days and watch output fall."
        />

        {/* Asymmetric: wide interactive panel + narrow metric column */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-panel border border-white/[0.07] bg-white/[0.07] lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="bg-navy-900/60 p-6 sm:p-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-white/[0.07] bg-navy-950">
              <div
                className="grid h-full grid-cols-6 grid-rows-3 gap-1 p-2 transition-[filter] duration-300"
                style={{ filter: `brightness(${brightness})` }}
              >
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="rounded-[3px] border border-data-500/20 bg-gradient-to-br from-data-500/25 to-navy-900" />
                ))}
              </div>
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: lossPct / 28,
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(205,185,143,0.5), transparent 42%), radial-gradient(circle at 72% 62%, rgba(176,153,104,0.5), transparent 46%), rgba(176,153,104,0.3)',
                }}
              />
              <div className="absolute left-3 top-3">
                <Chip tone={lossPct > 18 ? 'dust' : 'data'}>
                  {lossPct > 18 ? 'Heavy soiling' : lossPct > 8 ? 'Moderate soiling' : 'Clean panel'}
                </Chip>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between caption">
                <span>Dusty days without cleaning</span>
                <span className="font-mono text-accent-400">{dustDays} days</span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                value={dustDays}
                onChange={(e) => setDustDays(+e.target.value)}
                aria-label="Dusty days without cleaning"
                className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full accent-accent-500"
                style={{ background: `linear-gradient(90deg,#f59e0b ${(dustDays / 45) * 100}%,#1f2735 ${(dustDays / 45) * 100}%)` }}
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-px bg-white/[0.07]">
            <Metric label="Efficiency loss" value={`${lossPct}%`} hint="of generation lost to soiling" fill={lossPct / 28} tone="dust" />
            <Metric label="Revenue lost" value={`₹${(rupeesLost / 1000).toFixed(0)}k`} hint="per MW, per year" fill={rupeesLost / 280000} tone="accent" />
            <div className="flex-1 bg-navy-900/60 p-6">
              <p className="text-ink-300">
                At scale, unmanaged soiling costs <span className="text-accent-300">₹2–3 lakh per MW every year</span> and
                shaves <span className="text-dust-300">20–30%</span> off output.
              </p>
              <p className="caption mt-3 text-data-400">→ Kleanbotics keeps panels near-clean, every day.</p>
            </div>
          </div>
        </div>

        {/* Problem cards — bordered grid, hairline dividers (not floating cards) */}
        <div className="mt-10 grid gap-px overflow-hidden rounded-panel border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEM_CARDS.map((c, i) => (
            <FlipCard key={c.title} index={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Metric({ label, value, hint, tone, fill }) {
  const color = tone === 'accent' ? 'text-accent-400' : 'text-dust-300'
  const bar = tone === 'accent' ? 'bg-accent-500' : 'bg-dust-400'
  return (
    <div className="bg-navy-900/60 p-6">
      <div className="flex items-end justify-between">
        <span className="caption">{label}</span>
        <span className={`font-display text-3xl font-semibold ${color}`}>{value}</span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-navy-700">
        <div className={`h-full ${bar} transition-all duration-300`} style={{ width: `${Math.min(100, fill * 100)}%` }} />
      </div>
      <p className="caption mt-2">{hint}</p>
    </div>
  )
}

function FlipCard({ index, title, back }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div
      className="group relative h-36 bg-navy-900/60 [perspective:1000px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div className="relative h-full w-full [transform-style:preserve-3d]" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.45 }}>
        <div className="absolute inset-0 flex flex-col justify-between p-5 [backface-visibility:hidden]">
          <span className="label font-mono text-accent-400">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="h3 text-[1.0625rem]">{title}</h3>
        </div>
        <div className="absolute inset-0 flex items-center bg-dust-400/[0.07] p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-[0.9375rem] leading-relaxed text-ink-300">{back}</p>
        </div>
      </motion.div>
    </div>
  )
}
