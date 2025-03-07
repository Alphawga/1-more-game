import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadResponse {
  url: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
}

/**
 * Uploads an image to Cloudinary
 * @param file The file to upload (can be a file path or base64 string)
 * @param options Upload options
 * @returns Promise<UploadResponse>
 */
export async function uploadImage(
  file: string,
  options: {
    folder?: string;
    transformation?: {
      width?: number;
      height?: number;
      crop?: string;
      quality?: number;
    };
  } = {}
): Promise<UploadResponse> {
  try {
    const uploadOptions = {
      folder: options.folder || '1moregame/products',
      transformation: options.transformation || {
        width: 800,
        height: 800,
        crop: 'fill',
        quality: 'auto:best',
      },
    };

    const result = await cloudinary.uploader.upload(file, uploadOptions);

    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Deletes an image from Cloudinary
 * @param publicId The public ID of the image to delete
 * @returns Promise<void>
 */
export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw new Error('Failed to delete image');
  }
}

/**
 * Generates a Cloudinary URL with transformations
 * @param publicId The public ID of the image
 * @param options Transformation options
 * @returns string
 */
export function getImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    secure: true,
    width: options.width || 800,
    height: options.height || 800,
    crop: options.crop || 'fill',
    quality: options.quality || 'auto:best',
  });
} 