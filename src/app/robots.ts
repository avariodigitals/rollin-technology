import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/checkout",
        "/cart",
        "/account",
        "/forgot-password",
        "/sign-in",
        "/register",
        "/api",
      ],
    },
    sitemap: "https://rollin.ng/sitemap.xml",
  };
}
