import { HeroSection } from "./components/HeroSection";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { CategoryShowcase } from "./components/CategoryShowcase";
import { BenefitsSection } from "./components/BenefitsSection";
import { NewsletterSignup } from "./components/NewsletterSignup";

export function HomePage() {
  // TODO: Replace with real data from useProducts hook (Task 3.2.3)
  // For now, using empty array - will be populated when API integration is done
  const featuredProducts: never[] = [];

  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategoryShowcase />
      <BenefitsSection />
      <FeaturedProducts products={featuredProducts} isLoading={false} />
      <NewsletterSignup />
    </div>
  );
}

