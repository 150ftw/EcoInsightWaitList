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
      
      // Normalize p to the active scrollable area
      const totalHeight = rect.height - windowHeight;
      let p = -rect.top / totalHeight;
      p = Math.max(0, Math.min(1, p));
      
      // Linear stage distribution: 0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1.0
      const stageIndex = Math.min(stages.length - 1, Math.floor(p * stages.length));
      setActiveStage(stageIndex);

      if (visualRef.current) {
        // More aggressive zoom-in: Start closer (-2000 instead of -5000)
        // and accelerate as it passes the camera (+2000)
        const zPos = -2500 + (p * 5000); 
        
        // Dynamic opacity: Fade in fast at the very start
        const fadeIn = p < 0.05 ? (p / 0.05) : 1;
        // Fade out at the very end to transition to the next section
        const fadeOut = p > 0.9 ? (1 - p) / 0.1 : 1;
        
        // Stage-based "bounce/flicker" prevention
        const stageProgress = (p * stages.length) % 1;
        const stageOpacity = stageProgress < 0.1 ? stageProgress * 10 : (stageProgress > 0.9 ? (1 - stageProgress) * 10 : 1);

        visualRef.current.style.transform = `translate3d(0, 0, ${zPos}px)`;
        visualRef.current.style.opacity = Math.max(0, Math.min(1, fadeIn * fadeOut * stageOpacity));
        
        // Sync the glow ring to stage progress
        const ring = visualRef.current.querySelector('.brand-glow-ring');
        if (ring) {
          const glowScale = 0.5 + (p * 2);
          ring.style.transform = `translate(-50%, -50%) scale(${glowScale})`;
          ring.style.opacity = 0.3 + (stageOpacity * 0.4);
        }
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
