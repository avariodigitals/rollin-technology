// TARGET PATH IN REPO: src/components/content/BlogCard.tsx (replaces existing file)
import Image from "next/image"
import Link from "next/link"

interface BlogCardProps {
  slug: string
  title: string
  excerpt?: string
  date?: string
  image?: string
}


export function BlogCard({ slug, title, excerpt, date, image }: BlogCardProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null

  return (
    <Link
      href={`/blog/${slug}`}
      className="group overflow-hidden rounded-xl border bg-white shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="relative h-44 w-full bg-gray-100">
        {image && (
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        )}
      </div>
      <div className="p-4">
        {formattedDate && (
          <p className="text-[11px] font-semibold tracking-wide text-primary uppercase">{formattedDate}</p>
        )}
        <h3 className="mt-1 line-clamp-2 font-heading text-sm font-semibold text-foreground group-hover:text-primary">
          {title}
        </h3>
        {excerpt && (
          <p
            className="mt-1 line-clamp-2 text-xs text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        )}
      </div>
    </Link>
  )
}