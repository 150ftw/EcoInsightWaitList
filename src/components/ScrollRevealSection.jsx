import React, { useEffect, useRef, useState } from 'react';
import './ScrollRevealSection.css';
import dashboardImg from '../assets/dashboard-reveal.png';

const stages = [
  { title: "Macro Nexus", sub: "12B+ Datapoints Synthesized Daily" },
  { title: "Sentiment Layer", sub: "Analyzing 500+ Institutional Sources" },
  { title: "Alpha Screener", sub: "Institutional Precision for NSE/BSE" },
  { title: "Capital Flows", sub: "Real-Time Global Money Mapping" },
  { title: "Risk Engine", sub: "Dynamic Portfolio Delta Tracking" },
  { title: "Cycle Detection", sub: "Structural Shifts Identified" },
  { title: "Conviction Builder", sub: "Intelligence Tailored to You" },
  { title: "The Elite Tier", sub: "Exclusive Access to the AI-Age" }
];

const ScrollRevealSection = () => {
  const outerRef = useRef(null);
  const visualRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!outerRef.current) return;

      const rect = outerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalHeight = rect.height - windowHeight;
      let p = -rect.top / totalHeight;
      p = Math.max(0, Math.min(1, p));
      
      setProgress(p);

      // Map progress (0-1) to stage index (0-7)
      const stageIndex = Math.min(stages.length - 1, Math.floor(p * stages.length));
      setActiveStage(stageIndex);

      if (visualRef.current) {
        // Deeper zoom for 8 stages (1x to 4x)
        const scale = 1 + p * 3;
        const brightness = 1 - p * 0.4;
        
        visualRef.current.style.transform = `scale(${scale})`;
        visualRef.current.style.filter = `brightness(${brightness}) saturate(${1 + p * 0.5})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="scroll-reveal-outer" ref={outerRef}>
      <div className="scroll-reveal-sticky">
        <div className="reveal-glow"></div>
        
        <div className="scroll-reveal-overlay">
          <div className="stage-indicators">
            {stages.map((_, i) => (
              <div key={i} className={`stage-dot ${i === activeStage ? 'active' : ''}`} />
            ))}
          </div>

          <div className="stage-content">
            <h2 className={`reveal-text ${progress > 0.05 && progress < 0.95 ? 'visible' : ''}`}>
              {stages[activeStage].title}
            </h2>
            <p className={`reveal-subtext ${progress > 0.1 && progress < 0.9 ? 'visible' : ''}`}>
              {stages[activeStage].sub}
            </p>
          </div>
        </div>

        <div className="scroll-reveal-visual" ref={visualRef}>
          <img 
            src={dashboardImg} 
            alt="EcoInsight Portfolio Intelligence" 
            className="reveal-image"
          />
        </div>
      </div>
    </section>
  );
};

export default ScrollRevealSection;
