import { HeroSection } from "./components/HeroSection";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { CategoryShowcase } from "./components/CategoryShowcase";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { NewsletterSignup } from "./components/NewsletterSignup";
import { useProducts } from "../products/hooks/useProducts";

export function HomePage() {
  // Fetch featured products (first 8 products, sorted by createdAt desc)
  const { data, isLoading, error } = useProducts({
    limit: 8,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const featuredProducts = data?.data || [];

  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedProducts
        products={featuredProducts}
        isLoading={isLoading}
        error={error || undefined}
      />
      <CategoryShowcase />
      <WhyChooseUs />
      <NewsletterSignup />
    </div>
  );
}

