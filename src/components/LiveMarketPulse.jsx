import React from 'react';
import './LiveMarketPulse.css';

const LiveMarketPulse = () => {
  const marketData = [
    { label: 'Nifty', value: '+0.82%', trend: 'up' },
    { label: 'Bitcoin', value: '-1.2%', trend: 'down' },
    { label: 'Rupee Trend', value: 'Stable', trend: 'neutral' }
  ];

  return (
    <div className="market-pulse-bar">
      <div className="market-pulse-container">
        <div className="live-badge">
          <span className="pulse-dot"></span>
          LIVE MARKET PULSE <span className="preview-tag">(Preview Feature)</span>
        </div>
        
        <div className="ticker-wrapper">
          <div className="ticker-content">
            {marketData.map((item, index) => (
              <div key={index} className="ticker-item">
                <span className="ticker-label">{item.label}:</span>
                <span className={`ticker-value ${item.trend}`}>
                  {item.trend === 'up' && '↑ '}
                  {item.trend === 'down' && '↓ '}
                  {item.value}
                </span>
              </div>
            ))}
            {/* Duplicating for seamless loop if needed, though three items might just fit */}
            {marketData.map((item, index) => (
              <div key={`dup-${index}`} className="ticker-item hide-on-desktop">
                <span className="ticker-label">{item.label}:</span>
                <span className={`ticker-value ${item.trend}`}>
                  {item.trend === 'up' && '↑ '}
                  {item.trend === 'down' && '↓ '}
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="market-cta">
          🎯 Real-time insights coming soon
        </div>
      </div>
    </div>
  );
};

export default LiveMarketPulse;
