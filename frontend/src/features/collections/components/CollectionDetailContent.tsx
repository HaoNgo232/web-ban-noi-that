import { Link } from "react-router";
import { motion } from "framer-motion";
import { useCollection } from "@/features/collections/hooks/useCollection";
import { useCollections } from "@/features/collections/hooks/useCollections";
import { CollectionDetailSkeleton } from "./CollectionDetailSkeleton";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CollectionDetailContentProps {
  slug: string;
}

export function CollectionDetailContent({ slug }: CollectionDetailContentProps) {
  const { data: collection, isLoading, error } = useCollection(slug);
  const { data: allCollections } = useCollections();

  if (isLoading) {
    return <CollectionDetailSkeleton />;
  }

  if (error || !collection) {
    return (
      <div className="container py-16 px-4">
        <p className="text-center text-muted-foreground">Không tìm thấy bộ sưu tập</p>
        <div className="flex justify-center mt-6">
          <Link to="/collections">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại bộ sưu tập
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = allCollections?.findIndex((c) => c.slug === slug) ?? -1;
  const prevCollection = currentIndex > 0 ? allCollections?.[currentIndex - 1] : null;
  const nextCollection = currentIndex < (allCollections?.length ?? 0) - 1 ? allCollections?.[currentIndex + 1] : null;

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
              <BreadcrumbLink asChild>
                <Link to="/collections">Bộ sưu tập</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{collection.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden mt-6">
        <img
          src={collection.image || "/placeholder.svg"}
          alt={collection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container px-4 pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <Link to="/collections">
                <Button variant="ghost" className="text-white hover:text-white/80 mb-4 -ml-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại
                </Button>
              </Link>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance mb-4">
                {collection.name}
              </h1>
              <p className="text-lg text-white/90 text-pretty">{collection.description}</p>
              <p className="text-sm text-white/80 mt-4">{collection.products.length} sản phẩm</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {collection.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Navigation */}
      {(prevCollection || nextCollection) && (
        <section className="border-t bg-muted/20 py-12 md:py-16">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              {prevCollection ? (
                <Link
                  to={`/collections/${prevCollection.slug}`}
                  className="group flex-1 flex items-center gap-4 p-6 bg-background rounded-lg border hover:border-primary transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Bộ sưu tập trước</p>
                    <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors">
                      {prevCollection.name}
                    </h3>
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextCollection ? (
                <Link
                  to={`/collections/${nextCollection.slug}`}
                  className="group flex-1 flex items-center gap-4 p-6 bg-background rounded-lg border hover:border-primary transition-colors text-right"
                >
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Bộ sưu tập tiếp theo</p>
                    <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors">
                      {nextCollection.name}
                    </h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

