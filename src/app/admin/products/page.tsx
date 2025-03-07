'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/admin/ProductForm';
import { api } from '@/trpc/react';
import  { Product } from '@prisma/client';



const mockProducts: Product[] = [
  {
    id: '1',
    name: 'PlayStation Network Card',
    price: 25.00,
    salePrice: null, 
    category: 'Gift Cards',
    stock: 100,
    isActive: true,
    isFeatured: true,
    createdAt: '2023-05-01T12:00:00Z',
  },
  {
    id: '2',
    name: 'Free Fire 100 Diamonds',
    price: 2.99,
    salePrice: 2.49,
    category: 'Game Currency',
    stock: 500,
    isActive: true,
    isFeatured: true,
    createdAt: '2023-05-02T12:00:00Z',
  },
  {
    id: '3',
    name: 'PUBG Mobile 60 UC',
    price: 1.99,
    salePrice: null,
    category: 'Game Currency',
    stock: 300,
    isActive: true,
    isFeatured: false,
    createdAt: '2023-05-03T12:00:00Z',
  },
  {
    id: '4',
    name: 'Steam Wallet Code',
    price: 20.00,
    salePrice: null,
    category: 'Gift Cards',
    stock: 150,
    isActive: true,
    isFeatured: false,
    createdAt: '2023-05-04T12:00:00Z',
  },
  {
    id: '5',
    name: 'Xbox Game Pass',
    price: 14.99,
    salePrice: 11.99,
    category: 'Subscriptions',
    stock: 200,
    isActive: true,
    isFeatured: true,
    createdAt: '2023-05-05T12:00:00Z',
  },
];

// For pagination
const PAGE_SIZE = 10;

export const metadata = {
  title: 'Manage Products - Admin Dashboard',
};

type Product = RouterOutputs['product']['getAll']['items'][number];

async function ProductList() {
  const { items: products } = await api.product.getAll.query({
    limit: 10,
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Products</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-lg border bg-white shadow"
          >
            {product.image && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
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
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    product.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {product.isActive ? 'Active' : 'Inactive'}
                </span>
                {product.isFeatured && (
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<{ field: keyof Product; direction: 'asc' | 'desc' }>({
    field: 'createdAt',
    direction: 'desc',
  });
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handler for deleting a product
  const handleDelete = (id: string) => {
    // In a real app, you would call an API to delete the product
    // For now, just filter it out locally
    setProducts(products.filter(product => product.id !== id));
  };
  
  // Handler for toggling product active status
  const handleToggleActive = (id: string) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, isActive: !product.isActive } : product
    ));
  };

  // Handler for toggling featured status
  const handleToggleFeatured = (id: string) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, isFeatured: !product.isFeatured } : product
    ));
  };
  
  // Apply filters and search
  const filteredProducts = products.filter(product => {
    // Apply search filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply category filter
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }
    
    // Apply status filter
    if (statusFilter !== null && product.isActive !== statusFilter) {
      return false;
    }
    
    return true;
  });
  
  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortBy.field];
    const bValue = b[sortBy.field];
    
    if (aValue === null) return sortBy.direction === 'asc' ? -1 : 1;
    if (bValue === null) return sortBy.direction === 'asc' ? 1 : -1;
    
    if (aValue < bValue) return sortBy.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortBy.direction === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Apply pagination
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  
  // Calculate total pages
  const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
  
  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean))) as string[];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <p className="mt-2 text-gray-600">
          Create and manage your product catalog
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">Add New Product</h2>
            <ProductForm
              onSubmit={async (formData) => {
                'use server';
                const data = Object.fromEntries(formData.entries());
                await api.product.create.mutate({
                  ...data,
                  price: parseFloat(data.price as string),
                  stock: parseInt(data.stock as string),
                  isActive: Boolean(data.isActive),
                  isFeatured: Boolean(data.isFeatured),
                });
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <Suspense
            fallback={
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            }
          >
            <ProductList />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 