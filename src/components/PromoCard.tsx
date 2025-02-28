"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';

interface PromoCardProps {
  name: string;
  subtext: string;
  image: string;
  discount: string; // e.g. "-5.0%"
  href: string;
}

export default function PromoCard({ name, subtext, image, discount, href }: PromoCardProps) {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);
  
  return (
    <Link 
      href={href}
      className={`group block transition-all duration-300 hover:transform hover:scale-105 ${
        theme === 'dark' ? 'hover:bg-digital-black/30' : 'hover:bg-cloud-white/70'
      } rounded-lg p-3 relative`}
    >
      <div className="flex flex-col items-start">
        {/* Promo Badge */}
        <div className="absolute top-3 left-3 bg-growth-green text-xs px-2 py-1 rounded text-pure-white font-medium z-10">
          PROMO
        </div>
        
        {/* Discount Badge */}
        <div className="absolute top-3 right-3 font-medium text-sm z-10">
          {discount}
        </div>
        
        <div className="mb-3 w-16 h-16 relative rounded-lg overflow-hidden bg-gray-200">
          {!imageError ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-digital-black/50' : 'bg-cloud-white/50'
            }`}>
              <span className="text-xs text-center">{name.substring(0, 2)}</span>
            </div>
          )}
        </div>
        
        <div>
          <h3 className={`font-medium text-base ${
            theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'
          }`}>
            {name}
          </h3>
          
          <span className={`text-sm ${
            theme === 'dark' ? 'text-cloud-white/70' : 'text-charcoal/70'
          }`}>
            {subtext}
          </span>
        </div>
      </div>
    </Link>
  );
} 