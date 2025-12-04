"use client"

import Link from "next/link"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCartStore } from "@/features/cart/store/cart-store"
import { toast } from "sonner"
import type { CartItem as CartItemType } from "@/lib/types"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const handleRemove = () => {
    removeItem(item.productId)
    toast.success("Đã xóa khỏi giỏ hàng", {
      description: item.product.name,
    })
  }

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1)
    }
  }

  const handleIncrease = () => {
    updateQuantity(item.productId, item.quantity + 1)
  }

  const subtotal = item.product.price * item.quantity

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary">
            <img
              src={item.product.images[0] || "/placeholder.svg"}
              alt={item.product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.product.slug}`}
                className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
              >
                {item.product.name}
              </Link>
              <p className="text-sm text-muted-foreground mt-1">{item.product.category}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleRemove} className="flex-shrink-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Xóa</span>
            </Button>
          </div>

          {/* Price and Quantity */}
          <div className="flex items-center justify-between gap-4 mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleDecrease}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleIncrease}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="font-semibold text-foreground">{formatPrice(subtotal)}</p>
              {item.quantity > 1 && (
                <p className="text-xs text-muted-foreground">
                  {formatPrice(item.product.price)} x {item.quantity}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
