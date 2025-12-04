import { useParams } from "react-router";
import { useProduct, useProducts } from "./hooks/useProducts";
import { ProductGallery } from "./components/ProductGallery";
import { ProductInfo } from "./components/ProductInfo";
import { ProductCard } from "@/components/common/ProductCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { EmptyState } from "@/components/common/EmptyState";
import { Separator } from "@/components/ui/separator";

export function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data: product, isLoading, error } = useProduct(id || "");
    const { data: relatedProductsData } = useProducts({
        category: product?.category,
        limit: 4,
    });

    if (isLoading) {
        return (
            <div className="container py-12">
                <div className="flex items-center justify-center">
                    <LoadingSpinner size="lg" />
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container py-12">
                <EmptyState
                    title="Không tìm thấy sản phẩm"
                    description="Sản phẩm bạn đang tìm có thể không tồn tại hoặc đã bị xóa"
                />
            </div>
        );
    }

    // Filter out current product from related products
    const relatedProducts =
        relatedProductsData?.data.filter((p) => p.id !== product.id).slice(0, 4) ||
        [];

    return (
        <div className="container py-8">
            {/* Main Product Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <ProductGallery
                    images={product.images}
                    productName={product.name}
                />
                <ProductInfo product={product} />
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <>
                    <Separator className="mb-8" />
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight mb-6">
                            Sản phẩm liên quan
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard
                                    key={relatedProduct.id}
                                    product={relatedProduct}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

