import type { Metadata } from "next";
import Container from "@/components/shared/Container"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { ProductFilterSidebar } from "@/components/commerce/ProductFilterSidebar"
import { MobileFilterDrawer } from "@/components/commerce/MobileFilterDrawer"
import { SortSelect } from "@/components/commerce/SortSelect"
import { InfiniteProductGrid } from "@/components/commerce/InfiniteProductGrid"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_PRODUCT_CATEGORIES, GET_PRODUCT_BRANDS, GET_SHOP_PRODUCTS } from "@/lib/queries"
import { mapProduct } from "@/lib/products/mapProduct"
import { PRICE_BRACKETS } from "@/lib/priceBrackets"
import type { Product, ProductCategory } from "@/types/product"

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse genuine laptops, phones, solar products, networking gear, and accessories. Filter by brand, price, and availability. Nationwide delivery.",
  alternates: {
    canonical: "/shop",
  },
};

const PRODUCTS_PER_PAGE = 16

interface ShopPageProps {
  searchParams: Promise<{
    category?: string | string[]
    brand?: string | string[]
    price?: string
    inStock?: string
    sort?: string
    after?: string
    search?: string
  }>
}

function toArray(value?: string | string[]): string[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}


export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const selectedCategories = toArray(params.category)
  const selectedBrands = toArray(params.brand)
  const priceBracket = PRICE_BRACKETS.find((b) => b.key === params.price)
  const inStockOnly = params.inStock === "1"

  const [categoriesData, brandsData, productsData] = await Promise.all([
    fetchGraphQL(GET_PRODUCT_CATEGORIES),
    fetchGraphQL(GET_PRODUCT_BRANDS).catch(() => null),
    fetchGraphQL(GET_SHOP_PRODUCTS, {
      first: PRODUCTS_PER_PAGE,
      after: params.after ?? null,
      categoryIn: selectedCategories.length > 0 ? selectedCategories : null,
      productBrandIn: selectedBrands.length > 0 ? selectedBrands : null,
      minPrice: priceBracket?.min ?? null,
      maxPrice: priceBracket?.max ?? null,
      stockStatus: inStockOnly ? ["IN_STOCK"] : null,
      search: params.search ?? null,
    }),
  ])

  const categories = ((categoriesData?.productCategories?.nodes ?? []) as ProductCategory[]).filter(
    (c) => (c.count ?? 0) > 0
  )
  const brands = brandsData?.productBrands?.nodes ?? []
  const products: Product[] = (productsData?.products?.nodes ?? []).map(mapProduct)
  const pageInfo = productsData?.products?.pageInfo

  return (
    <Container>
      <div className="py-2 md:py-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />
      </div>

      <h1 className="font-heading text-3xl font-bold text-foreground">
        {params.search ? `Search results for "${params.search}"` : "Product categories"}
      </h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">genuine warranty · nationwide delivery</p>

      <div className="grid gap-8 pb-16 lg:grid-cols-[260px_1fr]">
        <div className="hidden lg:block">
          <ProductFilterSidebar
            categories={categories}
            brands={brands}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            selectedPrice={params.price}
            inStockOnly={inStockOnly}
          />
        </div>

        <MobileFilterDrawer
          activeCount={selectedCategories.length + selectedBrands.length + (params.price ? 1 : 0) + (inStockOnly ? 1 : 0)}
          formId="mobile-filter-form"
        >
          <ProductFilterSidebar
            formId="mobile-filter-form"
            showSubmitButton={false}
            categories={categories}
            brands={brands}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            selectedPrice={params.price}
            inStockOnly={inStockOnly}
          />
        </MobileFilterDrawer>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"} on this page
            </p>
            <SortSelect currentSort={params.sort} />
          </div>

          <InfiniteProductGrid
            initialProducts={products}
            initialPageInfo={pageInfo}
            baseUrl={buildApiBaseUrl(params)}
            columns="4"
            emptyTitle="No products match these filters"
            emptyDescription="Try clearing a filter, a different search term, or a different category."
          />
        </div>
      </div>
    </Container>
  )
}

function buildApiBaseUrl(
  params: { category?: string | string[]; brand?: string | string[]; price?: string; inStock?: string; search?: string }
) {
  const usp = new URLSearchParams()
  usp.set("first", "16")
  toArray(params.category).forEach((c) => usp.append("category", c))
  toArray(params.brand).forEach((b) => usp.append("brand", b))
  if (params.price) {
    const bracket = PRICE_BRACKETS.find((b) => b.key === params.price)
    if (bracket) {
      if (bracket.min != null) usp.set("minPrice", bracket.min.toString())
      if (bracket.max != null) usp.set("maxPrice", bracket.max.toString())
    }
  }
  if (params.inStock) usp.set("inStock", params.inStock)
  if (params.search) usp.set("search", params.search)
  return `/api/products?${usp.toString()}`
}