import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart } from "lucide-react";
import type { Product } from "@/types/product.types";
import { useCartStore } from "@/features/cart/store/cart.store";
import { toast } from "sonner";

interface ProductInfoProps {
    readonly product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);

    const discountPrice = product.discountPercentage
        ? product.price * (1 - product.discountPercentage / 100)
        : null;

    const handleAddToCart = () => {
        if (product.status === "OUT_OF_STOCK") {
            toast.error("Sản phẩm đã hết hàng");
            return;
        }

        addItem(product, quantity);
        toast.success("Đã thêm vào giỏ hàng", {
            description: `${product.name} x${quantity}`,
        });
        setQuantity(1);
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        if (newQuantity > product.stock) {
            toast.error(`Chỉ còn ${product.stock} sản phẩm`);
            return;
        }
        setQuantity(newQuantity);
    };

    return (
        <div className="space-y-6">
            {/* Title & Category */}
            <div>
                <Badge variant="secondary" className="mb-2">
                    {product.category}
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                    {product.name}
                </h1>
                {product.status === "OUT_OF_STOCK" && (
                    <Badge variant="destructive" className="mt-2">
                        Hết hàng
                    </Badge>
                )}
            </div>

            <Separator />

            {/* Price */}
            <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                    {discountPrice ? (
                        <>
                            <span className="text-2xl sm:text-3xl font-bold">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(discountPrice)}
                            </span>
                            <span className="text-lg sm:text-xl text-muted-foreground line-through">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(product.price)}
                            </span>
                            {product.discountPercentage && (
                                <Badge variant="destructive">
                                    -{product.discountPercentage}%
                                </Badge>
                            )}
                        </>
                    ) : (
                        <span className="text-2xl sm:text-3xl font-bold">
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(product.price)}
                        </span>
                    )}
                </div>
                <p className="text-sm text-muted-foreground">
                    Còn {product.stock} sản phẩm
                </p>
            </div>

            <Separator />

            {/* Description */}
            <div>
                <h3 className="font-semibold mb-2">Mô tả sản phẩm</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                    {product.description}
                </p>
            </div>

            {/* Material */}
            {product.material && (
                <div>
                    <h3 className="font-semibold mb-2">Chất liệu</h3>
                    <p className="text-muted-foreground">{product.material}</p>
                </div>
            )}

            <Separator />

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium mb-2 block">Số lượng</label>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                        >
                            -
                        </Button>
                        <span className="w-12 text-center font-medium">{quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(quantity + 1)}
                            disabled={quantity >= product.stock}
                        >
                            +
                        </Button>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        size="lg"
                        className="flex-1"
                        onClick={handleAddToCart}
                        disabled={product.status === "OUT_OF_STOCK"}
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Thêm vào giỏ hàng
                    </Button>
                    <Button size="lg" variant="outline" className="px-6">
                        <Heart className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

