// TARGET PATH IN REPO: src/lib/products/getProductBrand.ts (replaces existing)
import type { Product } from "@/types/product"


const CATEGORY_SLUG_TO_BRAND: Record<string, string> = {
  "hp-laptops": "HP",
  "dell-laptops": "Dell",
  "lenovo-laptops": "Lenovo",
  "apple-products": "Apple",
  "apple-laptops": "Apple",
  "samsung-phones": "Samsung",
  "canon-printers": "Canon",
  "epson-printers": "Epson",
  "cisco-networking": "Cisco",
  "mikrotik-networking": "MikroTik",
}

const KNOWN_BRAND_NAMES = [
  "HP", "Dell", "Lenovo", "Apple", "Samsung", "Canon", "Epson",
  "Cisco", "MikroTik", "Acer", "Asus", "Hisense", "Sony", "Starlink",
]

export function getProductBrand(
  product: Pick<Product, "brand" | "categories" | "brands">
): string | undefined {
  if (product.brand) return product.brand

  // Real backend data — try this first now.
  const realBrand = product.brands?.[0]?.name
  if (realBrand) return realBrand

  // Fallback for any product not yet assigned a real brand.
  for (const category of product.categories ?? []) {
    const mapped = CATEGORY_SLUG_TO_BRAND[category.slug]
    if (mapped) return mapped
  }

  for (const category of product.categories ?? []) {
    const match = KNOWN_BRAND_NAMES.find((brand) =>
      category.name.toLowerCase().includes(brand.toLowerCase())
    )
    if (match) return match
  }

  return undefined
}