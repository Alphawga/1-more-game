"use client"
import Link from 'next/link';
// import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 pt-7 ${
      scrolled 
        ? theme === 'dark'
          ? 'bg-digital-black/95 backdrop-blur-sm'
          : 'bg-cloud-white/95 backdrop-blur-sm shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link 
            href="/" 
            className="flex items-center transform hover:scale-105 transition-transform"
          >
            {/* <Image
              src="/images/logo.png"
              alt="1Mo Game"
              width={40}
              height={40}
              className="mr-2"
            /> */}
            <span className={`text-xl font-bold relative ${
              scrolled 
                ? theme === 'dark'
                  ? 'text-white'
                  : 'text-black'
                : 'text-white'
            }`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-energy-orange via-victory-gold to-energy-orange bg-size-200 animate-gradient-x">
                1Mo
              </span>
              <span className={`${
                scrolled 
                  ? theme === 'dark'
                    ? 'text-white'
                    : 'text-black'
                  : 'text-black'
              }`}>Game</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group ${
                  scrolled 
                    ? theme === 'dark'
                      ? 'text-cloud-white'
                      : 'text-charcoal'
                    : 'text-pure-white'
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-energy-orange to-victory-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <Link 
              href="/auth/sign-in" 
              className={`relative overflow-hidden group px-4 py-2 rounded-full transition-all duration-300 ${
                scrolled 
                  ? theme === 'dark'
                    ? 'text-cloud-white'
                    : 'text-trust-blue'
                  : 'text-pure-white'
              }`}
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-trust-blue/20 to-trust-blue/30 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              href="/auth/sign-up" 
              className="btn-primary px-6 py-2 rounded-full font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Sign Up</span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-energy-orange to-victory-gold transition-all duration-500 ease-out"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden ${
              theme === 'dark' ? 'text-cloud-white' : 'text-energy-orange'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            title="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden transition-all duration-300 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className={`${
          theme === 'dark' ? 'bg-digital-black/95' : 'bg-cloud-white/95'
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-6 py-2 ${
                theme === 'dark'
                  ? 'text-cloud-white hover:bg-digital-black/50'
                  : 'text-charcoal hover:bg-cloud-white/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

const navLinks = [
  { href: '/browse', label: 'Browse' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/support', label: 'Support' },
]; 