import React from 'react';
import './TrustSection.css';

const TrustSection = () => {
  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-grid">
          <div className="trust-content animate-fade-in">
            <h2 className="gradient-text">Institutional Grade Security</h2>
            <p className="trust-description">
              EcoInsight isn't just a bot. It's a financial engine built on the foundations 
              of security and precision.
            </p>
            
            <div className="trust-details">
              <div className="trust-item">
                <h4>Market Data Sources</h4>
                <p>Direct low-latency pipes to NSE, BSE, and global macro-economic indices.</p>
              </div>
              <div className="trust-item">
                <h4>Security Protocols</h4>
                <p>256-bit AES encryption. Your insights and data access are strictly private.</p>
              </div>
              <div className="trust-item">
                <h4>Fine-Tuned AI</h4>
                <p>Running on proprietary models fine-tuned specifically for Indian financial semantics.</p>
              </div>
            </div>
          </div>

          <div className="trust-visual animate-fade-in">
            <div className="glass-card status-card">
              <div className="status-header">
                <div className="status-indicator"></div>
                <span>Engine Synchronized</span>
              </div>
              <div className="status-metrics">
                <div className="metric">
                  <span className="label">Uptime</span>
                  <span className="value">99.98%</span>
                </div>
                <div className="metric">
                  <span className="label">Accuracy</span>
                  <span className="value">Gold Standard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
