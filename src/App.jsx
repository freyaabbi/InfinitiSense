import { Suspense, lazy } from 'react'
import { AppProvider } from './lib/store.jsx'
import Nav from './components/Nav.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Chatbot from './components/Chatbot.jsx'
import MiniGame from './components/MiniGame.jsx'

import Hero from './sections/Hero.jsx'
import Problem from './sections/Problem.jsx'
import Product from './sections/Product.jsx'
import Features from './sections/Features.jsx'
import RainMode from './sections/RainMode.jsx'
import Comparison from './sections/Comparison.jsx'
import Segments from './sections/Segments.jsx'
import Contact from './sections/Contact.jsx'

// Chart-heavy sections lazy-loaded (recharts split into its own chunk)
const FleetDashboard = lazy(() => import('./sections/FleetDashboard.jsx'))
const ROICalculator = lazy(() => import('./sections/ROICalculator.jsx'))
const Market = lazy(() => import('./sections/Market.jsx'))
const GrowthProjection = lazy(() => import('./sections/GrowthProjection.jsx'))

function SectionFallback() {
  return (
    <div className="section-pad">
      <div className="container-max">
        <div className="h-64 animate-pulse rounded-panel bg-white/5" />
      </div>
    </div>
  )
}

function scrollToDemo() {
  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  return (
    <AppProvider>
      <ProgressBar />
      <CustomCursor />
      <Nav />

      <main>
        <Hero onSeeDemo={scrollToDemo} />
        <Problem />
        <Product />
        <Features />
        <RainMode />
        <Suspense fallback={<SectionFallback />}>
          <FleetDashboard />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ROICalculator />
        </Suspense>
        <Comparison />
        <Suspense fallback={<SectionFallback />}>
          <Market />
        </Suspense>
        <Segments />
        <Suspense fallback={<SectionFallback />}>
          <GrowthProjection />
        </Suspense>
        <Contact />
      </main>

      <Chatbot />
      <MiniGame />
    </AppProvider>
  )
}
