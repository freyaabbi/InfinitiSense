import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('night') // 'night' | 'day'
  const [sound, setSound] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReducedMotion(mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'day') {
      root.classList.add('theme-day')
      root.classList.remove('dark')
    } else {
      root.classList.remove('theme-day')
      root.classList.add('dark')
    }
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      isDay: theme === 'day',
      toggleTheme: () => setTheme((t) => (t === 'day' ? 'night' : 'day')),
      sound,
      toggleSound: () => setSound((s) => !s),
      reducedMotion,
    }),
    [theme, sound, reducedMotion],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
