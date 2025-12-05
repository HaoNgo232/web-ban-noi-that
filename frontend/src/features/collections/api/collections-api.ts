import type { Collection } from "@/features/collections/types";
import { collectionsApi as apiClient } from "@/api/collections.api";
import { env } from "@/lib/env";

/**
 * Class for managing collections API.
 */
export class CollectionsApi {
  private static transformImageUrl(imagePath: string): string {
    console.log("API_URL:", env.API_URL);

    if (!imagePath) return imagePath;

    // If already a full URL, return as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // If starts with /images/, it's already correct - just prepend API_URL
    if (imagePath.startsWith("/images/")) {
      const fullUrl = `${env.API_URL}${imagePath}`;
      console.log(
        `[CollectionsApi] Transforming image: ${imagePath} -> ${fullUrl}`,
      );
      return fullUrl;
    }

    // If starts with /, prepend /images
    if (imagePath.startsWith("/")) {
      const fullUrl = `${env.API_URL}/images${imagePath}`;
      console.log(
        `[CollectionsApi] Transforming image: ${imagePath} -> ${fullUrl}`,
      );
      return fullUrl;
    }

    // Otherwise, prepend /images/
    const fullUrl = `${env.API_URL}/images/${imagePath}`;
    console.log(
      `[CollectionsApi] Transforming image: ${imagePath} -> ${fullUrl}`,
    );
    return fullUrl;
  }

  /**
   * Transform API response to frontend Collection format.
   * @param apiCollection Raw collection data from backend
   */
  private static transformCollection(apiCollection: any): Collection {
    console.log(
      `[CollectionsApi] Transforming collection: ${apiCollection.name}, image: ${apiCollection.image}`,
    );
    const transformedImage = CollectionsApi.transformImageUrl(
      apiCollection.image,
    );
    console.log(`[CollectionsApi] Transformed image: ${transformedImage}`);

    const transformedProducts = (apiCollection.products || []).map(
      (product: any) => ({
        ...product,
        images: (product.images || []).map((img: string) =>
          CollectionsApi.transformImageUrl(img),
        ),
      }),
    );

    return {
      id: apiCollection.id,
      name: apiCollection.name,
      slug: apiCollection.slug,
      description: apiCollection.description,
      image: transformedImage,
      productCount:
        apiCollection.productCount || transformedProducts.length || 0,
      products: transformedProducts,
    };
  }

  /**
   * Fetch all collections.
   * @returns Promise<Collection[]>
   */
  static async getCollections(): Promise<Collection[]> {
    try {
      const response = await apiClient.getCollections();
      if (!Array.isArray(response)) {
        console.error("Unexpected response format:", response);
        return [];
      }
      return response.map(CollectionsApi.transformCollection);
    } catch (error) {
      console.error("Error in CollectionsApi.getCollections:", error);
      throw error;
    }
  }

  /**
   * Fetch a single collection by slug.
   * @param slug Collection slug
   * @returns Promise<Collection>
   */
  static async getCollection(slug: string): Promise<Collection> {
    try {
      const collection = await apiClient.getCollection(slug);
      if (!collection) {
        throw new Error("Collection not found");
      }
      return CollectionsApi.transformCollection(collection);
    } catch (error) {
      console.error("Error in CollectionsApi.getCollection:", error);
      throw error;
    }
  }
}

// Export an instance for compatibility with hook usage or facades if needed
export const collectionsApi = CollectionsApi;
