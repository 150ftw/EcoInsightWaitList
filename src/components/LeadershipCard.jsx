import React from 'react';
import founderImg from '../assets/founder/shivam_new.jpg';
import './LeadershipCard.css';

const LeadershipCard = () => {
  return (
    <div className="leadership-section">
      <div className="leadership-header">
        <h2 className="leadership-title">Leadership</h2>
        <p className="leadership-subtitle">Meet the vision behind EcoInsight</p>
      </div>

      <div className="leadership-card">
        <div className="card-glow"></div>
        <div className="card-content">
          <div className="founder-avatar-wrapper">
            <img src={founderImg} alt="Shivam Sharma" className="founder-avatar" />
          </div>
          
          <h3 className="founder-name">Shivam Sharma</h3>
          <p className="founder-role">DIRECTOR & FOUNDER</p>

          <div className="corporate-badge">
            <span className="badge-icon">💻</span>
            <span className="badge-text">ECOINSIGHT AI (OPC) PRIVATE LIMITED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipCard;
