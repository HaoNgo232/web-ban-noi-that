import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "1",
    name: "Phòng khách",
    slug: "living-room",
    image: "/modern-living-room-minimal-furniture.jpg",
    description: "Không gian gặp gỡ và thư giãn",
  },
  {
    id: "2",
    name: "Phòng ngủ",
    slug: "bedroom",
    image: "/minimal-bedroom-design-natural-light.jpg",
    description: "Nơi nghỉ ngơi yên bình",
  },
  {
    id: "3",
    name: "Phòng ăn",
    slug: "dining",
    image: "/scandinavian-dining-room-wood-table.jpg",
    description: "Bữa ăn ấm cúng bên gia đình",
  },
  {
    id: "4",
    name: "Văn phòng",
    slug: "office",
    image: "/minimalist-home-office-workspace.jpg",
    description: "Không gian làm việc hiệu quả",
  },
];

export function CategoryShowcase() {
  return (
    <section className="w-full py-20 md:py-32 bg-secondary/20">
      <div className="container px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-primary mb-2 tracking-wider uppercase">Danh mục</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Khám phá theo không gian</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tìm kiếm nội thất hoàn hảo cho từng không gian trong ngôi nhà của bạn
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/products?category=${category.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/80 mb-4 leading-relaxed">{category.description}</p>
                    <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Khám phá
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

