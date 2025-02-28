"use client";

import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';
import { useTheme } from './ThemeProvider';

interface Product {
  id: string;
  name: string;
  image: string;
  region: string;
  href: string;
}

interface ProductSectionProps {
  title: string;
  viewMoreHref: string;
  products: Product[];
  className?: string;
}

export default function ProductSection({ 
  title, 
  viewMoreHref, 
  products,
  className = '' 
}: ProductSectionProps) {
  const { theme } = useTheme();
  
  return (
    <section className={`mb-10 ${
      theme === 'dark' ? 'bg-digital-black/20' : 'bg-cloud-white/20'
    } p-6 rounded-lg ${className}`}>
      <SectionHeader title={title} viewMoreHref={viewMoreHref} />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            image={product.image}
            region={product.region}
            href={product.href}
          />
        ))}
      </div>
    </section>
  );
} 