"use client";

import Link from 'next/link';
import React from 'react';

export interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  region?: string;
  href: string;
  price?: number;
  salePrice?: number | null;
  discount?: string;
  featured?: boolean;
}

export interface ProductSectionProps {
  title: string;
  cards: ProductCardProps[];
  viewAllLink?: string;
  cardSize?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

export default function ProductSection({
  title,
  cards,
  viewAllLink,
  cardSize = 'medium',
  isLoading = false,
}: ProductSectionProps) {
  // Determine grid columns based on card size
  const gridCols = {
    small: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
    medium: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    large: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  }[cardSize];

  // Determine card height based on size
  const cardHeight = {
    small: 'h-32',
    medium: 'h-40',
    large: 'h-48',
  }[cardSize];

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold uppercase relative inline-block">
            <span className="relative z-10">{title}</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-energy-orange to-victory-gold opacity-70"></span>
          </h2>
          {cards.length > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {cards.length} products available
            </p>
          )}
        </div>
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-energy-orange hover:to-victory-gold hover:text-white transition-all duration-300"
          >
            View all
          </Link>
        )}
      </div>

      {isLoading ? (
        // Loading skeleton
        <div className={`grid ${gridCols} gap-4`}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className={`${cardHeight} bg-gray-200 dark:bg-gray-700 rounded-lg mb-2`}></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : cards.length > 0 ? (
        <div className={`grid ${gridCols} gap-4`}>
          {cards.map((card) => (
            <Link key={card.id} href={card.href} className="block group">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300">
                <div className={`relative ${cardHeight} bg-gray-200`}>
                  {card.featured && (
                    <div className="absolute top-2 left-2 bg-trust-blue text-white text-xs px-2 py-1 rounded group-hover:animate-pulse-slow">
                      FEATURED
                    </div>
                  )}
                  {card.discount && (
                    <div className="absolute top-2 right-2 text-xs font-medium bg-black/50 text-white px-2 py-1 rounded">
                      {card.discount}
                    </div>
                  )}
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium line-clamp-2 group-hover:text-energy-orange transition-colors duration-300">
                    {card.name}
                  </h3>
                  {card.region && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{card.region}</p>
                  )}
                  {card.price !== undefined && (
                    <div className="mt-2 flex items-center">
                      <span className="font-medium">${card.price.toFixed(2)}</span>
                      {card.salePrice && (
                        <span className="ml-2 text-sm line-through text-gray-500 dark:text-gray-400">
                          ${card.salePrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No products available</p>
        </div>
      )}
    </section>
  );
} 