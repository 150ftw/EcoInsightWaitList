import React from 'react';
import { newsData } from '../data/newsData';
import './NewsSection.css';

const NewsSection = () => {
  return (
    <section className="news-section">
      <div className="container">
        <div className="news-header">
          <h2 className="news-title">
            News of the Hour <span>›</span>
          </h2>
        </div>

        <div className="news-grid">
          {newsData.map((news) => (
            <div key={news.id} className="news-card glass-card">
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
            </div>
          ))}
        </div>

        <a href="#" className="keep-reading" onClick={(e) => e.preventDefault()}>
          Keep reading <span>›</span>
        </a>
      </div>
    </section>
  );
};

export default NewsSection;
