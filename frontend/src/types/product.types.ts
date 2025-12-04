// Enums as const objects
export const ProductCategory = {
  SOFA: "SOFA",
  TABLE: "TABLE",
  CHAIR: "CHAIR",
  BED: "BED",
  CABINET: "CABINET",
  SHELF: "SHELF",
  LIGHTING: "LIGHTING",
  DECORATION: "DECORATION",
} as const;

export type ProductCategory =
  (typeof ProductCategory)[keyof typeof ProductCategory];

export const ProductStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  OUT_OF_STOCK: "OUT_OF_STOCK",
} as const;

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];

// Product entity
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  status: ProductStatus;
  material?: string;
  images?: string[];
  discountPercentage?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Paginated response
export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Query params
export interface ProductsQuery {
  page?: number;
  limit?: number;
  category?: ProductCategory;
  status?: ProductStatus;
  search?: string;
  sortBy?: "price" | "createdAt" | "name";
  sortOrder?: "asc" | "desc";
}
