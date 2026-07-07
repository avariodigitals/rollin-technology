// TARGET PATH IN REPO: src/components/home/Hero.tsx (replaces existing — only the image src changed)
import Image from "next/image"
import Link from "next/link"

import Container from "@/components/shared/Container"


export default function Hero() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Upgrade Your Everyday With <span className="text-primary">Reliable</span> Tech
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Find the latest laptops, phones, desktops, monitors, gaming gear, networking
              equipment, and solar products in one place. Experience seamless shopping,
              verified products, and dependable after-sales support.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Shop Now
              </Link>
              <Link
                href="/shop"
                className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Explore Categories
              </Link>
            </div>
          </div>

          <div className="relative h-64 w-full overflow-hidden rounded-xl bg-muted/40 sm:h-80">
            <Image
              src="/images/hero-image.svg"
              alt="Rollin technology products"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  )
}