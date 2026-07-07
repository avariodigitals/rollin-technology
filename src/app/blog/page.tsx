import Container from "@/components/shared/Container"
import { BlogCard } from "@/components/content/BlogCard"

/**
 * MOCK DATA: no CMS/blog API integration exists yet. Titles/categories
 * below are the 3 real posts visible in the Figma Blog frame (that
 * screenshot repeats them 3× in a 3x3 grid, which reads as mockup filler
 * rather than 9 distinct real posts — rendered once each here instead of
 * mechanically tripling). No blog post images are wired in: Figma's actual
 * photography wasn't supplied as an exportable asset, so cards fall back
 * to a plain block rather than substituting unlicensed stock photography.
 */
const posts = [
  {
    slug: "choosing-the-right-business-laptop-in-2025",
    title: "Choosing the right business laptop in 2025",
    category: "Buying Guide",
    readTime: "8 min",
  },
  {
    slug: "hybrid-solar-for-smbs-a-practical-sizing-guide",
    title: "Hybrid solar for SMBs: a practical sizing guide",
    category: "Solar",
    readTime: "6 min",
  },
  {
    slug: "mikrotik-vs-cisco-for-growing-offices",
    title: "MikroTik vs Cisco for growing offices",
    category: "Networking",
    readTime: "5 min",
  },
]

export default function BlogPage() {
  return (
    <Container>
      <div className="py-10">
        <p className="text-center text-xs font-semibold tracking-wide text-primary uppercase">Blog</p>
        <h1 className="mt-2 text-center font-heading text-3xl font-bold text-foreground">
          Guides, reviews and procurement know-how.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Whether you need sales support, technical consultation, procurement assistance, or partnership
          opportunities.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </Container>
  )
}
