import React from 'react';
import logo from '../assets/logo.svg';

const Footer = () => {
  return (
    <footer style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)', marginTop: '80px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4rem' }}>
          <div>
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <img src={logo} alt="EcoInsight" style={{ width: '40px', height: '40px' }} />
              <span className="accent-gradient-text" style={{ fontSize: '1.75rem', fontWeight: 800 }}>EcoInsight</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '400px', opacity: 0.8, lineHeight: 1.6 }}>
              Empowering investors with institutional-grade AI analysis for the modern market.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '6rem' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Social</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="https://instagram.com/ecoinsight.ai" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '1.1rem' }}>Instagram</a>
                <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '1.1rem' }}>Twitter / X</a>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Contact</h4>
              <a href="mailto:support@ecoinsight.online" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '1.1rem' }}>support@ecoinsight.online</a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.03)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1rem' }}>
          © {new Date().getFullYear()} EcoInsight. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
