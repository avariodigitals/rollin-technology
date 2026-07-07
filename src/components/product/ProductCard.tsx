// TARGET PATH IN REPO: src/components/product/ProductCard.tsx (replaces existing)
"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, RefreshCw, ShoppingCart } from "lucide-react"

import { cn } from "@/lib/utils"
import { ProductBadge } from "@/components/shared/StatusBadge"
import { useCartStore } from "@/lib/store/cartStore"
import { useWishlistStore } from "@/lib/store/wishlistStore"
import { useCompareStore } from "@/lib/store/compareStore"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}


export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const wishlistItems = useWishlistStore((s) => s.items)
  const toggleWishlist = useWishlistStore((s) => s.toggleItem)
  const compareItems = useCompareStore((s) => s.items)
  const toggleCompare = useCompareStore((s) => s.toggleItem)

  const isWishlisted = wishlistItems.some((item) => item.databaseId === product.databaseId)
  const isCompared = compareItems.some((item) => item.databaseId === product.databaseId)

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-white shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-card-hover)]">
      {product.badge && <ProductBadge type={product.badge} />}

      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          type="button"
          aria-label="Toggle wishlist"
          aria-pressed={isWishlisted}
          onClick={() => toggleWishlist(product)}
          className="flex size-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition hover:text-primary"
        >
          <Heart className={cn("size-4", isWishlisted && "fill-primary text-primary")} />
        </button>
        <button
          type="button"
          aria-label="Toggle compare"
          aria-pressed={isCompared}
          onClick={() => toggleCompare(product)}
          className="flex size-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition hover:text-primary"
        >
          <RefreshCw className={cn("size-4", isCompared && "text-primary")} />
        </button>
      </div>

      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative h-64 w-full bg-gray-100">
          <Image
            src={product.image?.sourceUrl ?? "https://www.rollin.ng/wp-content/uploads/woocommerce-placeholder.webp"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        {product.brand && (
          <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">{product.brand}</p>
        )}

        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 font-semibold text-foreground hover:text-primary">{product.name}</h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <p className="text-lg font-bold text-foreground">
            {(product.onSale && product.salePrice) || product.price || "Price on Request"}
          </p>
          {product.onSale && product.regularPrice && (
            <p className="text-sm text-muted-foreground line-through">{product.regularPrice}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => addItem(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2 font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          <ShoppingCart className="size-4" />
          Add to cart
        </button>
      </div>
    </div>
  )
}