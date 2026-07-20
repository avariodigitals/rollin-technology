import type { Metadata } from "next";
import Container from "@/components/shared/Container"
import { BlogCard } from "@/components/content/BlogCard"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_BLOG_POSTS } from "@/lib/queries"

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides, reviews, and procurement know-how from Rollin Technology. Tips for buying laptops, phones, solar products, and corporate tech in Nigeria.",
  alternates: {
    canonical: "/blog",
  },
};

const POSTS_PER_PAGE = 9

interface BlogPageProps {
  searchParams: Promise<{ after?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { after } = await searchParams
  let data: any = null
  try {
    data = await fetchGraphQL(GET_BLOG_POSTS, { first: POSTS_PER_PAGE, after: after ?? null })
  } catch {
    data = null
  }

  const posts = data?.posts?.nodes ?? []
  const pageInfo = data?.posts?.pageInfo

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

        {posts.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">No posts published yet.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: { id: string; slug: string; title: string; excerpt?: string; categories?: { nodes: { name: string }[] }; featuredImage?: { node: { sourceUrl: string } } }) => (
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
        )}

        {pageInfo?.hasNextPage && (
          <div className="mt-10 flex justify-center">
            <a
              href={`/blog?after=${encodeURIComponent(pageInfo.endCursor)}`}
              className="rounded-lg border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Load more
            </a>
          </div>
        )}
      </div>
    </Container>
  )
}

function estimateReadTime(excerptHtml: string | undefined): string {
  if (!excerptHtml) return "3 min"
  const words = excerptHtml.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 40))
  return `${minutes} min`
}