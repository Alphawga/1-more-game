'use client';

import Link from 'next/link';
import { Session } from 'next-auth';  
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface NavigationProps {
  session: Session | null;
}

export default function Navigation({ session }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? theme === 'dark'
          ? 'bg-digital-black/95 backdrop-blur-sm'
          : 'bg-cloud-white/95 backdrop-blur-sm'
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-energy-orange">1Mo</span>
            <span className="text-2xl font-bold text-victory-gold">Game</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/browse" className={`${theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'} hover:text-energy-orange transition-colors`}>
              Browse
            </Link>
            <Link href="/rewards" className={`${theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'} hover:text-energy-orange transition-colors`}>
              Rewards
            </Link>
            <Link href="/community" className={`${theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'} hover:text-energy-orange transition-colors`}>
              Community
            </Link>
            {!session ? (
              <>
                <Link href="/login" className={`${theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'} hover:text-energy-orange transition-colors`}>
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="btn-primary px-4 py-2 rounded-full text-sm font-semibold"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link 
                href="/dashboard" 
                className="btn-primary px-4 py-2 rounded-full text-sm font-semibold"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className={`md:hidden ${theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'}`}
            aria-label="Open main menu"
            title="Open main menu"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className="hidden md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 ${
            theme === 'dark' ? 'bg-digital-black/95' : 'bg-cloud-white/95'
          }`}>
            <Link 
              href="/browse" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'} hover:text-energy-orange transition-colors`}
            >
              Browse
            </Link>
            <Link 
              href="/rewards" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'} hover:text-energy-orange transition-colors`}
            >
              Rewards
            </Link>
            <Link 
              href="/community" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'} hover:text-energy-orange transition-colors`}
            >
              Community
            </Link>
            {!session ? (
              <>
                <Link 
                  href="/login" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'} hover:text-energy-orange transition-colors`}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="block px-3 py-2 rounded-md text-base font-medium btn-primary"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link 
                href="/dashboard" 
                className="block px-3 py-2 rounded-md text-base font-medium btn-primary"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 