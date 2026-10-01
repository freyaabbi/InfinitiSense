import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useApp } from '../lib/store.jsx'

/* ---------- Reveal on scroll (subtle, used sparingly) ---------- */
export function Reveal({ children, delay = 0, y = 16, className = '' }) {
  const { reducedMotion } = useApp()
  if (reducedMotion) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Section heading (editorial, left-aligned by default) ---------- */
export function SectionHeading({ eyebrow, title, subtitle, center = false, aside = null, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto max-w-2xl text-center' : 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between'} ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && (
          <Reveal>
            <span className="label">{eyebrow}</span>
          </Reveal>
        )}
        <Reveal delay={0.04}>
          <h2 className={`h2 ${eyebrow ? 'mt-3' : ''}`}>{title}</h2>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.08}>
            <p className="lead mt-4">{subtitle}</p>
          </Reveal>
        )}
      </div>
      {aside && !center && (
        <Reveal delay={0.1}>
          <div className="shrink-0">{aside}</div>
        </Reveal>
      )}
    </div>
  )
}

/* ---------- Button ---------- */
export function Button({ children, variant = 'primary', size = 'md', as = 'button', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-btn font-medium transition-colors duration-150 focus-visible:outline-none'
  const sizes = {
    md: 'px-5 py-2.5 text-[0.9375rem]',
    lg: 'px-6 py-3 text-base',
    sm: 'px-3.5 py-2 text-caption',
  }
  const variants = {
    primary: 'bg-accent-400 text-navy-950 hover:bg-accent-300',
    secondary:
      'border border-white/15 bg-white/[0.03] text-ink-100 hover:border-white/30 hover:bg-white/[0.06]',
    ghost: 'text-ink-300 hover:text-ink-100',
  }
  const Tag = as === 'a' ? 'a' : 'button'
  return (
    <Tag className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}

/* ---------- Tilt card (reserved for the gallery — not every card) ---------- */
export function TiltCard({ children, className = '', intensity = 5 }) {
  const { reducedMotion } = useApp()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 200, damping: 20 })

  function handleMove(e) {
    if (reducedMotion) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reducedMotion ? {} : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Marked placeholder image slot ---------- */
export function Placeholder({ label = 'Product photo', className = '', ratio = 'aspect-video' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-card border border-white/[0.07] bg-navy-850 ${ratio} ${className}`}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <div className="tech-grid absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-ink-500">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8.5" cy="9.5" r="1.8" stroke="currentColor" strokeWidth="1.4" />
          <path d="m4 18 5-4 3.5 2.6L16 14l4 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="caption px-4">{label}</span>
      </div>
      <span className="absolute left-2.5 top-2.5 rounded-[4px] border border-white/10 bg-navy-900/80 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-ink-500">
        Placeholder
      </span>
    </div>
  )
}

/* ---------- Chip / status tag (small radius, not a pill) ---------- */
export function Chip({ children, tone = 'neutral', className = '' }) {
  const tones = {
    accent: 'border-accent-500/30 bg-accent-500/10 text-accent-300',
    data: 'border-data-500/30 bg-data-500/10 text-data-400',
    dust: 'border-dust-400/30 bg-dust-400/10 text-dust-300',
    neutral: 'border-white/10 bg-white/[0.04] text-ink-400',
    stop: 'border-red-500/30 bg-red-500/10 text-red-300',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-caption ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}
