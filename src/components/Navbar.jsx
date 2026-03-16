import React from 'react';
import logo from '../assets/logo.svg';

const Navbar = () => {
  return (
    <nav className="navbar animate-fade-in" style={{ 
      padding: 'clamp(1.5rem, 4vw, 3rem) 0', 
      position: 'absolute', 
      top: 0, 
      width: '100%', 
      zIndex: 10 
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 1rem)' }}>
          <img src={logo} alt="EcoInsight" style={{ width: 'clamp(32px, 8vw, 48px)', height: 'clamp(32px, 8vw, 48px)' }} />
          <span className="accent-gradient-text" style={{ fontSize: 'clamp(1.25rem, 5vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>EcoInsight</span>
        </div>
        <button 
          className="btn-primary" 
          style={{ padding: 'clamp(0.6rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)', fontSize: 'clamp(0.85rem, 2vw, 1.1rem)' }}
          onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Join Waitlist
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
