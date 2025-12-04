"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/features/cart/store/cart-store"
import { ShippingForm } from "@/features/checkout/components/shipping-form"
import { PaymentMethod } from "@/features/checkout/components/payment-method"
import { OrderSummary } from "@/features/checkout/components/order-summary"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import type { Address } from "@/lib/types"

export function CheckoutContent() {
  const router = useRouter()
  const { items, clearCart, getTotal } = useCartStore()
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  if (items.length === 0) {
    return (
      <div className="container px-4 py-20">
        <motion.div
          className="max-w-md mx-auto text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Giỏ hàng trống</h1>
          <p className="text-muted-foreground leading-relaxed">
            Bạn cần thêm sản phẩm vào giỏ hàng trước khi thanh toán
          </p>
          <Button asChild size="lg">
            <Link href="/products">Tiếp tục mua sắm</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  const handlePlaceOrder = async () => {
    if (!shippingAddress || !paymentMethod) {
      return
    }

    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    clearCart()
    router.push("/checkout/success")
  }

  const canPlaceOrder = shippingAddress && paymentMethod

  return (
    <div className="container px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">Thanh toán</h1>
        <p className="text-muted-foreground mb-8">Hoàn tất thông tin để đặt hàng</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Forms */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ShippingForm onSubmit={setShippingAddress} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PaymentMethod selectedMethod={paymentMethod} onSelect={setPaymentMethod} />
          </motion.div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            className="sticky top-20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <OrderSummary onPlaceOrder={handlePlaceOrder} canPlaceOrder={!!canPlaceOrder} isProcessing={isProcessing} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
