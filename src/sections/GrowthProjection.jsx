import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell, LabelList } from 'recharts'
import { SectionHeading, Reveal } from '../components/ui.jsx'
import { GROWTH_PROJECTION, UNIT_PRICE } from '../lib/data.js'
import { useApp } from '../lib/store.jsx'

export default function GrowthProjection() {
  const { reducedMotion } = useApp()
  return (
    <section className="section-pad border-t border-white/[0.07]">
      <div className="container-max">
        <SectionHeading
          eyebrow="Growth projection"
          title="Scaling to 500 units by 2029"
          subtitle={`Units sold and revenue (₹ lakh) at ₹${UNIT_PRICE.toLocaleString('en-IN')} per unit.`}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="surface rounded-panel p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={GROWTH_PROJECTION} margin={{ top: 24, right: 8, left: -12, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 4" stroke="#1f2735" vertical={false} />
                    <XAxis dataKey="year" stroke="#616b7d" fontSize={12} tickLine={false} />
                    <YAxis stroke="#616b7d" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                      contentStyle={{ background: '#0c1019', border: '1px solid #1f2735', borderRadius: 8, fontSize: 12 }}
                      formatter={(v, n) => (n === 'revenue' ? [`₹${v}L`, 'Revenue'] : [`${v} units`, 'Units'])}
                    />
                    <Bar dataKey="revenue" radius={[4, 4, 0, 0]} isAnimationActive={!reducedMotion} animationDuration={1200}>
                      {GROWTH_PROJECTION.map((_, i) => (
                        <Cell key={i} fill={i === GROWTH_PROJECTION.length - 1 ? '#f7b733' : '#3a465a'} />
                      ))}
                      <LabelList dataKey="revenue" position="top" formatter={(v) => `₹${v}L`} fill="#8792a3" fontSize={11} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <div className="divide-y divide-white/[0.07] self-start border-y border-white/[0.07]">
            {GROWTH_PROJECTION.map((g, i) => (
              <Reveal key={g.year} delay={i * 0.05}>
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-display text-xl font-semibold text-ink-100">{g.year}</p>
                    <p className="caption font-mono text-accent-400">{g.note}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-ink-100">{g.units} units</p>
                    <p className="font-mono text-caption text-accent-400">₹{g.revenue}L</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
