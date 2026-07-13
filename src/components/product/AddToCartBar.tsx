
"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa6"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store/cartStore"
import type { Product } from "@/types/product"

interface AddToCartBarProps {
  product: Product
  disabled?: boolean
  maxQuantity?: number
}


export function AddToCartBar({ product, disabled, maxQuantity = 99 }: AddToCartBarProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((s) => s.addItem)

  const price = (product.onSale && product.salePrice) || product.price
  const whatsappMessage = `Hi, I'd like to order: ${product.name} (Qty: ${quantity}) — ${price}`

  return (
    <div className="space-y-3">
      <div className="flex w-fit items-center gap-1 rounded-lg border">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          className="flex size-10 items-center justify-center text-foreground disabled:opacity-40"
        >
          <Minus className="size-4" />
        </button>
        <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
          disabled={quantity >= maxQuantity}
          className="flex size-10 items-center justify-center text-foreground disabled:opacity-40"
        >
          <Plus className="size-4" />
        </button>
      </div>

    
      <a
        href={`https://wa.me/2348148464823?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 aria-disabled:pointer-events-none aria-disabled:opacity-40"
      >
        <FaWhatsapp className="size-4" />
        Order on WhatsApp
      </a>

      {/* SECONDARY — Add to Cart (works today; checkout payment still pending) */}
      <Button
        variant="outline"
        disabled={disabled}
        onClick={() => addItem(product, quantity)}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg text-sm"
      >
        <ShoppingCart className="size-4" />
        Add to cart
      </Button>
    </div>
  )
}