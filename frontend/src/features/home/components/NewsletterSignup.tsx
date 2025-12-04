import type React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Đăng ký thành công!", {
      description: "Bạn sẽ nhận được email từ chúng tôi sớm nhất.",
    });

    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="w-full py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Nhận thông tin mới nhất</h2>
          <p className="text-primary-foreground/80 mb-8 leading-relaxed text-pretty">
            Đăng ký nhận bản tin để cập nhật sản phẩm mới, ưu đãi đặc biệt và cảm hứng trang trí nội thất
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-primary-foreground text-foreground border-primary-foreground"
            />
            <Button type="submit" variant="secondary" disabled={isLoading} className="whitespace-nowrap">
              {isLoading ? "Đang gửi..." : "Đăng ký"}
            </Button>
          </form>

          <p className="text-xs text-primary-foreground/60 mt-4">
            Chúng tôi tôn trọng quyền riêng tư của bạn. Hủy đăng ký bất cứ lúc nào.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

