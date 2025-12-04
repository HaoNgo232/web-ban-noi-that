import { motion } from "framer-motion";
import { Truck, Shield, Leaf, Clock } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Miễn phí vận chuyển",
    description: "Giao hàng miễn phí cho đơn hàng trên 5 triệu",
  },
  {
    icon: Shield,
    title: "Bảo hành 2 năm",
    description: "Cam kết chất lượng với bảo hành dài hạn",
  },
  {
    icon: Leaf,
    title: "Thân thiện môi trường",
    description: "Sử dụng vật liệu bền vững và tái chế",
  },
  {
    icon: Clock,
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ tư vấn luôn sẵn sàng hỗ trợ",
  },
];

export function WhyChooseUs() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Tại sao chọn Habitat?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


