import { ProductCard } from "@/components/common/ProductCard";
import type { Product } from "@/types/product.types";
import { cn } from "@/lib/utils";

interface ProductGridProps {
    readonly products: Product[];
    readonly viewMode: "grid" | "list";
    readonly className?: string;
}

export function ProductGrid({
    products,
    viewMode,
    className,
}: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">Không tìm thấy sản phẩm nào</p>
            </div>
        );
    }

    if (viewMode === "list") {
        return (
            <div className={cn("space-y-4", className)}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} variant="list" />
                ))}
            </div>
        );
    }

    return (
        <div
            className={cn(
                "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                className,
            )}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

