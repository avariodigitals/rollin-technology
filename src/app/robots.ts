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
        // Filtered/paginated commerce URLs — unbounded combinatorial
        // space (brand x price x stock x sort x cursor). Canonical tags
        // already point crawlers to the clean category/shop URL; this
        // stops them from *fetching* every filter permutation in the
        // first place.
        "/shop?*",
        "/category/*?*",
      ],
    },
    sitemap: "https://rollin.ng/sitemap.xml",
  };
}