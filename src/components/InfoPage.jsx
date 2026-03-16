import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { footerContent } from '../data/footerContent';
import LeadershipCard from './LeadershipCard';
import './InfoPage.css';

const InfoPage = () => {
  const { slug } = useParams();
  const page = footerContent[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!page) {
    return (
      <div className="info-page error">
        <div className="container">
          <h1 className="accent-gradient-text">404 - Page Not Found</h1>
          <p>We couldn't find the information you're looking for.</p>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="info-page animate-fade-in">
      <div className="container">
        <header className="info-header">
          <Link to="/" className="back-link">
            <span className="back-arrow">←</span> Back to Home
          </Link>
          <h1 className="accent-gradient-text">{page.title}</h1>
        </header>

        <article className="info-content" dangerouslySetInnerHTML={{ __html: page.content }} />

        {slug === 'about-us' && <LeadershipCard />}
        
        <footer className="info-footer">
          <Link to="/" className="btn-secondary">Join the Waitlist</Link>
        </footer>
      </div>
    </div>
  );
};

export default InfoPage;
