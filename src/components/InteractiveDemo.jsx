import React, { useState, useEffect } from 'react';
import './InteractiveDemo.css';

const steps = [
  { label: "Initializing Fin-Core...", duration: 800 },
  { label: "Scanning NSE/BSE Order Books...", duration: 1200 },
  { label: "Parsing RBI Meeting Minutes (March 2026)...", duration: 1500 },
  { label: "Analyzing Institutional On-Chain Flows...", duration: 1000 },
  { label: "Generating High-Conviction Alpha...", duration: 800 }
];

const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].duration);
      return () => clearTimeout(timer);
    } else {
      setIsProcessing(false);
      setTimeout(() => setShowResult(true), 500);
    }
  }, [currentStep]);

  const resetDemo = () => {
    setCurrentStep(0);
    setShowResult(false);
    setIsProcessing(true);
  };

  return (
    <section className="interactive-demo">
      <div className="container">
        <div className="section-header">
          <h2 className="gradient-text">See the Engine in Action</h2>
          <p className="section-subtitle">A live simulation of how EcoInsight processes the Indian market pulse.</p>
        </div>

        <div className="demo-window glass-card animate-fade-in">
          <div className="window-header">
            <div className="window-dots">
              <span></span><span></span><span></span>
            </div>
            <div className="window-title">EcoInsight AI Core v3.1</div>
            {showResult && <button className="reset-btn" onClick={resetDemo}>Re-Run Analysis</button>}
          </div>

          <div className="window-content">
            <div className="query-line">
              <span className="prompt">&gt;</span>
              <span className="query-text">Analyze potential RBI Repo Rate impact on Tech sector liquidity.</span>
            </div>

            <div className="processing-log">
              {steps.slice(0, currentStep).map((step, idx) => (
                <div key={idx} className="log-entry completed">
                  <span className="status-icon">✓</span>
                  {step.label}
                </div>
              ))}
              {isProcessing && currentStep < steps.length && (
                <div className="log-entry active">
                  <span className="status-spinner"></span>
                  {steps[currentStep].label}
                </div>
              )}
            </div>

            {showResult && (
              <div className="demo-result animate-fade-in">
                <div className="result-badge">Golden Insight Identified</div>
                <h3>Sector Alpha: Fintech/GreenEnergy</h3>
                <p>
                  "RBI tone indicates liquidity preservation. Expect 4.2% inflow into mid-cap 
                  Fintech over next 14 days as institutional wallets shift from stagnant PSU banks."
                </p>
                <div className="confidence-meter">
                  <span>Confidence: 94.8%</span>
                  <div className="meter-track"><div className="meter-fill"></div></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
