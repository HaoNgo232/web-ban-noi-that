import { useQuery } from "@tanstack/react-query";
import { collectionsApi } from "@/features/collections/api/collections-api";

export function useCollection(slug: string) {
  return useQuery({
    queryKey: ["collection", slug],
    queryFn: () => collectionsApi.getCollection(slug),
  });
}
