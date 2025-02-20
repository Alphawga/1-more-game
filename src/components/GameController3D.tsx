'use client';

import Spline from '@splinetool/react-spline';
import { useEffect, useState, useRef } from 'react';

export default function GameController3D() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // More pronounced scroll effect
      const normalizedScroll = Math.min(window.scrollY / (window.innerHeight * 0.3), 1);
      setScrollY(normalizedScroll);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // More responsive mouse tracking with less damping
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition(prev => ({
        x: prev.x + (x - prev.x) * 0.15, // Increased responsiveness
        y: prev.y + (y - prev.y) * 0.15
      }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full"
    >
      <div 
        className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          transform: `
            translate3d(${mousePosition.x * 25}px, ${-scrollY * 50}px, ${mousePosition.y * 15}px)
            rotateY(${mousePosition.x * 15}deg)
            rotateX(${-mousePosition.y * 15}deg)
            scale(${1.4 + mousePosition.y * 0.1})
          `,
          transformOrigin: 'center center',
          transition: 'transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1)',
        }}
      >
        <Spline
          scene="https://prod.spline.design/kRHWjcbu8U33mQfT/scene.splinecode"
          onLoad={(spline) => {
            spline.setZoom(1);
            setIsLoaded(true);
          }}
          style={{
            width: '100%',
            height: '100%',
            filter: 'brightness(0.9) contrast(1.1)',
          }}
          className="[&>canvas]:!bg-transparent"
        />
      </div>
    </div>
  );
} 