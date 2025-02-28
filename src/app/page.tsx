'use client';

import Navbar from '@/components/Navbar';
import ProductSection from '@/components/ProductSection';
import FeatureSection from '@/components/FeatureSection';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import { useState, useEffect } from 'react';

// Function to generate placeholder URLs
const placeholderImage = (name: string) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;

// Sample data
const popularGameCards = [
  {
    id: '1',
    name: 'PlayStation Network Card',
    image: placeholderImage('PSN'),
    region: 'Nigeria, Kenya, South Africa',
    href: '/product/psn',
  },
  {
    id: '2',
    name: 'Free Fire Diamonds',
    image: placeholderImage('FF'),
    region: 'Africa',
    href: '/product/freefire',
  },
  {
    id: '3',
    name: 'PUBG Mobile UC',
    image: placeholderImage('PUBG'),
    region: 'Africa',
    href: '/product/pubgm-uc',
  },
  {
    id: '4',
    name: 'Steam Wallet Code',
    image: placeholderImage('Steam'),
    region: 'Global',
    href: '/product/steam',
  },
];

const popularGameTopUps = [
  {
    id: '1',
    name: 'Mobile Legends Diamonds',
    image: placeholderImage('ML'),
    region: 'Africa',
    href: '/product/mlbb-diamonds',
  },
  {
    id: '2',
    name: 'Call of Duty Mobile CP',
    image: placeholderImage('COD'),
    region: 'Africa',
    href: '/product/codm-cp',
  },
  {
    id: '3',
    name: 'Fortnite V-Bucks',
    image: placeholderImage('FN'),
    region: 'Africa',
    href: '/product/fortnite-vbucks',
  },
  {
    id: '4',
    name: 'Roblox Robux',
    image: placeholderImage('RBX'),
    region: 'Africa',
    href: '/product/roblox-robux',
  },
];

const exclusiveOffers = [
  {
    id: '1',
    name: '1080 Diamonds Free Fire',
    subtext: 'Instant Delivery',
    image: placeholderImage('FF'),
    discount: '-5.0%',
    href: '/promo/freefire-1080',
  },
  {
    id: '2',
    name: 'PUBG Mobile 600 UC',
    subtext: 'M-Pesa Accepted',
    image: placeholderImage('PUBG'),
    discount: '-5.0%',
    href: '/promo/pubg-600',
  },
  {
    id: '3',
    name: 'Mobile Legends 500 Diamonds',
    subtext: 'Local Payment',
    image: placeholderImage('ML'),
    discount: '-10.0%',
    href: '/promo/ml-500',
  },
  {
    id: '4',
    name: 'PlayStation Store $10 Gift Card',
    subtext: 'Digital Code',
    image: placeholderImage('PS'),
    discount: '-3.0%',
    href: '/promo/ps-10',
  },
  {
    id: '5',
    name: 'Xbox Game Pass Ultimate 1 Month',
    subtext: 'Subscription Code',
    image: placeholderImage('Xbox'),
    discount: '-3.0%',
    href: '/promo/xbox-gpu',
  },
];

const features = [
  {
    title: 'INSTANT DELIVERY. LOCAL PAYMENTS.',
    description: 'Get your game codes and currencies instantly after purchase. 1More Game supports local payment methods including M-Pesa, USSD, and mobile banking, making it easier than ever to pay for your favorite games.',
    imageSrc: 'https://via.placeholder.com/600x400?text=Local+Payments',
    imageAlt: 'Local payment methods',
  },
  {
    title: 'EARN REWARDS WITH EVERY PURCHASE',
    description: 'Join our loyalty program and earn points with every purchase. Redeem your points for discounts, exclusive offers, and even free game codes. The more you play, the more you earn!',
    imageSrc: 'https://via.placeholder.com/600x400?text=Rewards+Program',
    imageAlt: 'Rewards program',
    imageOnLeft: true,
  },
];

// Payment methods
const paymentMethods = [
  { id: '1', name: 'M-Pesa', image: placeholderImage('MPesa') },
  { id: '2', name: 'USSD', image: placeholderImage('USSD') },
  { id: '3', name: 'Mobile Banking', image: placeholderImage('MB') },
  { id: '4', name: 'Cards', image: placeholderImage('Card') },
  { id: '5', name: 'Bank Transfer', image: placeholderImage('Bank') },
];

export default function Home() {
  const { theme } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <main className={theme === 'dark' ? 'bg-digital-black' : 'bg-cloud-white'}>
      <Navbar />
      
      {/* Top Navigation Links */}
      <div className="bg-gray-100 dark:bg-gray-900 py-2">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6 text-sm">
              <Link href="/news" className="hover:text-energy-orange transition-colors duration-300">Gaming News</Link>
              <Link href="/rewards" className="hover:text-energy-orange transition-colors duration-300">Loyalty Rewards</Link>
              <Link href="/esports" className="hover:text-energy-orange transition-colors duration-300">eSports</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/app" className="flex items-center space-x-1 text-sm group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:text-energy-orange transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <span className="group-hover:text-energy-orange transition-colors duration-300">Download PWA</span>
              </Link>
              <div className="flex items-center space-x-2 text-sm">
                <span>EN</span>
                <span>|</span>
                <span>NGN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Banner Carousel */}
      <section className="relative pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex space-x-4">
            {/* Side Banner */}
            <div className="hidden lg:block w-1/6 h-80 bg-gray-200 rounded-lg overflow-hidden relative hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 flex flex-col justify-end p-4">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">African Gaming</div>
                </div>
              </div>
            </div>
            
            {/* Main Banner */}
            <div className="w-full lg:w-4/6 h-80 bg-gray-200 rounded-lg overflow-hidden relative hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-trust-blue/20 to-transparent">
                <div className="absolute inset-0 flex flex-col justify-center p-8">
                  <div className="flex space-x-4 mb-4">
                    <div className="bg-black/20 backdrop-blur-sm p-2 rounded animate-pulse-slow">
                      <svg className="h-6 w-6 text-energy-orange" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <div className="bg-black/20 backdrop-blur-sm p-2 rounded animate-pulse-slow" style={{ animationDelay: '1s' }}>
                      <svg className="h-6 w-6 text-energy-orange" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path>
                      </svg>
                    </div>
                  </div>
                  
                  <h1 className="text-5xl font-bold mb-4 uppercase tracking-wider">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-energy-orange via-victory-gold to-energy-orange bg-size-200 animate-gradient-x">
                      Level Up
                    </span>
                    <br />
                    Your Game
                  </h1>
                  
                  <div className="bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded inline-block hover:bg-black/40 transition-all duration-300">
                    <span className="text-energy-orange font-bold">LOCAL PAYMENTS</span> INSTANT DELIVERY <span className="text-white font-bold">TODAY</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Side Banner */}
            <div className="hidden lg:block w-1/6 h-80 bg-gray-200 rounded-lg overflow-hidden relative hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 flex flex-col justify-end p-4">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">Daily Rewards</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Carousel Navigation Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  activeSlide === index 
                    ? 'w-8 bg-gradient-to-r from-energy-orange to-victory-gold' 
                    : 'w-2 bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Exclusive Offers */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold uppercase relative inline-block">
                <span className="relative z-10">EXCLUSIVE OFFERS</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-energy-orange to-victory-gold opacity-70"></span>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Don&apos;t miss our limited-time offers! Discover current deals today!</p>
            </div>
            <Link 
              href="/offers" 
              className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-energy-orange hover:to-victory-gold hover:text-white transition-all duration-300"
            >
              View more
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
            {exclusiveOffers.map((offer) => (
              <Link key={offer.id} href={offer.href} className="block group">
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300">
                  <div className="relative h-32 bg-gray-200">
                    <div className="absolute top-2 left-2 bg-growth-green text-white text-xs px-2 py-1 rounded group-hover:animate-pulse-slow">PROMO</div>
                    <div className="absolute top-2 right-2 text-xs font-medium bg-black/50 text-white px-2 py-1 rounded">{offer.discount}</div>
                    <img 
                      src={offer.image} 
                      alt={offer.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium line-clamp-2 group-hover:text-energy-orange transition-colors duration-300">{offer.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{offer.subtext}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      {features.map((feature, index) => (
        <FeatureSection
          key={index}
          title={feature.title}
          description={feature.description}
          imageSrc={feature.imageSrc}
          imageAlt={feature.imageAlt}
          imageOnLeft={feature.imageOnLeft}
          className="mx-6 my-10"
        />
      ))}
      
      {/* Product Sections */}
      <div className="container mx-auto px-6 py-8">
        <ProductSection
          title="POPULAR GAME CARDS"
          viewMoreHref="/browse/game-cards"
          products={popularGameCards}
        />
        
        <ProductSection
          title="POPULAR GAME TOP-UPS"
          viewMoreHref="/browse/top-ups"
          products={popularGameTopUps}
        />
      </div>
      
      {/* Payment Methods */}
      <section className="container mx-auto px-6 my-12">
        <div className={`py-8 px-8 rounded-lg ${
          theme === 'dark' ? 'bg-digital-black/30' : 'bg-cloud-white/30'
        } hover:shadow-lg transition-all duration-300`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className={`text-xl font-bold mb-2 ${
                theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'
              }`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-energy-orange to-victory-gold">
                  LOCAL PAYMENT METHODS
                </span>
              </h2>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-cloud-white/70' : 'text-charcoal/70'
              }`}>Pay with your preferred local payment method</p>
            </div>
            <div className="flex space-x-6">
              {paymentMethods.map((method, index) => (
                <div 
                  key={method.id} 
                  className="h-10 w-10 relative hover:scale-110 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={method.image} 
                    alt={method.name} 
                    className="rounded-md object-contain animate-pulse-slow"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* PWA Features */}
      <section className="container mx-auto px-6 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold uppercase ${
            theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'
          }`}>
            <span className="relative">
              OFFLINE CAPABILITIES
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-energy-orange to-victory-gold"></span>
            </span>
          </h2>
          
          <Link 
            href="/pwa-features" 
            className={`flex items-center text-sm ${
              theme === 'dark' ? 'text-cloud-white/70 hover:text-energy-orange' : 'text-charcoal/70 hover:text-energy-orange'
            } transition-colors duration-300`}
          >
            Learn more about our PWA features
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-lg ${
            theme === 'dark' ? 'bg-digital-black/20' : 'bg-cloud-white/20'
          } hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]`}>
            <div className="text-3xl mb-4 animate-pulse-slow">📱</div>
            <h3 className={`text-lg font-bold mb-2 ${
              theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'
            }`}>Offline Browsing</h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-cloud-white/70' : 'text-charcoal/70'
            }`}>Browse products even when you&apos;re offline. Your data syncs when you reconnect.</p>
          </div>
          
          <div className={`p-6 rounded-lg ${
            theme === 'dark' ? 'bg-digital-black/20' : 'bg-cloud-white/20'
          } hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]`} style={{ transitionDelay: '0.1s' }}>
            <div className="text-3xl mb-4 animate-pulse-slow" style={{ animationDelay: '0.5s' }}>🛒</div>
            <h3 className={`text-lg font-bold mb-2 ${
              theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'
            }`}>Cart Management</h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-cloud-white/70' : 'text-charcoal/70'
            }`}>Add items to your cart offline and complete your purchase when you&apos;re back online.</p>
          </div>
          
          <div className={`p-6 rounded-lg ${
            theme === 'dark' ? 'bg-digital-black/20' : 'bg-cloud-white/20'
          } hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]`} style={{ transitionDelay: '0.2s' }}>
            <div className="text-3xl mb-4 animate-pulse-slow" style={{ animationDelay: '1s' }}>🔔</div>
            <h3 className={`text-lg font-bold mb-2 ${
              theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'
            }`}>Push Notifications</h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-cloud-white/70' : 'text-charcoal/70'
            }`}>Get notified about order updates, price alerts, and exclusive offers.</p>
          </div>
        </div>
      </section>
      
      {/* Mobile App Promotion */}
      <section className="container mx-auto px-6 mb-16">
        <div className={`rounded-xl p-8 ${
          theme === 'dark' ? 'bg-energy-orange' : 'bg-energy-orange'
        } text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden group`}>
          <div className="absolute inset-0 bg-gradient-to-r from-energy-orange via-victory-gold to-energy-orange opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-size-200 animate-gradient-x"></div>
          <div className="flex items-center mb-4 md:mb-0 relative z-10">
            <div className="mr-4 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl animate-pulse-slow">
              📱
            </div>
            <div>
              <h3 className="font-bold text-lg">1More Game PWA</h3>
              <p className="text-sm text-white/80">Install our app for the best gaming experience</p>
            </div>
          </div>
          <Link 
            href="/app" 
            className="bg-white text-energy-orange px-6 py-2 rounded-full font-medium hover:scale-105 transition-all duration-300 hover:shadow-lg relative z-10 group-hover:bg-digital-black group-hover:text-white"
          >
            Install Now
          </Link>
        </div>
      </section>
      
    
    </main>
  );
}
