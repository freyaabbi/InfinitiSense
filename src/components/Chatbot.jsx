import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const QA = [
  { q: 'How much does it cost?', a: 'Units start at a retail reference of ₹32,000. For farms we scope a fleet (~1 robot per 50 kW) and share a custom quote — try the ROI calculator above.' },
  { q: 'How much water does it use?', a: 'Zero. Kleanbotics uses a waterless microfibre brush system, so you save water and avoid tanker logistics entirely.' },
  { q: 'Will it fit my rooftop?', a: 'Yes — the rooftop version is compact and plug-and-play, designed for home solar. See the “Rooftop Homes” tab in the segment switcher.' },
  { q: 'How do I sign up for a pilot?', a: 'Use the Contact form (or “Book a pilot”), choose your type, and send your site details. We reply within a couple of days.' },
  { q: 'What happens when it rains?', a: 'The rain sensor detects rain and the robot pauses and parks safely at its dock. Try the “Rain Mode” demo to see it live.' },
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ from: 'bot', text: "Hi — I'm Kleanbot. Ask me anything about our solar cleaning robots." }])
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, open])

  function ask(item) {
    setMsgs((m) => [...m, { from: 'user', text: item.q }])
    setTimeout(() => setMsgs((m) => [...m, { from: 'bot', text: item.a }]), 400)
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat with Kleanbot"
        className="fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full border border-white/10 bg-navy-800 text-xl text-ink-100 shadow-lift transition-colors hover:bg-navy-700"
        style={{ height: 52, width: 52 }}
      >
        {open ? '✕' : '🤖'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-40 flex h-[26rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-panel border border-white/10 bg-navy-900 shadow-lift"
          >
            <div className="flex items-center gap-2 border-b border-white/[0.07] bg-navy-850 px-4 py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-navy-800 text-sm">🤖</span>
              <div>
                <p className="text-[0.9375rem] font-medium text-ink-100">Kleanbot</p>
                <p className="font-mono text-[10px] text-data-400">online · assistant</p>
              </div>
            </div>

            <div className="thin-scroll flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[82%] rounded-card px-3.5 py-2 text-[0.9375rem] ${m.from === 'user' ? 'bg-accent-400 text-navy-950' : 'border border-white/[0.07] bg-white/[0.03] text-ink-200'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="border-t border-white/[0.07] p-3">
              <p className="label mb-2">Quick questions</p>
              <div className="flex flex-wrap gap-1.5">
                {QA.map((item) => (
                  <button key={item.q} onClick={() => ask(item)} className="rounded-btn border border-white/10 px-2.5 py-1 text-caption text-ink-300 transition-colors hover:border-accent-400/50 hover:text-ink-100">
                    {item.q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
