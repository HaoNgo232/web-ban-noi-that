import { apiClient } from "./client";
import type { Collection } from "@/types/collection.types";

export const collectionsApi = {
  getCollections: async (): Promise<Collection[]> => {
    const response = await apiClient.get<Collection[]>("/collections");
    return response.data;
  },

  getCollection: async (slug: string): Promise<Collection> => {
    const response = await apiClient.get<Collection>(`/collections/${slug}`);
    return response.data;
  },
};

