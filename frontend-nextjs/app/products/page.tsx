import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductsContent } from "@/features/products/components/products-content"
import { ProductsLoadingSkeleton } from "@/features/products/components/products-loading-skeleton"

export const metadata = {
  title: "Sản phẩm - Habitat",
  description: "Khám phá bộ sưu tập nội thất cao cấp của Habitat",
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Suspense fallback={<ProductsLoadingSkeleton />}>
          <ProductsContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
