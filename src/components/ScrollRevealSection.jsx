import React, { useEffect, useRef, useState } from 'react';
import './ScrollRevealSection.css';

const ScrollRevealSection = () => {
  const outerRef = useRef(null);
  const visualRef = useRef(null);
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

      if (visualRef.current) {
        // True 3D Zoom: Start from deep space (-5000px) and pass camera (800px)
        const zPos = -5000 + (p * 5800);
        const opacity = p < 0.1 ? p * 10 : (p > 0.95 ? (1 - p) * 20 : 1);
        const blur = p < 0.2 ? (0.2 - p) * 20 : (p > 0.85 ? (p - 0.85) * 40 : 0);
        
        visualRef.current.style.transform = `translateZ(${zPos}px)`;
        visualRef.current.style.opacity = Math.max(0, Math.min(1, opacity));
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
        {/* Layered Atmospheric Backgrounds */}
        <div className="atmospheric-fog"></div>
        <div className="reveal-glow"></div>
        
        <div className="scroll-reveal-overlay">
          {/* Narrative text removed to focus on brand emergence */}
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
