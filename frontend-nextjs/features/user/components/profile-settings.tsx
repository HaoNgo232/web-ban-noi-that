"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/features/auth/store/auth-store"
import { useCartStore } from "@/features/cart/store/cart-store"
import { toast } from "sonner"
import { LogOut, Trash2 } from "lucide-react"

export function ProfileSettings() {
  const router = useRouter()
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const clearCart = useCartStore((state) => state.clearCart)

  const handleLogout = () => {
    clearAuth()
    toast.success("Đã đăng xuất")
    router.push("/")
  }

  const handleDeleteAccount = () => {
    // Mock delete account
    toast.success("Tài khoản đã được xóa")
    clearAuth()
    clearCart()
    router.push("/")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Logout */}
      <Card className="p-6">
        <h2 className="font-semibold text-lg text-foreground mb-4">Đăng xuất</h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Đăng xuất khỏi tài khoản của bạn trên thiết bị này
        </p>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Đăng xuất
        </Button>
      </Card>

      {/* Delete Account */}
      <Card className="p-6 border-destructive/50">
        <h2 className="font-semibold text-lg text-destructive mb-4">Vùng nguy hiểm</h2>
        <Separator className="mb-4" />
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">Xóa tài khoản</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.
            </p>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa tài khoản
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
