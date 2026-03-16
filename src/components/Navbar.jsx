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
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 1rem)', textDecoration: 'none' }}>
          <img src={logo} alt="EcoInsight" style={{ width: 'clamp(32px, 8vw, 48px)', height: 'clamp(32px, 8vw, 48px)' }} />
          <span className="accent-gradient-text" style={{ fontSize: 'clamp(1.25rem, 5vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>EcoInsight</span>
        </Link>
        <button 
          className="btn-primary" 
          style={{ padding: 'clamp(0.6rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)', fontSize: 'clamp(0.85rem, 2vw, 1.1rem)' }}
          onClick={handleJoinClick}
        >
          Join Waitlist
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
