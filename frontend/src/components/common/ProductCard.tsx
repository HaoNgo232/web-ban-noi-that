import { Link } from "react-router";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product.types";
import { useCartStore } from "@/features/cart/store/cart.store";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  readonly product: Product;
  readonly className?: string;
  readonly variant?: "grid" | "list";
}

export function ProductCard({
  product,
  className,
  variant = "grid",
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const discountPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  if (variant === "list") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Card className={cn("overflow-hidden hover:shadow-lg transition-shadow", className)}>
          <div className="flex flex-col sm:flex-row">
            <Link to={`/products/${product.id}`} className="sm:w-48 shrink-0">
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
            </Link>
            <div className="flex-1 flex flex-col justify-between p-4">
              <Link to={`/products/${product.id}`} className="flex-1">
                <div>
                  <h3 className="font-semibold text-lg mb-1 hover:underline">{product.name}</h3>
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
                </div>
              </Link>
              <Button
                className="w-full sm:w-auto mt-4"
                onClick={handleAddToCart}
                disabled={product.status === "OUT_OF_STOCK"}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Thêm vào giỏ
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
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
            <h3 className="font-semibold text-lg mb-1 line-clamp-2 hover:underline">
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
        </Link>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.status === "OUT_OF_STOCK"}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Thêm vào giỏ
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

