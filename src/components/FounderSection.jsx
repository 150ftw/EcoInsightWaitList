import React from 'react';
import founderImg from '../assets/founder/shivam.jpg';

const FounderSection = () => {
  return (
    <section id="founder-section" style={{ padding: 'clamp(2rem, 5vw, 40px) 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          padding: 'clamp(2rem, 5vw, 3.5rem)', 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: 'clamp(1.5rem, 5vw, 3rem)', 
          maxWidth: '850px', 
          width: '100%', 
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
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
              color: 'rgba(255, 255, 255, 0.7)', 
              lineHeight: 1.7, 
              fontSize: 'clamp(0.95rem, 3vw, 1.05rem)', 
              marginBottom: '1.5rem', 
              fontStyle: 'italic', 
              borderLeft: 'none', 
              paddingLeft: '0',
              textAlign: 'center'
            }}>
              "I built EcoInsight because I believe Dalal Street belongs to everyone, not just the elite. Seeing you here today isn't just about a waitlist—it's about a shared dream. Every design choice, every line of code, it all comes from wanting to see you win. I promise to fight for your success like it's my own. Welcome to the elite."
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="https://www.instagram.com/ecoinsight.ai"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.5)', 
                  textDecoration: 'none', 
                  fontSize: '0.85rem', 
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
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
                  fontSize: '0.85rem', 
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
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
