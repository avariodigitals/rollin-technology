
import Image from "next/image"

import Container from "@/components/shared/Container"

const brands = [
  { slug: "hp", name: "HP", filter: "hp" },
  { slug: "dell", name: "Dell", filter: "dell" },
  { slug: "lenovo", name: "Lenovo", filter: "lenovo" },
  { slug: "apple", name: "Apple", filter: "apple" },
  { slug: "canon", name: "Canon", filter: "canon" },
  { slug: "samsung", name: "Samsung", filter: "samsung" },
  { slug: "cisco", name: "Cisco", filter: "cisco" },
  { slug: "starlink", name: "Starlink", filter: "starlink" },
  { slug: "asus", name: "ASUS", filter: "asus" },
  { slug: "acer", name: "Acer", filter: "acer" },
  { slug: "hisense", name: "Hisense", filter: "hisense" },
  { slug: "sony", name: "Sony", filter: "sony" },
]

export default function FeaturedBrands() {
  return (
    <section className="bg-white py-16">
      <Container>
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Authorised Partners</p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">The brands we stock</h2>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <a
              key={brand.slug}
              href={`/shop?brand=${encodeURIComponent(brand.filter)}`}
              className="flex h-28 items-center justify-center bg-white p-6 transition hover:bg-gray-50"
              aria-label={`Shop ${brand.name} products`}
            >
              <Image
                src={`/images/brands/${brand.slug}.svg`}
                alt={`${brand.name} logo`}
                width={100}
                height={40}
                className="h-10 w-auto object-contain"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}