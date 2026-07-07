"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"

import Container from "@/components/shared/Container"
import { CheckoutStepper } from "@/components/layout/CheckoutStepper"
import { OrderSummary } from "@/components/commerce/OrderSummary"
import { ShippingStep } from "@/components/checkout/ShippingStep"
import { PaymentStep } from "@/components/checkout/PaymentStep"
import { ReviewStep } from "@/components/checkout/ReviewStep"
import { useCheckoutStore } from "@/lib/store/checkoutStore"
import { useCartStore } from "@/lib/store/cartStore"
import { formatNaira, parseNairaAmount } from "@/lib/currency"

/**
 * SCOPE FLAGS:
 * - VAT rate (7.5%) is derived from Figma's own example numbers (₦270,375
 *   VAT shown on a ₦3,605,000 subtotal = exactly 7.5%), not an invented
 *   guess — but still worth confirming against actual tax configuration
 *   before treating as final, since Figma's numbers could themselves be
 *   placeholder/example data.
 * - Express shipping cost (₦7,500) is read directly from the Shipping
 *   step's Figma copy, confirmed rather than guessed.
 * - "Place order" has no backend order-creation call — it clears the
 *   local cart and redirects home. Wiring to a real order-creation
 *   endpoint is separate scope.
 */
const VAT_RATE = 0.075

export default function CheckoutPage() {
  const router = useRouter()
  const { step, setStep, deliveryMethod } = useCheckoutStore()
  const { lines, clear } = useCartStore()

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const unitPrice = parseNairaAmount((line.product.onSale && line.product.salePrice) || line.product.price)
        return sum + unitPrice * line.quantity
      }, 0),
    [lines]
  )

  const shippingCost = deliveryMethod === "express" ? 7500 : 0
  const vat = Math.round(subtotal * VAT_RATE)
  const total = subtotal + shippingCost + vat

  const handlePlaceOrder = () => {
    clear()
    router.push("/")
  }

  return (
    <Container>
      <div className="py-6">
        <h1 className="mb-6 font-heading text-2xl font-bold text-foreground">Checkout</h1>
        <CheckoutStepper currentStep={step} />

        <div className="mt-8 grid gap-8 pb-16 lg:grid-cols-[1fr_360px]">
          <div>
            {step === 1 && <ShippingStep onContinue={() => setStep(2)} />}
            {step === 2 && <PaymentStep onContinue={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <ReviewStep onBack={() => setStep(2)} onPlaceOrder={handlePlaceOrder} />}
          </div>

          <OrderSummary
            lines={[
              { label: "Subtotal", value: formatNaira(subtotal) },
              { label: "Shipping", value: shippingCost === 0 ? "Free" : formatNaira(shippingCost) },
              { label: "VAT (7.5%)", value: formatNaira(vat) },
            ]}
            total={formatNaira(total)}
            trustLine="Genuine warranty · secure checkout"
          />
        </div>
      </div>
    </Container>
  )
}
