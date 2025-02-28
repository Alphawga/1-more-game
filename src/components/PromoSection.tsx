"use client";

import { useTheme } from './ThemeProvider';
import PromoCard from './PromoCard';

interface PromoItem {
  id: string;
  name: string;
  subtext: string;
  image: string;
  discount: string;
  href: string;
}

interface PromoSectionProps {
  title: string;
  subtitle?: string;
  promoItems: PromoItem[];
  className?: string;
}

export default function PromoSection({
  title,
  subtitle,
  promoItems,
  className = ''
}: PromoSectionProps) {
  const { theme } = useTheme();
  
  return (
    <section className={`my-10 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className={`text-2xl font-bold uppercase ${
            theme === 'dark' ? 'text-cloud-white' : 'text-digital-black'
          }`}>
            {title}
          </h2>
          
          {subtitle && (
            <p className={`text-sm mt-1 ${
              theme === 'dark' ? 'text-cloud-white/70' : 'text-charcoal/70'
            }`}>
              {subtitle}
            </p>
          )}
        </div>
        
        <button 
          className="px-5 py-2 rounded-full bg-digital-black text-cloud-white text-sm font-medium hover:bg-charcoal transition-colors"
        >
          View more
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {promoItems.map((item) => (
          <PromoCard
            key={item.id}
            name={item.name}
            subtext={item.subtext}
            image={item.image}
            discount={item.discount}
            href={item.href}
          />
        ))}
      </div>
    </section>
  );
} 