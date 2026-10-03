import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../lib/store.jsx'
import { Button } from './ui.jsx'

const LINKS = [
  ['Problem', '#problem'],
  ['Product', '#product'],
  ['Features', '#features'],
  ['Dashboard', '#dashboard'],
  ['ROI', '#roi'],
  ['Market', '#market'],
  ['Contact', '#contact'],
]

export default function Nav() {
  const { sound, toggleSound } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/[0.07] bg-navy-950/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-wide flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Kleanbotics home">
          <span className="flex h-8 w-8 items-center justify-center rounded-[7px] border border-white/10 bg-navy-800">
            <span className="h-2 w-2 rounded-full bg-accent-400" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.0625rem] font-bold tracking-tight text-ink-100">Kleanbotics</span>
            <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-500">InfinitiSense LLP</span>
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="rounded-[6px] px-2.5 py-1.5 text-caption text-ink-400 transition-colors hover:bg-white/5 hover:text-ink-100"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <IconBtn onClick={toggleSound} label={sound ? 'Mute sound' : 'Enable sound'} active={sound}>
            {sound ? '🔊' : '🔈'}
          </IconBtn>
          <Button as="a" href="#contact" variant="primary" size="sm" className="hidden sm:inline-flex">
            Book a pilot
          </Button>
          <button
            className="rounded-[7px] border border-white/10 p-2 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <div className="space-y-1">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/[0.07] bg-navy-950/95 backdrop-blur lg:hidden"
          >
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 px-6 py-3 text-caption text-ink-300 hover:bg-white/5"
                >
                  {label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

function IconBtn({ children, onClick, label, active }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-[7px] border text-sm transition-colors ${
        active ? 'border-accent-400/50 text-accent-300' : 'border-white/10 text-ink-400 hover:text-ink-100'
      }`}
    >
      {children}
    </button>
  )
}
