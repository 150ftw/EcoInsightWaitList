import React from 'react';
import logo from '../assets/logo.svg';

const Navbar = () => {
  return (
    <nav className="navbar animate-fade-in" style={{ padding: '3rem 0', position: 'absolute', top: 0, width: '100%', zIndex: 10 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={logo} alt="EcoInsight" style={{ width: '48px', height: '48px' }} />
          <span className="accent-gradient-text" style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em' }}>EcoInsight</span>
        </div>
        <button 
          className="btn-primary" 
          style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
          onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Join Waitlist
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
