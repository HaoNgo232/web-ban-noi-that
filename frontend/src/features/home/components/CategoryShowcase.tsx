import { motion } from "framer-motion";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { ProductCategory } from "@/types/product.types";
import { Sofa, Table, Chair, Bed, Cabinet, Shelf, Lightbulb, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    category: ProductCategory.SOFA,
    label: "Sofa",
    icon: Sofa,
    description: "Sofa hiện đại và thoải mái",
    color: "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
  },
  {
    category: ProductCategory.TABLE,
    label: "Bàn",
    icon: Table,
    description: "Bàn làm việc và bàn ăn",
    color: "from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900",
  },
  {
    category: ProductCategory.CHAIR,
    label: "Ghế",
    icon: Chair,
    description: "Ghế văn phòng và ghế ăn",
    color: "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
  },
  {
    category: ProductCategory.BED,
    label: "Giường",
    icon: Bed,
    description: "Giường ngủ và phụ kiện",
    color: "from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900",
  },
  {
    category: ProductCategory.CABINET,
    label: "Tủ",
    icon: Cabinet,
    description: "Tủ quần áo và tủ kệ",
    color: "from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900",
  },
  {
    category: ProductCategory.SHELF,
    label: "Kệ",
    icon: Shelf,
    description: "Kệ sách và kệ trang trí",
    color: "from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900",
  },
  {
    category: ProductCategory.LIGHTING,
    label: "Đèn",
    icon: Lightbulb,
    description: "Đèn chiếu sáng và trang trí",
    color: "from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900",
  },
  {
    category: ProductCategory.DECORATION,
    label: "Trang trí",
    icon: Sparkles,
    description: "Đồ trang trí nội thất",
    color: "from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900",
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Danh mục sản phẩm
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Khám phá theo từng danh mục
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="h-full"
              >
                <Link to={`/products?category=${item.category}`}>
                  <Card className="h-full p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-lg bg-gradient-to-br flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform",
                        item.color,
                      )}
                    >
                      <Icon className="h-8 w-8 text-foreground" />
                    </div>
                    <h3 className="font-semibold text-center mb-2">
                      {item.label}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      {item.description}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

