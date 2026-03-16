import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import HypeSection from './components/HypeSection'
import WaitlistSignup from './components/WaitlistSignup'
import FounderSection from './components/FounderSection'
import Footer from './components/Footer'
import InfoPage from './components/InfoPage'
import DarkVeil from './components/Backgrounds/DarkVeil/DarkVeil'

const LandingPage = () => {
  useEffect(() => {
    console.log('🏁 LANDING PAGE MOUNTED');
  }, []);
  
  return (
    <>
      <Hero />
      <Benefits />
      <HypeSection />
      <WaitlistSignup />
      <FounderSection />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('🛣️ ROUTE CHANGED:', location.pathname);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="app-landing" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, position: 'relative', zIndex: 5 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/info/:slug" element={<InfoPage />} />
        </Routes>
      </main>

      <Footer style={{ position: 'relative', zIndex: 5 }} />

      {/* Global Background Element - Moved to end of DOM for safety */}
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
    </div>
  );
}

export default App
