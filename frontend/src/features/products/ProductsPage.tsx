import { useState } from "react";
import { useSearchParams } from "react-router";
import { useProducts } from "./hooks/useProducts";
import { ProductFilters } from "./components/ProductFilters";
import { ProductSort } from "./components/ProductSort";
import { ProductGrid } from "./components/ProductGrid";
import { Pagination } from "@/components/common/Pagination";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { EmptyState } from "@/components/common/EmptyState";
import { ProductCategory, type ProductsQuery } from "@/types/product.types";
import type { ViewMode } from "./components/ProductSort";

export function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [viewMode, setViewMode] = useState<ViewMode>("grid");

    // Get query params
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const category = (searchParams.get("category") as ProductCategory) || undefined;
    const sortBy = (searchParams.get("sortBy") as "price" | "createdAt" | "name") || "createdAt";
    const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "desc";
    const search = searchParams.get("search") || undefined;

    // Build query
    const query: ProductsQuery = {
        page,
        limit,
        category,
        sortBy,
        sortOrder,
        search,
    };

    const { data, isLoading, error } = useProducts(query);

    // Filter handlers
    const handleCategoryChange = (newCategory: ProductCategory | undefined) => {
        const params = new URLSearchParams(searchParams);
        if (newCategory) {
            params.set("category", newCategory);
        } else {
            params.delete("category");
        }
        params.set("page", "1"); // Reset to first page
        setSearchParams(params);
    };

    const handlePriceChange = (min?: number, max?: number) => {
        // Note: Price filtering would need backend support
        // For now, this is just a placeholder
        console.log("Price filter:", min, max);
    };

    const handleMaterialChange = (material: string | undefined) => {
        // Note: Material filtering would need backend support
        // For now, this is just a placeholder
        console.log("Material filter:", material);
    };

    const handleSortChange = (
        newSortBy: "price" | "createdAt" | "name",
        newSortOrder: "asc" | "desc",
    ) => {
        const params = new URLSearchParams(searchParams);
        params.set("sortBy", newSortBy);
        params.set("sortOrder", newSortOrder);
        setSearchParams(params);
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        setSearchParams(params);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePageSizeChange = (newSize: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("limit", newSize.toString());
        params.set("page", "1"); // Reset to first page
        setSearchParams(params);
    };

    const handleResetFilters = () => {
        setSearchParams({});
    };

    if (isLoading) {
        return (
            <div className="container py-12">
                <div className="flex items-center justify-center">
                    <LoadingSpinner size="lg" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-12">
                <EmptyState
                    title="Không thể tải sản phẩm"
                    description="Vui lòng thử lại sau"
                />
            </div>
        );
    }

    const products = data?.data || [];
    const totalPages = data?.totalPages || 1;

    return (
        <div className="container py-8">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                    Sản phẩm
                </h1>
                <p className="text-muted-foreground">
                    {data?.total ? `${data.total} sản phẩm` : "Không có sản phẩm"}
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:w-64 shrink-0">
                    <div className="sticky top-20">
                        <ProductFilters
                            category={category}
                            onCategoryChange={handleCategoryChange}
                            onPriceChange={handlePriceChange}
                            onMaterialChange={handleMaterialChange}
                            onReset={handleResetFilters}
                        />
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="mb-6">
                        <ProductSort
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            viewMode={viewMode}
                            onSortChange={handleSortChange}
                            onViewModeChange={setViewMode}
                        />
                    </div>

                    <ProductGrid products={products} viewMode={viewMode} />

                    {totalPages > 1 && (
                        <div className="mt-8">
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                pageSize={limit}
                                onPageSizeChange={handlePageSizeChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

