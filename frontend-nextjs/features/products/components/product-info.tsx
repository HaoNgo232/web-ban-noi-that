"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Minus, Plus, ShoppingBag, Heart, Share2, Truck, Shield, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/features/cart/store/cart-store"
import { toast } from "sonner"
import type { Product } from "@/lib/types"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success("Đã thêm vào giỏ hàng", {
      description: `${product.name} x${quantity}`,
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Category */}
      <p className="text-sm text-primary uppercase tracking-wider font-medium">{product.category}</p>

      {/* Name */}
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{product.name}</h1>

      {/* Price */}
      <div className="flex items-baseline gap-4">
        <p className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</p>
        {!product.inStock && <span className="text-sm text-destructive font-medium">Hết hàng</span>}
      </div>

      <Separator />

      {/* Description */}
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground">Mô tả sản phẩm</h3>
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
      </div>

      {/* Specifications */}
      {(product.dimensions || product.material || product.color) && (
        <>
          <Separator />
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Thông số kỹ thuật</h3>
            <dl className="space-y-2 text-sm">
              {product.dimensions && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Kích thước:</dt>
                  <dd className="font-medium">
                    {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                  </dd>
                </div>
              )}
              {product.material && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Chất liệu:</dt>
                  <dd className="font-medium">{product.material}</dd>
                </div>
              )}
              {product.color && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Màu sắc:</dt>
                  <dd className="font-medium">{product.color}</dd>
                </div>
              )}
            </dl>
          </div>
        </>
      )}

      <Separator />

      {/* Quantity Selector */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Số lượng</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border rounded-lg">
            <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={increaseQuantity}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
          <ShoppingBag className="mr-2 h-5 w-5" />
          {product.inStock ? "Thêm vào giỏ hàng" : "Hết hàng"}
        </Button>
        <Button variant="outline" size="lg">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Yêu thích</span>
        </Button>
        <Button variant="outline" size="lg">
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Chia sẻ</span>
        </Button>
      </div>

      <Separator />

      {/* Features */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Truck className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-sm">Miễn phí vận chuyển</p>
            <p className="text-sm text-muted-foreground">Cho đơn hàng trên 5 triệu đồng</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-sm">Bảo hành 2 năm</p>
            <p className="text-sm text-muted-foreground">Cam kết chất lượng sản phẩm</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <RefreshCcw className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-sm">Đổi trả trong 30 ngày</p>
            <p className="text-sm text-muted-foreground">Nếu không hài lòng với sản phẩm</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
