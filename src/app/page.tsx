// TARGET PATH IN REPO: src/app/page.tsx (replaces existing)
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedBrands from "@/components/home/FeaturedBrands";
import WhyRollin from "@/components/home/WhyRollin";
import BulkProcurement from "@/components/home/BulkProcurement";
import BlogPreview from "@/components/home/BlogPreview";
import Testimonials from "@/components/home/Testimonials";

import WhatsAppCTA from "@/components/shared/WhatsAppCTA";


export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Categories />
      <FeaturedProducts />
      <FeaturedBrands />
      <WhyRollin />
      <BulkProcurement />
      <BlogPreview />
      <Testimonials />
      <WhatsAppCTA />
    </>
  );
}