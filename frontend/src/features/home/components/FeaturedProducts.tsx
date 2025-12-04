import { motion } from "framer-motion";
import { ProductCard } from "@/components/common/ProductCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { EmptyState } from "@/components/common/EmptyState";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product.types";

interface FeaturedProductsProps {
  products?: Product[];
  isLoading?: boolean;
  error?: Error | null;
}

export function FeaturedProducts({
  products = [],
  isLoading = false,
  error = null,
}: FeaturedProductsProps) {
  if (error) {
    return (
      <section className="py-16 md:py-20">
        <div className="container">
          <EmptyState
            title="Không thể tải sản phẩm"
            description="Vui lòng thử lại sau"
          />
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Sản phẩm nổi bật
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Khám phá những sản phẩm được yêu thích nhất
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {products.length > 8 && (
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/products">
                Xem tất cả sản phẩm
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

