"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useProducts } from "@/features/products/hooks/use-products"
import { ProductCard } from "@/components/products/product-card"
import { ProductFilters } from "@/features/products/components/product-filters"
import { ProductSort } from "@/features/products/components/product-sort"
import { ProductsPagination } from "@/features/products/components/products-pagination"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function ProductsContent() {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 50000000] as [number, number],
    inStock: false,
  })
  const [sortBy, setSortBy] = useState("featured")
  const [page, setPage] = useState(1)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const { data, isLoading, isError } = useProducts({ filters, sortBy, page })

  if (isError) {
    return (
      <div className="container px-4 py-20 text-center">
        <p className="text-muted-foreground">Đã xảy ra lỗi khi tải sản phẩm</p>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Tất cả sản phẩm</h1>
        <p className="text-muted-foreground leading-relaxed">Khám phá bộ sưu tập nội thất cao cấp của chúng tôi</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-20">
            <ProductFilters filters={filters} onFiltersChange={setFilters} />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Lọc
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Bộ lọc</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <ProductFilters filters={filters} onFiltersChange={setFilters} />
                  </div>
                </SheetContent>
              </Sheet>

              <p className="text-sm text-muted-foreground">
                {isLoading ? "Đang tải..." : `${data?.total || 0} sản phẩm`}
              </p>
            </div>

            <ProductSort value={sortBy} onChange={setSortBy} />
          </div>

          {/* Active Filters */}
          {(filters.category || filters.inStock) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.category && (
                <Button variant="secondary" size="sm" onClick={() => setFilters({ ...filters, category: "" })}>
                  {filters.category}
                  <X className="ml-2 h-3 w-3" />
                </Button>
              )}
              {filters.inStock && (
                <Button variant="secondary" size="sm" onClick={() => setFilters({ ...filters, inStock: false })}>
                  Còn hàng
                  <X className="ml-2 h-3 w-3" />
                </Button>
              )}
            </div>
          )}

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : data?.products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Không tìm thấy sản phẩm nào</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {data && data.totalPages > 1 && (
                <div className="mt-12">
                  <ProductsPagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
