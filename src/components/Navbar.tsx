"use client"
import Link from 'next/link';
// import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg  z-20' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link 
            href="/" 
            className="flex items-center transform hover:scale-105 transition-transform"
          >
            {/* <Image
              src="/images/logo.png"
              alt="1More Game"
              width={40}
              height={40}
              className="mr-2"
            /> */}
            <span className={`text-xl font-bold ${
              scrolled ? 'text-digital-black' : 'text-pure-white'
            }`}>
              1More Game
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group ${
                  scrolled ? 'text-charcoal' : 'text-pure-white'
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-energy-orange transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/auth/sign-in" 
              className={`relative overflow-hidden group px-4 py-2 rounded-full transition-all duration-300 ${
                scrolled ? 'text-trust-blue' : 'text-pure-white'
              }`}
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 w-0 bg-trust-blue group-hover:w-full transition-all duration-300 opacity-10" />
            </Link>
            <Link 
              href="/auth/sign-up" 
              className="btn-primary px-6 py-2 rounded-full font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-energy-orange"
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
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block px-6 py-2 text-charcoal hover:bg-cloud-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

const navLinks = [
  { href: '/browse', label: 'Browse' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/support', label: 'Support' },
]; 