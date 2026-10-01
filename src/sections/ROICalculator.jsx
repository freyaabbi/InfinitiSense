import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading, Reveal, Button } from '../components/ui.jsx'
import { UNIT_PRICE } from '../lib/data.js'

const DUST_FACTOR = { low: 0.08, medium: 0.16, high: 0.26 }
const KWH_PER_KW_YEAR = 1500
const TARIFF = 4.5
const WATER_PER_CLEAN_PER_KW = 1.5
const LABOUR_HOURS_PER_KW_CLEAN = 0.05

export default function ROICalculator() {
  const [sizeKw, setSizeKw] = useState(500)
  const [dust, setDust] = useState('high')
  const [method, setMethod] = useState('manual')
  const [cleansPerMonth, setCleansPerMonth] = useState(2)
  const [showAssumptions, setShowAssumptions] = useState(false)

  const r = useMemo(() => {
    const soiling = DUST_FACTOR[dust]
    const baselineRecovery = method === 'none' ? 0 : Math.min(0.5, cleansPerMonth * 0.08)
    const recoverableFraction = Math.max(0, soiling - soiling * baselineRecovery) * 0.85
    const annualKwh = sizeKw * KWH_PER_KW_YEAR
    const energyRecovered = Math.round(annualKwh * recoverableFraction)
    const rupeesSaved = Math.round(energyRecovered * TARIFF)
    const waterSaved = Math.round(sizeKw * WATER_PER_CLEAN_PER_KW * cleansPerMonth * 12)
    const labourHours = Math.round(sizeKw * LABOUR_HOURS_PER_KW_CLEAN * cleansPerMonth * 12)
    const units = Math.max(1, Math.ceil(sizeKw / 50))
    const capex = units * UNIT_PRICE
    const paybackYears = rupeesSaved > 0 ? +(capex / rupeesSaved).toFixed(1) : null
    return { energyRecovered, rupeesSaved, waterSaved, labourHours, units, capex, paybackYears }
  }, [sizeKw, dust, method, cleansPerMonth])

  function requestQuote() {
    window.dispatchEvent(
      new CustomEvent('kb:prefill', {
        detail: {
          type: sizeKw >= 100 ? 'Solar farm' : 'Rooftop',
          size: `${sizeKw} kW`,
          message: `I'd like a custom quote. Site ~${sizeKw} kW, ${dust} dust, currently ${method}. Estimated ₹${r.rupeesSaved.toLocaleString('en-IN')}/yr recoverable with ~${r.units} robot(s).`,
        },
      }),
    )
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="roi" className="section-pad border-t border-white/[0.07]">
      <div className="container-max">
        <SectionHeading
          eyebrow="ROI calculator"
          title="What could clean panels return?"
          subtitle="Estimate energy, rupees, water and labour recovered. Indicative — we refine it for your exact site."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Inputs */}
          <Reveal>
            <div className="surface rounded-panel p-6">
              <Field label="Plant size" value={`${sizeKw.toLocaleString('en-IN')} kW`}>
                <input
                  type="range" min="5" max="5000" step="5" value={sizeKw}
                  onChange={(e) => setSizeKw(+e.target.value)}
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full accent-accent-500"
                  style={{ background: `linear-gradient(90deg,#f59e0b ${(sizeKw / 5000) * 100}%,#1f2735 ${(sizeKw / 5000) * 100}%)` }}
                  aria-label="Plant size in kW"
                />
                <div className="mt-1 flex justify-between caption font-mono">
                  <span>5 kW rooftop</span><span>5 MW farm</span>
                </div>
              </Field>

              <Field label="Location dust level">
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {['low', 'medium', 'high'].map((d) => (
                    <Toggle key={d} active={dust === d} onClick={() => setDust(d)}>{d}</Toggle>
                  ))}
                </div>
              </Field>

              <Field label="Current cleaning method">
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {[['manual', 'Manual'], ['none', 'None']].map(([v, l]) => (
                    <Toggle key={v} active={method === v} onClick={() => setMethod(v)}>{l}</Toggle>
                  ))}
                </div>
              </Field>

              <Field label="Cleanings per month" value={`${cleansPerMonth}×`}>
                <input
                  type="range" min="0" max="8" value={cleansPerMonth}
                  onChange={(e) => setCleansPerMonth(+e.target.value)}
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full accent-data-500"
                  style={{ background: `linear-gradient(90deg,#2fa8ba ${(cleansPerMonth / 8) * 100}%,#1f2735 ${(cleansPerMonth / 8) * 100}%)` }}
                  aria-label="Current cleanings per month"
                />
              </Field>

              <button onClick={() => setShowAssumptions((s) => !s)} className="mt-4 caption font-mono text-data-400 underline-offset-4 hover:underline">
                {showAssumptions ? '− Hide' : '+ How we calculate'}
              </button>
              <AnimatePresence>
                {showAssumptions && (
                  <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-2 space-y-1 overflow-hidden font-mono text-[11px] leading-relaxed text-ink-500">
                    <li>— Yield {KWH_PER_KW_YEAR} kWh/kW/yr · tariff ₹{TARIFF}/kWh</li>
                    <li>— Soiling loss: low 8% · medium 16% · high 26%</li>
                    <li>— Kleanbotics recovers ~85% of remaining soiling loss</li>
                    <li>— ~1 robot per 50 kW · unit price ₹{UNIT_PRICE.toLocaleString('en-IN')}</li>
                    <li>— Waterless: all cleaning water counted as saved</li>
                    <li className="text-ink-600">Estimates only — not a guarantee.</li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Outputs */}
          <Reveal delay={0.08}>
            <div className="grid gap-px overflow-hidden rounded-panel border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
              <Result label="Energy recovered" value={r.energyRecovered} suffix=" kWh/yr" accent="data" />
              <Result label="Money saved" value={r.rupeesSaved} prefix="₹" suffix="/yr" accent="accent" />
              <Result label="Water saved" value={r.waterSaved} suffix=" L/yr" accent="data" />
              <Result label="Labour saved" value={r.labourHours} suffix=" hrs/yr" accent="data" />
              <div className="bg-navy-900/70 p-6 sm:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="label">Suggested fleet</p>
                    <p className="mt-1 font-display text-2xl font-semibold text-ink-100">
                      {r.units} robot{r.units > 1 ? 's' : ''}{' '}
                      <span className="text-base font-normal text-ink-500">≈ ₹{r.capex.toLocaleString('en-IN')} capex</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="label">Payback</p>
                    <p className="mt-1 font-display text-2xl font-semibold text-accent-400">{r.paybackYears ? `${r.paybackYears} yr` : '—'}</p>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="primary" size="lg" onClick={requestQuote} className="mt-4 w-full">
              Get a custom quote for your site
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ label, value, children }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between">
        <label className="text-[0.9375rem] text-ink-200">{label}</label>
        {value && <span className="font-mono text-caption text-accent-400">{value}</span>}
      </div>
      {children}
    </div>
  )
}

function Toggle({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-btn border px-3 py-2 text-[0.9375rem] capitalize transition-colors ${
        active ? 'border-accent-400/60 bg-accent-500/10 text-accent-200' : 'border-white/10 text-ink-400 hover:text-ink-100'
      }`}
    >
      {children}
    </button>
  )
}

function Result({ label, value, prefix = '', suffix = '', accent }) {
  const color = accent === 'accent' ? 'text-accent-400' : 'text-data-400'
  return (
    <div className="bg-navy-900/70 p-6">
      <span className="caption">{label}</span>
      <p className={`mt-2 font-display text-2xl font-semibold ${color}`}>
        {prefix}{Math.round(value).toLocaleString('en-IN')}{suffix}
      </p>
    </div>
  )
}
