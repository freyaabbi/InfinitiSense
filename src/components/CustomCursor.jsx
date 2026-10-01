import { useEffect, useRef, useState } from 'react'
import { useApp } from '../lib/store.jsx'

/** Custom brush cursor that "wipes" dust — trailing particles on move. */
export default function CustomCursor() {
  const { reducedMotion } = useApp()
  const dotRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [down, setDown] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || reducedMotion) return
    setEnabled(true)
    document.documentElement.classList.add('cursor-brush')

    let raf
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx
    let cy = ty

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
      spawnDust(e.clientX, e.clientY)
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    const loop = () => {
      cx += (tx - cx) * 0.25
      cy += (ty - cy) * 0.25
      if (dotRef.current) dotRef.current.style.transform = `translate(${cx}px, ${cy}px)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('cursor-brush')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [reducedMotion])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[70] -ml-4 -mt-4"
      aria-hidden="true"
    >
      <div className={`transition-transform duration-150 ${down ? 'scale-90' : ''}`}>
        {/* brush head */}
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect x="6" y="4" width="20" height="9" rx="2" fill="#1f2735" stroke="#3a465a" strokeWidth="1.3" />
          <g stroke="#f7b733" strokeWidth="1.6" strokeLinecap="round">
            <line x1="9" y1="13" x2="8" y2="22" />
            <line x1="13" y1="13" x2="12.5" y2="24" />
            <line x1="17" y1="13" x2="17" y2="22" />
            <line x1="21" y1="13" x2="22" y2="24" />
            <line x1="25" y1="13" x2="26" y2="22" />
          </g>
        </svg>
      </div>
    </div>
  )
}

let poolInit = false
function spawnDust(x, y) {
  if (Math.random() > 0.35) return
  const el = document.createElement('span')
  el.className = 'dust-particle'
  el.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:3px;height:3px;border-radius:9999px;background:rgba(205,185,143,0.8);pointer-events:none;z-index:69;transition:transform .6s ease-out,opacity .6s ease-out;`
  document.body.appendChild(el)
  requestAnimationFrame(() => {
    const dx = (Math.random() - 0.5) * 60
    const dy = Math.random() * 40 + 10
    el.style.transform = `translate(${dx}px, ${dy}px)`
    el.style.opacity = '0'
  })
  setTimeout(() => el.remove(), 650)
  poolInit = true
}
