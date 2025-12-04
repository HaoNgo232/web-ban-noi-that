import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { CategoryShowcase } from "@/components/home/category-showcase"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <FeaturedProducts />
        <CategoryShowcase />
        <WhyChooseUs />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  )
}
