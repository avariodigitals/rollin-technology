export const revalidate = 3600;

import { cache } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import Container from "@/components/shared/Container"
import JsonLd from "@/components/seo/JsonLd"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_BLOG_POST_BY_SLUG } from "@/lib/queries"
import { buildBlogPostJsonLd, BASE_URL, buildBreadcrumbJsonLd } from "@/lib/seo"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

interface Post {
  id: string
  title: string
  slug: string
  date: string
  content: string
  featuredImage?: { node: { sourceUrl: string } }
  categories?: { nodes: { name: string; slug: string }[] }
  modified?: string
}

interface GraphQLPostResult {
  post?: Post | null
  errors?: { message: string }[]
}

interface GraphQLPostSlugsResult {
  posts?: {
    nodes: { slug: string }[]
  }
}

// 1. Memoize fetch call so generateMetadata and BlogPostPage share 1 GraphQL request
const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  try {
    const data = (await fetchGraphQL(GET_BLOG_POST_BY_SLUG, { slug })) as GraphQLPostResult
    return data?.post ?? null
  } catch {
    return null
  }
})

// 2. Pre-generate static params at build time for ISR
export async function generateStaticParams() {
  try {
    const data = (await fetchGraphQL(`
      query GetBlogSlugs {
        posts(first: 100) {
          nodes {
            slug
          }
        }
      }
    `)) as GraphQLPostSlugsResult

    return (data?.posts?.nodes ?? []).map((post) => ({
      slug: post.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const description = post.content.replace(/<[^>]+>/g, "").slice(0, 160)

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `/blog/${slug}`,
      images: post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : undefined,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return notFound()

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const wordCount = post.content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length
  const readTime = `${Math.max(1, Math.round(wordCount / 200))} min read`

  const blogJsonLd = buildBlogPostJsonLd({
    title: post.title,
    description: post.content.replace(/<[^>]+>/g, "").slice(0, 200),
    url: `${BASE_URL}/blog/${slug}`,
    image: post.featuredImage?.node?.sourceUrl,
    datePublished: post.date,
    dateModified: post.modified || post.date,
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", item: BASE_URL },
    { name: "Blog", item: `${BASE_URL}/blog` },
    { name: post.title, item: `${BASE_URL}/blog/${slug}` },
  ])

  return (
    <Container>
      <JsonLd data={blogJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className="py-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
            {post.categories?.nodes?.[0]?.name ?? "Article"}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {formattedDate} · {readTime}
          </p>
        </div>

        {post.featuredImage?.node?.sourceUrl && (
          <div className="relative mx-auto mt-8 aspect-video w-full max-w-4xl overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        <div
          className="prose prose-lg mx-auto mt-10 max-w-3xl text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <Link
            href="/blog"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Back to blog
          </Link>
        </div>
      </article>
    </Container>
  )
}