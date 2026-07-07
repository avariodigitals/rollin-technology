
"use client"
import { ProductGrid } from "@/components/commerce/ProductGrid"
import { useWishlistStore } from "@/lib/store/wishlistStore"

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items)

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">My Wishlist</h1>
      <ProductGrid
        products={items}
        columns="3"
        emptyTitle="Your wishlist is empty"
        emptyDescription="Tap the heart icon on any product to save it here."
      />
    </div>
  )
}