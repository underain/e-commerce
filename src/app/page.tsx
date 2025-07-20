import Bestseller from "@/widget/main/bestseller/bestseller";
import Brands from "@/widget/main/brands/brands";
import Hero from "@/widget/main/hero/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <Bestseller />
    </main>
  );
}
