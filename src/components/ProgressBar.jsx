import { useScroll, useSpring, motion } from 'framer-motion'

/** Top scroll progress — a thin accent line with faint panel-cell ticks. */
export default function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-white/5" aria-hidden="true">
      <motion.div style={{ scaleX, transformOrigin: '0%' }} className="h-full bg-accent-400">
        <div className="flex h-full w-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="h-full flex-1 border-r border-navy-950/50" />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
