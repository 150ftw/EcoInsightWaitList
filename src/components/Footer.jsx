import React from 'react';
import logo from '../assets/logo.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logo} alt="EcoInsight" />
              <span className="accent-gradient-text">EcoInsight</span>
            </div>
            <p className="footer-description">
              Empowering investors with institutional-grade AI analysis for the modern market.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Knowledge Base</a>
              <a href="#" className="footer-link">Network Status</a>
              <a href="#" className="footer-link">Security Advisories</a>
            </div>
            
            <div className="footer-column">
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Partners</a>
              <a href="#" className="footer-link">Referral Program</a>
              <a href="#" className="footer-link">Contact</a>
            </div>

            <div className="footer-column">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Acceptable Use Policy</a>
              <a href="#" className="footer-link">Payment & Refund</a>
              <a href="#" className="footer-link">Report Abuse</a>
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
