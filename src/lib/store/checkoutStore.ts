import { create } from "zustand"

export type DeliveryMethod = "standard" | "express" | "pickup"
export type PaymentMethod = "card" | "bank-transfer" | "pay-on-delivery"

interface ShippingDetails {
  email: string
  phone: string
  firstName: string
  lastName: string
  street: string
  city: string
  state: string
  notes: string
}

interface CheckoutState {
  step: 1 | 2 | 3
  shipping: ShippingDetails
  deliveryMethod: DeliveryMethod
  paymentMethod: PaymentMethod
  setStep: (step: 1 | 2 | 3) => void
  setShipping: (shipping: Partial<ShippingDetails>) => void
  setDeliveryMethod: (method: DeliveryMethod) => void
  setPaymentMethod: (method: PaymentMethod) => void
}

const initialShipping: ShippingDetails = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "Lagos",
  notes: "",
}

/**
 * All state lives here (not per-step component state) since Review needs
 * to read what Shipping/Payment collected, and Figma's "Edit" links jump
 * back to earlier steps without losing what was entered. In-memory only —
 * same persistence caveat as cartStore.ts.
 */
export const useCheckoutStore = create<CheckoutState>((set) => ({
  step: 1,
  shipping: initialShipping,
  deliveryMethod: "standard",
  paymentMethod: "card",
  setStep: (step) => set({ step }),
  setShipping: (shipping) => set((state) => ({ shipping: { ...state.shipping, ...shipping } })),
  setDeliveryMethod: (deliveryMethod) => set({ deliveryMethod }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
}))
