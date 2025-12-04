import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/features/cart/hooks/useCart";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderSummaryProps {
    readonly className?: string;
}

export function OrderSummary({ className }: OrderSummaryProps) {
    const { items, totalItems, totalPrice } = useCart();

    // Shipping fee (free for orders over 2,000,000 VND)
    const shippingFee = totalPrice >= 2000000 ? 0 : 50000;
    const finalTotal = totalPrice + shippingFee;

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-3">
                        {items.map((item) => {
                            const discountPrice = item.product.discountPercentage
                                ? item.product.price *
                                (1 - item.product.discountPercentage / 100)
                                : null;
                            const itemTotal = discountPrice
                                ? discountPrice * item.quantity
                                : item.product.price * item.quantity;

                            return (
                                <div key={item.product.id} className="flex gap-3">
                                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
                                        {item.product.images && item.product.images.length > 0 ? (
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm line-clamp-2">
                                            {item.product.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Số lượng: {item.quantity}
                                        </p>
                                        <p className="text-sm font-semibold mt-1">
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(itemTotal)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>

                <Separator />

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                            Tạm tính ({totalItems} sản phẩm)
                        </span>
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
            </CardContent>
        </Card>
    );
}

