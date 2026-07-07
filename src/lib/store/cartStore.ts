import { create } from "zustand"

import type { Product } from "@/types/product"

export interface CartLine {
  product: Product
  quantity: number
}

interface CartState {
  lines: CartLine[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (databaseId: number) => void
  updateQuantity: (databaseId: number, quantity: number) => void
  clear: () => void
}

/**
 * SCOPE FLAG: in-memory only — resets on page refresh. Figma's cart shows
 * an "Order Ref" (ORD-GB3JR1) implying a server-side cart/session concept
 * that doesn't exist yet. Two natural next steps, neither added here since
 * both are scope decisions: (1) zustand's `persist` middleware for
 * localStorage continuity across refreshes, and/or (2) wiring to a real
 * WooCommerce cart/session API once one is confirmed.
 */
export const useCartStore = create<CartState>((set) => ({
  lines: [],
  addItem: (product, quantity = 1) =>
    set((state) => {
      const existing = state.lines.find((line) => line.product.databaseId === product.databaseId)
      if (existing) {
        return {
          lines: state.lines.map((line) =>
            line.product.databaseId === product.databaseId
              ? { ...line, quantity: line.quantity + quantity }
              : line
          ),
        }
      }
      return { lines: [...state.lines, { product, quantity }] }
    }),
  removeItem: (databaseId) =>
    set((state) => ({
      lines: state.lines.filter((line) => line.product.databaseId !== databaseId),
    })),
  updateQuantity: (databaseId, quantity) =>
    set((state) => ({
      lines: state.lines.map((line) =>
        line.product.databaseId === databaseId ? { ...line, quantity: Math.max(1, quantity) } : line
      ),
    })),
  clear: () => set({ lines: [] }),
}))
