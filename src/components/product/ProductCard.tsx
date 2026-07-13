// TARGET PATH IN REPO: src/components/product/ProductCard.tsx (replaces existing)
"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, RefreshCw, ShoppingCart, MessageCircle } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa6"

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
            src={product.image?.sourceUrl || "https://www.rollin.ng/wp-content/uploads/woocommerce-placeholder.webp"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        {product.brand && (
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{product.brand}</p>
        )}

        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold text-foreground hover:text-primary">{product.name}</h3>
        </Link>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <p className="text-lg font-bold text-foreground">
            {(product.onSale && product.salePrice ? product.salePrice : product.price) || "Price on Request"}
          </p>
          {product.onSale && product.regularPrice && (
            <p className="text-sm text-muted-foreground line-through">{product.regularPrice}</p>
          )}
        </div>

        <div className="mt-1.5 flex items-center gap-2 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-1 font-medium",
              product.stockStatus === "IN_STOCK" ? "text-[var(--status-success)]" : "text-muted-foreground"
            )}
          >
            {product.stockStatus === "IN_STOCK" ? "In stock" : product.stockStatus === "OUT_OF_STOCK" ? "Out of stock" : ""}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => addItem(product)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            <ShoppingCart className="size-4" />
            Add to cart
          </button>

          <a
            href={`https://wa.me/2348148464823?text=${encodeURIComponent(
              `Hi, I'm interested in ordering: ${product.name}\nhttps://www.rollin.ng/product/${product.slug}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-600 bg-green-50 py-2.5 text-sm font-medium text-green-700 transition hover:bg-green-600 hover:text-white"
          >
            <FaWhatsapp className="size-4" />
            Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}