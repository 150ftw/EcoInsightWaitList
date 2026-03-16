import React from 'react';
import './ProblemStatement.css';

const ProblemStatement = () => {
  return (
    <section className="problem-statement">
      <div className="container">
        <div className="problem-grid">
          <div className="problem-text animate-fade-in">
            <h2 className="gradient-text">The Problem: Alpha is Drowning in Noise</h2>
            <p className="problem-description">
              Today's investor isn't suffering from a lack of information. They are suffering 
              from an <strong>excess of it</strong>.
            </p>
            <div className="noise-points">
              <div className="noise-item">
                <span className="noise-icon">✕</span>
                <div>
                  <h4>10,000+ Daily News Tickers</h4>
                  <p>Generic news bots repeating the same headlines without context.</p>
                </div>
              </div>
              <div className="noise-item">
                <span className="noise-icon">✕</span>
                <div>
                  <h4>Static Knowledge Cutoffs</h4>
                  <p>Standard AI tools are months behind the live Indian market pulse.</p>
                </div>
              </div>
              <div className="noise-item">
                <span className="noise-icon">✕</span>
                <div>
                  <h4>Chart Blindness</h4>
                  <p>Technical indicators that tell you what happened, never <em>why</em> it happened.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="solution-highlight animate-fade-in">
            <div className="glass-card solution-card">
              <div className="eco-badge">The EcoInsight Edge</div>
              <h3>We don't summarize. We contextualize.</h3>
              <p>
                EcoInsight parses millions of on-chain wallet movements and off-chain fiscal 
                maneuvers to give you the 3-5 insights that actually move the needle.
              </p>
              <div className="signal-bar">
                <div className="signal-fill"></div>
              </div>
              <span className="signal-label">98% Signal-to-Noise Ratio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
