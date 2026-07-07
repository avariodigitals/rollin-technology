// TARGET PATH IN REPO: src/components/layout/NavLinks.tsx (replaces existing)
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Laptops", href: "/category/laptops" },
  { label: "Business", href: "/procurement" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
]


export default function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition hover:text-primary",
            pathname === link.href ? "text-primary" : "text-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}