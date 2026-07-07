"use client"

import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCheckoutStore, type PaymentMethod } from "@/lib/store/checkoutStore"
import { useCartStore } from "@/lib/store/cartStore"
import { formatNaira, parseNairaAmount } from "@/lib/currency"

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  card: "Card payment",
  "bank-transfer": "Bank transfer",
  "pay-on-delivery": "Pay on delivery",
}

export function ReviewStep({ onBack, onPlaceOrder }: { onBack: () => void; onPlaceOrder: () => void }) {
  const { shipping, paymentMethod, setStep } = useCheckoutStore()
  const { lines } = useCartStore()

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Contact &amp; shipping</h3>
          <button type="button" onClick={() => setStep(1)} className="text-sm font-medium text-primary hover:underline">
            Edit
          </button>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {shipping.firstName} {shipping.lastName} · {shipping.email} · {shipping.phone}
        </p>
        <p className="text-sm text-muted-foreground">
          {shipping.street}, {shipping.city}, {shipping.state}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Payment</h3>
          <button type="button" onClick={() => setStep(2)} className="text-sm font-medium text-primary hover:underline">
            Edit
          </button>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{PAYMENT_LABELS[paymentMethod]}</p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Items</h3>
        <div className="space-y-3">
          {lines.map((line) => {
            const unitPrice = parseNairaAmount((line.product.onSale && line.product.salePrice) || line.product.price)
            return (
              <div key={line.product.databaseId} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-foreground">{line.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {line.product.brand ? `${line.product.brand} · ` : ""}Qty {line.quantity}
                  </p>
                </div>
                <span className="font-semibold text-foreground">{formatNaira(unitPrice * line.quantity)}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5" /> Secure SSL checkout
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={onBack} className="h-12 rounded-lg">
          Back
        </Button>
        <Button onClick={onPlaceOrder} className="h-12 flex-1 rounded-lg">
          Place order
        </Button>
      </div>
    </div>
  )
}
