"use client";

import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';

interface FeatureSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageOnLeft?: boolean;
  className?: string;
}

export default function FeatureSection({
  title,
  description,
  imageSrc,
  imageAlt,
  imageOnLeft = false,
  className = ''
}: FeatureSectionProps) {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);
  
  return (
    <section className={`my-10 ${
      theme === 'dark' ? 'bg-digital-black/20' : 'bg-cloud-white/20'
    } rounded-lg overflow-hidden ${className}`}>
      <div className={`flex flex-col ${imageOnLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
        {/* Image Column */}
        <div className="w-full md:w-1/2 p-6">
          <div className="relative h-64 md:h-72 w-full rounded-lg overflow-hidden bg-gray-100">
            {!imageError ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className={`w-full h-full flex flex-col items-center justify-center ${
                theme === 'dark' ? 'bg-digital-black/30' : 'bg-cloud-white/30'
              }`}>
                <div className="text-5xl mb-2">🎮</div>
                <div className="text-sm text-center max-w-xs">
                  {imageAlt || title}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Text Column */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
            theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'
          }`}>
            {title}
          </h2>
          
          <p className={`${
            theme === 'dark' ? 'text-cloud-white/80' : 'text-charcoal/80'
          }`}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
} 