// TARGET PATH IN REPO: src/components/home/FeaturedBrands.tsx (replaces existing)
import Image from "next/image"

import Container from "@/components/shared/Container"

const brands = ["hp", "dell", "lenovo", "apple", "canon", "samsung", "cisco", "starlink", "asus", "acer", "hisense", "sony"]


export default function FeaturedBrands() {
  return (
    <section className="bg-white py-16">
      <Container>
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">Authorised Partners</p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">The brands we stock</h2>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <div key={brand} className="flex h-24 items-center justify-center bg-white p-6">
              <Image
                src={`/images/brands/${brand}.svg`}
                alt={brand}
                width={100}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}