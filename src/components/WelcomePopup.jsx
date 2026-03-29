import React, { useState, useEffect } from 'react';
import './WelcomePopup.css';

const WelcomePopup = () => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds
    const timer = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => setVisible(false), 350);
  };

  if (!visible) return null;

  return (
    <div
      className={`welcome-popup-overlay ${exiting ? 'exiting' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) handleDismiss(); }}
    >
      <div className="welcome-popup-card premium-launch-theme" onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
      }}>
        <div className="welcome-popup-glow" />
        <div className="mouse-follow-glow" />

        <button className="welcome-popup-close" onClick={handleDismiss} aria-label="Close popup">
          ✕
        </button>

        <div className="welcome-popup-hero">
          <img 
            src="/assets/futuristic_ai_rocket_3d.png" 
            alt="EcoInsight AI Rocket" 
            className="hero-launch-image"
          />
        </div>

        <div className="social-proof-banner">
          <span className="live-pulse-dot" />
          Joining 5,420+ Early Investors
        </div>

        <div className="welcome-popup-badge">Economic Intelligence 2.0</div>

        <h2>EcoInsightAI Is Almost Live!</h2>

        <p className="welcome-popup-desc">
          The future of Indian investing is nearly here. Get ready for 
          institutional-grade AI intelligence at your fingertips.
        </p>

        <a
          href="https://www.ecoinsight.online"
          target="_blank"
          rel="noopener noreferrer"
          className="welcome-popup-cta premium-pulse"
        >
          Explore Elite Access
          <span className="welcome-popup-cta-arrow">→</span>
        </a>

        <button className="welcome-popup-skip" onClick={handleDismiss}>
          Continue to the Waitlist Page
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;
