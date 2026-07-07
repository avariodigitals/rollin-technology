// TARGET PATH IN REPO: src/components/commerce/ProductGrid.tsx (replaces existing)
import ProductCard from "@/components/product/ProductCard"
import { EmptyState } from "@/components/shared/EmptyState"
import type { Product } from "@/types/product"

interface ProductGridProps {
  products: Product[]
  emptyTitle?: string
  emptyDescription?: string
  columns?: "3" | "4"
}



export function ProductGrid({
  products,
  emptyTitle = "No products available",
  emptyDescription = "Check back soon, or adjust your filters.",
  columns = "4",
}: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div
      className={
        columns === "4"
          ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {products.map((product) => (
        <ProductCard key={product.databaseId} product={product} />
      ))}
    </div>
  )
}