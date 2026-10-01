import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const COLS = 8
const ROWS = 6
const TOTAL = COLS * ROWS
const GAME_TIME = 30

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export default function MiniGame() {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [cleaned, setCleaned] = useState(() => new Set([0]))
  const [time, setTime] = useState(GAME_TIME)
  const [status, setStatus] = useState('ready')
  const konami = useRef([])
  const timerRef = useRef(null)

  const launch = useCallback(() => {
    setOpen(true)
    setStatus('ready')
    setPos({ x: 0, y: 0 })
    setCleaned(new Set([0]))
    setTime(GAME_TIME)
  }, [])

  useEffect(() => {
    const onLaunch = () => launch()
    const onKey = (e) => {
      konami.current = [...konami.current, e.key].slice(-KONAMI.length)
      if (KONAMI.every((k, i) => k.toLowerCase() === (konami.current[i] || '').toLowerCase())) {
        konami.current = []
        launch()
      }
    }
    window.addEventListener('kb:launch-game', onLaunch)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('kb:launch-game', onLaunch)
      window.removeEventListener('keydown', onKey)
    }
  }, [launch])

  useEffect(() => {
    if (status !== 'playing') return
    timerRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) { clearInterval(timerRef.current); setStatus('over'); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [status])

  const move = useCallback((dx, dy) => {
    if (status === 'ready') setStatus('playing')
    if (status === 'over') return
    setPos((p) => {
      const nx = Math.max(0, Math.min(COLS - 1, p.x + dx))
      const ny = Math.max(0, Math.min(ROWS - 1, p.y + dy))
      const idx = ny * COLS + nx
      setCleaned((c) => {
        const next = new Set(c)
        next.add(idx)
        if (next.size === TOTAL) { setStatus('over'); clearInterval(timerRef.current) }
        return next
      })
      return { x: nx, y: ny }
    })
  }, [status])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      const map = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }
      if (map[e.key]) { e.preventDefault(); move(...map[e.key]) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, move])

  if (!open) return null
  const pct = Math.round((cleaned.size / TOTAL) * 100)

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-950/92 p-4 backdrop-blur" role="dialog" aria-label="Kleanbotics mini game">
        <motion.div initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-lg rounded-panel border border-white/10 bg-navy-900 p-6 shadow-lift">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="h3">Dust Dash</h3>
              <p className="caption">Clean every panel before time runs out.</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close game" className="rounded-btn border border-white/10 px-3 py-1 text-sm text-ink-300">✕</button>
          </div>

          <div className="mt-4 flex items-center justify-between font-mono text-[0.9375rem]">
            <span className="text-data-400">⏱ {time}s</span>
            <span className="text-accent-400">{pct}% clean</span>
          </div>

          <div className="mt-3 grid gap-1 rounded-card bg-navy-950 p-2" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0,1fr))` }}>
            {Array.from({ length: TOTAL }).map((_, i) => {
              const isClean = cleaned.has(i)
              const isRobot = pos.y * COLS + pos.x === i
              return (
                <div key={i} className={`relative flex aspect-square items-center justify-center rounded-[3px] text-lg transition-colors ${isClean ? 'bg-data-500/25 ring-1 ring-data-500/30' : 'bg-dust-400/60'}`}>
                  {isRobot && <span>🤖</span>}
                </div>
              )
            })}
          </div>

          {status === 'over' && (
            <div className="mt-4 rounded-card border border-white/[0.07] bg-white/[0.03] p-4 text-center">
              <p className="font-display text-lg font-semibold text-ink-100">{pct === 100 ? 'Perfect clean!' : `Cleaned ${pct}% of the array`}</p>
              <button onClick={launch} className="mt-2 rounded-btn bg-accent-400 px-4 py-1.5 text-caption font-medium text-navy-950">Play again</button>
            </div>
          )}

          <div className="mt-4 grid grid-cols-3 gap-2 sm:hidden">
            <div />
            <Ctrl onClick={() => move(0, -1)}>▲</Ctrl>
            <div />
            <Ctrl onClick={() => move(-1, 0)}>◀</Ctrl>
            <Ctrl onClick={() => move(0, 1)}>▼</Ctrl>
            <Ctrl onClick={() => move(1, 0)}>▶</Ctrl>
          </div>
          <p className="caption mt-3 text-center font-mono">Arrow keys (or buttons) · Esc to close</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function Ctrl({ children, onClick }) {
  return <button onClick={onClick} className="rounded-btn border border-white/10 py-3 text-lg text-ink-200 active:scale-95">{children}</button>
}
