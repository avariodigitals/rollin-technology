import { mapProduct, normalizeImageUrl, type RawProductNode } from "./mapProduct"
import type { ProductDetail, ProductReview } from "@/types/product"

interface RawProductReviewNode {
  id: string
  rating: number | null
  content: string | null
  date: string | null
  reviewer?: {
    name: string | null
    email?: string | null
  } | null
}

interface RawProductDetailNode extends RawProductNode {
  description?: string | null
  shortDescription?: string | null
  averageRating?: number | null
  reviewCount?: number | null
  stockStatus?: string | null
  attributes?: { nodes: { name: string; options: string[] }[] } | null
  galleryImages?: { nodes: { sourceUrl?: string | null; mediaItemUrl?: string | null }[] } | null
  reviews?: { nodes: RawProductReviewNode[] } | null
}

function mapReview(node: RawProductReviewNode): ProductReview | null {
  if (!node.rating || !node.content || !node.date) return null
  return {
    id: node.id,
    rating: node.rating,
    content: node.content,
    date: node.date,
    reviewer: {
      name: node.reviewer?.name ?? "Anonymous",
      email: node.reviewer?.email ?? undefined,
    },
  }
}

export function mapProductDetail(node: RawProductDetailNode): ProductDetail {
  const base = mapProduct(node)

  const rawGallery = node.galleryImages?.nodes ?? []
  const validGallery = rawGallery
    .map((img) => normalizeImageUrl(img))
    .filter((img): img is { sourceUrl: string } => img !== undefined)
  // Fallback to base image if gallery is empty
  const galleryImages = validGallery.length > 0 ? validGallery : (base.image ? [base.image] : [])
  const rawReviews = node.reviews?.nodes ?? []
  const validReviews = rawReviews.map(mapReview).filter((r): r is ProductReview => r !== null)

  return {
    ...base,
    description: node.description ?? undefined,
    shortDescription: node.shortDescription ?? undefined,
    averageRating: node.averageRating ?? undefined,
    reviewCount: node.reviewCount ?? undefined,
    stockStatus: (node.stockStatus as ProductDetail["stockStatus"]) ?? "IN_STOCK",
    attributes: node.attributes?.nodes ?? [],
    galleryImages,
    reviews: validReviews.length > 0 ? validReviews : undefined,
  }
}
