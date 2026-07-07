// TARGET PATH IN REPO: src/app/shop/page.tsx (replaces existing — adds search support)
import Container from "@/components/shared/Container"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { ProductFilterSidebar } from "@/components/commerce/ProductFilterSidebar"
import { SortSelect } from "@/components/commerce/SortSelect"
import { ProductGrid } from "@/components/commerce/ProductGrid"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_PRODUCT_CATEGORIES, GET_PRODUCT_BRANDS, GET_SHOP_PRODUCTS } from "@/lib/queries"
import { mapProduct } from "@/lib/products/mapProduct"
import { PRICE_BRACKETS } from "@/lib/priceBrackets"
import type { Product, ProductCategory } from "@/types/product"

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

  let products: Product[] = (productsData?.products?.nodes ?? []).map(mapProduct)

  if (selectedBrands.length > 0) {
    products = products.filter((p: Product) => p.brand && selectedBrands.includes(p.brand))
  }

  const pageInfo = productsData?.products?.pageInfo

  return (
    <Container>
      <div className="py-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />
      </div>

      <h1 className="font-heading text-3xl font-bold text-foreground">
        {params.search ? `Search results for "${params.search}"` : "Product categories"}
      </h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">genuine warranty · nationwide delivery</p>

      <div className="grid gap-8 pb-16 lg:grid-cols-[260px_1fr]">
        <ProductFilterSidebar
          categories={categories}
          brands={brands}
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          selectedPrice={params.price}
          inStockOnly={inStockOnly}
        />

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"} on this page
            </p>
            <SortSelect currentSort={params.sort} />
          </div>

          <ProductGrid
            products={products}
            columns="4"
            emptyTitle="No products match these filters"
            emptyDescription="Try clearing a filter, a different search term, or a different category."
          />

          {pageInfo?.hasNextPage && (
            <div className="mt-8 flex justify-center">
              <a
                href={`/shop?${buildNextPageQuery(params, pageInfo.endCursor)}`}
                className="rounded-lg border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                Load more
              </a>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

function buildNextPageQuery(
  params: {
    category?: string | string[]
    brand?: string | string[]
    price?: string
    inStock?: string
    sort?: string
    search?: string
  },
  after: string
) {
  const usp = new URLSearchParams()
  toArray(params.category).forEach((c) => usp.append("category", c))
  toArray(params.brand).forEach((b) => usp.append("brand", b))
  if (params.price) usp.set("price", params.price)
  if (params.inStock) usp.set("inStock", params.inStock)
  if (params.sort) usp.set("sort", params.sort)
  if (params.search) usp.set("search", params.search)
  usp.set("after", after)
  return usp.toString()
}