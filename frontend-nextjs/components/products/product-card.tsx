"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCartStore } from "@/features/cart/store/cart-store"
import { toast } from "sonner"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    toast.success("Đã thêm vào giỏ hàng", {
      description: product.name,
    })
  }

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price)

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group overflow-hidden border-border/50 hover:border-border transition-colors">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          {/* Quick add to cart button */}
          <motion.div
            className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
          >
            <Button size="sm" onClick={handleAddToCart} className="shadow-lg">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Thêm vào giỏ
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{product.description}</p>
          <p className="font-semibold text-foreground pt-2">{formattedPrice}</p>
        </div>
      </Card>
    </Link>
  )
}
