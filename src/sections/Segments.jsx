import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeading, Chip, Button } from '../components/ui.jsx'
import { SEGMENTS } from '../lib/data.js'

const TABS = ['farms', 'rooftop', 'oem']

export default function Segments() {
  const [tab, setTab] = useState('farms')
  const seg = SEGMENTS[tab]

  return (
    <section className="section-pad border-t border-white/[0.07]">
      <div className="container-max">
        <SectionHeading eyebrow="Who it's for" title="One platform, three ways to deploy" />

        {/* underline tabs */}
        <div className="mt-8 flex gap-6 border-b border-white/[0.07]">
          {TABS.map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative -mb-px pb-3 text-[0.9375rem] transition-colors ${
                tab === key ? 'text-ink-100' : 'text-ink-500 hover:text-ink-300'
              }`}
            >
              {SEGMENTS[key].label}
              {tab === key && <motion.span layoutId="segline" className="absolute inset-x-0 -bottom-px h-0.5 bg-accent-400" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className={`mt-10 grid items-center gap-10 ${seg.image ? 'lg:grid-cols-2' : 'max-w-2xl'}`}
          >
            {seg.image && (
              <img
                src={seg.image}
                alt={`${seg.label} deployment`}
                loading="lazy"
                className="aspect-video w-full rounded-card border border-white/[0.07] object-cover lg:order-2"
              />
            )}
            <div>
              <Chip tone="neutral">{seg.tag}</Chip>
              <h3 className="h2 mt-4 text-[1.75rem] sm:text-[2rem]">{seg.headline}</h3>
              <ul className="mt-6 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {seg.props.map((p) => (
                  <li key={p} className="flex items-start gap-3 py-3 text-ink-300">
                    <span className="mt-1 text-accent-400">—</span>
                    {p}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" as="a" href="#contact" className="mt-7">{seg.cta}</Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
