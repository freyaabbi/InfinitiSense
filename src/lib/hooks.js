import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

/**
 * Count-up number that animates when it scrolls into view.
 * Returns [displayValue, ref].
 */
export function useCountUp(target, { duration = 1.6, decimals = 0, prefix = '', suffix = '' } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [inView, target, duration])

  const formatted =
    prefix +
    Number(value).toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix

  return [formatted, ref]
}

/** Simple lightweight WebAudio blip generator for the sound toggle demos. */
export function useBlip() {
  const ctxRef = useRef(null)
  return (freq = 440, dur = 0.08, type = 'sine', gain = 0.04) => {
    try {
      if (!ctxRef.current) {
        const AC = window.AudioContext || window.webkitAudioContext
        ctxRef.current = new AC()
      }
      const ctx = ctxRef.current
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = type
      osc.frequency.value = freq
      g.gain.value = gain
      osc.connect(g)
      g.connect(ctx.destination)
      osc.start()
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur)
      osc.stop(ctx.currentTime + dur)
    } catch (e) {
      /* audio not available */
    }
  }
}

export { useInView }
