import React from 'react';
import './VisionSection.css';

const timeline = [
  {
    period: "Q1 2026",
    title: "EcoInsight Waitlist & Core Engine",
    description: "Opening exclusive slots for the initial 5,000 Beta testers. Core Fin-AI model training finalized.",
    status: "active"
  },
  {
    period: "Q2 2026",
    title: "Sector Alpha Live",
    description: "Real-time insights for Top 5 Indian sectors (Tech, Green Energy, BFSI). Direct NSE/BSE low-latency pipes.",
    status: "upcoming"
  },
  {
    period: "Q3 2026",
    title: "Global Macro Core",
    description: "Integrating global macro sentiment and cross-border on-chain capital flow analytics.",
    status: "upcoming"
  },
  {
    period: "Q4 2026",
    title: "HNI Portfolio Orchestration",
    description: "Automated institutional-grade portfolio rebalancing based on AI-governed signals.",
    status: "upcoming"
  }
];

const VisionSection = () => {
  return (
    <section className="vision-section">
      <div className="container">
        <div className="section-header animate-fade-in">
          <h2 className="gradient-text">The 12-Month Vision</h2>
          <p className="section-subtitle">We are not just building a tool; we are building the future of Bharat's financial intelligence.</p>
        </div>

        <div className="timeline-container">
          {timeline.map((item, index) => (
            <div key={index} className={`timeline-item animate-fade-in ${item.status}`} style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-card">
                <span className="timeline-period">{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
