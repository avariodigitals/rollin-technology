"use client"

import { useState } from "react"
import { Star } from "lucide-react"

import { EmptyState } from "@/components/shared/EmptyState"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { fetchGraphQL } from "@/lib/graphql"
import { WRITE_REVIEW_MUTATION } from "@/lib/queries"
import type { ProductReview } from "@/types/product"

interface ProductReviewsProps {
  reviews?: ProductReview[]
  averageRating?: number
  reviewCount?: number
  productId: number
}

function StarRating({ rating, max = 5, size = "sm" }: { rating: number; max?: number; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "size-6" : size === "md" ? "size-5" : "size-3.5"
  return (
    <div className="flex items-center gap-0.5 text-[var(--rollin-gold)]">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(sizeClass, i < Math.round(rating) ? "fill-current" : "opacity-30")}
        />
      ))}
    </div>
  )
}

function StarRatingInput({ value, onChange }: { value: number; onChange: (rating: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const ratingValue = i + 1
        return (
          <button
            key={i}
            type="button"
            className="focus:outline-none"
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(ratingValue)}
          >
            <Star
              className={cn(
                "size-6 transition-colors",
                ratingValue <= (hover || value) ? "fill-[var(--rollin-gold)] text-[var(--rollin-gold)]" : "opacity-30 text-muted-foreground"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

function ReviewCard({ review }: { review: ProductReview }) {
  const date = new Date(review.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="border-b border-border py-6 last:border-0">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-muted font-medium text-xs text-foreground uppercase">
          {review.reviewer.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{review.reviewer.name}</p>
          <div className="mt-0.5 flex items-center gap-2">
            <StarRating rating={review.rating} />
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
        </div>
      </div>
      <div
        className="mt-3 text-sm text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: review.content }}
      />
    </div>
  )
}

export function ProductReviews({ reviews = [], averageRating = 0, reviewCount = 0, productId }: ProductReviewsProps) {
  const [rating, setRating] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      setErrorMessage("Please select a star rating.")
      setSubmitStatus("error")
      return
    }
    if (!name.trim() || !email.trim() || !content.trim()) {
      setErrorMessage("Please fill in all fields.")
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const result = await fetchGraphQL(WRITE_REVIEW_MUTATION, {
        input: {
          productId,
          rating,
          content,
          reviewer: name,
          reviewerEmail: email,
        },
      })

      if (result?.writeReview?.review) {
        setSubmitStatus("success")
        setRating(0)
        setName("")
        setEmail("")
        setContent("")
      } else {
        setSubmitStatus("error")
        setErrorMessage("Failed to submit review. Please try again.")
      }
    } catch {
      setSubmitStatus("error")
      setErrorMessage("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
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
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            Based on {reviewCount} customer review{reviewCount !== 1 ? "s" : ""}.
          </p>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="divide-y divide-border rounded-xl border">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <EmptyState title="No reviews yet" description="Be the first to review this product." />
      )}

      {/* Review Form */}
      <div className="rounded-xl border p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground">Add a review</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Your email address will not be published. Required fields are marked *
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Your rating <span className="text-destructive">*</span>
            </label>
            <StarRatingInput value={rating} onChange={setRating} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Your review <span className="text-destructive">*</span>
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your review here..."
              required
              rows={4}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Name <span className="text-destructive">*</span>
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
              />
            </div>
          </div>

          {submitStatus === "error" && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}
          {submitStatus === "success" && (
            <p className="text-sm text-green-600">Thank you for your review! It will be visible after approval.</p>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit review"}
          </Button>
        </form>
      </div>
    </div>
  )
}
