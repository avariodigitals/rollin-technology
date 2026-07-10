"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import Container from "@/components/shared/Container"
import { CheckoutStepper } from "@/components/layout/CheckoutStepper"
import { OrderSummary } from "@/components/commerce/OrderSummary"
import { ShippingStep } from "@/components/checkout/ShippingStep"
import { PaymentStep } from "@/components/checkout/PaymentStep"
import { ReviewStep } from "@/components/checkout/ReviewStep"
import { useCheckoutStore, type PaymentMethod } from "@/lib/store/checkoutStore"
import { useCartStore } from "@/lib/store/cartStore"
import { formatNaira, parseNairaAmount } from "@/lib/currency"

const VAT_RATE = 0.075
const WHATSAPP_NUMBER = "2348148464823"

const CONFIRMATION_COPY: Record<PaymentMethod, string> = {
  "bank-transfer": "We'll send bank transfer details to the email you provided — your order ships once payment is confirmed.",
  "pay-on-delivery": "Pay when your order arrives. Our team will confirm a delivery window with you shortly.",
  card: "Card payment isn't live yet — a member of our team will reach out to arrange payment via bank transfer or WhatsApp.",
}


export default function CheckoutPage() {
  const { step, setStep, deliveryMethod, paymentMethod } = useCheckoutStore()
  const { lines, clear } = useCartStore()
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderRef] = useState(() => `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)

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
    setOrderComplete(true)
    clear()
  }

  if (orderComplete) {
    return (
      <Container>
        <div className="mx-auto max-w-lg py-16 text-center">
          <CheckCircle2 className="mx-auto size-12 text-primary" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">Order received</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Order reference: <strong className="text-foreground">{orderRef}</strong>
          </p>
          <p className="mt-4 text-sm text-muted-foreground">{CONFIRMATION_COPY[paymentMethod]}</p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Continue shopping
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, following up on my order ${orderRef}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </Container>
    )
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