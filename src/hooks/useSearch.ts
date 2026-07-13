"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_SEARCH_SUGGESTIONS } from "@/lib/queries"
import { normalizeImageUrl } from "@/lib/products/mapProduct"
import type { ProductCategory } from "@/types/product"

export interface SearchProduct {
  databaseId: number
  name: string
  slug: string
  image?: { sourceUrl: string } | null
  price?: string | null
  regularPrice?: string | null
  salePrice?: string | null
  onSale?: boolean | null
  stockStatus?: "IN_STOCK" | "OUT_OF_STOCK" | "ON_BACKORDER" | null
  categories?: { name: string; slug: string }[]
  brands?: { name: string; slug: string }[]
}

export interface SearchResults {
  products: SearchProduct[]
  categories: ProductCategory[]
}

interface UseSearchOptions {
  debounceMs?: number
  minChars?: number
  limit?: number
}

interface RawSearchProduct {
  databaseId: number
  name: string
  slug: string
  image?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null
  featuredImage?: { node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null } | null
  price?: string
  regularPrice?: string
  salePrice?: string | null
  onSale?: boolean
  stockStatus?: "IN_STOCK" | "OUT_OF_STOCK" | "ON_BACKORDER"
  productCategories?: { nodes: { name: string; slug: string }[] }
  productBrands?: { nodes: { name: string; slug: string }[] }
}

interface RawSearchCategory {
  databaseId: number
  name: string
  slug: string
  count?: number | null
  parentId?: number | null
  image?: { sourceUrl: string } | null
}

export function useSearch({
  debounceMs = 300,
  minChars = 3,
  limit = 8,
}: UseSearchOptions = {}) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResults>({ products: [], categories: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const trimmedQuery = query.trim().replace(/\s+/g, " ")
  const canSearch = trimmedQuery.length >= minChars

  const performSearch = useCallback(
    async (searchTerm: string) => {
      if (abortRef.current) {
        abortRef.current.abort()
      }

      const controller = new AbortController()
      abortRef.current = controller

      setLoading(true)
      setError(null)

      try {
        const data = await fetchGraphQL(
          GET_SEARCH_SUGGESTIONS,
          { search: searchTerm, first: limit },
          null,
          controller.signal
        )

        if (controller.signal.aborted) return

        const rawProducts = (data?.products?.nodes ?? []) as RawSearchProduct[]
        const rawCategories = (data?.productCategories?.nodes ?? []) as RawSearchCategory[]

        const products: SearchProduct[] = rawProducts.map((p) => ({
          databaseId: p.databaseId,
          name: p.name,
          slug: p.slug,
          image: normalizeImageUrl(p.image) || normalizeImageUrl(p.featuredImage?.node) || null,
          price: p.price,
          regularPrice: p.regularPrice,
          salePrice: p.salePrice,
          onSale: p.onSale,
          stockStatus: p.stockStatus,
          categories: p.productCategories?.nodes ?? [],
          brands: p.productBrands?.nodes ?? [],
        }))

        const categories: ProductCategory[] = rawCategories.map((c) => ({
          databaseId: c.databaseId,
          name: c.name,
          slug: c.slug,
          count: c.count ?? 0,
          parentId: c.parentId ?? null,
          image: c.image,
        }))

        setResults({ products, categories })
      } catch {
        if (controller.signal.aborted) return
        setError("Search failed. Please try again.")
        setResults({ products: [], categories: [] })
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    },
    [limit]
  )

  useEffect(() => {
    if (!canSearch) {
      if (abortRef.current) {
        abortRef.current.abort()
        abortRef.current = null
      }
      const id = setTimeout(() => {
        setResults({ products: [], categories: [] })
        setLoading(false)
        setError(null)
      }, 0)
      return () => clearTimeout(id)
    }

    setLoading(true)
    setError(null)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      performSearch(trimmedQuery)
    }, debounceMs)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [trimmedQuery, canSearch, debounceMs, performSearch])

  const clear = useCallback(() => {
    setQuery("")
    setResults({ products: [], categories: [] })
    setLoading(false)
    setError(null)
    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return {
    query,
    setQuery,
    trimmedQuery,
    canSearch,
    results,
    loading,
    error,
    clear,
  }
}
