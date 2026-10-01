import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeading, Reveal, Chip, Button } from '../components/ui.jsx'
import RobotSVG from '../components/RobotSVG.jsx'
import { useApp } from '../lib/store.jsx'
import { useBlip } from '../lib/hooks.js'

const FLOW = {
  clean: { label: 'Cleaning', tone: 'accent', chip: 'Cleaning panel row' },
  rain: { label: 'Rain detected', tone: 'data', chip: 'Rain detected' },
  park: { label: 'Parking safely', tone: 'accent', chip: 'Parking at dock' },
  stop: { label: 'Obstacle — stopped', tone: 'stop', chip: 'Obstacle ahead — stopped' },
}

export default function RainMode() {
  const { sound, reducedMotion } = useApp()
  const blip = useBlip()
  const [state, setState] = useState('clean')
  const [raining, setRaining] = useState(false)
  const [obstacle, setObstacle] = useState(false)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => () => clearTimers(), [])

  function makeItRain() {
    clearTimers()
    setObstacle(false)
    setRaining(true)
    setState('rain')
    if (sound) blip(320, 0.15, 'sine', 0.05)
    timers.current.push(setTimeout(() => { setState('park'); if (sound) blip(220, 0.2, 'triangle', 0.05) }, 1800))
    timers.current.push(setTimeout(() => { setRaining(false); setState('clean') }, 6000))
  }

  function toggleObstacle() {
    clearTimers()
    setRaining(false)
    if (!obstacle) {
      setObstacle(true)
      setState('stop')
      if (sound) blip(140, 0.25, 'square', 0.04)
      timers.current.push(setTimeout(() => { setObstacle(false); setState('clean') }, 3500))
    } else {
      setObstacle(false)
      setState('clean')
    }
  }

  const robotX = state === 'park' ? '78%' : state === 'stop' ? '38%' : undefined

  return (
    <section id="demo" className="section-pad border-t border-white/[0.07]">
      <div className="container-max">
        <SectionHeading
          eyebrow="Live demo"
          title="Weather-aware, and self-protecting"
          subtitle="The rain sensor fires, the status flows, and the robot parks itself. Or drop an obstacle to see edge/proximity detection stop it."
        />

        <Reveal>
          <div className="mt-12">
            {/* status flow */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {['clean', 'rain', 'park'].map((k, i) => (
                <div key={k} className="flex items-center gap-2">
                  <Chip tone={state === k ? FLOW[k].tone : 'neutral'} className={state === k ? '' : 'opacity-55'}>
                    {FLOW[k].label}
                  </Chip>
                  {i < 2 && <span className="text-ink-600">→</span>}
                </div>
              ))}
            </div>

            {/* stage */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-panel border border-white/[0.07] bg-navy-950">
              <div className="tech-grid absolute inset-0 opacity-60" />
              <motion.div className="absolute inset-0 bg-data-500/[0.12]" animate={{ opacity: raining ? 1 : 0 }} transition={{ duration: 0.6 }} />

              <AnimatePresence>
                {raining && !reducedMotion &&
                  Array.from({ length: 36 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-px bg-gradient-to-b from-transparent via-data-400/70 to-transparent"
                      style={{ left: `${(i * 2.8) % 100}%`, height: 22 }}
                      initial={{ y: -30, opacity: 0 }}
                      animate={{ y: 320, opacity: [0, 1, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 + (i % 5) * 0.08, repeat: Infinity, delay: (i % 10) * 0.06 }}
                    />
                  ))}
              </AnimatePresence>

              <div className="absolute inset-x-8 bottom-16 top-16 [transform:perspective(700px)_rotateX(30deg)]">
                <div className="grid h-full grid-cols-6 gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="rounded-[3px] border border-data-500/20 bg-gradient-to-br from-navy-800 to-navy-900" />
                  ))}
                </div>
              </div>

              <div className="absolute bottom-6 right-6 flex flex-col items-center">
                <div className="h-9 w-14 rounded-t-[6px] border border-accent-500/40 bg-navy-850" />
                <span className="label mt-1">Dock</span>
              </div>

              <AnimatePresence>
                {obstacle && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute bottom-16 left-[46%] flex flex-col items-center"
                  >
                    <div className="h-11 w-9 rounded-[3px] bg-dust-400/70 ring-1 ring-red-400/50" />
                    <span className="mt-1 rounded-[4px] bg-red-500/90 px-1.5 text-[9px] font-medium text-white">OBSTACLE</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="absolute bottom-12 w-[22%] min-w-[110px]"
                initial={{ left: '8%' }}
                animate={{ left: robotX }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              >
                <RobotSVG className="w-full" state={state} showSensor={state === 'rain' || state === 'stop'} />
              </motion.div>

              <div className="absolute left-4 top-4">
                <AnimatePresence mode="wait">
                  <motion.div key={state} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }}>
                    <Chip tone={FLOW[state].tone}>{FLOW[state].chip}</Chip>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* controls */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button variant="primary" onClick={makeItRain}>☁ Make it rain</Button>
              <Button variant="secondary" onClick={toggleObstacle}>
                {obstacle ? 'Clear obstacle' : 'Obstacle ahead'}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
