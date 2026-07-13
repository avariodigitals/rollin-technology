import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6"

import Container from "@/components/shared/Container"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_PRODUCT_CATEGORIES } from "@/lib/queries"
import type { ProductCategory } from "@/types/product"

interface FooterLink {
  label: string
  href: string
}

const companyLinks: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
]

const supportLinks: FooterLink[] = [
  { label: "Warranty", href: "/warranty" },
  { label: "Delivery Information", href: "/delivery" },
  { label: "Returns", href: "/refund" },
  { label: "FAQs", href: "/faq" },
  { label: "Track Order", href: "/account/orders" },
  { label: "Contact Support", href: "/contact" },
]

const businessLinks: FooterLink[] = [
  { label: "Bulk Ordering", href: "/procurement" },
  { label: "School Procurement", href: "/procurement/schools" },
  { label: "Request a Quote", href: "/procurement" },
]

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Warranty Policy", href: "/warranty-policy" },
]

const socials = [
  { icon: FaFacebookF, href: "https://facebook.com/rollin.ng", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com/rollin.ng", label: "Instagram" },
  { icon: FaXTwitter, href: "https://twitter.com/rollin_ng", label: "Twitter" },
  { icon: FaLinkedinIn, href: "https://linkedin.com/company/rollin-ng", label: "LinkedIn" },
]

async function getPopulatedCategoryLinks(): Promise<FooterLink[]> {
  try {
    const data = await fetchGraphQL(GET_PRODUCT_CATEGORIES)
    const categories = (data?.productCategories?.nodes ?? []) as ProductCategory[]

    return categories
      .filter((category) => (category.count ?? 0) > 0)
      .filter((category) => !category.parentId)
      .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
      .slice(0, 6)
      .map((category) => ({ label: category.name, href: `/category/${category.slug}` }))
  } catch {
    return []
  }
}

const GET_SOLAR_SUBCATEGORIES = `
query GetSolarSubcategories {
  productCategory(id: "solar-inverters", idType: SLUG) {
    children {
      nodes {
        name
        slug
        count
      }
    }
  }
}
`

interface SolarSubcategory {
  name: string
  slug: string
  count: number | null
}

async function getSolarSubcategories(): Promise<FooterLink[]> {
  try {
    const data = await fetchGraphQL(GET_SOLAR_SUBCATEGORIES)
    const children = (data?.productCategory?.children?.nodes ?? []) as SolarSubcategory[]

    return children
      .filter((child) => (child.count ?? 0) > 0 || child.count === null)
      .map((child) => ({ label: child.name, href: `/category/${child.slug}` }))
  } catch {
    return []
  }
}

export default async function Footer() {
  const productLinks = await getPopulatedCategoryLinks()
  const solarLinks = await getSolarSubcategories()

  return (
    <footer className="border-t bg-white">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr]">
          <div>
            <Image src="https://central.rollin.ng/wp-content/uploads/2026/07/thelogorollin.png" alt="Rollin Technologies" width={240} height={64} className="h-16 w-auto" />
            <p className="mt-4 max-w-xs text-base leading-relaxed text-muted-foreground">
              Technology you can trust. Premium devices, solar, networking and
              procurement services for individuals and businesses across
              Nigeria.
            </p>
            <ul className="mt-4 space-y-2 text-base text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="size-4" /> +234 814 846 4823
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4" /> sales@rollin.ng
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4" /> Block 505, Kodesho Street, Ikeja, Lagos
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">Products</h4>
            <ul className="mt-4 space-y-2.5 text-base text-muted-foreground">
              {productLinks.length === 0 ? (
                <li className="text-muted-foreground/60">Catalog loading…</li>
              ) : (
                productLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">Solar Products</h4>
            <ul className="mt-4 space-y-2.5 text-base text-muted-foreground">
              {solarLinks.length === 0 ? (
                <li className="text-muted-foreground/60">Loading…</li>
              ) : (
                solarLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">Support</h4>
            <ul className="mt-4 space-y-2.5 text-base text-muted-foreground">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">Company</h4>
            <ul className="mt-4 space-y-2.5 text-base text-muted-foreground">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">Business</h4>
            <ul className="mt-4 space-y-2.5 text-base text-muted-foreground">
              {businessLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-sm text-muted-foreground sm:text-left">
              © {new Date().getFullYear()} Rollin Technology. All rights reserved. Developed by{" "}
              <a
                href="https://avariodigitals.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                Avario Digitals
              </a>
              .
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
