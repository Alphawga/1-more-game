'use client';

import Spline from '@splinetool/react-spline';
import { useEffect, useState } from 'react';

export default function Keyboard3D() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-digital-black/30 z-10 pointer-events-none" />
      <div 
        className="w-full h-full"
        style={{
          transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <Spline
          scene="https://prod.spline.design/k8Ho2r7R68WKct1t/scene.splinecode"
          onLoad={(spline) => {
            spline.setZoom(0.8);
          }}
          style={{
            width: '150%',
            height: '150%',
            transform: 'translateX(-15%) translateY(-5%)',
          }}
          className="[&>canvas]:!bg-transparent [&>canvas]:!bg-none"
        />
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center text-cloud-white/80 text-sm backdrop-blur-sm py-2 z-20">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
} 