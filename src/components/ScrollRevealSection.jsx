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
      if (!outerRef.current || !visualRef.current) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const sectionTop = outerRef.current.offsetTop;
      const sectionHeight = outerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const scrollableDist = sectionHeight - windowHeight;
      let p = (scrollTop - sectionTop) / scrollableDist;
      p = Math.max(0, Math.min(1, p));
      
      // Linear stage distribution: 0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1.0
      const totalStages = stages.length;
      const stageIndex = Math.min(totalStages - 1, Math.floor(p * totalStages));
      if (stageIndex !== activeStage) {
        setActiveStage(stageIndex);
      }

      // Smooth 3D Move
      // Start slightly deep and pass THROUGH the camera for an immersive effect
      const zPos = -1800 + (p * 3500); 
      
      // Global Opacity Curve: Sharp fade in at 0%, Hold through 90%, Fade out to 100%
      let globalOpacity = 1;
      if (p < 0.02) globalOpacity = p * 50; // Ultra-fast fade in
      if (p > 0.95) globalOpacity = (1 - p) * 20; // Fade out as we leave

      // Stage Transition Opacity (Subtle flicker prevention)
      const stageProgress = (p * stages.length) % 1;
      let stageFade = 1;
      if (stageProgress < 0.08) stageFade = stageProgress * 12.5; 
      if (stageProgress > 0.92) stageFade = (1 - stageProgress) * 12.5;

      const finalOpacity = Math.max(0, Math.min(1, globalOpacity * stageFade));

      visualRef.current.style.transform = `translate3d(0, 0, ${zPos}px)`;
      visualRef.current.style.opacity = finalOpacity;
      
      const ring = visualRef.current.querySelector('.brand-glow-ring');
      if (ring) {
        const ringScale = 0.5 + (p * 3);
        ring.style.transform = `translate(-50%, -50%) scale(${ringScale})`;
        ring.style.opacity = finalOpacity * 0.4;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStage]); // Re-bind if stage changes to catch DOM updates

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
