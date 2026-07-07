import { create } from "zustand"

import type { Product } from "@/types/product"

interface CompareState {
  items: Product[]
  toggleItem: (product: Product) => void
  removeItem: (databaseId: number) => void
  clear: () => void
}

const MAX_COMPARE_ITEMS = 2 


export const useCompareStore = create<CompareState>((set) => ({
  items: [],
  toggleItem: (product) =>
    set((state) => {
      const exists = state.items.some((item) => item.databaseId === product.databaseId)
      if (exists) {
        return { items: state.items.filter((item) => item.databaseId !== product.databaseId) }
      }
      if (state.items.length >= MAX_COMPARE_ITEMS) {
        // Drop the oldest selection rather than growing past the
        // fixed-2-column layout Figma actually shows.
        return { items: [...state.items.slice(1), product] }
      }
      return { items: [...state.items, product] }
    }),
  removeItem: (databaseId) =>
    set((state) => ({ items: state.items.filter((item) => item.databaseId !== databaseId) })),
  clear: () => set({ items: [] }),
}))
