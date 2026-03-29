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
      <div className="welcome-popup-card">
        <div className="welcome-popup-glow" />

        <button className="welcome-popup-close" onClick={handleDismiss} aria-label="Close popup">
          ✕
        </button>

        <div className="welcome-popup-icon">🚀</div>
        <div className="welcome-popup-badge">We're Live</div>

        <h2>EcoInsight Is Now Live!</h2>

        <p className="welcome-popup-desc">
          Our AI-powered platform for Indian investors is officially here.
          Experience real-time market intelligence, institutional-grade analysis, and more.
        </p>

        <a
          href="https://www.ecoinsight.online"
          target="_blank"
          rel="noopener noreferrer"
          className="welcome-popup-cta"
        >
          Visit EcoInsight
          <span className="welcome-popup-cta-arrow">→</span>
        </a>

        <button className="welcome-popup-skip" onClick={handleDismiss}>
          Continue to Waitlist Page
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;
