'use client';

import { Product } from '@prisma/client';
import Image from 'next/image';

interface ProductListProps {
  products: Product[];
  onToggleActive?: (id: string) => void;
  onToggleFeatured?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ProductList({ 
  products,
  onToggleActive,
  onToggleFeatured,
  onDelete
}: ProductListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Products</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-lg border bg-white shadow"
          >
            {product.image && (
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-500">
                ${product.price.toFixed(2)}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => onToggleActive?.(product.id)}
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    product.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {product.isActive ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => onToggleFeatured?.(product.id)}
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    product.isFeatured
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => onDelete?.(product.id)}
                  className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 