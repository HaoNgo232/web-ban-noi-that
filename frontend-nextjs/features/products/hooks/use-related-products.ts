import { useQuery } from "@tanstack/react-query"
import { productsApi } from "@/features/products/api/products-api"

export function useRelatedProducts(category: string) {
  return useQuery({
    queryKey: ["related-products", category],
    queryFn: () => productsApi.getRelatedProducts(category),
    enabled: !!category,
  })
}
