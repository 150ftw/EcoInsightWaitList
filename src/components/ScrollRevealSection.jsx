import React, { useEffect, useRef, useState } from 'react';
import './ScrollRevealSection.css';

const stages = [
  { text: "By Indians", scale: 0.5 },
  { text: "For Indian Investors", scale: 1.5 },
  { text: "Making Markets Make Sense for India", scale: 4 },
  { text: "EcoInsight AI", scale: 10 }
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

      // Map progress (0-1) to stage index (0-3)
      const stageIndex = Math.min(stages.length - 1, Math.floor(p * stages.length));
      setActiveStage(stageIndex);

      if (visualRef.current) {
        // Continuous 3D Zoom: Start from deep space and pass camera
        const zPos = -5000 + (p * 5800);
        
        // Dynamic opacity for text transitions
        // We want text to fade in, stay briefly, and fade out before the next stage
        const stageProgress = (p * stages.length) % 1;
        const textOpacity = stageProgress < 0.2 ? stageProgress * 5 : (stageProgress > 0.8 ? (1 - stageProgress) * 5 : 1);
        
        // Final pass-through opacity
        const finalExitOpacity = p > 0.95 ? (1 - p) * 20 : 1;
        
        // Blur for depth effect
        const blur = p > 0.85 ? (p - 0.85) * 40 : 0;
        
        visualRef.current.style.transform = `translateZ(${zPos}px)`;
        visualRef.current.style.opacity = Math.max(0, Math.min(1, textOpacity * finalExitOpacity));
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
        <div className="atmospheric-fog"></div>
        <div className="reveal-glow"></div>
        
        <div className="scroll-reveal-visual brand-canvas" ref={visualRef}>
          <div className="brand-logo-text staged-narrative">
            <h2 className="narrative-text">
              {stages[activeStage].text}
            </h2>
          </div>
          <div className="brand-glow-ring"></div>
        </div>
      </div>
    </section>
  );
};

export default ScrollRevealSection;
