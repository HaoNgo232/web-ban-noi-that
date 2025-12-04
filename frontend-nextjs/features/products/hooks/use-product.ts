import { useQuery } from "@tanstack/react-query"
import { productsApi } from "@/features/products/api/products-api"

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => productsApi.getProduct(slug),
  })
}
