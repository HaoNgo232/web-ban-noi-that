// Shared types cho toàn bộ app

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  category: string
  subcategory?: string
  inStock: boolean
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  material?: string
  color?: string
  featured?: boolean
  createdAt: string
}

export interface CartItem {
  productId: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  createdAt: string
}

export interface Address {
  fullName: string
  phone: string
  address: string
  city: string
  district: string
  ward: string
  postalCode?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  image?: string
  subcategories?: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  slug: string
}
