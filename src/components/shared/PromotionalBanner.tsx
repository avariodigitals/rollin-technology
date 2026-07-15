import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Container from "@/components/shared/Container"

export interface PromotionalBannerProps {
  eyebrow?: string
  headline: string
  description: string
  desktopImage?: string
  mobileImage?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  theme?: "green" | "dark" | "blue" | "gold"
  alignment?: "left" | "center" | "right"
  campaignId?: string
}

export function PromotionalBanner({
  eyebrow,
  headline,
  description,
  desktopImage,
  mobileImage,
  primaryCta,
  secondaryCta,
  theme = "green",
  alignment = "left",
  campaignId,
}: PromotionalBannerProps) {
  const themeClasses = {
    green: "bg-primary/5",
    dark: "bg-[#0B1220] text-white",
    blue: "bg-[#EFF6FF]",
    gold: "bg-[#FFFBEB]",
  }

  const alignClass = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <section className={cn("py-12 sm:py-16", themeClasses[theme])} data-campaign={campaignId}>
      <Container>
        <div
          className={cn(
            "flex flex-col items-center gap-8 lg:flex-row lg:items-center",
            alignment === "center" ? "lg:justify-center" : "lg:items-start",
            alignment === "right" && "lg:flex-row-reverse"
          )}
        >
          <div className={cn("max-w-xl text-center lg:text-left", alignment === "center" && "lg:text-center", alignment === "right" && "lg:text-right")}>
            {eyebrow && (
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary lg:text-left">
                {eyebrow}
              </p>
            )}
            <h2
              className={cn(
                "font-heading text-2xl font-bold sm:text-3xl",
                theme === "dark" ? "text-white" : "text-foreground"
              )}
            >
              {headline}
            </h2>
            <p
              className={cn(
                "mt-3 text-base leading-relaxed",
                theme === "dark" ? "text-white/80" : "text-muted-foreground"
              )}
            >
              {description}
            </p>
            <div className={cn("mt-5 flex flex-wrap justify-center gap-3 lg:justify-start", alignment === "center" && "lg:justify-center", alignment === "right" && "lg:justify-end")}>
              <Link
                href={primaryCta.href}
                className={cn(
                  "rounded-lg px-6 py-3 text-sm font-semibold transition",
                  theme === "dark"
                    ? "bg-[var(--rollin-gold)] text-[#24303A] hover:brightness-95"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {primaryCta.label}
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className={cn(
                    "rounded-lg border px-6 py-3 text-sm font-semibold transition",
                    theme === "dark"
                      ? "border-white/30 text-white hover:bg-white/10"
                      : "border-border text-foreground hover:bg-muted"
                  )}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          {(desktopImage || mobileImage) && (
            <div className="relative hidden h-48 w-full overflow-hidden rounded-xl lg:block lg:h-56 lg:w-1/2">
              {desktopImage && (
                <Image
                  src={desktopImage}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover"
                  loading="lazy"
                />
              )}
            </div>
          )}

          {mobileImage && (
            <div className="relative h-40 w-full overflow-hidden rounded-xl lg:hidden">
              <Image
                src={mobileImage}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
