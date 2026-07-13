"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import ProductCard from "@/components/product/ProductCard"
import { EmptyState } from "@/components/shared/EmptyState"
import type { Product } from "@/types/product"

interface PageInfo {
  hasNextPage: boolean
  endCursor: string | null
}

interface InfiniteProductGridProps {
  initialProducts: Product[]
  initialPageInfo: PageInfo | null
  baseUrl: string
  emptyTitle?: string
  emptyDescription?: string
  columns?: "3" | "4"
}

export function InfiniteProductGrid({
  initialProducts,
  initialPageInfo,
  baseUrl,
  emptyTitle = "No products available",
  emptyDescription = "Check back soon, or adjust your filters.",
  columns = "4",
}: InfiniteProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(initialPageInfo)
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)
  const hasFetchedRef = useRef(false)

  const loadMore = useCallback(async () => {
    if (!pageInfo?.hasNextPage || !pageInfo?.endCursor || loading || hasError) return

    setLoading(true)
    try {
      const url = new URL(baseUrl, window.location.origin)
      url.searchParams.set("after", pageInfo.endCursor)

      const res = await fetch(url.toString())
      if (!res.ok) throw new Error("Failed to fetch")

      const data = await res.json()
      if (data.error) throw new Error(data.error)

      setProducts((prev) => [...prev, ...data.products])
      setPageInfo(data.pageInfo)
      hasFetchedRef.current = false
    } catch (err) {
      console.error("Infinite scroll error:", err)
      setHasError(true)
    } finally {
      setLoading(false)
    }
  }, [pageInfo, loading, hasError, baseUrl])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && pageInfo?.hasNextPage && !loading && !hasError && !hasFetchedRef.current) {
          hasFetchedRef.current = true
          loadMore()
        }
      },
      { rootMargin: "200px" }
    )

    const currentLoader = loaderRef.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [pageInfo, loading, hasError, loadMore])

  if (products.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div>
      <div
        className={
          columns === "4"
            ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {products.map((product) => (
          <ProductCard key={product.databaseId} product={product} />
        ))}
      </div>

      <div ref={loaderRef} className="mt-8 flex justify-center">
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading more…
          </div>
        )}
        {hasError && !loading && (
          <button
            onClick={() => {
              setHasError(false)
              hasFetchedRef.current = false
              loadMore()
            }}
            className="rounded-lg border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}
