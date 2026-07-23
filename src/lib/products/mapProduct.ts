import { getProductBrand } from "./getProductBrand";
import { getProductBadge } from "./getProductBadge";
import type { Product } from "@/types/product";

export interface RawProductNode {
  databaseId: number;
  name: string;
  slug: string;
  image?: { sourceUrl: string | null; mediaItemUrl?: string | null } | null;
  featuredImage?: { node?: { sourceUrl: string | null; mediaItemUrl?: string | null } | null } | null;
  price?: string | null;
  regularPrice?: string | null;
  salePrice?: string | null;
  onSale?: boolean | null;
  featured?: boolean | null;
  stockStatus?: "IN_STOCK" | "OUT_OF_STOCK" | "ON_BACKORDER" | null;
  productCategories?: { nodes: { name: string; slug: string }[] } | null;
  productTags?: { nodes: { name: string; slug: string }[] } | null;
  productBrands?: { nodes: { name: string; slug: string }[] } | null;
}

const WP_BASE_URL = "https://www.rollin.ng";

export function normalizeImageUrl(
  img?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null
): { sourceUrl: string } | undefined {
  if (!img) return undefined;
  const raw = img.sourceUrl || img.mediaItemUrl;
  if (!raw || raw.trim() === "") return undefined;

  let url = raw.trim();
  if (url.startsWith("/")) {
    url = `${WP_BASE_URL}${url}`;
  }
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return undefined;
  }

  return { sourceUrl: url };
}

export function mapProduct(node: RawProductNode): Product {
  const categories = node.productCategories?.nodes ?? [];
  const tags = node.productTags?.nodes ?? [];
  const brands = node.productBrands?.nodes ?? [];

  const base: Product = {
    databaseId: node.databaseId,
    name: node.name,
    slug: node.slug,
    price: node.price ?? "",
    regularPrice: node.regularPrice ?? undefined,
    salePrice: node.salePrice ?? null,
    onSale: node.onSale ?? false,
    featured: node.featured ?? false,
    categories,
    tags,
    brands,
    image: normalizeImageUrl(node.image) || normalizeImageUrl(node.featuredImage?.node) || undefined,
    stockStatus: node.stockStatus ?? undefined,
  };

  return {
    ...base,
    brand: getProductBrand(base),
    badge: getProductBadge(base),
  };
}