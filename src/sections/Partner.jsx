import { SectionHeading } from '../components/ui.jsx'
import { PARTNER_CARDS } from '../lib/data.js'

export default function Partner() {
  function pick(card) {
    window.dispatchEvent(
      new CustomEvent('kb:prefill', {
        detail: { type: card.type, message: `I'm interested in: ${card.title} — ${card.body}` },
      }),
    )
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="partner" className="section-pad border-t border-white/[0.07]">
      <div className="container-max">
        <SectionHeading
          eyebrow="Partner with us"
          title="Power the pilot"
          subtitle="We're raising support to take Kleanbotics from prototype to the field. Pick a way to work with us — it pre-fills the form."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-panel border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {PARTNER_CARDS.map((c) => (
            <button
              key={c.title}
              onClick={() => pick(c)}
              className="group flex flex-col items-start bg-navy-900/60 p-6 text-left transition-colors hover:bg-navy-850"
            >
              <span className="text-2xl opacity-80">{c.icon}</span>
              <h3 className="h3 mt-4 text-[1.0625rem]">{c.title}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] text-ink-400">{c.body}</p>
              <span className="mt-4 caption font-mono text-accent-400 transition-transform group-hover:translate-x-0.5">
                Start inquiry →
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
