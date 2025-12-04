import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductDetailContent } from "@/features/products/components/product-detail-content"
import { ProductDetailSkeleton } from "@/features/products/components/product-detail-skeleton"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return {
    title: `${slug} - Habitat`,
    description: "Chi tiết sản phẩm nội thất cao cấp",
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetailContent slug={slug} />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
