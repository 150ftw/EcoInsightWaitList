import React from 'react';
import founderImg from '../assets/founder/shivam_new.jpg';
import './FounderSection.css';

const FounderSection = () => {
  return (
    <section id="founder-section" className="founder-section">
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="founder-card-inner">
          <div style={{ flexShrink: 0 }}>
            <img
              src={founderImg}
              alt="Founder"
              style={{
                width: 'clamp(80px, 15vw, 100px)',
                height: 'clamp(80px, 15vw, 100px)',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 'min(300px, 100%)', textAlign: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '0.75rem',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>Founder —</span>
              <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.15rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.01em', color: 'white' }}>Shivam</h3>
            </div>
            <p style={{
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.8,
              fontSize: 'clamp(1rem, 3.5vw, 1.15rem)',
              marginBottom: '2rem',
              fontWeight: 500,
              paddingLeft: '0',
              textAlign: 'center',
              fontStyle: 'italic',
              maxWidth: '700px',
              margin: '0 auto 2rem auto'
            }}>
              "India’s markets are unlike any other — dynamic, complex, and full of untapped opportunity. Yet the tools to understand them have never truly been built for us. EcoInsight changes that. Built by Indians, for Indians — delivering clarity, precision, and real financial intelligence. This is not just access. This is empowerment. Welcome to the future of Bharat’s investing."
            </p>
            <div className="founder-links">
              <a
                href="https://www.instagram.com/ecoinsight.ai"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  padding: '0.5rem 1rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
              >
                Project Journey →
              </a>
              <a
                href="https://www.instagram.com/shiv_mmm"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  padding: '0.5rem 1rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
              >
                Connect with Me →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
