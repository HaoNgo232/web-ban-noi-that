import { apiClient } from "./client";
import type {
  Product,
  ProductsResponse,
  ProductsQuery,
} from "@/types/product.types";

export const productsApi = {
  /**
   * Get products list with filters, sorting, and pagination
   */
  getProducts: async (query: ProductsQuery = {}): Promise<ProductsResponse> => {
    const params = new URLSearchParams();

    if (query.page) params.append("page", query.page.toString());
    if (query.limit) params.append("limit", query.limit.toString());
    if (query.category) params.append("category", query.category);
    if (query.status) params.append("status", query.status);
    if (query.search) params.append("search", query.search);
    if (query.sortBy) params.append("sortBy", query.sortBy);
    if (query.sortOrder) params.append("sortOrder", query.sortOrder);

    const response = await apiClient.get<ProductsResponse>(
      `/products?${params.toString()}`,
    );
    return response.data;
  },

  /**
   * Get single product by ID
   */
  getProduct: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },
};
