import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Link to="/">
                <img src={logo} alt="EcoInsight" />
              </Link>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <span className="accent-gradient-text">EcoInsight</span>
              </Link>
            </div>
            <p className="footer-description">
              Empowering investors with institutional-grade AI analysis for the modern market.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <Link to="/info/help-center" className="footer-link">Help Center</Link>
              <Link to="/info/knowledge-base" className="footer-link">Knowledge Base</Link>
              <Link to="/info/network-status" className="footer-link">Network Status</Link>
              <Link to="/info/security-advisories" className="footer-link">Security Advisories</Link>
            </div>
            
            <div className="footer-column">
              <Link to="/info/about-us" className="footer-link">About Us</Link>
              <Link to="/info/careers" className="footer-link">Careers</Link>
              <Link to="/info/partners" className="footer-link">Partners</Link>
              <Link to="/info/referral-program" className="footer-link">Referral Program</Link>
              <Link to="/info/contact" className="footer-link">Contact</Link>
            </div>

            <div className="footer-column">
              <Link to="/info/privacy-policy" className="footer-link">Privacy Policy</Link>
              <Link to="/info/terms-of-service" className="footer-link">Terms of Service</Link>
              <Link to="/info/acceptable-use-policy" className="footer-link">Acceptable Use Policy</Link>
              <Link to="/info/payment-refund" className="footer-link">Payment & Refund</Link>
              <Link to="/info/report-abuse" className="footer-link">Report Abuse</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} EcoInsight. All rights reserved. Made for Bharat 🇮🇳
        </div>
      </div>
    </footer>
  );
};

export default Footer;
