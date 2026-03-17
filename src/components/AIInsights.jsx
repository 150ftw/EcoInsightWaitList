import React from 'react';
import './AIInsights.css';

const insights = [
  {
    title: "Real-Time Market Signals",
    description: "Instant high-conviction signals for NSE & BSE stocks. From Nifty 50 breakouts to Small-cap volatility alerts.",
    tag: "Equities"
  },
  {
    title: "Full Crypto On-Chain Alpha",
    description: "Track institutional wallet movements and liquidity rotations across major chains before the retail surge.",
    tag: "Crypto"
  },
  {
    title: "Macro Economic Triggers",
    description: "Direct impact analysis of RBI policy shifts, fiscal budget maneuvers, and global interest rate trends.",
    tag: "Economy"
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

            {/* Mobile Optimized View */}
            <div className="mobile-comparison-list">
              {[
                { f: "Real-Time Data", e: "✓ Live NSE/BSE", o: "✕ Cutoffs" },
                { f: "On-Chain", e: "✓ Institutional", o: "✕ Retail Only" },
                { f: "Fiscal Impact", e: "✓ Predictive", o: "✕ Reactive" },
                { f: "Trade Alpha", e: "✓ High Signal", o: "✕ Generic" }
              ].map((item, id) => (
                <div key={id} className="mobile-comparison-item">
                  <h4>{item.f}</h4>
                  <div className="comparison-row">
                    <span className="comparison-label">EcoInsight</span>
                    <span className="check">{item.e}</span>
                  </div>
                  <div className="comparison-row">
                    <span className="comparison-label">Others</span>
                    <span className="cross">{item.o}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIInsights;
