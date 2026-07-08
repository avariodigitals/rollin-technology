import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6"

import Container from "@/components/shared/Container"
import { PlaceholderLink } from "@/components/shared/PlaceholderLink"
import { fetchGraphQL } from "@/lib/graphql"
import { GET_PRODUCT_CATEGORIES } from "@/lib/queries"
import type { ProductCategory } from "@/types/product"

interface FooterLink {
  label: string
  href?: string
  placeholder?: boolean
}



const staticColumns: { title: string; links: FooterLink[] }[] = [
{
  title: "Company",
  links: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
},
 
{
  title: "Business",
  links: [
    { label: "Corporate Accounts", href: "/procurement/corporate" },
    { label: "Government Procurement", href: "/procurement/government" },
    { label: "School Procurement", href: "/procurement/schools" },
    { label: "Request a Quote", href: "/procurement" },
  ],
},
  {
    title: "Support",
    links: [
      { label: "Warranty", href: "/faq#warranty" },
      { label: "Returns", href: "/faq#returns" },
      { label: "Shipping", href: "/faq#shipping" },
      { label: "FAQs", href: "/faq" },
    ],
  },
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
      .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
      .slice(0, 4)
      .map((category) => ({ label: category.name, href: `/category/${category.slug}` }))
  } catch {
  
    return []
  }
}

export default async function Footer() {
  const productLinks = await getPopulatedCategoryLinks()

  return (
    <footer className="border-t bg-white">
      <Container>
        <div className="grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Image src="/logo.svg" alt="Rollin Technologies" width={120} height={32} className="h-8 w-auto" />
 
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Technology you can trust. Premium devices, solar, networking and
              procurement services for individuals and businesses across
              Nigeria.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="size-3.5" /> +234 814 846 4823
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-3.5" /> hello@rollin.ng
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-3.5" /> Lagos · Abuja · Port Harcourt
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground">{staticColumns[0].title}</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              {staticColumns[0].links.map((link) => (
                <li key={link.label}>
                  {link.placeholder || !link.href ? (
                    <PlaceholderLink label={link.label} />
                  ) : (
                    <Link href={link.href} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground">Products</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              {productLinks.length === 0 ? (
                <li className="text-muted-foreground/60">Catalog loading…</li>
              ) : (
                productLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href!} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {staticColumns.slice(1).map((column) => (
            <div key={column.title}>
              <h4 className="font-heading text-sm font-semibold text-foreground">{column.title}</h4>
              <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.placeholder || !link.href ? (
                      <PlaceholderLink label={link.label} />
                    ) : (
                      <Link href={link.href} className="transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
  © {new Date().getFullYear()} Rollin Technology. All rights reserved. · Built by{" "}
  <a href="https://avariodigitals.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
    Avario Digitals
  </a>
</p>
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-primary hover:text-primary-foreground"
              >
                <social.icon className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
