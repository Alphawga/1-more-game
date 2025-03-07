'use client';

import Navbar from '@/components/Navbar';
import ProductSection from '@/components/ProductSection';
import FeatureSection from '@/components/FeatureSection';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import { useState, useEffect } from 'react';
import { trpc } from '@/utils/trpc';

// Function to generate placeholder URLs
const placeholderImage = (name: string) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;

export default function Home() {
  const { theme } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Fetch products with tRPC
  const { data: featuredProducts, isLoading: isLoadingFeatured } = trpc.product.getAll.useQuery({
    featured: true,
    limit: 8,
  });

  // Fetch categories for sidebar
  const { data: categories, isLoading: isLoadingCategories } = trpc.category.getNavigation.useQuery();
  
  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Convert the fetched data to the format expected by ProductSection
  const getProductCards = () => {
    if (!featuredProducts) return [];
    
    return featuredProducts.products.map(product => ({
      id: product.id,
      name: product.name,
      image: product.image || placeholderImage(product.name),
      region: product.regionCodes.join(', ') || 'Global',
      href: `/product/${product.slug}`,
      price: product.price,
      salePrice: product.salePrice,
      discount: product.promotions.length > 0 ? 
        `-${product.promotions[0].promotion.discountValue}%` : undefined,
      featured: product.isFeatured,
    }));
  };

  // Convert data for the popular game cards (temporary until more sections are added)
  const popularGameCards = getProductCards().slice(0, 4);
  const popularGameTopUps = getProductCards().slice(0, 4);
  const exclusiveOffers = getProductCards().filter(product => product.discount).slice(0, 5);
  
  // Payment methods
  const paymentMethods = [
    { id: '1', name: 'M-Pesa', image: placeholderImage('MPesa') },
    { id: '2', name: 'USSD', image: placeholderImage('USSD') },
    { id: '3', name: 'Mobile Banking', image: placeholderImage('MB') },
    { id: '4', name: 'Cards', image: placeholderImage('Card') },
    { id: '5', name: 'Bank Transfer', image: placeholderImage('Bank') },
  ];

  // Features
  const features = [
    {
      title: 'INSTANT DELIVERY. LOCAL PAYMENTS.',
      description: 'Get your game codes and currencies instantly after purchase. 1Mo Game supports local payment methods including M-Pesa, USSD, and mobile banking, making it easier than ever to pay for your favorite games.',
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
  
  return (
    <main className={theme === 'dark' ? 'bg-digital-black' : 'bg-cloud-white'}>
      <Navbar />
      
      {/* Top Navigation Links */}
      <div className="bg-gray-100 dark:bg-gray-900 py-2 dark:text-cloud-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6 text-sm">
              <Link href="/news" className="text-charcoal dark:text-cloud-white hover:text-energy-orange transition-colors duration-300">Gaming News</Link>
              <Link href="/rewards" className="text-charcoal dark:text-cloud-white hover:text-energy-orange transition-colors duration-300">Loyalty Rewards</Link>
              <Link href="/esports" className="text-charcoal dark:text-cloud-white hover:text-energy-orange transition-colors duration-300">eSports</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/app" className="flex items-center space-x-1 text-sm group text-charcoal dark:text-cloud-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:text-energy-orange transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <span className="group-hover:text-energy-orange transition-colors duration-300">Download PWA</span>
              </Link>
              <div className="flex items-center space-x-2 text-sm text-charcoal dark:text-cloud-white">
                <span>EN</span>
                <span>|</span>
                <span>NGN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 lg:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Category Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
              <h2 className="text-lg font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Categories</h2>
              
              {isLoadingCategories ? (
                // Loading skeleton
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      selectedCategory === null
                        ? 'bg-energy-orange text-white font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    All Products
                  </button>
                  
                  {categories?.map((category) => (
                    <div key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          selectedCategory === category.id
                            ? 'bg-energy-orange text-white font-medium'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {category.name}
                      </button>
                      
                      {/* Subcategories */}
                      {selectedCategory === category.id && category.children.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1">
                          {category.children.map((subCategory) => (
                            <button
                              key={subCategory.id}
                              onClick={() => setSelectedCategory(subCategory.id)}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                                selectedCategory === subCategory.id
                                  ? 'bg-energy-orange text-white font-medium'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            >
                              {subCategory.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
              <h2 className="text-lg font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Quick Links</h2>
              <div className="space-y-2">
                <Link href="/featured" className="block text-trust-blue hover:text-energy-orange dark:text-blue-400 dark:hover:text-energy-orange">
                  Featured Products
                </Link>
                <Link href="/new-arrivals" className="block text-trust-blue hover:text-energy-orange dark:text-blue-400 dark:hover:text-energy-orange">
                  New Arrivals
                </Link>
                <Link href="/deals" className="block text-trust-blue hover:text-energy-orange dark:text-blue-400 dark:hover:text-energy-orange">
                  Special Deals
                </Link>
                <Link href="/best-sellers" className="block text-trust-blue hover:text-energy-orange dark:text-blue-400 dark:hover:text-energy-orange">
                  Best Sellers
                </Link>
              </div>
            </div>
            
            {/* Customer Support */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Customer Support</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-energy-orange mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-sm">+234 800 123 4567</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-energy-orange mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm">support@1moregame.com</span>
                </div>
                <Link href="/contact" className="block text-center mt-2 bg-energy-orange hover:bg-trust-blue text-white rounded-md py-2 transition-colors duration-300">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Banner Carousel */}
            <section className="relative mb-8">
              <div className="flex space-x-4">
                {/* Main Banner */}
                <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden relative hover:shadow-lg transition-all duration-300">
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
                  ></button>
                ))}
              </div>
            </section>
            
            {/* Product Sections */}
            <ProductSection 
              title="Popular Game Cards" 
              cards={popularGameCards} 
              isLoading={isLoadingFeatured}
            />
            
            <ProductSection 
              title="Popular Game Top-Ups" 
              cards={popularGameTopUps} 
              isLoading={isLoadingFeatured}
            />
            
            <ProductSection 
              title="Exclusive Offers" 
              cards={exclusiveOffers}
              viewAllLink="/offers"
              cardSize="large"
              isLoading={isLoadingFeatured}
            />
            
            {/* Features Section */}
            <FeatureSection features={features} />
            
            {/* Payment Methods */}
            <section className="mb-16">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold">Supported Payment Methods</h2>
                <p className="text-gray-600 dark:text-gray-400">We support various local payment methods for your convenience</p>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
                      <img src={method.image} alt={method.name} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-center">{method.name}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
