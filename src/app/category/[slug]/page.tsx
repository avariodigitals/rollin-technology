
import { notFound } from "next/navigation"

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

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    brand?: string | string[]
    price?: string
    inStock?: string
    sort?: string
    after?: string
  }>
}

function toArray(value?: string | string[]): string[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const sp = await searchParams

  const selectedBrands = toArray(sp.brand)
  const priceBracket = PRICE_BRACKETS.find((b) => b.key === sp.price)
  const inStockOnly = sp.inStock === "1"

  const [categoriesData, brandsData, productsData] = await Promise.all([
    fetchGraphQL(GET_PRODUCT_CATEGORIES),
    fetchGraphQL(GET_PRODUCT_BRANDS).catch(() => null),
    fetchGraphQL(GET_SHOP_PRODUCTS, {
      first: PRODUCTS_PER_PAGE,
      after: sp.after ?? null,
      categoryIn: [slug],
      minPrice: priceBracket?.min ?? null,
      maxPrice: priceBracket?.max ?? null,
      stockStatus: inStockOnly ? ["IN_STOCK"] : null,
    }),
  ])

  const categoryMeta = ((categoriesData?.productCategories?.nodes ?? []) as ProductCategory[]).find(
    (c) => c.slug === slug
  )

  if (!categoryMeta) {
    notFound()
  }

  const brands = brandsData?.productBrands?.nodes ?? []

  // FIX (TS7006 — same root cause as ShopPage): explicit Product[] typing.
  let products: Product[] = (productsData?.products?.nodes ?? []).map(mapProduct)

  if (selectedBrands.length > 0) {
    products = products.filter((p: Product) => p.brand && selectedBrands.includes(p.brand))
  }

  const pageInfo = productsData?.products?.pageInfo

  return (
    <Container>
      <div className="py-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/shop" },
            { label: categoryMeta.name },
          ]}
        />
      </div>

      <h1 className="font-heading text-3xl font-bold text-foreground">{categoryMeta.name}</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        {categoryMeta.count ?? 0} products · genuine warranty · nationwide delivery
      </p>

      <div className="grid gap-8 pb-16 lg:grid-cols-[260px_1fr]">
        <ProductFilterSidebar
          brands={brands}
          selectedCategories={[]}
          selectedBrands={selectedBrands}
          selectedPrice={sp.price}
          inStockOnly={inStockOnly}
        />

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"} on this page
            </p>
            <SortSelect currentSort={sp.sort} />
          </div>

          <ProductGrid
            products={products}
            columns="4"
            emptyTitle="No products match these filters"
            emptyDescription="Try clearing a filter."
          />

          {pageInfo?.hasNextPage && (
            <div className="mt-8 flex justify-center">
              <a
                href={`/category/${slug}?${buildNextPageQuery(sp, pageInfo.endCursor)}`}
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
  sp: { brand?: string | string[]; price?: string; inStock?: string; sort?: string },
  after: string
) {
  const usp = new URLSearchParams()
  toArray(sp.brand).forEach((b) => usp.append("brand", b))
  if (sp.price) usp.set("price", sp.price)
  if (sp.inStock) usp.set("inStock", sp.inStock)
  if (sp.sort) usp.set("sort", sp.sort)
  usp.set("after", after)
  return usp.toString()
}