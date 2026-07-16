import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ProductSpecsTable } from "./ProductSpecsTable"
import { ProductReviews } from "./ProductReviews"
import { ShippingReturns } from "./ShippingReturns"
import type { ProductDetail } from "@/types/product"

interface ProductTabsProps {
  product: ProductDetail
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="specifications">
      <TabsList>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews ({product.reviewCount ?? 0})</TabsTrigger>
        <TabsTrigger value="shipping">Shipping &amp; Returns</TabsTrigger>
      </TabsList>

      <TabsContent value="specifications">
        <ProductSpecsTable attributes={product.attributes ?? []} shortDescription={product.shortDescription || product.description} />
      </TabsContent>

      <TabsContent value="reviews">
        <ProductReviews
          reviews={product.reviews}
          averageRating={product.averageRating}
          reviewCount={product.reviewCount}
          productId={product.databaseId}
        />
      </TabsContent>

      <TabsContent value="shipping">
        <ShippingReturns />
      </TabsContent>
    </Tabs>
  )
}
