// TARGET PATH IN REPO: src/components/commerce/ProductFilterSidebar.tsx (new)
import { Button } from "@/components/ui/button"
import { PRICE_BRACKETS } from "@/lib/priceBrackets"

interface FilterOption {
  name: string
  slug: string
  count?: number | null
}

interface ProductFilterSidebarProps {
  /** Omit entirely on /category/[slug] — that filter is fixed by the route there, not a checkbox choice. */
  categories?: FilterOption[]
  brands: FilterOption[]
  selectedCategories: string[]
  selectedBrands: string[]
  selectedPrice?: string
  inStockOnly: boolean
}


export function ProductFilterSidebar({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  selectedPrice,
  inStockOnly,
}: ProductFilterSidebarProps) {
  return (
    <form method="get" className="h-fit space-y-6 rounded-xl border bg-white p-5">
      {categories && categories.length > 0 && (
        <div>
          <p className="text-xs font-semibold tracking-wide text-foreground uppercase">Categories</p>
          <div className="mt-3 space-y-2">
            {categories.map((category) => (
              <label key={category.slug} className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  name="category"
                  value={category.slug}
                  defaultChecked={selectedCategories.includes(category.slug)}
                  className="size-4 rounded border-input"
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>
      )}

      {brands.length > 0 && (
        <div>
          <p className="text-xs font-semibold tracking-wide text-foreground uppercase">Brand</p>
          <div className="mt-3 space-y-2">
            {brands.map((brand) => (
              <label key={brand.slug} className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  name="brand"
                  value={brand.slug}
                  defaultChecked={selectedBrands.includes(brand.slug)}
                  className="size-4 rounded border-input"
                />
                {brand.name}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-semibold tracking-wide text-foreground uppercase">Price</p>
        <div className="mt-3 space-y-2">
          {PRICE_BRACKETS.map((bracket) => (
            <label key={bracket.key} className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="radio"
                name="price"
                value={bracket.key}
                defaultChecked={selectedPrice === bracket.key}
                className="size-4 border-input"
              />
              {bracket.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold tracking-wide text-foreground uppercase">Availability</p>
        <div className="mt-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              name="inStock"
              value="1"
              defaultChecked={inStockOnly}
              className="size-4 rounded border-input"
            />
            In Stock
          </label>
        </div>
      </div>

      <Button type="submit" className="h-11 w-full rounded-lg">
        Apply Filters
      </Button>
    </form>
  )
}