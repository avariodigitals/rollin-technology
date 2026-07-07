
export interface ProductCategoryRef {
  name: string;
  slug: string;
}

export interface ProductTagRef {
  name: string;
  slug: string;
}


export interface ProductBrandRef {
  name: string;
  slug: string;
}

export interface Product {
  databaseId: number;
  name: string;
  slug: string;
  price: string;
  regularPrice?: string;
  salePrice?: string | null;
  onSale?: boolean;
  featured?: boolean;
  categories?: ProductCategoryRef[];
  tags?: ProductTagRef[];
  /**
   * NEW — raw real brand data from WooCommerce's product_brand taxonomy,
   * now confirmed assigned on the backend. Input to getProductBrand(),
   * which prefers this over the old category-slug-guessing stopgap.
   */
  brands?: ProductBrandRef[];
  /**
   * Resolved value — set by mapProduct() via getProductBrand(). Prefers
   * real `brands` data now; falls back to category-slug guessing only
   * when a product genuinely has no brand assigned yet.
   */
  brand?: string;
  badge?: "best-seller" | "new" | "hot";
  image?: {
    sourceUrl: string;
  };
}

export interface ProductAttribute {
  name: string;
  options: string[];
}

export interface ProductDetail extends Product {
  description?: string;
  shortDescription?: string;
  attributes?: ProductAttribute[];
  averageRating?: number;
  reviewCount?: number;
  stockStatus?: "IN_STOCK" | "OUT_OF_STOCK" | "ON_BACKORDER";
  galleryImages?: { sourceUrl: string }[];
}

export interface ProductCategory {
  databaseId: number;
  name: string;
  slug: string;
  count: number | null;
  image?: {
    sourceUrl: string;
  } | null;
}