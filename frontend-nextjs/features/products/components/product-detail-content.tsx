"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useProduct } from "@/features/products/hooks/use-product"
import { useRelatedProducts } from "@/features/products/hooks/use-related-products"
import { ProductImageGallery } from "@/features/products/components/product-image-gallery"
import { ProductInfo } from "@/features/products/components/product-info"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface ProductDetailContentProps {
  slug: string
}

export function ProductDetailContent({ slug }: ProductDetailContentProps) {
  const { data: product, isLoading, isError } = useProduct(slug)
  const { data: relatedProducts } = useRelatedProducts(product?.category || "")

  if (isLoading) {
    return <div className="container px-4 py-20">Đang tải...</div>
  }

  if (isError || !product) {
    return (
      <div className="container px-4 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
        <Button asChild>
          <Link href="/products">Quay lại danh sách sản phẩm</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">
          Trang chủ
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-foreground">
          Sản phẩm
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
        <ProductImageGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="border-t border-border pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">Sản phẩm tương tự</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={relatedProduct} />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
