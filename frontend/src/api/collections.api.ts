import { apiClient } from "./client";
import type { Collection } from "@/types/collection.types";

interface GetCollectionsResponse {
  data: Collection[];
}

export const collectionsApi = {
  getCollections: async (): Promise<Collection[]> => {
    try {
      const response = await apiClient.get<GetCollectionsResponse>(
        "/collections",
      );
      // Backend trả về { data: [...] }, axios wrap trong response.data
      // Vậy response.data = { data: [...] }
      // Cần lấy response.data.data
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      // Fallback: nếu response.data là array trực tiếp
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching collections:", error);
      throw error;
    }
  },

  getCollection: async (slug: string): Promise<Collection> => {
    try {
      const response = await apiClient.get<Collection>(`/collections/${slug}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching collection:", error);
      throw error;
    }
  },
};
