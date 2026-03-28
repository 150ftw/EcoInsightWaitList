import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative', 
      overflow: 'hidden',
      paddingTop: '80px' 
    }}>
      {/* Decorative background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'clamp(300px, 80vw, 600px)',
        height: 'clamp(300px, 80vw, 600px)',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        zIndex: -1,
        filter: 'blur(100px)',
        opacity: 0.5
      }} />

      <div className="container" style={{ textAlign: 'center', maxWidth: '1000px', padding: 'clamp(4rem, 10vh, 8rem) 1.5rem' }}>
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="glass-card" style={{ 
            padding: '0.5rem 1rem', 
            fontSize: 'clamp(0.8rem, 2vw, 1rem)', 
            fontWeight: 600, 
            color: 'var(--accent-primary)', 
            marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)', 
            display: 'inline-block', 
            borderRadius: '100px' 
          }}>
            ✨ Revolutionizing Indian Wealth Creation
          </span>
          <h1 style={{ 
            lineHeight: 1.1, 
            marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)', 
            animation: 'float 6s ease-in-out infinite',
            fontSize: 'clamp(2.2rem, 10vw, 5.5rem)'
          }}>
            AI That Decodes <br className="hide-on-mobile" />
            <span className="accent-gradient-text" style={{ paddingBottom: '0.2em' }}>NSE & BSE Markets</span>
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', 
            marginBottom: 'clamp(2.5rem, 6vw, 4rem)', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.6, 
            maxWidth: '800px', 
            margin: '0 auto clamp(2.5rem, 6vw, 4rem)', 
            opacity: 0.9 
          }}>
            Join the elite club of Indian investors leveraging institutional-grade AI. 
            From Nifty 50 to Small-cap gems, get high-conviction insights for the Bharat of tomorrow.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <button 
              className="btn-primary" 
              style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(2rem, 8vw, 4.5rem)', fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', width: 'auto', minWidth: 'min(300px, 100%)' }}
              onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Early Access
            </button>
            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="pulse-indicator"></div>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, margin: 0 }}>
                Join <span style={{ color: 'var(--accent-primary)' }}>1,582+</span> institutional investors already in queue
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
