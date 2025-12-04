import { Link } from "react-router";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product.types";
import { useCartStore } from "@/features/cart/store/cart.store";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const discountPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <Card className={cn("overflow-hidden hover:shadow-lg transition-shadow", className)}>
      <Link to={`/products/${product.id}`}>
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
            {product.discountPercentage && (
              <Badge
                variant="destructive"
                className="absolute top-2 right-2"
              >
                -{product.discountPercentage}%
              </Badge>
            )}
            {product.status === "OUT_OF_STOCK" && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <Badge variant="secondary">Hết hàng</Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {product.description}
          </p>
          <div className="flex items-center gap-2">
            {discountPrice ? (
              <>
                <span className="text-lg font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(discountPrice)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            disabled={product.status === "OUT_OF_STOCK"}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Thêm vào giỏ
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}

