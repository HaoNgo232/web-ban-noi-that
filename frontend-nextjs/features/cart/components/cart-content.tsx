"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useCartStore } from "@/features/cart/store/cart-store"
import { CartItem } from "@/features/cart/components/cart-item"
import { CartSummary } from "@/features/cart/components/cart-summary"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

export function CartContent() {
  const items = useCartStore((state) => state.items)

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
            Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!
          </p>
          <Button asChild size="lg">
            <Link href="/products">Tiếp tục mua sắm</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">Giỏ hàng</h1>
        <p className="text-muted-foreground mb-8">{items.length} sản phẩm trong giỏ hàng</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CartItem item={item} />
            </motion.div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <motion.div
            className="sticky top-20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CartSummary />
          </motion.div>
        </div>
      </div>

      {/* Continue Shopping */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Button asChild variant="outline">
          <Link href="/products">Tiếp tục mua sắm</Link>
        </Button>
      </motion.div>
    </div>
  )
}
