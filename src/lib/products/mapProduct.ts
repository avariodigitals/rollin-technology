// TARGET PATH IN REPO: src/lib/products/mapProduct.ts (replaces existing)
import { getProductBrand } from "./getProductBrand"
import { getProductBadge } from "./getProductBadge"
import type { Product } from "@/types/product"

export interface RawProductNode {
  databaseId: number
  name: string
  slug: string
  image?: { sourceUrl: string } | null
  price?: string | null
  regularPrice?: string | null
  salePrice?: string | null
  onSale?: boolean | null
  featured?: boolean | null
  productCategories?: { nodes: { name: string; slug: string }[] } | null
  productTags?: { nodes: { name: string; slug: string }[] } | null
  /** NEW — real brand taxonomy data, now included in every product query. */
  productBrands?: { nodes: { name: string; slug: string }[] } | null
}

export function mapProduct(node: RawProductNode): Product {
  const categories = node.productCategories?.nodes ?? []
  const tags = node.productTags?.nodes ?? []
  const brands = node.productBrands?.nodes ?? []

  const base: Product = {
    databaseId: node.databaseId,
    name: node.name,
    slug: node.slug,
    price: node.price ?? "",
    regularPrice: node.regularPrice ?? undefined,
    salePrice: node.salePrice ?? null,
    onSale: node.onSale ?? false,
    featured: node.featured ?? false,
    categories,
    tags,
    brands,
    image: node.image ?? undefined,
  }

  return {
    ...base,
    brand: getProductBrand(base),
    badge: getProductBadge(base),
  }
}