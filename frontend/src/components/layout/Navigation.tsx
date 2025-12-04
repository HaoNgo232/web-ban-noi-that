import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Trang chủ", path: "/" },
  { label: "Sản phẩm", path: "/products" },
  // { label: "Về chúng tôi", path: "/about" },
  // { label: "Liên hệ", path: "/contact" },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground",
              isActive
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

