import React, { useState, useEffect } from 'react';
import { fallbackNewsData } from '../data/newsData';
import { fetchLiveNews } from '../utils/fetchNews';
import './NewsPage.css';

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadNews = async () => {
      setLoading(true);
      const liveNews = await fetchLiveNews();
      if (mounted) {
        if (liveNews && liveNews.length > 0) {
          setNewsItems(liveNews);
        } else {
          setNewsItems(fallbackNewsData);
        }
        setLoading(false);
      }
    };

    loadNews();

    // Refresh every 5 minutes (300000 ms)
    const interval = setInterval(loadNews, 300000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

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
          {loading && newsItems.length === 0 ? (
            Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="news-card glass-card skeleton-loader" style={{ height: '200px', opacity: 0.5, animation: 'pulse 1.5s infinite' }}></div>
            ))
          ) : (
            newsItems.map((news) => (
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
          )))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
