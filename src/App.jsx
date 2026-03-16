import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import HypeSection from './components/HypeSection'
import WaitlistSignup from './components/WaitlistSignup'
import FounderSection from './components/FounderSection'
import Footer from './components/Footer'
import DarkVeil from './components/Backgrounds/DarkVeil/DarkVeil'

function App() {
  return (
    <div className="app-landing" style={{ position: 'relative' }}>
      {/* Global Background Element */}
      <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          pointerEvents: 'none',
          overflow: 'hidden'
      }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.03}
          scanlineIntensity={0.1}
          speed={0.3}
          scanlineFrequency={2}
          warpAmount={0.05}
          resolutionScale={1}
        />
      </div>

      <Navbar />
      <Hero />
      <Benefits />
      <HypeSection />
      <WaitlistSignup />
      <FounderSection />
      <Footer />
    </div>
  )
}

export default App
