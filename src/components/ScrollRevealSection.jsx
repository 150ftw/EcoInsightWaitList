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
      let p = -rect.top / scrollableDist;
      
      // Safety: If we are way above or way below, ensure we don't trap state
      if (p < -0.2 || p > 1.2) return; 

      p = Math.max(0, Math.min(1, p));
      
      const totalStages = stages.length;
      const currentStage = Math.min(totalStages - 1, Math.floor(p * totalStages));
      
      if (currentStage !== activeStageRef.current) {
        activeStageRef.current = currentStage;
        setActiveStage(currentStage);
      }

      // --- Cinematic Animation Constants ---
      // Distribute stages across the 0-0.85 range for mottoes, 0.85-1 for final zoom
      const narrateProgress = p / 0.85; 
      const currentStageFlat = Math.floor(narrateProgress * (totalStages - 1));
      const stageProgress = (narrateProgress * (totalStages - 1)) % 1;
      
      // 1. Zoom Logic
      let zPos = 0;
      let scale = 1;
      
      if (p > 0.85) {
        // FINAL ZOOM THROUGH: Accelerate but clamp at 2500px to avoid "invisible blurry" gaps
        const exitP = (p - 0.85) / 0.15; 
        zPos = exitP * 2500; 
        scale = 1 + (exitP * 6);
      } else {
        // PER-STAGE ZOOM: Snappier grow
        scale = 0.9 + (stageProgress * 0.3); 
      }

      // 2. Opacity Logic
      let finalOpacity = 1;
      if (p < 0.05) finalOpacity = p / 0.05; // Faster fade in
      if (p > 0.98) finalOpacity = (1 - p) / 0.02; // Sharp exit fade

      // Sub-stage Transition Fades (Killer of Dead Zones)
      // We want the text to stay fully opaque for 70% of the stage, then fade quickly
      let stageFade = 1;
      if (stageProgress < 0.15) stageFade = stageProgress / 0.15;
      if (stageProgress > 0.85) stageFade = (1 - stageProgress) / 0.15;

      const combinedOpacity = Math.max(0, Math.min(1, finalOpacity * stageFade));
      
      // Apply transforms directly to DOM for performance
      visualRef.current.style.transform = `translate3d(0, 0, ${zPos}px) scale(${scale})`;
      visualRef.current.style.opacity = combinedOpacity;
      // Safety: Only hide if truly gone to prevent jarring snap-backs
      visualRef.current.style.visibility = combinedOpacity < 0.001 ? 'hidden' : 'visible';
      
      const ring = visualRef.current.querySelector('.brand-glow-ring');
      if (ring) {
        const ringScale = 0.5 + (p * 5);
        ring.style.transform = `translate(-50%, -50%) scale(${ringScale})`;
        ring.style.opacity = combinedOpacity * 0.4;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
      } else {
        window.removeEventListener('scroll', handleScroll);
        // Robust Reset: If we leave the section, make sure it's clean
        // But DON'T touch global visibility
        if (visualRef.current) {
          visualRef.current.style.opacity = 0;
          visualRef.current.style.visibility = 'hidden';
        }
      }
    }, { threshold: 0 }); // 0 threshold ensures we catch the very first/last pixel

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
