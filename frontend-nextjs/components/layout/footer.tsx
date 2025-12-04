import Link from "next/link"
import { Facebook, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/30">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">Habitat</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nội thất cao cấp cho không gian sống hiện đại và tối giản
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Sản phẩm</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products?category=living-room" className="hover:text-foreground transition-colors">
                  Phòng khách
                </Link>
              </li>
              <li>
                <Link href="/products?category=bedroom" className="hover:text-foreground transition-colors">
                  Phòng ngủ
                </Link>
              </li>
              <li>
                <Link href="/products?category=dining" className="hover:text-foreground transition-colors">
                  Phòng ăn
                </Link>
              </li>
              <li>
                <Link href="/products?category=office" className="hover:text-foreground transition-colors">
                  Văn phòng
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/shipping" className="hover:text-foreground transition-colors">
                  Giao hàng
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-foreground transition-colors">
                  Đổi trả
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-foreground transition-colors">
                  Bảo hành
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Kết nối</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Habitat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
