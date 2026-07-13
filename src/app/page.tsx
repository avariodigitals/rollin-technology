import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import TrustBar from "@/components/home/TrustBar";
import Categories from "@/components/home/Categories";
import NewArrivals from "@/components/home/NewArrivals";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedBrands from "@/components/home/FeaturedBrands";
import WhyRollin from "@/components/home/WhyRollin";
import BulkProcurement from "@/components/home/BulkProcurement";
import BlogPreview from "@/components/home/BlogPreview";
import Testimonials from "@/components/home/Testimonials";

import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import { PromotionalBanner } from "@/components/shared/PromotionalBanner";
import { DEFAULT_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Rollin Technology — Genuine Tech, Nationwide Delivery",
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: "Rollin Technology — Genuine Tech, Nationwide Delivery",
    description: DEFAULT_DESCRIPTION,
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <TrustBar />
      <Categories />

      <PromotionalBanner
        eyebrow="Business Laptop Deals"
        headline="Reliable laptops for work, school and growing teams"
        description="Shop HP, Dell, Lenovo, and Apple laptops with warranty and flexible payment options."
        primaryCta={{ label: "Shop Laptops", href: "/category/laptops" }}
        theme="blue"
        campaignId="laptop-promo-1"
        desktopImage="https://central.rollin.ng/wp-content/uploads/2026/07/thelaptop.avif"
        mobileImage="https://central.rollin.ng/wp-content/uploads/2026/07/thelaptop.avif"
      />

      <NewArrivals />
      <FeaturedProducts />
      <FeaturedBrands />

      <PromotionalBanner
        eyebrow="Power Your Home or Business"
        headline="Explore Solar Panels, Inverters, Batteries and Backup Power"
        description="Reduce downtime with reliable solar and backup power solutions. Professional installation available."
        primaryCta={{ label: "Explore Solar Products", href: "/category/solar-products" }}
        theme="green"
        campaignId="solar-promo-1"
        desktopImage="https://central.rollin.ng/wp-content/uploads/2026/07/solarinverterrollin.png"
        mobileImage="https://central.rollin.ng/wp-content/uploads/2026/07/solarinverterrollin.png"
      />

      <WhyRollin />
      <BulkProcurement />

      <BlogPreview />
      <Testimonials />
      <WhatsAppCTA />
    </>
  );
}