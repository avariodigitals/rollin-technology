import Link from "next/link";

import { ProductGrid } from "@/components/commerce/ProductGrid";
import Container from "@/components/shared/Container";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_NEW_ARRIVALS } from "@/lib/queries";
import { mapProduct } from "@/lib/products/mapProduct";

export default async function NewArrivals() {
  const data = await fetchGraphQL(GET_NEW_ARRIVALS);

  const products = (data?.products?.nodes ?? []).map(mapProduct).slice(0, 12);

  return (
    <section className="bg-muted/30 py-16">
      <Container>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">New Arrivals</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">Fresh in stock</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>

        <ProductGrid
          products={products}
          emptyTitle="No new arrivals"
          emptyDescription="Check back soon for new products."
        />
      </Container>
    </section>
  );
}
