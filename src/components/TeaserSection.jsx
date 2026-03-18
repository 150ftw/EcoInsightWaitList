import React from 'react';
import './TeaserSection.css';

const teaserQuarters = [
  {
    period: "Q1 2026",
    title: "EcoInsight Terminal",
    description: "Institutional-grade alpha, refined for clarity. Exclusive release slots are being allocated.",
    badge: "Active Phase"
  },
  {
    period: "Q2 2026",
    title: "Sector Alpha Live",
    description: "Real-time insights for Top 5 Indian sectors. Direct NSE/BSE low-latency pipes.",
    badge: "Upcoming"
  },
  {
    period: "Q3 2026",
    title: "Global Macro Core",
    description: "Integrating global macro sentiment and cross-border on-chain capital flow analytics.",
    badge: "Upcoming"
  },
  {
    period: "Q4 2026",
    title: "HNI Orchestration",
    description: "Automated institutional-grade portfolio rebalancing based on AI-governed signals.",
    badge: "Upcoming"
  }
];

const TeaserSection = () => {
  return (
    <section className="teaser-section">
      <div className="container">
        <div className="section-header animate-fade-in">
          <h2 className="gradient-text">The Engine is Humming</h2>
          <p className="section-subtitle">A glimpse into the proprietary EcoInsight dashboard. 12 months of high-conviction roadmap.</p>
        </div>

        <div className="teaser-grid animate-fade-in">
          {teaserQuarters.map((q, index) => (
            <div key={index} className="teaser-item">
              <div className="glass-card teaser-mockup">
                <div className="mockup-overlay">
                  <div className="coming-soon-badge">{q.period}: {q.badge}</div>
                  <h3>{q.title}</h3>
                  <p>{q.description}</p>
                  {index === 0 && (
                    <button className="btn-secondary small" onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}>
                      Priority Access
                    </button>
                  )}
                </div>
                {/* The "Blurred" UI Preview */}
                <div className="blurred-ui">
                  <div className="ui-header"></div>
                  <div className="ui-grid">
                    <div className="ui-sidebar"></div>
                    <div className="ui-main">
                      <div className={`ui-chart-area q${index + 1}`}></div>
                      <div className="ui-insight-strip"></div>
                      <div className="ui-feed"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeaserSection;

