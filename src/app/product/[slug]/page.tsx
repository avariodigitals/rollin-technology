import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { ProductGallery } from "@/components/product/ProductGallery"
import { ProductRating } from "@/components/product/ProductRating"
import { AddToCartBar } from "@/components/product/AddToCartBar"
import { ProductTabs } from "@/components/product/ProductTabs"
import { ProductGrid } from "@/components/commerce/ProductGrid"
import { ProductBadge } from "@/components/shared/StatusBadge"
import Container from "@/components/shared/Container"
import JsonLd from "@/components/seo/JsonLd"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_PRODUCT_BY_SLUG, GET_FEATURED_PRODUCTS } from "@/lib/queries"
import { mapProductDetail } from "@/lib/products/mapProductDetail"
import { mapProduct } from "@/lib/products/mapProduct"
import { Product } from "@/types/product"
import { buildProductJsonLd, buildBreadcrumbJsonLd, BASE_URL } from "@/lib/seo"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await fetchGraphQL(GET_PRODUCT_BY_SLUG, { slug })

  if (!data?.product) {
    return {
      title: "Product Not Found",
    }
  }

  const product = mapProductDetail(data.product)
  const description = product.shortDescription || product.description || `Buy ${product.name} at Rollin Technology. Genuine product with warranty and nationwide delivery.`
  const cleanDescription = description.replace(/<[^>]+>/g, "").slice(0, 160)

  return {
    title: product.name,
    description: cleanDescription,
    openGraph: {
      title: product.name,
      description: cleanDescription,
      url: `/product/${slug}`,
      images: product.image ? [product.image.sourceUrl] : undefined,
    },
    alternates: {
      canonical: `/product/${slug}`,
    },
  }
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

  const productJsonLd = buildProductJsonLd({
    name: product.name,
    description: product.shortDescription || product.description || undefined,
    image: product.image?.sourceUrl,
    brand: product.brand,
    price: product.price,
    availability: product.stockStatus === "OUT_OF_STOCK" ? "OutOfStock" : "InStock",
    url: `${BASE_URL}/product/${slug}`,
    sku: String(product.databaseId),
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", item: BASE_URL },
    { name: "Shop", item: `${BASE_URL}/shop` },
    { name: product.name, item: `${BASE_URL}/product/${slug}` },
  ])

  return (
    <Container>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="py-2 md:py-4">
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
            VAT included
          </p>

          {(product.shortDescription || product.description) && (
            <div
              className="mt-4 prose prose-sm max-w-none text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: product.shortDescription || product.description || "" }}
            />
          )}

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
