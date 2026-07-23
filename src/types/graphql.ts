export interface GraphQLImage {
  sourceUrl?: string;
  mediaItemUrl?: string;
}

export interface GraphQLFeaturedImage {
  node?: GraphQLImage;
}

export interface GraphQLTaxonomyItem {
  name: string;
  slug: string;
}

export interface GraphQLProduct {
  databaseId: number;
  name: string;
  slug: string;
  featured?: boolean;
  date?: string;
  image?: GraphQLImage;
  featuredImage?: GraphQLFeaturedImage;
  productCategories?: { nodes?: GraphQLTaxonomyItem[] };
  productTags?: { nodes?: GraphQLTaxonomyItem[] };
  productBrands?: { nodes?: GraphQLTaxonomyItem[] };
  price?: string;
  regularPrice?: string;
  salePrice?: string;
  onSale?: boolean;
  stockStatus?: string;
  description?: string;
  shortDescription?: string;
  averageRating?: number;
  reviewCount?: number;
  galleryImages?: { nodes?: GraphQLImage[] };
  attributes?: { nodes?: { name: string; options: string[] }[] };
}

export interface GraphQLCategory {
  databaseId: number;
  name: string;
  slug: string;
  count?: number;
  parentId?: number;
  image?: GraphQLImage;
}

export interface GraphQLBrand {
  name: string;
  slug: string;
  count?: number;
}