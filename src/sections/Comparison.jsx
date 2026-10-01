import { motion } from 'framer-motion'
import { SectionHeading } from '../components/ui.jsx'
import { COMPARISON } from '../lib/data.js'

export default function Comparison() {
  const { columns, rows } = COMPARISON

  return (
    <section className="section-pad border-t border-white/[0.07]">
      <div className="container-max">
        <SectionHeading
          eyebrow="Why Kleanbotics"
          title="A closed-loop approach to solar O&M"
          subtitle="How autonomous EdgeAI cleaning compares — category-level and factual. We don't name competitors."
        />

        <div className="thin-scroll mt-12 overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="w-[30%]" />
                {columns.map((c, i) => (
                  <th
                    key={c}
                    className={`border-b px-4 py-3 text-center text-[0.9375rem] font-semibold ${
                      i === 2 ? 'border-accent-500/40 bg-accent-500/[0.08] text-accent-200' : 'border-white/[0.07] text-ink-400'
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <motion.tr
                  key={row[0]}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-6% 0px' }}
                  transition={{ delay: ri * 0.04, duration: 0.4 }}
                >
                  <td className="border-b border-white/[0.07] px-4 py-3 text-[0.9375rem] text-ink-200">{row[0]}</td>
                  {[1, 2, 3].map((ci) => (
                    <td
                      key={ci}
                      className={`border-b px-4 py-3 text-center text-[0.9375rem] ${
                        ci === 3
                          ? 'border-accent-500/20 bg-accent-500/[0.05] font-medium text-accent-100'
                          : 'border-white/[0.07] text-ink-400'
                      }`}
                    >
                      {row[ci]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
