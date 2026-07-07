"use client"

import { CreditCard, Landmark, Truck } from "lucide-react"

import { RadioGroup } from "@/components/ui/radio-group"
import { SelectableCard } from "@/components/shared/SelectableCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCheckoutStore } from "@/lib/store/checkoutStore"

/**
 * SCOPE FLAG: card fields below are UI-only — there is no Paystack (or
 * any payment provider) integration wired up, and these values are
 * intentionally NOT written to any store. Real implementation must use
 * Paystack's own hosted fields/SDK so raw card numbers never touch this
 * app's state or servers (PCI compliance) — do not wire these inputs
 * directly to application state when integrating.
 */
export function PaymentStep({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) {
  const { paymentMethod, setPaymentMethod } = useCheckoutStore()

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-lg font-semibold text-foreground">Payment method</h2>

      <RadioGroup
        value={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value as typeof paymentMethod)}
        className="gap-3"
      >
        <SelectableCard
          value="card"
          title="Card payment"
          description="Visa, Mastercard, Verve — processed by Paystack"
          icon={<CreditCard className="size-4 text-muted-foreground" />}
        />
        {paymentMethod === "card" && (
          <div className="ml-1 grid gap-3 rounded-xl border bg-muted/30 p-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">Card number</label>
              <Input placeholder="4242 4242 4242 4242" autoComplete="off" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">Name on card</label>
              <Input autoComplete="off" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Expiry (MM/YY)</label>
              <Input placeholder="08/27" autoComplete="off" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">CVC</label>
              <Input placeholder="123" autoComplete="off" />
            </div>
            <p className="text-xs text-muted-foreground sm:col-span-2">
              Your payment is encrypted. We never store full card details.
            </p>
          </div>
        )}

        <SelectableCard
          value="bank-transfer"
          title="Bank transfer"
          description="Get account details after placing order"
          icon={<Landmark className="size-4 text-muted-foreground" />}
        />

        <SelectableCard
          value="pay-on-delivery"
          title="Pay on delivery"
          description="Available within Lagos · ID verification on delivery"
          icon={<Truck className="size-4 text-muted-foreground" />}
        />
      </RadioGroup>

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={onBack} className="h-12 rounded-lg">
          Back
        </Button>
        <Button onClick={onContinue} className="h-12 flex-1 rounded-lg sm:flex-none">
          Continue
        </Button>
      </div>
    </div>
  )
}
