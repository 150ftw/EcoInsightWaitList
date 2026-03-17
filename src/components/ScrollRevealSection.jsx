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

  useEffect(() => {
    const handleScroll = () => {
      if (!outerRef.current || !visualRef.current) return;

      const rect = outerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on container position relative to viewport
      // rect.top is 0 when the section hits the top
      // rect.top is -(height - windowHeight) when it's done
      const scrollableDist = rect.height - windowHeight;
      let p = -rect.top / scrollableDist;
      p = Math.max(0, Math.min(1, p));
      
      const totalStages = stages.length;
      const currentStage = Math.min(totalStages - 1, Math.floor(p * totalStages));
      
      if (currentStage !== activeStage) {
        setActiveStage(currentStage);
      }

      // --- Cinematic Animation Constants ---
      const stageProgress = (p * totalStages) % 1;
      
      // 1. Zoom Logic
      let zPos = 0;
      let scale = 1;
      
      if (p > 0.85) {
        // FINAL ZOOM THROUGH: Accelerate through the camera at the end
        const exitP = (p - 0.85) / 0.15; // 0 to 1
        zPos = exitP * 4000; // Fly through
        scale = 1 + (exitP * 10);
      } else {
        // PER-STAGE ZOOM: Subtle grow as you scroll through each text
        scale = 0.8 + (stageProgress * 0.4); 
      }

      // 2. Opacity Logic
      let finalOpacity = 1;
      
      // First Scene Fade In (0% to 10% of total scroll)
      if (p < 0.1) {
        finalOpacity = p / 0.1;
      }
      
      // Last Scene Zoom-through Fade Out (accelerated at the very end)
      if (p > 0.95) {
        finalOpacity = (1 - p) / 0.05;
      }

      // Sub-stage Transition Fades (flicker prevention)
      let stageFade = 1;
      if (stageProgress < 0.1) stageFade = stageProgress * 10;
      if (stageProgress > 0.9) stageFade = (1 - stageProgress) * 10;

      const combinedOpacity = Math.max(0, Math.min(1, finalOpacity * stageFade));
      
      // Apply transforms
      visualRef.current.style.transform = `translate3d(0, 0, ${zPos}px) scale(${scale})`;
      visualRef.current.style.opacity = combinedOpacity;
      // Safety: Hide completely when opacity is effectively 0 to prevent "messed up site" feelings
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
        handleScroll();
      } else {
        window.removeEventListener('scroll', handleScroll);
        // Reset styles when out of view to prevent site-wide blanking
        if (visualRef.current) {
            visualRef.current.style.opacity = 0;
            visualRef.current.style.visibility = 'hidden';
        }
      }
    }, { threshold: 0.001 }); // Use very small threshold to catch entries early

    if (outerRef.current) observer.observe(outerRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (outerRef.current) observer.unobserve(outerRef.current);
    };
  }, [activeStage]);

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
