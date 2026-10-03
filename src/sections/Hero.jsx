import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import RobotSVG from '../components/RobotSVG.jsx'
import { Button } from '../components/ui.jsx'
import { useApp } from '../lib/store.jsx'

export default function Hero({ onSeeDemo }) {
  const { reducedMotion } = useApp()
  const [clicks, setClicks] = useState(0)

  useEffect(() => {
    if (clicks >= 5) {
      window.dispatchEvent(new CustomEvent('kb:launch-game'))
      setClicks(0)
    }
  }, [clicks])

  return (
    <section id="top" className="relative overflow-hidden border-b border-white/[0.07] pt-28">
      <div className="container-wide grid items-center gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:pb-24">
        {/* Left: the message */}
        <div>
          <span className="label">EdgeAI solar O&amp;M · Made in India</span>

          <h1 className="h1 mt-5">
            Robots that keep your
            <br className="hidden sm:block" /> solar panels <span className="text-accent-400">generating.</span>
          </h1>

          {/* What it does */}
          <p className="lead mt-6 max-w-xl">
            Kleanbotics builds cloud-connected, EdgeAI-powered robots that clean solar panels
            autonomously — waterless, every day, with no crew on site.
          </p>

          {/* Who it's for + why it matters */}
          <div className="mt-7 flex flex-col gap-3 border-l-2 border-accent-500/40 pl-4">
            <p className="text-ink-300">
              <span className="font-medium text-ink-100">For solar farms &amp; rooftops</span> losing 20–30% of
              output to dust — up to ₹2–3 lakh per MW, every year.
            </p>
          </div>

          {/* One strong CTA + quiet secondary */}
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Button as="a" href="#contact" variant="primary" size="lg">
              Book a pilot
            </Button>
            <button
              onClick={onSeeDemo}
              className="text-[0.9375rem] text-ink-300 underline-offset-4 transition-colors hover:text-ink-100 hover:underline"
            >
              See it in action →
            </button>
          </div>

          {/* Credentials — static, not a scrolling ticker */}
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/[0.07] pt-6">
            <Stat value="75 GW" label="installed in India" />
            <Stat value="280 GW" label="target by 2030" accent />
            <Stat value="0 L" label="water per clean" />
          </dl>
        </div>

        {/* Right: the product (real visual, not a decorative blob) */}
        <div className="relative">
          <ProductVisual onRobotClick={() => setClicks((c) => c + 1)} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label, accent }) {
  return (
    <div>
      <dt className={`font-display text-2xl font-semibold ${accent ? 'text-accent-400' : 'text-ink-100'}`}>{value}</dt>
      <dd className="caption mt-1">{label}</dd>
    </div>
  )
}

function ProductVisual({ onRobotClick, reducedMotion }) {
  return (
    <figure className="surface overflow-hidden rounded-panel">
      {/* header strip — reads like a product/telemetry frame */}
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
        <span className="label">Kleanbotics · field unit</span>
        <span className="caption flex items-center gap-1.5 text-data-400">
          <span className="h-1.5 w-1.5 rounded-full bg-data-400" /> active
        </span>
      </div>

      {/* stage */}
      <div className="relative aspect-[4/3] bg-navy-950">
        <div className="tech-grid absolute inset-0 opacity-70" />

        {/* solar array */}
        <div className="absolute inset-x-4 bottom-8 top-14 [transform:perspective(760px)_rotateX(34deg)]">
          <div className="grid h-full grid-cols-3 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-[4px] border border-data-500/20 bg-gradient-to-br from-navy-800 to-navy-900" />
            ))}
          </div>
        </div>

        {/* robot — single restrained vertical pass */}
        <motion.button
          onClick={onRobotClick}
          aria-label="Kleanbotics robot"
          className="absolute left-[29%] w-[42%] min-w-[120px]"
          initial={{ top: '22%' }}
          animate={reducedMotion ? { top: '45%' } : { top: ['22%', '60%', '22%'] }}
          transition={reducedMotion ? {} : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          whileTap={{ scale: 0.96 }}
        >
          <RobotSVG className="w-full" showSensor />
        </motion.button>
      </div>

      {/* footer note */}
      <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-2.5">
        <span className="caption">India solar: 75 GW → 280 GW target by 2030</span>
        <span className="caption text-ink-500">Illustration</span>
      </div>
    </figure>
  )
}
