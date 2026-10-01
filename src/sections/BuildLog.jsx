import { SectionHeading, Reveal, TiltCard, Placeholder, Chip } from '../components/ui.jsx'
import { BUILD_LOG } from '../lib/data.js'

export default function BuildLog() {
  return (
    <section className="section-pad border-t border-white/[0.07]">
      <div className="container-max">
        <SectionHeading
          eyebrow="Present status"
          title="Build log, straight from the bench"
          subtitle="Prototype, PCB and bench-test shots from the lab notebook. Placeholders — to be swapped for real photos."
        />

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {BUILD_LOG.map((item, i) => (
            <div key={item.title} className="mb-4 break-inside-avoid">
              <Reveal delay={(i % 3) * 0.05}>
                <TiltCard intensity={4}>
                  <figure>
                    <Placeholder label={item.title} ratio={item.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'} />
                    <figcaption className="mt-2.5 flex items-center justify-between">
                      <span className="text-[0.9375rem] text-ink-200">{item.title}</span>
                      <Chip tone="neutral" className="font-mono">{item.date}</Chip>
                    </figcaption>
                  </figure>
                </TiltCard>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
