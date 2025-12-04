import type { Product } from "@/lib/types"

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
  products: Product[]
}
