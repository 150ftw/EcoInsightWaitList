import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fallbackNewsData } from '../data/newsData';
import { fetchLiveNews } from '../utils/fetchNews';
import './NewsSection.css';

const NewsSection = () => {
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
    <section className="news-section">
      <div className="container">
        <div className="news-header">
          <h2 className="news-title">
            News of the Hour <span>›</span>
          </h2>
        </div>

        <div className="news-grid">
          {loading && newsItems.length === 0 ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="news-card glass-card skeleton-loader" style={{ height: '200px', opacity: 0.5, animation: 'pulse 1.5s infinite' }}></div>
            ))
          ) : (
            newsItems.slice(0, 6).map((news) => (
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
            </a>
          )))}
        </div>

        <Link to="/news" className="keep-reading">
          Keep reading <span>›</span>
        </Link>
      </div>
    </section>
  );
};

export default NewsSection;
