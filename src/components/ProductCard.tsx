"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';

interface ProductCardProps {
  name: string;
  image: string;
  region: string;
  href: string;
}

export default function ProductCard({ name, image, region, href }: ProductCardProps) {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);
  
  return (
    <Link 
      href={href}
      className={`group block transition-all duration-300 hover:transform hover:scale-105 ${
        theme === 'dark' ? 'hover:bg-digital-black/30' : 'hover:bg-cloud-white/70'
      } rounded-lg p-3`}
    >
      <div className="flex flex-col items-start">
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
            {region}
          </span>
        </div>
      </div>
    </Link>
  );
} 