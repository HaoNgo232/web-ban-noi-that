import { motion } from "framer-motion";
import { Shield, Truck, Headphones, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Shield,
    title: "Chất lượng đảm bảo",
    description: "Sản phẩm được kiểm tra kỹ lưỡng, đảm bảo chất lượng cao",
  },
  {
    icon: Truck,
    title: "Giao hàng nhanh",
    description: "Miễn phí vận chuyển cho đơn hàng trên 2 triệu đồng",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ tư vấn luôn sẵn sàng hỗ trợ bạn mọi lúc",
  },
  {
    icon: Award,
    title: "Bảo hành chính hãng",
    description: "Tất cả sản phẩm đều có chế độ bảo hành từ nhà sản xuất",
  },
];

export function BenefitsSection() {
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
            Tại sao chọn chúng tôi?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Cam kết mang đến trải nghiệm mua sắm tốt nhất
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

