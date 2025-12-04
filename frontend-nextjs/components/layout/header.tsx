"use client"

import Link from "next/link"
import { ShoppingBag, User, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/features/cart/store/cart-store"
import { useAuthStore } from "@/features/auth/store/auth-store"

export function Header() {
  const itemsCount = useCartStore((state) => state.getItemsCount())
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-serif text-2xl font-bold text-foreground">Nội Thất Việt</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/products"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sản phẩm
          </Link>
          <Link
            href="/collections"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Bộ sưu tập
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Về chúng tôi
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Liên hệ
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Tìm kiếm</span>
          </Button>

          <Link href={isAuthenticated ? "/profile" : "/login"}>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Tài khoản</span>
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
              <span className="sr-only">Giỏ hàng</span>
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
