import React from 'react';

const HypeSection = () => {
  return (
    <section style={{ padding: '160px 0', textAlign: 'center', position: 'relative' }}>
      <div className="container">
        <div className="glass-card animate-fade-in" style={{ padding: '8rem 4rem', overflow: 'visible' }}>
          {/* Decorative gradients */}
          <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)', filter: 'blur(100px)', opacity: 0.15, zIndex: -1 }} />
          <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)', filter: 'blur(100px)', opacity: 0.15, zIndex: -1 }} />
 
          <h2 style={{ fontSize: '4rem', marginBottom: '2.5rem', position: 'relative', lineHeight: 1.1 }}>
            Built for the <br />
            <span className="accent-gradient-text">Top 1% of Indian Traders</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto 5rem', position: 'relative', opacity: 0.9, lineHeight: 1.6 }}>
            The Dalal Street never sleeps, and neither does EcoInsight. Join the inner circle receiving real-time AI conviction scores for every trade.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>1.5k+</div>
              <div style={{ fontSize: '1.1rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 700 }}>Early Believers</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>₹500Cr+</div>
              <div style={{ fontSize: '1.1rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 700 }}>Portfolio Insights</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>92%</div>
              <div style={{ fontSize: '1.1rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 700 }}>Alpha Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HypeSection;
