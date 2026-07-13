"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  Heart,
  ShoppingBag,
  RefreshCw,
  X,
  Loader2,
  ArrowRight,
  Tag,
  FolderOpen,
} from "lucide-react"

import Container from "@/components/shared/Container"
import CategoryMenu from "./CategoryMenu"
import { useCartStore } from "@/lib/store/cartStore"
import { useWishlistStore } from "@/lib/store/wishlistStore"
import { useCompareStore } from "@/lib/store/compareStore"
import { formatNaira, parseNairaAmount } from "@/lib/currency"
import { useSearch } from "@/hooks/useSearch"

interface SearchBarProps {
  categories: { name: string; slug: string }[]
}

function SearchDropdown({
  query,
  trimmedQuery,
  canSearch,
  results,
  loading,
  error,
  activeIndex,
  onSelect,
}: {
  query: string
  trimmedQuery: string
  canSearch: boolean
  results: ReturnType<typeof useSearch>["results"]
  loading: boolean
  error: string | null
  activeIndex: number
  onSelect: () => void
}) {
  if (!query.trim()) return null

  if (!canSearch) {
    return (
      <div className="rounded-xl border bg-white py-4 shadow-lg">
        <p className="px-4 text-sm text-muted-foreground">
          Enter at least 3 characters to search.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-white py-6 shadow-lg">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching…
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border bg-white py-4 shadow-lg">
        <p className="px-4 text-sm text-destructive">{error}</p>
      </div>
    )
  }

  const totalResults = results.products.length + results.categories.length

  if (totalResults === 0) {
    return (
      <div className="rounded-xl border bg-white py-4 shadow-lg">
        <p className="px-4 text-sm text-muted-foreground">
          No results found for &ldquo;{trimmedQuery}&rdquo;.
        </p>
      </div>
    )
  }

  const items: { type: "product" | "category"; index: number; element: React.ReactNode }[] = []

  results.products.forEach((product, i) => {
    items.push({
      type: "product",
      index: i,
      element: (
        <Link
          key={`product-${product.databaseId}`}
          href={`/product/${product.slug}`}
          onClick={onSelect}
          className={`flex items-center gap-3 px-4 py-2.5 transition hover:bg-muted ${
            activeIndex === i ? "bg-muted" : ""
          }`}
          role="option"
          aria-selected={activeIndex === i}
        >
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-gray-100">
            {product.image?.sourceUrl ? (
              <Image
                src={product.image.sourceUrl}
                alt={product.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <Tag className="h-4 w-4 m-3 text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
            <p className="text-xs text-muted-foreground">
              {product.onSale && product.salePrice
                ? product.salePrice
                : product.price || "Price on Request"}
              {product.stockStatus === "OUT_OF_STOCK" && (
                <span className="ml-2 text-destructive">Out of stock</span>
              )}
            </p>
          </div>
        </Link>
      ),
    })
  })

  results.categories.forEach((category, i) => {
    const baseIndex = results.products.length + i
    items.push({
      type: "category",
      index: baseIndex,
      element: (
        <Link
          key={`category-${category.databaseId}`}
          href={`/category/${category.slug}`}
          onClick={onSelect}
          className={`flex items-center gap-3 px-4 py-2.5 transition hover:bg-muted ${
            activeIndex === baseIndex ? "bg-muted" : ""
          }`}
          role="option"
          aria-selected={activeIndex === baseIndex}
        >
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-foreground">{category.name}</span>
          <span className="ml-auto text-xs text-muted-foreground">
            {category.count} {category.count === 1 ? "product" : "products"}
          </span>
        </Link>
      ),
    })
  })

  return (
    <div
      className="overflow-hidden rounded-xl border bg-white shadow-lg"
      role="listbox"
      aria-label="Search suggestions"
    >
      <div className="max-h-[400px] overflow-y-auto py-2">
        {items.map((item) => item.element)}
      </div>
      <div className="border-t px-4 py-2.5">
        <Link
          href={`/shop?search=${encodeURIComponent(trimmedQuery)}`}
          onClick={onSelect}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all results for &ldquo;{trimmedQuery}&rdquo;
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}

export default function SearchBar({ categories }: SearchBarProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const {
    query,
    setQuery,
    trimmedQuery,
    canSearch,
    results,
    loading,
    error,
    clear,
  } = useSearch({ debounceMs: 300, minChars: 3, limit: 6 })

  const cartLines = useCartStore((s) => s.lines)
  const wishlistItems = useWishlistStore((s) => s.items)
  const compareItems = useCompareStore((s) => s.items)

  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0)
  const cartTotal = cartLines.reduce((sum, line) => {
    const unitPrice = parseNairaAmount(
      (line.product.onSale && line.product.salePrice) || line.product.price
    )
    return sum + unitPrice * line.quantity
  }, 0)

  const totalItems = results.products.length + results.categories.length

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSearch) return
    setDropdownOpen(false)
    router.push(`/shop?search=${encodeURIComponent(trimmedQuery)}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownOpen && query.trim().length > 0) {
      setDropdownOpen(true)
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (activeIndex >= 0 && activeIndex < totalItems) {
        const productIndex = activeIndex
        if (productIndex < results.products.length) {
          const product = results.products[productIndex]
          setDropdownOpen(false)
          router.push(`/product/${product.slug}`)
        } else {
          const category = results.categories[productIndex - results.products.length]
          setDropdownOpen(false)
          router.push(`/category/${category.slug}`)
        }
      } else if (canSearch) {
        handleSubmit(e)
      }
    } else if (e.key === "Escape") {
      setDropdownOpen(false)
      setActiveIndex(-1)
    }
  }

  const handleClear = () => {
    clear()
    setDropdownOpen(false)
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  const handleSelect = useCallback(() => {
    setDropdownOpen(false)
    setActiveIndex(-1)
  }, [])

  useEffect(() => {
    setActiveIndex(-1)
  }, [results])

  return (
    <div className="bg-primary text-white">
      <Container>
        <form onSubmit={handleSubmit} className="flex h-[56px] items-center justify-between gap-4">
          <CategoryMenu categories={categories} />

          <div className="relative flex flex-1 items-center">
            <div className="flex flex-1 items-center bg-white rounded-full overflow-hidden h-10 shadow-sm">
              <div className="pl-4 pr-2 text-gray-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setDropdownOpen(true)
                }}
                onFocus={() => {
                  if (query.trim().length > 0) setDropdownOpen(true)
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search for Products"
                className="w-full text-sm text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
                aria-autocomplete="list"
                aria-controls="search-dropdown"
                aria-expanded={dropdownOpen}
                role="combobox"
              />
              {query.trim().length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 transition shrink-0"
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
              <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />
              <select className="text-xs text-gray-600 bg-transparent px-3 border-none outline-none cursor-pointer hidden sm:block font-semibold">
                <option>All Categories</option>
              </select>
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white h-9 w-9 flex items-center justify-center transition-colors cursor-pointer mr-0.5 rounded-full shrink-0"
                aria-label="Submit search"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => {
                    setDropdownOpen(false)
                    setActiveIndex(-1)
                  }}
                />
                <div className="absolute top-full left-0 right-0 z-50 mt-1">
                  <SearchDropdown
                    query={query}
                    trimmedQuery={trimmedQuery}
                    canSearch={canSearch}
                    results={results}
                    loading={loading}
                    error={error}
                    activeIndex={activeIndex}
                    onSelect={handleSelect}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-5 text-sm font-medium">
            <Link
              href="/compare"
              className="flex items-center justify-center p-1.5 hover:opacity-80 relative"
              aria-label="Compare products"
            >
              <RefreshCw className="h-[18px] w-[18px]" />
              {compareItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#F5C400] text-gray-950 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {compareItems.length}
                </span>
              )}
            </Link>

            <Link
              href="/account/wishlist"
              className="flex items-center justify-center p-1.5 hover:opacity-80 relative"
              aria-label="Wishlist"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#F5C400] text-gray-950 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity shrink-0 py-1"
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingBag className="h-5 w-5 stroke-[2]" />
                {cartCount > 0 && (
                  <span className="absolute -bottom-1 -right-1.5 bg-[#F5C400] text-gray-950 text-[10px] font-extrabold rounded-full h-4 w-4 flex items-center justify-center border border-primary">
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