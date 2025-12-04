import { useQuery } from "@tanstack/react-query";
import { collectionsApi } from "@/features/collections/api/collections-api";

export function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: collectionsApi.getCollections,
  });
}

