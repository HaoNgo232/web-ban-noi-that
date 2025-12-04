import type { Product } from "@/types/product.types";

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  products: Product[];
}

