import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionHeading, Reveal } from '../components/ui.jsx'
import RobotSVG from '../components/RobotSVG.jsx'
import { SUBSYSTEMS } from '../lib/data.js'
import { useApp } from '../lib/store.jsx'

export default function Product() {
  const { reducedMotion } = useApp()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const explode = useTransform(scrollYProgress, [0.12, 0.5, 0.9], [0, 1, 1])

  return (
    <section id="product" className="section-pad border-t border-white/[0.07]">
      <div className="container-max">
        <SectionHeading
          eyebrow="The product"
          title="Meet Kleanbotics"
          subtitle="A rugged, waterless cleaning robot with an EdgeAI brain and a full sensor suite. Scroll to explode the view."
        />

        <div ref={ref} className="mt-14 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          {/* Exploded robot */}
          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
            <div className="tech-grid absolute inset-0 rounded-panel opacity-60" />
            <div className="relative z-10 w-3/5">
              <RobotSVG className="w-full" showSensor />
            </div>
            {SUBSYSTEMS.map((s) => (
              <Label key={s.key} sub={s} explode={explode} reducedMotion={reducedMotion} />
            ))}
          </div>

          {/* Subsystem list — hairline rows, not floating cards */}
          <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {SUBSYSTEMS.map((s, i) => (
              <Reveal key={s.key} delay={i * 0.03}>
                <div className="flex items-start gap-4 py-4">
                  <span className="mt-0.5 font-mono text-caption text-accent-400">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="h3 text-[1.0625rem]">{s.label}</h3>
                    <p className="mt-0.5 text-[0.9375rem] text-ink-400">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Journey — inline editorial, not a card */}
        <Reveal>
          <div className="mt-14 flex flex-col items-center gap-3 border-t border-white/[0.07] pt-8 sm:flex-row sm:justify-center sm:gap-4">
            <span className="label">The journey</span>
            {['Manual', 'Automatic', 'Autonomous'].map((step, i) => (
              <span key={step} className="flex items-center gap-4">
                <span className={i === 2 ? 'font-display font-semibold text-accent-400' : 'text-ink-400'}>{step}</span>
                {i < 2 && <span className="text-ink-600">→</span>}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Label({ sub, explode, reducedMotion }) {
  const rad = (sub.angle * Math.PI) / 180
  const dist = 160
  const tx = Math.cos(rad) * dist
  const ty = Math.sin(rad) * dist
  const x = useTransform(explode, [0, 1], [0, tx])
  const y = useTransform(explode, [0, 1], [0, ty])
  const opacity = useTransform(explode, [0, 0.4, 1], [0, 0.4, 1])

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-20"
      style={reducedMotion ? { x: tx, y: ty, translateX: '-50%', translateY: '-50%' } : { x, y, opacity, translateX: '-50%', translateY: '-50%' }}
    >
      <div className="flex items-center gap-1.5 whitespace-nowrap rounded-[6px] border border-white/10 bg-navy-900/90 px-2.5 py-1 text-caption text-ink-200 backdrop-blur">
        <span className="h-1 w-1 rounded-full bg-data-400" />
        {sub.label}
      </div>
    </motion.div>
  )
}
