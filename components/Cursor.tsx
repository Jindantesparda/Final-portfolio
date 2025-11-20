
import React, { useEffect, useRef } from 'react';

export const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    
    if (!dot || !circle) return;

    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Immediate update for the small dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const animate = () => {
      // Smooth lerp for the larger circle
      circleX += (mouseX - circleX) * 0.15;
      circleY += (mouseY - circleY) * 0.15;
      
      circle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0) translate(-50%, -50%)`;
      
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-[100] hidden md:block mix-blend-difference">
      <div 
        ref={dotRef} 
        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
        style={{ top: 0, left: 0 }}
      />
      <div 
        ref={circleRef} 
        className="absolute w-8 h-8 border border-cyan-400/50 rounded-full"
        style={{ top: 0, left: 0 }}
      />
    </div>
  );
};
