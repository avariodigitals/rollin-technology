import Image from "next/image"
import Link from "next/link"

import Container from "@/components/shared/Container"


export default function Hero() {
  return (
    <section className="bg-[#f0f5ff] py-12 sm:py-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">
              Business Laptop Deals
            </span>
            <h1 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Reliable laptops for work, school and growing teams
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Shop HP, Dell, Lenovo, and Apple laptops with warranty and flexible payment options.
            </p>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Shop Laptops
              </Link>
            </div>
          </div>

          <div className="relative h-64 w-full overflow-hidden rounded-xl sm:h-80">
            <Image
              src="https://central.rollin.ng/wp-content/uploads/2026/07/thelaptop.avif"
              alt="Business laptop"
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