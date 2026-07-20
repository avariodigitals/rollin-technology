import type { MetadataRoute } from "next";
import { fetchGraphQL } from "@/lib/graphql";

const BASE_URL = "https://rollin.ng";

export const revalidate = 3600;

const STATIC_PAGES = [
  { url: "/", priority: 1.0, changefreq: "daily" as const },
  { url: "/shop", priority: 0.9, changefreq: "daily" as const },
  { url: "/about", priority: 0.8, changefreq: "monthly" as const },
  { url: "/blog", priority: 0.8, changefreq: "weekly" as const },
  { url: "/contact", priority: 0.8, changefreq: "monthly" as const },
  { url: "/procurement", priority: 0.8, changefreq: "monthly" as const },
  { url: "/procurement/corporate", priority: 0.7, changefreq: "monthly" as const },
  { url: "/procurement/government", priority: 0.7, changefreq: "monthly" as const },
  { url: "/procurement/schools", priority: 0.7, changefreq: "monthly" as const },
  { url: "/delivery", priority: 0.6, changefreq: "monthly" as const },
  { url: "/faq", priority: 0.6, changefreq: "monthly" as const },
  { url: "/warranty", priority: 0.6, changefreq: "monthly" as const },
  { url: "/warranty-policy", priority: 0.6, changefreq: "monthly" as const },
  { url: "/refund", priority: 0.6, changefreq: "monthly" as const },
  { url: "/privacy", priority: 0.6, changefreq: "monthly" as const },
  { url: "/terms", priority: 0.6, changefreq: "monthly" as const },
  { url: "/store-locator", priority: 0.5, changefreq: "monthly" as const },
  { url: "/careers", priority: 0.5, changefreq: "monthly" as const },
];

const ALL_PRODUCTS_QUERY = `
  query AllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      nodes {
        slug
        modified
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const ALL_CATEGORIES_QUERY = `
  query AllCategories {
    productCategories(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

const ALL_BLOG_POSTS_QUERY = `
  query AllBlogPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        slug
        modified
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

interface GraphQLSitemapProductsResult {
  products?: {
    nodes: Array<{ slug: string; modified?: string }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

interface GraphQLSitemapCategoriesResult {
  productCategories?: {
    nodes: Array<{ slug: string }>;
  };
}

interface GraphQLSitemapPostsResult {
  posts?: {
    nodes: Array<{ slug: string; modified?: string }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

async function fetchAllProducts(): Promise<{ slug: string; modified?: string }[]> {
  const items: { slug: string; modified?: string }[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      // Fixed using 'as' type assertion
      const data = (await fetchGraphQL(ALL_PRODUCTS_QUERY, { first: 100, after })) as GraphQLSitemapProductsResult;
      const nodes = data?.products?.nodes ?? [];
      const pageInfo = data?.products?.pageInfo;

      items.push(...nodes.map((n: { slug: string; modified?: string }) => ({ slug: n.slug, modified: n.modified })));
      hasNextPage = pageInfo?.hasNextPage ?? false;
      after = pageInfo?.endCursor ?? null;
    }
  } catch {
    // Return what we have so far
  }

  return items;
}

async function fetchAllCategories(): Promise<{ slug: string }[]> {
  try {
    // Fixed using 'as' type assertion
    const data = (await fetchGraphQL(ALL_CATEGORIES_QUERY)) as GraphQLSitemapCategoriesResult;
    return (data?.productCategories?.nodes ?? []).map((n: { slug: string }) => ({
      slug: n.slug,
    }));
  } catch {
    return [];
  }
}

async function fetchAllBlogPosts(): Promise<{ slug: string; modified?: string }[]> {
  const items: { slug: string; modified?: string }[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      // Fixed using 'as' type assertion
      const data = (await fetchGraphQL(ALL_BLOG_POSTS_QUERY, { first: 100, after })) as GraphQLSitemapPostsResult;
      const nodes = data?.posts?.nodes ?? [];
      const pageInfo = data?.posts?.pageInfo;

      items.push(...nodes.map((n: { slug: string; modified?: string }) => ({ slug: n.slug, modified: n.modified })));
      hasNextPage = pageInfo?.hasNextPage ?? false;
      after = pageInfo?.endCursor ?? null;
    }
  } catch {
    // Return what we have so far
  }

  return items;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, blogPosts] = await Promise.all([
    fetchAllProducts(),
    fetchAllCategories(),
    fetchAllBlogPosts(),
  ]);

  const staticEntries = STATIC_PAGES.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changefreq,
    priority: page.priority,
  }));

  const productEntries = products.map((product) => ({
    url: `${BASE_URL}/product/${product.slug}`,
    lastModified: product.modified ? new Date(product.modified) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryEntries = categories.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogEntries = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.modified ? new Date(post.modified) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries, ...categoryEntries, ...blogEntries];
}