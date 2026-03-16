import { useParams, Link, useNavigate } from 'react-router-dom';
import { footerContent } from '../data/footerContent';
import LeadershipCard from './LeadershipCard';
import './InfoPage.css';

const InfoPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const page = footerContent[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleBackHome = (e) => {
    e.preventDefault();
    console.log('🔙 Navigating to HOME via handleBackHome');
    navigate('/');
  };

  if (!page) {
    return (
      <div className="info-page error">
        <div className="container">
          <h1 className="accent-gradient-text">404 - Page Not Found</h1>
          <p>We couldn't find the information you're looking for.</p>
          <button onClick={handleBackHome} className="btn-primary">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="info-page animate-fade-in">
      <div className="container">
        <header className="info-header">
          <button onClick={handleBackHome} className="back-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}>
            <span className="back-arrow">←</span> Back to Home
          </button>
          <h1 className="accent-gradient-text">{page.title}</h1>
        </header>

        <article className="info-content" dangerouslySetInnerHTML={{ __html: page.content }} />

        {slug === 'about-us' && <LeadershipCard />}
        
        <footer className="info-footer">
          <button onClick={handleBackHome} className="btn-secondary">Join the Waitlist</button>
        </footer>
      </div>
    </div>
  );
};

export default InfoPage;
