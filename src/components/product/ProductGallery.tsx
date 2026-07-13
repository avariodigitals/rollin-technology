"use client"

import { useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: { sourceUrl: string }[]
  alt: string
}


export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const validImages = images.filter((img) => !!img?.sourceUrl && img.sourceUrl.trim() !== "")
  const safeImages =
    validImages.length > 0
      ? validImages
      : [{ sourceUrl: "https://www.rollin.ng/wp-content/uploads/woocommerce-placeholder.webp" }]

  return (
    <div>
      <div className="relative h-[420px] w-full overflow-hidden rounded-xl bg-gray-100 sm:h-[520px]">
        <Image
          src={safeImages[activeIndex].sourceUrl}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6"
          priority
        />
      </div>

      {safeImages.length > 1 && (
        <div className="mt-3 flex gap-2">
          {safeImages.map((image, index) => (
            <button
              key={image.sourceUrl + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-lg border-2 bg-gray-100 transition",
                index === activeIndex ? "border-primary" : "border-transparent"
              )}
            >
              <Image
                src={image.sourceUrl}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
