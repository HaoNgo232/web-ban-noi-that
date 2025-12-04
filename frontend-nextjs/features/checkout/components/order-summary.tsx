"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/features/cart/store/cart-store"
import { Loader2 } from "lucide-react"

interface OrderSummaryProps {
  onPlaceOrder: () => void
  canPlaceOrder: boolean
  isProcessing: boolean
}

export function OrderSummary({ onPlaceOrder, canPlaceOrder, isProcessing }: OrderSummaryProps) {
  const { items, getTotal } = useCartStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const subtotal = getTotal()
  const shipping = subtotal >= 5000000 ? 0 : 200000
  const total = subtotal + shipping

  return (
    <Card className="p-6 space-y-6">
      <h2 className="font-semibold text-lg text-foreground">Đơn hàng của bạn</h2>

      {/* Order Items */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.productId} className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
              <img
                src={item.product.images[0] || "/placeholder.svg"}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-2">{item.product.name}</p>
              <p className="text-xs text-muted-foreground mt-1">Số lượng: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-foreground">{formatPrice(item.product.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      <Separator />

      {/* Price Summary */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tạm tính</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Phí vận chuyển</span>
          <span className="font-medium">
            {shipping === 0 ? <span className="text-primary">Miễn phí</span> : formatPrice(shipping)}
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground">Tổng cộng</span>
        <span className="font-bold text-xl text-foreground">{formatPrice(total)}</span>
      </div>

      <Button size="lg" className="w-full" onClick={onPlaceOrder} disabled={!canPlaceOrder || isProcessing}>
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Đang xử lý...
          </>
        ) : (
          "Đặt hàng"
        )}
      </Button>

      {!canPlaceOrder && (
        <p className="text-xs text-destructive text-center">
          Vui lòng hoàn tất thông tin giao hàng và phương thức thanh toán
        </p>
      )}
    </Card>
  )
}
