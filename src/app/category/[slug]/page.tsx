import type { Metadata } from "next"
import { notFound } from "next/navigation"

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
import { BASE_URL } from "@/lib/seo"
import JsonLd from "@/components/seo/JsonLd"
import { buildBreadcrumbJsonLd } from "@/lib/seo"

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const categoriesData = await fetchGraphQL(GET_PRODUCT_CATEGORIES)
  const categoryMeta = ((categoriesData?.productCategories?.nodes ?? []) as ProductCategory[]).find(
    (c) => c.slug === slug
  )

  if (!categoryMeta) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: categoryMeta.name,
    description: `Shop ${categoryMeta.name} at Rollin Technology. ${categoryMeta.count ?? 0} genuine products with warranty and nationwide delivery.`,
    openGraph: {
      title: categoryMeta.name,
      description: `Shop ${categoryMeta.name} at Rollin Technology. ${categoryMeta.count ?? 0} genuine products with warranty and nationwide delivery.`,
      url: `/category/${slug}`,
    },
    alternates: {
      canonical: `/category/${slug}`,
    },
  }
}

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
      productBrandIn: selectedBrands.length > 0 ? selectedBrands : null,
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

  const products: Product[] = (productsData?.products?.nodes ?? []).map(mapProduct)
  const pageInfo = productsData?.products?.pageInfo

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", item: BASE_URL },
    { name: "Categories", item: `${BASE_URL}/shop` },
    { name: categoryMeta.name, item: `${BASE_URL}/category/${slug}` },
  ])

  return (
    <Container>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="py-2 md:py-4">
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
        <div className="hidden lg:block">
          <ProductFilterSidebar
            brands={brands}
            selectedCategories={[]}
            selectedBrands={selectedBrands}
            selectedPrice={sp.price}
            inStockOnly={inStockOnly}
          />
        </div>

        <MobileFilterDrawer
          activeCount={selectedBrands.length + (sp.price ? 1 : 0) + (inStockOnly ? 1 : 0)}
          formId="mobile-filter-form"
        >
          <ProductFilterSidebar
            formId="mobile-filter-form"
            showSubmitButton={false}
            brands={brands}
            selectedCategories={[]}
            selectedBrands={selectedBrands}
            selectedPrice={sp.price}
            inStockOnly={inStockOnly}
          />
        </MobileFilterDrawer>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"} on this page
            </p>
            <SortSelect currentSort={sp.sort} />
          </div>

          <InfiniteProductGrid
            initialProducts={products}
            initialPageInfo={pageInfo}
            baseUrl={buildApiBaseUrl(slug, sp)}
            columns="4"
            emptyTitle="No products match these filters"
            emptyDescription="Try clearing a filter."
          />
        </div>
      </div>
    </Container>
  )
}

function buildApiBaseUrl(
  slug: string,
  sp: { brand?: string | string[]; price?: string; inStock?: string }
) {
  const usp = new URLSearchParams()
  usp.set("first", "16")
  usp.append("category", slug)
  toArray(sp.brand).forEach((b) => usp.append("brand", b))
  if (sp.price) {
    const bracket = PRICE_BRACKETS.find((b) => b.key === sp.price)
    if (bracket) {
      if (bracket.min != null) usp.set("minPrice", bracket.min.toString())
      if (bracket.max != null) usp.set("maxPrice", bracket.max.toString())
    }
  }
  if (sp.inStock) usp.set("inStock", sp.inStock)
  return `/api/products?${usp.toString()}`
}