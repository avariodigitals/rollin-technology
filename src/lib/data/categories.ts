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
    databaseId: node.databaseId,
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

const GET_SOLAR_SUBCATEGORIES = `
query GetSolarSubcategories {
  productCategory(id: "solar-inverters", idType: SLUG) {
    children {
      nodes {
        name
        slug
        count
      }
    }
  }
}
`;

interface SolarSubcategory {
  name: string;
  slug: string;
  count: number | null;
}

interface SolarSubcategoryResponse {
  productCategory?: {
    children?: {
      nodes?: SolarSubcategory[];
    };
  };
}

export interface FooterLink {
  label: string;
  href: string;
}

// Previously a raw, uncached fetchGraphQL call in Footer.tsx — since
// Footer renders on every page via RootLayout, this ran unmemoized on
// every single request. Wrapped in React's cache() so it's deduped per
// render and picks up the standard 3600s Data Cache window.
export const getSolarSubcategories = cache(async (): Promise<FooterLink[]> => {
  try {
    const data = await fetchGraphQL<SolarSubcategoryResponse>(
      GET_SOLAR_SUBCATEGORIES,
      {},
      undefined,
      undefined,
      3600
    );
    const children = (data?.productCategory?.children?.nodes ?? []) as SolarSubcategory[];

    return children
      .filter((child) => (child.count ?? 0) > 0 || child.count === null)
      .map((child) => ({ label: child.name, href: `/category/${child.slug}` }));
  } catch {
    return [];
  }
});

export const getPopulatedCategoryLinks = cache(async (): Promise<FooterLink[]> => {
  try {
    const categories = await getCategories();

    return categories
      .filter((category) => (category.count ?? 0) > 0)
      .filter((category) => !category.parentId)
      .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
      .slice(0, 6)
      .map((category) => ({ label: category.name, href: `/category/${category.slug}` }));
  } catch {
    return [];
  }
});