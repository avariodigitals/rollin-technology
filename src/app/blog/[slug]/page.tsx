
import { notFound } from "next/navigation"
import Image from "next/image"

import Container from "@/components/shared/Container"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_BLOG_POST_BY_SLUG } from "@/lib/queries"

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

/**
 * `post.content` is trusted HTML from your own WordPress CMS (not
 * user-submitted input), rendered directly the same way any headless-WP
 * frontend does. If non-admin authors are ever added to the CMS, this
 * should be run through a sanitizer (e.g. `dompurify`) before rendering.
 *
 * Uses Tailwind's `prose` classes for the article body — requires the
 * `@tailwindcss/typography` plugin, which is NOT currently in
 * package.json. Since this project uses Tailwind v4's CSS-based config
 * (`@theme inline` in globals.css, no tailwind.config.js), enabling it
 * means: `npm install @tailwindcss/typography` + adding
 * `@plugin "@tailwindcss/typography";` near the top of globals.css.
 * Flagging as a new dependency the same way react-icons was flagged
 * earlier in this project.
 */
export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const data = await fetchGraphQL(GET_BLOG_POST_BY_SLUG, { slug })

  if (!data?.post) {
    notFound()
  }

  const post = data.post

  return (
    <Container>
      <div className="py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
      </div>

      <article className="pb-16">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          {post.categories?.nodes?.[0]?.name ?? "Rollin"}
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">{post.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-NG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {post.featuredImage?.node?.sourceUrl && (
          <div className="relative mt-6 h-72 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-96">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-neutral mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Container>
  )
}