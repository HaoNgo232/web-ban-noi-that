import { useQuery } from "@tanstack/react-query"
import { productsApi } from "@/features/products/api/products-api"

interface UseProductsParams {
  filters: {
    category: string
    priceRange: [number, number]
    inStock: boolean
  }
  sortBy: string
  page: number
}

export function useProducts({ filters, sortBy, page }: UseProductsParams) {
  return useQuery({
    queryKey: ["products", filters, sortBy, page],
    queryFn: () => productsApi.getProducts({ filters, sortBy, page }),
  })
}
