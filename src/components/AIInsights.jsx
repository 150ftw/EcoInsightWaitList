import React from 'react';
import './AIInsights.css';

const insights = [
  {
    title: "Fiscal Policy Simulation",
    description: "Predict market impacts of RBI rate hikes or budget changes before the news hits the ticker.",
    tag: "Macro"
  },
  {
    title: "Sector Alpha Tech",
    description: "Identify emerging tech trends in the Indian ecosystem (EV, Green Energy, Fintech) using on-chain sentiment.",
    tag: "Trend"
  },
  {
    title: "On-Chain Capital Flows",
    description: "Track where the 'Smart Money' is moving in real-time across institutional on-chain wallets.",
    tag: "Liquidity"
  }
];

const AIInsights = () => {
  return (
    <section className="ai-insights">
      <div className="container">
        <div className="section-header animate-fade-in">
          <h2 className="gradient-text">Why EcoInsight?</h2>
          <p className="section-subtitle">Beyond simple charts. Beyond generic chat. Actionable intelligence for India's elite investors.</p>
        </div>

        <div className="insights-grid">
          {insights.map((insight, index) => (
            <div key={index} className="glass-card insight-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="insight-tag">{insight.tag}</div>
              <h3>{insight.title}</h3>
              <p>{insight.description}</p>
            </div>
          ))}
        </div>

        <div className="comparison-container animate-fade-in">
          <h3 className="comparison-title">The Competitive Edge</h3>
          <div className="glass-card comparison-card">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>EcoInsight AI</th>
                  <th>ChatGPT / TradingView</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Real-Time Financial Data</td>
                  <td className="check">✓ (Live NSE/BSE)</td>
                  <td className="cross">✕ (Knowledge Cutoffs)</td>
                </tr>
                <tr>
                  <td>On-Chain Analytics</td>
                  <td className="check">✓ (Institutional Wallets)</td>
                  <td className="cross">✕ (Retail Only)</td>
                </tr>
                <tr>
                  <td>Fiscal Policy Impact</td>
                  <td className="check">✓ (Predictive)</td>
                  <td className="cross">✕ (Reactive)</td>
                </tr>
                <tr>
                  <td>Actionable Trade Alpha</td>
                  <td className="check">✓ (High Signal)</td>
                  <td className="cross">✕ (Generic Output)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIInsights;
