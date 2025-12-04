"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-secondary/30">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/minimalist-modern-living-room-with-neutral-tones-a.jpg" alt="Modern living room" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-medium text-primary mb-4 tracking-wider uppercase">Bộ sưu tập mới 2025</p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
              Không gian sống của bạn, câu chuyện của chúng tôi
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              Khám phá bộ sưu tập nội thất hiện đại, tối giản được thiết kế để tạo nên những khoảnh khắc đáng nhớ trong
              ngôi nhà của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/products">
                  Khám phá ngay
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/collections">Xem bộ sưu tập</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}
