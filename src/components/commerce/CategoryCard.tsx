import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface CategoryCardProps {
  name: string
  slug: string
  count: number
  image?: string | null
}


export default function CategoryCard({ name, slug, count, image }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${slug}`}
      className="group overflow-hidden rounded-xl border bg-white shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="relative h-32 w-full bg-gray-100">
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="line-clamp-1 font-semibold text-foreground">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {count} {count === 1 ? "product" : "products"}
          </p>
        </div>
        <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </Link>
  )
}
