'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Search, Filter, TrendingUp, Zap, Star, Clock } from 'lucide-react';

const categories = [
  { name: 'Game Vouchers', icon: Zap, count: 156 },
  { name: 'In-Game Currency', icon: TrendingUp, count: 89 },
  { name: 'Add-ons & DLC', icon: Star, count: 234 },
  { name: 'Limited Time', icon: Clock, count: 45 },
];

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="min-h-screen bg-digital-black">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cloud-white mb-4">
            Browse <span className="text-energy-orange">Gaming</span> Products
          </h1>
          <p className="text-lg text-cloud-white/80">
            Find the best deals on game vouchers, currencies, and add-ons
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="glass-effect rounded-2xl p-4 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3 text-cloud-white/50" />
              <input
                type="text"
                placeholder="Search games, vouchers, or add-ons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-digital-black/50 border border-gray-600 rounded-lg text-cloud-white focus:ring-2 focus:ring-energy-orange focus:border-transparent"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-2 bg-energy-orange hover:bg-energy-orange-hover text-white rounded-lg transition-colors">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <div
              key={category.name}
              className="glass-effect p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-energy-orange/10 text-energy-orange group-hover:bg-energy-orange group-hover:text-white transition-colors">
                  <category.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cloud-white">{category.name}</h3>
                  <p className="text-sm text-cloud-white/60">{category.count} items</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-cloud-white mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Placeholder products - will be replaced with real data */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-effect rounded-2xl overflow-hidden hover:scale-105 transition-transform">
                <div className="aspect-video bg-gradient-to-br from-energy-orange/20 to-trust-blue/20" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-cloud-white mb-2">Product Name</h3>
                  <p className="text-sm text-cloud-white/60 mb-3">Short description here</p>
                  <div className="flex items-center justify-between">
                    <span className="text-victory-gold font-semibold">$19.99</span>
                    <button className="px-4 py-2 bg-energy-orange hover:bg-energy-orange-hover text-white rounded-lg transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 