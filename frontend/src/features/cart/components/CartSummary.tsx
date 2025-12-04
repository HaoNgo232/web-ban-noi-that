import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import { useCart } from "../hooks/useCart";

interface CartSummaryProps {
    readonly onCheckout?: () => void;
}

export function CartSummary({ onCheckout }: CartSummaryProps) {
    const { totalItems, totalPrice, isEmpty } = useCart();

    if (isEmpty) {
        return null;
    }

    // Shipping fee (free for orders over 2,000,000 VND)
    const shippingFee = totalPrice >= 2000000 ? 0 : 50000;
    const finalTotal = totalPrice + shippingFee;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tạm tính ({totalItems} sản phẩm)</span>
                        <span>
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(totalPrice)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Phí vận chuyển</span>
                        <span>
                            {shippingFee === 0 ? (
                                <span className="text-green-600 font-medium">Miễn phí</span>
                            ) : (
                                new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(shippingFee)
                            )}
                        </span>
                    </div>
                    {totalPrice < 2000000 && (
                        <p className="text-xs text-muted-foreground">
                            Mua thêm{" "}
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(2000000 - totalPrice)}{" "}
                            để được miễn phí vận chuyển
                        </p>
                    )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                    <span>Tổng cộng</span>
                    <span>
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(finalTotal)}
                    </span>
                </div>

                <Button
                    asChild
                    size="lg"
                    className="w-full"
                    onClick={onCheckout}
                >
                    <Link to="/checkout">Tiến hành thanh toán</Link>
                </Button>

                <Link
                    to="/products"
                    className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    ← Tiếp tục mua sắm
                </Link>
            </CardContent>
        </Card>
    );
}

