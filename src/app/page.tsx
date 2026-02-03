import Hero from "@/components/home/Hero";
import ServiceFeatures from "@/components/home/ServiceFeatures";
import CategorySection from "@/components/home/CategorySection";
import ProductList from "@/components/products/ProductList";
import BlogSection from "@/components/blog";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main>
      <article>
        <Hero />
        <ServiceFeatures />
        <CategorySection />
        <ProductList />
        <BlogSection />
        <Newsletter />
      </article>
    </main>
  );
}
