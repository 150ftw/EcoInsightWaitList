import React from 'react';
import { newsData } from '../data/newsData';
import './NewsPage.css';

const NewsPage = () => {
  return (
    <div className="news-page">
      <div className="container">
        <div className="news-page-header">
          <h1 className="news-page-title">
            Bharat <span className="accent-gradient-text">Market Intelligence</span>
          </h1>
          <p className="news-page-subtitle">
            Real-time insights from across the Indian financial ecosystem. Stock markets, Crypto, and Policy updates.
          </p>
        </div>

        <div className="news-grid full-grid">
          {newsData.map((news) => (
            <a 
              key={news.id} 
              href={news.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="news-card glass-card clickable"
            >
              <div className="news-card-top">
                <div className="news-icon">
                  {news.category === 'Stocks' ? '📈' : '₿'}
                </div>
                <div className="news-meta">
                  {news.time} • {news.source}
                </div>
              </div>
              <h3 className="news-card-title">{news.title}</h3>
              <p className="news-card-description">{news.description}</p>
              <div className="view-source">
                Source: {news.source} <span>↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
