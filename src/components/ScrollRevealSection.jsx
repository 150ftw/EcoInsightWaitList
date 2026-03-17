import React, { useEffect, useRef, useState } from 'react';
import './ScrollRevealSection.css';
import dashboardImg from '../assets/dashboard-reveal.png';

const ScrollRevealSection = () => {
  const outerRef = useRef(null);
  const visualRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!outerRef.current) return;

      const rect = outerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the 300vh has been scrolled
      // progress is 0 at the start of the section and 1 at the end
      const startPoint = rect.top;
      const totalHeight = rect.height - windowHeight;
      
      let p = -startPoint / totalHeight;
      p = Math.max(0, Math.min(1, p));
      
      setProgress(p);

      if (visualRef.current) {
        // Map progress to scale 1 -> 2.5
        const scale = 1 + p * 1.5;
        // Map progress to opacity for background focus
        const brightness = 1 - p * 0.5;
        
        visualRef.current.style.transform = `scale(${scale})`;
        visualRef.current.style.filter = `brightness(${brightness}) saturate(${1 + p * 0.5})`;
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
          <h2 className={`reveal-text ${progress > 0.1 && progress < 0.8 ? 'visible' : ''}`}>
            AI That Understands<br />Markets
          </h2>
          <p className={`reveal-subtext ${progress > 0.2 && progress < 0.7 ? 'visible' : ''}`}>
            Zoom Into Financial Intelligence
          </p>
        </div>

        <div className="scroll-reveal-visual" ref={visualRef}>
          <img 
            src={dashboardImg} 
            alt="EcoInsight Portfolio Intelligence" 
            className="reveal-image"
          />
        </div>
      </div>
    </section>
  );
};

export default ScrollRevealSection;
