import React, { useEffect, useRef, useState } from 'react';
import './ScrollRevealSection.css';

const stages = [
  { text: "By Indians" },
  { text: "For Indian Investors" },
  { text: ["Making Markets", "Make Sense for India"] },
  { text: "EcoInsight AI" }
];

const ScrollRevealSection = () => {
  const outerRef = useRef(null);
  const visualRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  // Use a ref for activeStage to avoid recreating handleScroll constantly
  const activeStageRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!outerRef.current || !visualRef.current) return;

      const rect = outerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollableDist = rect.height - windowHeight;
      // Calculate progress more robustly
      let p = -rect.top / scrollableDist;
      
      // Expand safety range to prevent premature hiding
      if (p < -0.5 || p > 1.5) return; 

      p = Math.max(0, Math.min(1, p));
      
      const totalStages = stages.length;
      
      // --- Cinematic Animation Constants ---
      // Distribute stages across 0-0.9 range, 0.9-1 for final zoom
      const narrateProgress = p / 0.9; 
      const currentStage = Math.min(totalStages - 1, Math.floor(narrateProgress * totalStages));
      const stageProgress = (narrateProgress * totalStages) % 1;
      
      if (currentStage !== activeStageRef.current && currentStage >= 0 && currentStage < totalStages) {
        activeStageRef.current = currentStage;
        setActiveStage(currentStage);
      }

      // 1. Zoom Logic
      let zPos = 0;
      let scale = 1;
      
      if (p > 0.9) {
        // FINAL ZOOM THROUGH: Accelerate
        const exitP = (p - 0.9) / 0.1; 
        zPos = exitP * 3000; 
        scale = 1 + (exitP * 8);
      } else {
        // PER-STAGE ZOOM: Dynamic growth
        scale = 0.85 + (stageProgress * 0.4); 
      }

      // 2. Opacity Logic
      let finalOpacity = 1;
      if (p < 0.05) finalOpacity = p / 0.05; 
      if (p > 0.95) finalOpacity = (1 - p) / 0.05; 

      // Stage Transition Fades
      let stageFade = 1;
      if (stageProgress < 0.2) stageFade = stageProgress / 0.2;
      if (stageProgress > 0.8) stageFade = (1 - stageProgress) / 0.2;

      const combinedOpacity = Math.max(0, Math.min(1, finalOpacity * stageFade));
      
      // Apply transforms
      visualRef.current.style.transform = `translate3d(0, 0, ${zPos}px) scale(${scale})`;
      visualRef.current.style.opacity = combinedOpacity;
      
      // Safety: Only hide if truly gone, but be less aggressive than before
      visualRef.current.style.visibility = combinedOpacity < 0.01 ? 'hidden' : 'visible';
      
      const ring = visualRef.current.querySelector('.brand-glow-ring');
      if (ring) {
        const ringScale = 0.5 + (p * 6);
        ring.style.transform = `translate(-50%, -50%) scale(${ringScale})`;
        ring.style.opacity = combinedOpacity * 0.5;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); 
      } else {
        window.removeEventListener('scroll', handleScroll);
        // Clean reset without blocking future reveals
        if (visualRef.current) {
          visualRef.current.style.opacity = 0;
          visualRef.current.style.visibility = 'hidden';
        }
      }
    }, { threshold: 0, rootMargin: '10% 0px' }); // Added margin to trigger earlier

    if (outerRef.current) observer.observe(outerRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (outerRef.current) observer.unobserve(outerRef.current);
    };
  }, []); // Only run once on mount

  return (
    <section className="scroll-reveal-outer" ref={outerRef}>
      <div className="scroll-reveal-sticky">
        <div className="atmospheric-fog"></div>
        <div className="reveal-glow"></div>
        
        <div className="scroll-reveal-visual brand-canvas" ref={visualRef} style={{ zIndex: 10 }}>
          <div className="brand-logo-text staged-narrative">
            <h2 className={`narrative-text ${activeStage === 1 ? 'motto-main' : ''}`}>
              {Array.isArray(stages[activeStage].text) 
                ? stages[activeStage].text.map((line, i) => <div key={i}>{line}</div>)
                : stages[activeStage].text
              }
            </h2>
            {activeStage === 2 && typeof stages[activeStage].text === 'string' && stages[activeStage].text !== "Making Markets Make Sense for India" && (
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
