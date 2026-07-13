export const BASE_URL = "https://rollin.ng";

export const SITE_NAME = "Rollin Technology";

export const DEFAULT_DESCRIPTION =
  "Shop genuine laptops, phones, solar products, and accessories with warranty. Same-day delivery in Lagos, 2–5 days nationwide. Technology you can trust.";

export const DEFAULT_KEYWORDS = [
  "Rollin Technology",
  "buy laptops Nigeria",
  "buy phones Nigeria",
  "solar products Lagos",
  "HP laptops Nigeria",
  "Dell laptops Nigeria",
  "Apple products Nigeria",
  "genuine electronics",
  "technology store Lagos",
  "nationwide delivery",
  "corporate procurement Nigeria",
];

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rollin Technology",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  sameAs: [
    "https://wa.me/2348148464823",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+234-814-846-4823",
    contactType: "sales",
    areaServed: "NG",
    availableLanguage: "English",
  },
};

export function buildProductJsonLd(product: {
  name: string;
  description?: string;
  image?: string;
  brand?: string;
  price?: string;
  currency?: string;
  availability?: "InStock" | "OutOfStock";
  url: string;
  sku?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || DEFAULT_DESCRIPTION,
    image: product.image ? [product.image] : undefined,
    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand,
        }
      : undefined,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      url: product.url,
      priceCurrency: product.currency || "NGN",
      price: product.price ? parseFloat(product.price.replace(/[^0-9.]/g, "")) : undefined,
      availability: `https://schema.org/${product.availability || "InStock"}`,
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Rollin Technology",
      },
    },
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function buildBlogPostJsonLd(post: {
  title: string;
  description?: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || DEFAULT_DESCRIPTION,
    image: post.image ? [post.image] : undefined,
    url: post.url,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      "@type": "Organization",
      name: post.authorName || "Rollin Technology",
    },
    publisher: {
      "@type": "Organization",
      name: "Rollin Technology",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
    },
  };
}
