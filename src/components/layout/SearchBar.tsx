// TARGET PATH IN REPO: src/components/layout/SearchBar.tsx (replaces existing)
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, Heart, ShoppingBag, RefreshCw } from "lucide-react"

import Container from "@/components/shared/Container"
import CategoryMenu from "./CategoryMenu"
import { useCartStore } from "@/lib/store/cartStore"
import { useWishlistStore } from "@/lib/store/wishlistStore"
import { useCompareStore } from "@/lib/store/compareStore"
import { formatNaira, parseNairaAmount } from "@/lib/currency"

interface SearchBarProps {
  categories: { name: string; slug: string }[]
}


export default function SearchBar({ categories }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const cartLines = useCartStore((s) => s.lines)
  const wishlistItems = useWishlistStore((s) => s.items)
  const compareItems = useCompareStore((s) => s.items)

  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0)
  const cartTotal = cartLines.reduce((sum, line) => {
    const unitPrice = parseNairaAmount((line.product.onSale && line.product.salePrice) || line.product.price)
    return sum + unitPrice * line.quantity
  }, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    router.push(trimmed ? `/shop?search=${encodeURIComponent(trimmed)}` : "/shop")
  }

  return (
    <div className="bg-primary text-white">
      <Container>
        <form onSubmit={handleSearch} className="flex h-[56px] items-center justify-between gap-4">
          <CategoryMenu categories={categories} />

          <div className="flex flex-1 items-center bg-white rounded-full overflow-hidden h-10 shadow-sm">
            <div className="pl-4 pr-2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Products"
              className="w-full text-xs text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
            />
            <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />
            <select className="text-[11px] text-gray-600 bg-transparent px-3 border-none outline-none cursor-pointer hidden sm:block font-semibold">
              <option>All Categories</option>
            </select>
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white h-9 w-9 flex items-center justify-center transition-colors cursor-pointer mr-0.5 rounded-full shrink-0"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-5 text-sm font-medium">
            <Link href="/compare" className="flex items-center justify-center p-1.5 hover:opacity-80 relative">
              <RefreshCw className="h-[18px] w-[18px]" />
              {compareItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#F5C400] text-gray-950 text-[9px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
                  {compareItems.length}
                </span>
              )}
            </Link>

            <Link href="/account/wishlist" className="flex items-center justify-center p-1.5 hover:opacity-80 relative">
              <Heart className="h-[18px] w-[18px]" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#F5C400] text-gray-950 text-[9px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link href="/cart" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity shrink-0 py-1">
              <div className="relative">
                <ShoppingBag className="h-5 w-5 stroke-[2]" />
                {cartCount > 0 && (
                  <span className="absolute -bottom-1 -right-1.5 bg-[#F5C400] text-gray-950 text-[9px] font-extrabold rounded-full h-3.5 w-3.5 flex items-center justify-center border border-primary">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-sm font-bold tracking-tight">{formatNaira(cartTotal)}</span>
            </Link>
          </div>
        </form>
      </Container>
    </div>
  )
}