import type { Collection } from "@/features/collections/types";
import { collectionsApi as apiClient } from "@/api/collections.api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Helper function to transform image URL to backend URL
function transformImageUrl(imagePath: string): string {
  if (!imagePath) return imagePath;
  
  // If already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  
  // If starts with /images/, it's already correct
  if (imagePath.startsWith("/images/")) {
    return `${API_URL}${imagePath}`;
  }
  
  // If starts with /, prepend /images
  if (imagePath.startsWith("/")) {
    return `${API_URL}/images${imagePath}`;
  }
  
  // Otherwise, prepend /images/
  return `${API_URL}/images/${imagePath}`;
}

// Helper function to transform API response to frontend format
function transformCollection(apiCollection: any): Collection {
  // Transform collection image
  const transformedImage = transformImageUrl(apiCollection.image);
  
  // Transform product images
  const transformedProducts = (apiCollection.products || []).map((product: any) => ({
    ...product,
    images: (product.images || []).map((img: string) => transformImageUrl(img)),
  }));

  return {
    id: apiCollection.id,
    name: apiCollection.name,
    slug: apiCollection.slug,
    description: apiCollection.description,
    image: transformedImage,
    productCount: apiCollection.productCount || transformedProducts.length || 0,
    products: transformedProducts,
  };
}

export const collectionsApi = {
  getCollections: async (): Promise<Collection[]> => {
    const response = await apiClient.getCollections();
    return response.map(transformCollection);
  },

  getCollection: async (slug: string): Promise<Collection> => {
    const collection = await apiClient.getCollection(slug);
    return transformCollection(collection);
  },
};

