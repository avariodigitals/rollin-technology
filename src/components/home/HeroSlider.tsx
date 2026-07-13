"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Container from "@/components/shared/Container"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  id: number
  headline: string
  subline: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  image: string
  theme: "green" | "dark" | "blue"
}

const slides: Slide[] = [
  {
    id: 1,
    headline: "Upgrade Your Everyday With Reliable Tech",
    subline:
      "Genuine products, nationwide delivery, warranty support, and procurement expertise — all in one place.",
    primaryCta: { label: "Shop Now", href: "/shop" },
    secondaryCta: { label: "Explore Categories", href: "/shop" },
    image: "/images/hero-image.svg",
    theme: "green",
  },
  {
    id: 2,
    headline: "Technology Procurement for Growing Businesses",
    subline:
      "Bulk ordering, formal quotations, dedicated account support, and corporate procurement made simple.",
    primaryCta: { label: "Request a Quote", href: "/procurement" },
    secondaryCta: { label: "Open Corporate Account", href: "/procurement/corporate" },
    image: "https://central.rollin.ng/wp-content/uploads/2026/07/server_rollin.png",
    theme: "green",
  },
  {
    id: 3,
    headline: "Reliable Solar and Backup Power Solutions",
    subline:
      "Solar panels, inverters, batteries, power stations, and installation support for homes and offices.",
    primaryCta: { label: "Shop Solar Products", href: "/category/solar-products" },
    secondaryCta: { label: "Speak to an Expert", href: "https://wa.me/2348148464823" },
    image: "https://central.rollin.ng/wp-content/uploads/2026/07/solarinverterrollin.png",
    theme: "blue",
  },
  {
    id: 4,
    headline: "Business and Personal Laptops for Every Budget",
    subline: "Brand new and UK-used laptops with warranty. Find the right device for work, school, or gaming.",
    primaryCta: { label: "Shop Laptops", href: "/category/laptops" },
    secondaryCta: { label: "View UK Used Laptops", href: "/category/laptops" },
    image: "https://central.rollin.ng/wp-content/uploads/2026/07/thelaptop.avif",
    theme: "green",
  },
]

const AUTOPLAY_INTERVAL = 5000

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(media.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [])

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, AUTOPLAY_INTERVAL)
  }, [])

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || document.hidden) {
      stopAutoplay()
    } else {
      startAutoplay()
    }
    return () => stopAutoplay()
  }, [prefersReducedMotion, isHovered, startAutoplay, stopAutoplay])

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) stopAutoplay()
      else if (!prefersReducedMotion) startAutoplay()
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [prefersReducedMotion, isHovered, startAutoplay, stopAutoplay])

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index)
      if (!prefersReducedMotion) startAutoplay()
    },
    [prefersReducedMotion, isHovered, startAutoplay]
  )

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length)
  }, [])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
    }
    setTouchStart(null)
  }

  const slide = slides[current]

  const themeClasses: Record<Slide["theme"], string> = {
    green: "bg-white",
    dark: "bg-[#0B1220] text-white",
    blue: "bg-[#EFF6FF]",
  }

  return (
    <section
      ref={containerRef}
      className={cn("relative overflow-hidden py-12 sm:py-16", themeClasses[slide.theme])}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Homepage promotions"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="sr-only">
        Slide {current + 1} of {slides.length}
      </div>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 min-h-[320px] sm:min-h-[380px]">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <h1 className="font-heading text-3xl font-bold sm:text-4xl lg:text-[42px] leading-tight">
              {slide.headline}
            </h1>
            <p className={cn("mt-4 max-w-md text-base leading-relaxed mx-auto lg:mx-0", slide.theme === "dark" ? "text-white/80" : "text-muted-foreground")}>
              {slide.subline}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href={slide.primaryCta.href}
                className={cn(
                  "rounded-lg px-6 py-3 text-sm font-semibold transition",
                  slide.theme === "dark"
                    ? "bg-[var(--rollin-gold)] text-[#24303A] hover:brightness-95"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {slide.primaryCta.label}
              </Link>
              {slide.secondaryCta && (
                <Link
                  href={slide.secondaryCta.href}
                  className={cn(
                    "rounded-lg border px-6 py-3 text-sm font-semibold transition",
                    slide.theme === "dark"
                      ? "border-white/30 text-white hover:bg-white/10"
                      : "border-border text-foreground hover:bg-muted"
                  )}
                >
                  {slide.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          <div className="relative order-1 h-64 w-full overflow-hidden rounded-xl bg-muted/40 sm:h-80 lg:order-2">
            <Image
              src={slide.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              priority={current === 0}
              loading={current === 0 ? "eager" : "lazy"}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === current ? "w-6 bg-primary" : "w-2 bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="flex size-8 items-center justify-center rounded-full border bg-white text-foreground shadow-sm transition hover:bg-muted"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex size-8 items-center justify-center rounded-full border bg-white text-foreground shadow-sm transition hover:bg-muted"
              aria-label="Next slide"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
