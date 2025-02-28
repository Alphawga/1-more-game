"use client";

import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  viewMoreHref: string;
  className?: string;
}

export default function SectionHeader({ title, viewMoreHref, className = '' }: SectionHeaderProps) {
  const { theme } = useTheme();
  
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <h2 className={`text-xl font-bold uppercase ${
        theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'
      }`}>
        {title}
      </h2>
      
      <Link 
        href={viewMoreHref}
        className={`flex items-center text-sm ${
          theme === 'dark' ? 'text-cloud-white/70 hover:text-cloud-white' : 'text-charcoal/70 hover:text-charcoal'
        } transition-colors`}
      >
        View More 
        <ChevronRight className="ml-1 w-4 h-4" />
      </Link>
    </div>
  );
} 