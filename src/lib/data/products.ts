import { cache } from "react";
import { fetchGraphQL } from "@/lib/graphql";
import {
  GET_FEATURED_PRODUCTS,
  GET_NEW_ARRIVALS,
  GET_PRODUCT_BRANDS,
  GET_PRODUCT_BY_SLUG,
} from "@/lib/queries";
import { mapProduct, type RawProductNode } from "@/lib/products/mapProduct";
import { mapProductDetail, type RawProductDetailNode } from "@/lib/products/mapProductDetail";
import type { Product, Brand, ProductDetail } from "@/types/product";

interface GraphQLProductsResponse {
  products?: {
    nodes?: RawProductNode[];
  };
}

interface GraphQLProductBySlugResponse {
  product?: RawProductDetailNode | null;
}

interface GraphQLBrandsResponse {
  productBrands?: {
    nodes?: Brand[];
  };
}

export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  try {
    const data = await fetchGraphQL<GraphQLProductsResponse>(GET_FEATURED_PRODUCTS);
    const nodes = data?.products?.nodes ?? [];
    return nodes.map(mapProduct);
  } catch {
    return [];
  }
});

export const getNewArrivals = cache(async (): Promise<Product[]> => {
  try {
    const data = await fetchGraphQL<GraphQLProductsResponse>(GET_NEW_ARRIVALS);
    const nodes = data?.products?.nodes ?? [];
    return nodes.map(mapProduct);
  } catch {
    return [];
  }
});

export const getFeaturedBrands = cache(async (): Promise<Brand[]> => {
  try {
    const data = await fetchGraphQL<GraphQLBrandsResponse>(GET_PRODUCT_BRANDS);
    return data?.productBrands?.nodes ?? [];
  } catch {
    return [];
  }
});

export const getProductBySlug = cache(
  async (slug: string): Promise<ProductDetail | null> => {
    try {
      const data = await fetchGraphQL<GraphQLProductBySlugResponse>(
        GET_PRODUCT_BY_SLUG,
        { slug }
      );
      return data?.product ? mapProductDetail(data.product) : null;
    } catch {
      return null;
    }
  }
);