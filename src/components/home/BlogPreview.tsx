
import Link from "next/link"

import Container from "@/components/shared/Container"
import { BlogCard } from "@/components/content/BlogCard"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_BLOG_POSTS } from "@/lib/queries"

interface RawPost {
  id: string
  slug: string
  title: string
  excerpt?: string
  categories?: { nodes: { name: string }[] }
  featuredImage?: { node: { sourceUrl: string } }
}

function estimateReadTime(excerptHtml?: string): string {
  if (!excerptHtml) return "3 min"
  const words = excerptHtml.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 40))} min`
}


export default async function BlogPreview() {
  const data = await fetchGraphQL(GET_BLOG_POSTS, { first: 3, after: null }).catch(() => null)
  const posts: RawPost[] = data?.posts?.nodes ?? []

  if (posts.length === 0) return null

  return (
    <section className="bg-white py-16">
      <Container>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">Latest Insights</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
              Guides, reviews and procurement know-how.
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
            Visit blog →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              slug={post.slug}
              title={post.title}
              category={post.categories?.nodes?.[0]?.name ?? "Rollin"}
              readTime={estimateReadTime(post.excerpt)}
              image={post.featuredImage?.node?.sourceUrl}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}