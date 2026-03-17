import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleJoinClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      // Give a tiny bit of time for the home page to mount before scrolling
      setTimeout(() => {
        document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar animate-fade-in" style={{ 
      padding: '1.5rem 0', 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      zIndex: 9999,
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        gap: '0.5rem', /* Reduced for mobile */
        padding: '0 1rem' /* Tighter mobile padding */
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <img src={logo} alt="EcoInsight" style={{ width: 'clamp(28px, 6vw, 40px)', height: 'clamp(28px, 6vw, 40px)' }} />
          <span className="accent-gradient-text" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>EcoInsight</span>
        </Link>
        <button 
          className="btn-primary" 
          style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', minWidth: 'auto' }}
          onClick={handleJoinClick}
        >
          Join Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
