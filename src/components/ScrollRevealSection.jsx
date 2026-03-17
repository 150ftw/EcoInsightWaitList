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
