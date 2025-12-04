import { Link } from "react-router";
import { ShoppingCart, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Navigation } from "./Navigation";

export function Header() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Nội Thất Việt</span>
        </Link>

        {/* Desktop Navigation */}
        <Navigation />

        {/* Right side: Cart, User Menu, Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          {/* User Menu */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm">
                  <div className="font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user.email}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Hồ sơ</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Đăng nhập</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Đăng ký</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {[
                  { label: "Trang chủ", path: "/" },
                  { label: "Sản phẩm", path: "/products" },
                  { label: "Về chúng tôi", path: "/about" },
                  { label: "Liên hệ", path: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-lg font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <>
                    <Link
                      to="/login"
                      className="text-lg font-medium mt-4"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      className="text-lg font-medium"
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

