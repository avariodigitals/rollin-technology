"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"

import Container from "@/components/shared/Container"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { CartItemRow } from "@/components/commerce/CartItemRow"
import { OrderSummary } from "@/components/commerce/OrderSummary"
import { EmptyState } from "@/components/shared/EmptyState"
import { useCartStore } from "@/lib/store/cartStore"
import { formatNaira, parseNairaAmount } from "@/lib/currency"

export default function CartPage() {
  const router = useRouter()
  const { lines, updateQuantity, removeItem } = useCartStore()

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const unitPrice = parseNairaAmount((line.product.onSale && line.product.salePrice) || line.product.price)
        return sum + unitPrice * line.quantity
      }, 0),
    [lines]
  )

  if (lines.length === 0) {
    return (
      <Container>
        <div className="py-10">
          <EmptyState
            title="Your cart is empty"
            description="Browse the shop to find your next laptop, phone, or accessory."
            actionLabel="Continue shopping"
            onAction={() => router.push("/shop")}
          />
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="py-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      </div>

      <h1 className="font-heading text-2xl font-bold text-foreground">Your cart</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        {lines.length} {lines.length === 1 ? "item" : "items"}
      </p>

      <div className="grid gap-8 pb-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {lines.map((line) => (
            <CartItemRow
              key={line.product.databaseId}
              product={line.product}
              quantity={line.quantity}
              onQuantityChange={(quantity) => updateQuantity(line.product.databaseId, quantity)}
              onRemove={() => removeItem(line.product.databaseId)}
            />
          ))}
        </div>

        <OrderSummary
          lines={[
            { label: "Subtotal", value: formatNaira(subtotal) },
            { label: "Shipping", value: "Calculated at checkout", muted: true },
          ]}
          total={formatNaira(subtotal)}
          ctaLabel="Checkout"
          onCtaClick={() => router.push("/checkout")}
          secondaryAction={{ label: "Send cart via WhatsApp" }}
        />
      </div>
    </Container>
  )
}
