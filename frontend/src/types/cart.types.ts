import type { Product } from "./product.types";

// Cart
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  updatedAt: Date | string;
}

// Wishlist
export interface Wishlist {
  productIds: string[];
  updatedAt: Date | string;
}

