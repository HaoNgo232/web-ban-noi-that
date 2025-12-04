import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/api/products.api";
import type { ProductsQuery } from "@/types/product.types";

export function useProducts(query: ProductsQuery = {}) {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => productsApi.getProducts(query),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
