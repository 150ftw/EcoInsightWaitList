import React from 'react';
import './TeaserSection.css';

const TeaserSection = () => {
  return (
    <section className="teaser-section">
      <div className="container">
        <div className="section-header animate-fade-in">
          <h2 className="gradient-text">The Engine is Humming</h2>
          <p className="section-subtitle">A glimpse into the proprietary EcoInsight dashboard. Institutional-grade alpha, refined for clarity.</p>
        </div>

        <div className="teaser-container animate-fade-in">
          <div className="glass-card teaser-mockup">
            <div className="mockup-overlay">
              <div className="coming-soon-badge">Coming Soon: Q1 2026</div>
              <h3>Access the Terminal</h3>
              <p>Exclusive release slots are being allocated. Invite 3 friends for priority onboarding.</p>
              <button className="btn-secondary" onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Request Priority Access
              </button>
            </div>
            {/* The "Blurred" UI Preview */}
            <div className="blurred-ui">
              <div className="ui-header"></div>
              <div className="ui-grid">
                <div className="ui-sidebar"></div>
                <div className="ui-main">
                  <div className="ui-chart-area"></div>
                  <div className="ui-insight-strip"></div>
                  <div className="ui-feed"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeaserSection;
