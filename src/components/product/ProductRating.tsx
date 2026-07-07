import { Star, CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface ProductRatingProps {
  rating?: number
  reviewCount?: number
  inStock?: boolean
}

export function ProductRating({ rating = 0, reviewCount = 0, inStock = true }: ProductRatingProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <div className="flex items-center gap-0.5 text-[var(--rollin-gold)]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn("size-4", i < Math.round(rating) ? "fill-current" : "fill-transparent stroke-current opacity-40")}
          />
        ))}
      </div>
      <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
      <span className="text-muted-foreground">· {reviewCount} reviews</span>
      <span className="text-muted-foreground">·</span>
      <span
        className={cn(
          "flex items-center gap-1 font-medium",
          inStock ? "text-[var(--status-success)]" : "text-[var(--status-danger)]"
        )}
      >
        <CheckCircle2 className="size-3.5" />
        {inStock ? "In stock" : "Out of stock"}
      </span>
    </div>
  )
}
