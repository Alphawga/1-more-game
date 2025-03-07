import { useState } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { ImageUpload } from './ImageUpload';
import { Product } from '@prisma/client';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: FormData) => Promise<void>;
  isLoading?: boolean;
}

export function ProductForm({
  initialData,
  onSubmit,
  isLoading = false,
}: ProductFormProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialData?.image);
  const { uploadImage, isUploading } = useImageUpload({
    folder: '1moregame/products',
    onSuccess: (response) => {
      setImageUrl(response.url);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add the image URL if it exists
    if (imageUrl) {
      formData.set('image', imageUrl);
    }

    await onSubmit(formData);
  };

  const handleImageUpload = async (file: File) => {
    await uploadImage(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Product Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={initialData?.name}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          defaultValue={initialData?.description}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500">$</span>
          </div>
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            defaultValue={initialData?.price}
            required
            className="block w-full rounded-md border border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-700"
        >
          Stock
        </label>
        <input
          type="number"
          name="stock"
          id="stock"
          defaultValue={initialData?.stock}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Image
        </label>
        <ImageUpload
          onImageUpload={handleImageUpload}
          currentImageUrl={imageUrl}
          onImageRemove={() => setImageUrl(undefined)}
          className="mt-1"
        />
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={initialData?.isActive}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">Active</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={initialData?.isFeatured}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">Featured</span>
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading || isUploading}
          className={`flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
            (isLoading || isUploading) && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {isLoading || isUploading ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
} 