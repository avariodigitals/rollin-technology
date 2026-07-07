import { mapProduct, type RawProductNode } from "./mapProduct"
import type { ProductDetail } from "@/types/product"

interface RawProductDetailNode extends RawProductNode {
  description?: string | null
  shortDescription?: string | null
  averageRating?: number | null
  reviewCount?: number | null
  stockStatus?: string | null
  attributes?: { nodes: { name: string; options: string[] }[] } | null
  galleryImages?: { nodes: { sourceUrl: string }[] } | null
}


export function mapProductDetail(node: RawProductDetailNode): ProductDetail {
  const base = mapProduct(node)

  return {
    ...base,
    description: node.description ?? undefined,
    shortDescription: node.shortDescription ?? undefined,
    averageRating: node.averageRating ?? undefined,
    reviewCount: node.reviewCount ?? undefined,
    stockStatus: (node.stockStatus as ProductDetail["stockStatus"]) ?? "IN_STOCK",
    attributes: node.attributes?.nodes ?? [],
    galleryImages: node.galleryImages?.nodes ?? (node.image ? [node.image] : []),
  }
}
