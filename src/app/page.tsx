import { ShopChrome } from "@/components/shop/ShopChrome";
import { Hero } from "@/components/shop/Hero";
import { Features } from "@/components/shop/Features";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { OurStory } from "@/components/shop/OurStory";
import { MarketingInfo } from "@/components/shop/MarketingInfo";
import { Stats } from "@/components/shop/Stats";

export default function HomePage() {
  return (
    <ShopChrome>
      <Hero />
      <ProductGrid />
      <Features />
      <OurStory />
      <MarketingInfo />
      <Stats />
    </ShopChrome>
  );
}
