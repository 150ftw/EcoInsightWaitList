import React from 'react';
import { useMarketData } from '../hooks/useMarketData';
import './LiveMarketPulse.css';

const LiveMarketPulse = () => {
  const { marketData, loading } = useMarketData();

  if (loading) {
    return (
      <div className="market-pulse-bar skeleton-pulse-bar">
        <div className="pulse-skeleton-line"></div>
      </div>
    );
  }

  // Duplicate items fully for seamless scrolling marquee
  const displayItems = [...marketData, ...marketData, ...marketData];

  return (
    <div className="market-pulse-bar premium-glass">
      <div className="pulse-gradient-overlay left"></div>
      
      <div className="live-badge premium-badge">
        <span className="pulse-dot"></span>
        LIVE <span className="hide-on-mobile">MARKET</span> PULSE
      </div>
        
      <div className="ticker-wrapper">
        <div className="ticker-content premium-scroll">
          {displayItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="ticker-item">
              <span className="ticker-label">{item.label}</span>
              <span className={`ticker-value ${item.trend} glow-text`}>
                {item.value}
                <span className="ticker-change">
                  {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '♦'} {item.changePercent}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pulse-gradient-overlay right"></div>
    </div>
  );
};

export default LiveMarketPulse;
