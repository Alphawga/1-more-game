"use client";

import React from 'react';

interface Feature {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageOnLeft?: boolean;
}

interface FeatureSectionProps {
  features: Feature[];
}

export default function FeatureSection({ features }: FeatureSectionProps) {
  return (
    <section className="mb-16">
      <div className="space-y-16">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${feature.imageOnLeft ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
          >
            <div className="w-full md:w-1/2">
              <img 
                src={feature.imageSrc} 
                alt={feature.imageAlt} 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 