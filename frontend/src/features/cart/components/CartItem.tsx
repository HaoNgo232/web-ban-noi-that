import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../hooks/useCart";
import type { Product } from "@/types/product.types";
import { toast } from "sonner";

interface CartItemProps {
    readonly product: Product;
    readonly quantity: number;
}

export function CartItem({ product, quantity }: CartItemProps) {
    const { updateQuantity, removeItem } = useCart();

    const discountPrice = product.discountPercentage
        ? product.price * (1 - product.discountPercentage / 100)
        : null;

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) {
            removeItem(product.id);
            toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
            return;
        }
        if (newQuantity > product.stock) {
            toast.error(`Chỉ còn ${product.stock} sản phẩm`);
            return;
        }
        updateQuantity(product.id, newQuantity);
    };

    const handleRemove = () => {
        removeItem(product.id);
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    };

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <Link to={`/products/${product.id}`} className="shrink-0">
                        <div className="w-24 h-24 rounded-md overflow-hidden bg-muted">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                    No Image
                                </div>
                            )}
                        </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <Link
                                    to={`/products/${product.id}`}
                                    className="font-semibold hover:underline line-clamp-2"
                                >
                                    {product.name}
                                </Link>
                                {product.material && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Chất liệu: {product.material}
                                    </p>
                                )}
                                {product.status === "OUT_OF_STOCK" && (
                                    <Badge variant="destructive" className="mt-2">
                                        Hết hàng
                                    </Badge>
                                )}
                            </div>

                            {/* Remove Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleRemove}
                                className="shrink-0"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between mt-4">
                            <div>
                                {discountPrice ? (
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold">
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(discountPrice * quantity)}
                                        </span>
                                        <span className="text-sm text-muted-foreground line-through">
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(product.price * quantity)}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="font-bold">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(product.price * quantity)}
                                    </span>
                                )}
                                {discountPrice && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(discountPrice)}{" "}
                                        / sản phẩm
                                    </p>
                                )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    disabled={quantity >= product.stock}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

