import React, { useEffect, useRef, useState } from 'react';
import './ScrollRevealSection.css';

const stages = [
  { text: "By Indians", scale: 0.5 },
  { text: "For Indian Investors", scale: 1 },
  { text: "Making Markets Make Sense for India", scale: 1 },
  { text: "EcoInsight AI", scale: 1 }
];

const ScrollRevealSection = () => {
  const outerRef = useRef(null);
  const visualRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!outerRef.current) return;

      const rect = outerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalHeight = rect.height - windowHeight;
      let p = -rect.top / totalHeight;
      p = Math.max(0, Math.min(1.1, p)); // Allow slight overshoot for exit
      
      // Stage Calculation: 0-0.2, 0.2-0.4, 0.4-0.6, 0.6-1.0
      let stageIndex = 0;
      if (p > 0.7) stageIndex = 3;
      else if (p > 0.4) stageIndex = 2;
      else if (p > 0.15) stageIndex = 1;
      
      setActiveStage(stageIndex);

      if (visualRef.current) {
        // Continuous 3D Zoom: Start from deep space (-5000) and pass camera (+1000)
        // We use a more linear zoom for the text passage
        const zPos = -4000 + (p * 4500); 
        
        // Dynamic opacity for text transitions
        // Fade in/out at the start/end of the WHOLE scroll, 
        // but keep text visible during transitions for a "passing through" feel
        const fadeOut = p > 0.9 ? (1 - p) * 10 : 1;
        const fadeIn = p < 0.05 ? p * 20 : 1;
        
        // Individual stage opacity to avoid text overlap or flickering
        const stageProgress = (p * stages.length) % 1;
        const transitionOpacity = stageProgress < 0.1 ? stageProgress * 10 : (stageProgress > 0.9 ? (1 - stageProgress) * 10 : 1);

        visualRef.current.style.transform = `translate3d(0, 0, ${zPos}px)`;
        visualRef.current.style.opacity = Math.max(0, Math.min(1, fadeIn * fadeOut * transitionOpacity));
        
        // High Contrast Glow shift
        const glowScale = 1 + (p * 2);
        const ring = visualRef.current.querySelector('.brand-glow-ring');
        if (ring) ring.style.transform = `translate(-50%, -50%) scale(${glowScale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="scroll-reveal-outer" ref={outerRef}>
      <div className="scroll-reveal-sticky">
        <div className="atmospheric-fog"></div>
        <div className="reveal-glow"></div>
        
        <div className="scroll-reveal-visual brand-canvas" ref={visualRef} style={{ zIndex: 10 }}>
          <div className="brand-logo-text staged-narrative">
            <h2 className={`narrative-text ${activeStage === 1 ? 'motto-main' : ''}`}>
              {stages[activeStage].text}
            </h2>
            {activeStage === 2 && (
              <p className="motto-support">Making Markets Make Sense for India</p>
            )}
          </div>
          <div className="brand-glow-ring"></div>
        </div>
      </div>
    </section>
  );
};

export default ScrollRevealSection;
