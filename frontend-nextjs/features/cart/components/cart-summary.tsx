"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/features/cart/store/cart-store"
import { ShoppingBag } from "lucide-react"

export function CartSummary() {
  const router = useRouter()
  const { items, getTotal, getItemsCount } = useCartStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const subtotal = getTotal()
  const shipping = subtotal >= 5000000 ? 0 : 200000
  const total = subtotal + shipping

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <Card className="p-6 space-y-6">
      <h2 className="font-semibold text-lg text-foreground">Tóm tắt đơn hàng</h2>

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
        {subtotal < 5000000 && shipping > 0 && (
          <p className="text-xs text-muted-foreground">
            Mua thêm {formatPrice(5000000 - subtotal)} để được miễn phí vận chuyển
          </p>
        )}
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground">Tổng cộng</span>
        <span className="font-bold text-xl text-foreground">{formatPrice(total)}</span>
      </div>

      <Button size="lg" className="w-full" onClick={handleCheckout} disabled={items.length === 0}>
        <ShoppingBag className="mr-2 h-5 w-5" />
        Tiến hành thanh toán
      </Button>

      <div className="space-y-2 text-xs text-muted-foreground">
        <p className="flex items-start gap-2">
          <span>•</span>
          <span>Miễn phí vận chuyển cho đơn hàng trên 5 triệu</span>
        </p>
        <p className="flex items-start gap-2">
          <span>•</span>
          <span>Bảo hành 2 năm cho tất cả sản phẩm</span>
        </p>
        <p className="flex items-start gap-2">
          <span>•</span>
          <span>Đổi trả trong 30 ngày nếu không hài lòng</span>
        </p>
      </div>
    </Card>
  )
}
