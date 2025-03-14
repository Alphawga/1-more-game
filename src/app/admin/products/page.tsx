'use client';

import { useState } from 'react';
import { ProductForm } from '@/components/admin/ProductForm';
import { ProductList } from '@/components/admin/ProductList';
import { ProductFilters } from '@/components/admin/ProductFilters';
import { trpc } from '@/utils/trpc';

const PAGE_SIZE = 10;

export const metadata = {
  title: 'Manage Products - Admin Dashboard',
};

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // tRPC queries
  const { data: productsData, refetch: refetchProducts } = trpc.product.getAll.useQuery({
    page: currentPage,
    limit: PAGE_SIZE,
    search: searchTerm || undefined,
    categoryId: categoryFilter || undefined,
    isActive: statusFilter ?? undefined,
  });

  const { data: categoriesData } = trpc.category.getAll.useQuery({});
  
  const createProduct = trpc.product.create.useMutation({
    onSuccess: () => refetchProducts(),
  });

  const updateProductStatus = trpc.product.updateStatus.useMutation({
    onSuccess: () => refetchProducts(),
  });

  const updateProductFeatured = trpc.product.updateFeatured.useMutation({
    onSuccess: () => refetchProducts(),
  });

  const deleteProduct = trpc.product.delete.useMutation({
    onSuccess: () => refetchProducts(),
  });

  // Handlers
  const handleCreateProduct = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    await createProduct.mutateAsync({
      name: data.name as string,
      description: data.description as string,
      slug: data.slug as string,
      price: parseFloat(data.price as string),
      stock: parseInt(data.stock as string),
      isActive: Boolean(data.isActive),
      isFeatured: Boolean(data.isFeatured),
      categoryId: (data.categoryId as string) || null,
      image: (data.image as string) || null,
      salePrice: data.salePrice ? parseFloat(data.salePrice as string) : null,
      sku: (data.sku as string) || null,
      tags: data.tags ? (data.tags as string).split(',').map(t => t.trim()) : [],
      regionCodes: data.regionCodes ? (data.regionCodes as string).split(',').map(r => r.trim()) : [],
    });
  };

  const handleToggleActive = async (id: string) => {
    await updateProductStatus.mutateAsync({ id });
  };

  const handleToggleFeatured = async (id: string) => {
    await updateProductFeatured.mutateAsync({ id });
  };

  const handleDelete = async (id: string) => {
    await deleteProduct.mutateAsync({ id });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <p className="mt-2 text-gray-600">
          Create and manage your product catalog
        </p>
      </div>

      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categories={categoriesData?.map(c => c.name) ?? []}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">Add New Product</h2>
            <ProductForm onSubmit={handleCreateProduct} />
          </div>
        </div>

        <div className="lg:col-span-2">
          {productsData ? (
            <>
              <ProductList
                products={productsData.products}
                onToggleActive={handleToggleActive}
                onToggleFeatured={handleToggleFeatured}
                onDelete={handleDelete}
              />
              {productsData.pages > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                  {Array.from({ length: productsData.pages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 