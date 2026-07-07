import { create } from "zustand"

import type { Product } from "@/types/product"

interface WishlistState {
  items: Product[]
  toggleItem: (product: Product) => void
  removeItem: (databaseId: number) => void
}

/** Same in-memory-only scope note as cartStore.ts applies here. */
export const useWishlistStore = create<WishlistState>((set) => ({
  items: [],
  toggleItem: (product) =>
    set((state) => {
      const exists = state.items.some((item) => item.databaseId === product.databaseId)
      return {
        items: exists
          ? state.items.filter((item) => item.databaseId !== product.databaseId)
          : [...state.items, product],
      }
    }),
  removeItem: (databaseId) =>
    set((state) => ({
      items: state.items.filter((item) => item.databaseId !== databaseId),
    })),
}))
