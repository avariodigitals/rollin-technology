import { Star } from "lucide-react"

import { EmptyState } from "@/components/shared/EmptyState"
import { cn } from "@/lib/utils"

interface ProductReviewsProps {
  averageRating?: number
  reviewCount?: number
}


export function ProductReviews({ averageRating = 0, reviewCount = 0 }: ProductReviewsProps) {
  if (reviewCount === 0) {
    return <EmptyState title="No reviews yet" description="Be the first to review this product." />
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border bg-muted/30 p-6 sm:flex-row">
      <div className="text-center">
        <p className="font-heading text-3xl font-bold text-foreground">{averageRating.toFixed(1)}</p>
        <div className="mt-1 flex items-center justify-center gap-0.5 text-[var(--rollin-gold)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn("size-3.5", i < Math.round(averageRating) ? "fill-current" : "opacity-30")} />
          ))}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{reviewCount} reviews</p>
      </div>
      <p className="text-center text-sm text-muted-foreground sm:text-left">
        Individual review listings aren&apos;t in the supplied Figma yet — flag if a detailed review-list design exists.
      </p>
    </div>
  )
}
