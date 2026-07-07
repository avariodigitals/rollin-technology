"use client"

import Image from "next/image"
import { Trash2, Minus, Plus } from "lucide-react"

import type { Product } from "@/types/product"
import { formatNaira, parseNairaAmount } from "@/lib/currency"

interface CartItemRowProps {
  product: Product
  quantity: number
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

export function CartItemRow({ product, quantity, onQuantityChange, onRemove }: CartItemRowProps) {
  const unitPrice = parseNairaAmount((product.onSale && product.salePrice) || product.price)

  return (
    <div className="flex items-center gap-4 rounded-xl border bg-white p-4">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image?.sourceUrl ?? "https://www.rollin.ng/wp-content/uploads/woocommerce-placeholder.webp"}
          alt={product.name}
          fill
          sizes="64px"
          className="object-contain p-1"
        />
      </div>

      <div className="min-w-0 flex-1">
        {product.brand && (
          <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">{product.brand}</p>
        )}
        <p className="truncate text-sm font-semibold text-foreground">{product.name}</p>
        <p className="mt-0.5 text-sm font-semibold text-primary">{formatNaira(unitPrice)}</p>
      </div>

      <div className="flex items-center gap-1 rounded-lg border">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="flex size-8 items-center justify-center text-foreground"
        >
          <Minus className="size-3.5" />
        </button>
        <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => onQuantityChange(quantity + 1)}
          className="flex size-8 items-center justify-center text-foreground"
        >
          <Plus className="size-3.5" />
        </button>
      </div>

      <button
        type="button"
        aria-label="Remove item"
        onClick={onRemove}
        className="flex size-8 items-center justify-center text-destructive/70 transition hover:text-destructive"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  )
}
