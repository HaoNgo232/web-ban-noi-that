import { useQuery } from "@tanstack/react-query";
import { collectionsApi } from "@/features/collections/api/collections-api";

export function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      try {
        return await collectionsApi.getCollections();
      } catch (error) {
        console.error("useCollections error:", error);
        throw error;
      }
    },
    retry: 1,
    retryDelay: 1000,
  });
}
