import { Link } from "react-router";
import { motion } from "framer-motion";
import { useCollections } from "@/features/collections/hooks/useCollections";
import { CollectionsLoadingSkeleton } from "./CollectionsLoadingSkeleton";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight } from "lucide-react";

export function CollectionsContent() {
  const { data, isLoading, error } = useCollections();

  if (isLoading) {
    return <CollectionsLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="container py-16 px-4">
        <p className="text-center text-muted-foreground">Đã xảy ra lỗi khi tải bộ sưu tập</p>
      </div>
    );
  }

  const collections = data || [];

  return (
    <div className="min-h-screen">
      <div className="container px-4 pt-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Trang chủ</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Bộ sưu tập</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Bộ sưu tập nội thất
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Khám phá các bộ sưu tập được tuyển chọn kỹ lưỡng, mỗi bộ kể một câu chuyện riêng và mang đến phong cách
              độc đáo cho không gian của bạn
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/collections/${collection.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="text-sm font-medium opacity-90">{collection.productCount} sản phẩm</span>
                    </div>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {collection.name}
                  </h2>
                  <p className="text-muted-foreground text-pretty mb-4">{collection.description}</p>
                  <Button variant="ghost" className="group-hover:translate-x-2 transition-transform">
                    Khám phá bộ sưu tập
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

