import { ChangeEvent, DragEvent, useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => Promise<void>;
  currentImageUrl?: string;
  onImageRemove?: () => void;
  className?: string;
}

export function ImageUpload({
  onImageUpload,
  currentImageUrl,
  onImageRemove,
  className = '',
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await handleImageUpload(file);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsLoading(true);
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      
      // Upload image
      await onImageUpload(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Reset preview on error
      setPreview(currentImageUrl || null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageRemove?.();
  };

  return (
    <div
      className={`relative rounded-lg border-2 border-dashed p-4 transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {preview ? (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <button
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-md transition-colors hover:bg-red-100"
            type="button"
            aria-label="Remove image"
          >
            <X className="h-4 w-4 text-red-500" />
          </button>
        </div>
      ) : (
        <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2">
          <Upload className={`h-8 w-8 ${isLoading ? 'animate-bounce text-blue-500' : 'text-gray-400'}`} />
          <span className="text-sm text-gray-500">
            {isLoading ? 'Uploading...' : 'Drag and drop or click to upload'}
          </span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </label>
      )}
    </div>
  );
} 