import type { Product } from "@/types/product"

type ProductBadgeType = NonNullable<Product["badge"]>

const TAG_SLUG_TO_BADGE: Record<string, ProductBadgeType> = {
  "best-seller": "best-seller",
  "bestseller": "best-seller",
  new: "new",
  hot: "hot",
}


export function getProductBadge(
  product: Pick<Product, "badge" | "tags" | "featured">
): ProductBadgeType | undefined {
  if (product.badge) return product.badge

  for (const tag of product.tags ?? []) {
    const mapped = TAG_SLUG_TO_BADGE[tag.slug]
    if (mapped) return mapped
  }

  if (product.featured) return "best-seller"

  return undefined
}
