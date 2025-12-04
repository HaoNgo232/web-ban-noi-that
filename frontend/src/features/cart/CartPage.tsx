import { useCart } from "./hooks/useCart";
import { CartItem } from "./components/CartItem";
import { CartSummary } from "./components/CartSummary";
import { EmptyState } from "@/components/common/EmptyState";
import { ShoppingCart } from "lucide-react";

export function CartPage() {
    const { items, isEmpty } = useCart();

    if (isEmpty) {
        return (
            <div className="container py-12">
                <EmptyState
                    title="Giỏ hàng trống"
                    description="Bạn chưa có sản phẩm nào trong giỏ hàng"
                    icon={<ShoppingCart className="h-12 w-12 text-muted-foreground" />}
                    action={{
                        label: "Tiếp tục mua sắm",
                        to: "/products",
                    }}
                />
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Giỏ hàng</h1>
                <p className="text-muted-foreground">
                    {items.length} sản phẩm trong giỏ hàng
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <CartItem
                            key={item.product.id}
                            product={item.product}
                            quantity={item.quantity}
                        />
                    ))}
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-20">
                        <CartSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}

