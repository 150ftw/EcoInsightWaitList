import React, { useEffect, useRef, useState } from 'react';
import './ScrollRevealSection.css';

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

      const stageIndex = Math.min(stages.length - 1, Math.floor(p * stages.length));
      setActiveStage(stageIndex);

      if (visualRef.current) {
        // Extreme depth zoom: Start small (0.5), end massive (30) to pass through
        const scale = 0.5 + Math.pow(p, 3) * 30;
        // Fade out at the very end of the zoom
        const opacity = p > 0.9 ? 1 - (p - 0.9) * 10 : 1;
        // Blur increases as we get closer to simulate depth of field
        const blur = p > 0.8 ? (p - 0.8) * 10 : 0;
        
        visualRef.current.style.transform = `scale(${scale})`;
        visualRef.current.style.opacity = opacity;
        visualRef.current.style.filter = `blur(${blur}px)`;
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
            <h2 className={`reveal-text ${progress > 0.05 && progress < 0.92 ? 'visible' : ''}`}>
              {stages[activeStage].title}
            </h2>
            <p className={`reveal-subtext ${progress > 0.1 && progress < 0.9 ? 'visible' : ''}`}>
              {stages[activeStage].sub}
            </p>
          </div>
        </div>

        <div className="scroll-reveal-visual brand-canvas" ref={visualRef}>
          <div className="brand-logo-text">
            <span className="brand-word">ECOINSIGHT</span>
            <span className="brand-ai">AI</span>
          </div>
          <div className="brand-glow-ring"></div>
        </div>
      </div>
    </section>
  );
};

export default ScrollRevealSection;
