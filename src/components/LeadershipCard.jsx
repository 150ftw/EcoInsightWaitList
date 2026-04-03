import React from 'react';
import founderImg from '../assets/founder/shivam_new.jpg';
import anshImg from '../assets/team/ansh.jpg';
import './LeadershipCard.css';

const teamMembers = [
  {
    name: 'Shivam Sharma',
    role: 'DIRECTOR & FOUNDER',
    image: founderImg,
    badge: 'ECOINSIGHT AI (OPC) PRIVATE LIMITED',
    icon: '💻'
  },
  {
    name: 'Ansh Tripathi',
    role: 'THE SOCIAL MEDIA GUY',
    image: anshImg,
    badge: 'ECOINSIGHT AI (OPC) PRIVATE LIMITED',
    icon: '💻'
  }
];

const LeadershipCard = () => {
  return (
    <div className="leadership-section">
      <div className="leadership-header">
        <h2 className="leadership-title">Leadership</h2>
        <p className="leadership-subtitle">Meet the vision behind EcoInsight</p>
      </div>

      <div className="leadership-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="leadership-card">
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="founder-avatar-wrapper">
                <img src={member.image} alt={member.name} className="founder-avatar" />
              </div>
              
              <h3 className="founder-name">{member.name}</h3>
              <p className="founder-role">{member.role}</p>

              <div className="corporate-badge">
                <span className="badge-icon">{member.icon}</span>
                <span className="badge-text">{member.badge}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadershipCard;

