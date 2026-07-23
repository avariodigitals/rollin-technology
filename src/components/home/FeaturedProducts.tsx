// src/components/home/FeaturedProducts.tsx
import Link from "next/link";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import Container from "@/components/shared/Container";
import { getFeaturedProducts } from "@/lib/data/products";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts().catch(() => []);

  return (
    <section className="bg-white py-16">
      <Container>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">
              Featured
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">
              Hand-picked this week
            </h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>

        <ProductGrid
          products={products}
          emptyTitle="No products available"
          emptyDescription="Check back soon for new arrivals."
        />
      </Container>
    </section>
  );
}