import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no actual submission
    if (email) {
      toast.success("Cảm ơn bạn đã đăng ký nhận tin!", {
        description: "Chúng tôi sẽ gửi thông tin mới nhất đến email của bạn.",
      });
      setEmail("");
    } else {
      toast.error("Vui lòng nhập email");
    }
  };

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
                  Đăng ký nhận tin
                </h2>
                <p className="text-muted-foreground">
                  Nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và xu
                  hướng nội thất mới nhất
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" size="lg" className="whitespace-nowrap">
                  Đăng ký
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Bằng cách đăng ký, bạn đồng ý với{" "}
                <a href="/policy" className="underline hover:text-foreground">
                  chính sách bảo mật
                </a>{" "}
                của chúng tôi.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

