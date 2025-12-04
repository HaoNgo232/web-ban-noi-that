"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/product-card"
import { ArrowRight } from "lucide-react"

// Mock data - sẽ được thay bằng API call với TanStack Query
const featuredProducts = [
  {
    id: "1",
    name: "Sofa Minimalist Oak",
    slug: "sofa-minimalist-oak",
    description: "Sofa gỗ sồi tối giản với đệm vải cao cấp",
    price: 15900000,
    images: ["/minimalist-oak-sofa-with-fabric-cushions.jpg"],
    category: "living-room",
    inStock: true,
    featured: true,
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    name: "Bàn ăn Scandinavian",
    slug: "ban-an-scandinavian",
    description: "Bàn ăn phong cách Bắc Âu cho 6 người",
    price: 12500000,
    images: ["/scandinavian-dining-table-for-6.jpg"],
    category: "dining",
    inStock: true,
    featured: true,
    createdAt: "2025-01-02",
  },
  {
    id: "3",
    name: "Giường ngủ Platform",
    slug: "giuong-ngu-platform",
    description: "Giường ngủ kiểu platform hiện đại",
    price: 18900000,
    images: ["/modern-platform-bed-minimal-design.jpg"],
    category: "bedroom",
    inStock: true,
    featured: true,
    createdAt: "2025-01-03",
  },
  {
    id: "4",
    name: "Tủ sách modular",
    slug: "tu-sach-modular",
    description: "Hệ thống tủ sách module linh hoạt",
    price: 8900000,
    images: ["/modular-bookshelf-minimalist-white.jpg"],
    category: "office",
    inStock: true,
    featured: true,
    createdAt: "2025-01-04",
  },
]

export function FeaturedProducts() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium text-primary mb-2 tracking-wider uppercase">Sản phẩm nổi bật</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Được yêu thích nhất</h2>
          </motion.div>

          <Button asChild variant="ghost" className="hidden md:flex group">
            <Link href="/products">
              Xem tất cả
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 flex justify-center md:hidden">
          <Button asChild variant="outline" className="group bg-transparent">
            <Link href="/products">
              Xem tất cả
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
