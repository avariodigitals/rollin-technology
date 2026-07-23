import { cache } from "react";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_PRODUCT_CATEGORIES } from "@/lib/queries";
import type { ProductCategory } from "@/types/product";

interface GraphQLCategory {
  databaseId: number;
  name: string;
  slug: string;
  count?: number;
  image?: {
    sourceUrl?: string;
  };
}

interface GraphQLCategoriesResponse {
  productCategories?: {
    nodes?: GraphQLCategory[];
  };
}

function mapCategory(node: GraphQLCategory): ProductCategory {
  return {
    databaseId: node.databaseId, // Changed from 'id' to 'databaseId'
    name: node.name,
    slug: node.slug,
    count: node.count ?? 0,
    image: node.image?.sourceUrl ? { sourceUrl: node.image.sourceUrl } : null,
  };
}

export const getCategories = cache(async (): Promise<ProductCategory[]> => {
  try {
    const data = await fetchGraphQL<GraphQLCategoriesResponse>(
      GET_PRODUCT_CATEGORIES,
      {},
      undefined,
      undefined,
      3600
    );

    const nodes = data?.productCategories?.nodes ?? [];
    return nodes.map(mapCategory);
  } catch {
    return [];
  }
});

export const getNavbarCategories = getCategories;