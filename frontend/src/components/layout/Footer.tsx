import { Link } from "react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";

const footerLinks = {
  company: [
    { label: "Về chúng tôi", path: "/about" },
    { label: "Liên hệ", path: "/contact" },
    { label: "Chính sách", path: "/policy" },
    { label: "Điều khoản", path: "/terms" },
  ],
  support: [
    { label: "Hỗ trợ", path: "/support" },
    { label: "FAQ", path: "/faq" },
    { label: "Vận chuyển", path: "/shipping" },
    { label: "Đổi trả", path: "/returns" },
  ],
  categories: [
    { label: "Sofa", path: "/products?category=SOFA" },
    { label: "Bàn", path: "/products?category=TABLE" },
    { label: "Ghế", path: "/products?category=CHAIR" },
    { label: "Giường", path: "/products?category=BED" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nội Thất Việt</h3>
            <p className="text-sm text-muted-foreground">
              Chuyên cung cấp đồ nội thất chất lượng cao với giá cả hợp lý.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Công ty</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Danh mục</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nội Thất Việt. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

