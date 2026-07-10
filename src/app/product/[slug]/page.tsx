import { notFound } from "next/navigation"
import { CheckCircle2 } from "lucide-react"

import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { ProductGallery } from "@/components/product/ProductGallery"
import { ProductRating } from "@/components/product/ProductRating"
import { AddToCartBar } from "@/components/product/AddToCartBar"
import { ProductTabs } from "@/components/product/ProductTabs"
import { ProductGrid } from "@/components/commerce/ProductGrid"
import { ProductBadge } from "@/components/shared/StatusBadge"
import Container from "@/components/shared/Container"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_PRODUCT_BY_SLUG, GET_FEATURED_PRODUCTS } from "@/lib/queries"
import { mapProductDetail } from "@/lib/products/mapProductDetail"
import { mapProduct } from "@/lib/products/mapProduct"
import { Product } from "@/types/product"


interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const data = await fetchGraphQL(GET_PRODUCT_BY_SLUG, { slug })

  if (!data?.product) {
    notFound()
  }

  const product = mapProductDetail(data.product)

 
  const relatedData = await fetchGraphQL(GET_FEATURED_PRODUCTS)
  const relatedProducts = (relatedData?.products?.nodes ?? [])
    .map(mapProduct)
    .filter((p: Product) => p.slug !== product.slug)
    .slice(0, 4)

  return (
    <Container>
      <div className="py-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.name },
          ]}
        />
      </div>

      <div className="grid gap-10 pb-12 lg:grid-cols-2">
        <div className="relative">
          {product.badge && <ProductBadge type={product.badge} />}
          <ProductGallery images={product.galleryImages ?? []} alt={product.name} />
        </div>

        <div>
          {product.brand && (
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">
              {product.brand}
            </p>
          )}
          <h1 className="mt-1 font-heading text-3xl font-bold text-foreground">{product.name}</h1>

          <div className="mt-2">
            <ProductRating
              rating={product.averageRating}
              reviewCount={product.reviewCount}
              inStock={product.stockStatus !== "OUT_OF_STOCK"}
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <p className="text-3xl font-bold text-foreground">
              {(product.onSale && product.salePrice) || product.price || "Price on Request"}
            </p>
            {product.onSale && product.regularPrice && (
              <p className="text-lg text-muted-foreground line-through">{product.regularPrice}</p>
            )}
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            VAT included · Pay in 3 instalments available at checkout
          </p>

          <ul className="mt-4 space-y-2 text-sm text-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" /> Genuine product with full manufacturer warranty
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" /> Tested and inspected before dispatch
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" /> Same-day delivery within Lagos · 2–5 days nationwide
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" /> Pay on delivery available for verified addresses
            </li>
          </ul>

          <div className="mt-6">
            <AddToCartBar product={product} disabled={product.stockStatus === "OUT_OF_STOCK"} />
          </div>
        </div>
      </div>

      <div className="border-t pt-10 pb-16">
        <ProductTabs product={product} />
      </div>

      {relatedProducts.length > 0 && (
        <div className="border-t pt-10 pb-16">
          <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">You may also like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </Container>
  )
}
