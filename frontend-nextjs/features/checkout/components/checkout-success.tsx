"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Package, Mail, Home } from "lucide-react"

export function CheckoutSuccess() {
  return (
    <div className="container px-4 py-20">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          </motion.div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Đặt hàng thành công!</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cảm ơn bạn đã tin tưởng mua sắm tại Habitat. Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.
          </p>
        </div>

        {/* Order Info */}
        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Package className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">Đơn hàng đang được xử lý</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Chúng tôi sẽ chuẩn bị và giao hàng trong vòng 3-5 ngày làm việc
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">Kiểm tra email của bạn</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Chúng tôi đã gửi xác nhận đơn hàng đến email của bạn
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Về trang chủ
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/products">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
