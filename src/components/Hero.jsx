import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        zIndex: -1,
        filter: 'blur(100px)',
        opacity: 0.5
      }} />

      <div className="container" style={{ textAlign: 'center', maxWidth: '1000px', padding: '6rem 2rem' }}>
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="glass-card" style={{ padding: '0.6rem 1.25rem', fontSize: '1rem', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '2.5rem', display: 'inline-block', borderRadius: '100px' }}>
            ✨ Revolutionizing Indian Wealth Creation
          </span>
          <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)', lineHeight: 0.95, marginBottom: '2.5rem', animation: 'float 6s ease-in-out infinite' }}>
            AI That Decodes <br />
            <span className="accent-gradient-text" style={{ paddingBottom: '0.2em' }}>NSE & BSE Markets</span>
          </h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '4rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto 4rem', opacity: 0.9 }}>
            Join the elite club of Indian investors leveraging institutional-grade AI. 
            From Nifty 50 to Small-cap gems, get high-conviction insights for the Bharat of tomorrow.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <button 
              className="btn-primary" 
              style={{ padding: '1.25rem 4rem', fontSize: '1.3rem' }}
              onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Early Access
            </button>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
              Join 1,500+ investors waiting for the Alpha Launch
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
