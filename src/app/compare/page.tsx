"use client"

import { useEffect, useState } from "react"

import Container from "@/components/shared/Container"
import { CompareTable } from "@/components/commerce/CompareTable"
import { EmptyState } from "@/components/shared/EmptyState"
import { useCompareStore } from "@/lib/store/compareStore"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_PRODUCT_BY_SLUG } from "@/lib/queries"
import { mapProductDetail } from "@/lib/products/mapProductDetail"
import type { ProductDetail } from "@/types/product"


export default function ComparePage() {
  const { items, removeItem, clear } = useCompareStore()
  const [details, setDetails] = useState<ProductDetail[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadDetails() {
      if (items.length === 0) {
        setDetails([])
        return
      }
      setLoading(true)
      const results = await Promise.all(
        items.map(async (item) => {
          const data = await fetchGraphQL(GET_PRODUCT_BY_SLUG, { slug: item.slug })
          return data?.product ? mapProductDetail(data.product) : null
        })
      )
      if (!cancelled) {
        setDetails(results.filter((p): p is ProductDetail => p !== null))
        setLoading(false)
      }
    }

    loadDetails()
    return () => {
      cancelled = true
    }
  }, [items])

  return (
    <Container>
      <div className="py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Compare products</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {items.length}/2 items · compare two products side-by-side
            </p>
          </div>
          {items.length > 0 && (
            <button type="button" onClick={clear} className="text-sm font-medium text-primary hover:underline">
              Clear all
            </button>
          )}
        </div>

        <div className="mt-8">
          {items.length === 0 ? (
            <EmptyState title="Nothing to compare yet" description="Tap the compare icon on any product to add it here." />
          ) : loading ? (
            <p className="text-sm text-muted-foreground">Loading comparison…</p>
          ) : (
            <CompareTable products={details} onRemove={removeItem} />
          )}
        </div>
      </div>
    </Container>
  )
}
