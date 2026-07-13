// TARGET PATH IN REPO: src/components/layout/NavLinks.tsx (replaces existing)
"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Boxes, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

interface NavLinksProps {
  categories: { name: string; slug: string }[]
}

function findCat(cats: { name: string; slug: string }[], slugs: string[]) {
  for (const s of slugs) {
    const c = cats.find((x) => x.slug === s)
    if (c) return c
  }
  return null
}

function ShopDropdown({
  categories,
  onClose,
}: {
  categories: { name: string; slug: string }[]
  onClose: () => void
}) {
  return (
    <div className="absolute top-full left-0 z-50 mt-1 w-[640px] max-w-[90vw] rounded-xl border bg-white p-5 shadow-xl">
      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            onClick={onClose}
            className="block rounded-md px-2 py-1.5 text-sm text-foreground transition hover:bg-muted hover:text-primary"
          >
            {category.name}
          </Link>
        ))}
      </div>
      <div className="mt-4 border-t pt-3">
        <Link
          href="/shop"
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Boxes className="h-4 w-4" />
          View all products
        </Link>
      </div>
    </div>
  )
}

export default function NavLinks({ categories }: NavLinksProps) {
  const pathname = usePathname()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = (dropdownType: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(dropdownType)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const laptops = findCat(categories, ["laptops"])
  const printers = findCat(categories, ["printers"])
  const servers = findCat(categories, ["servers"])
  const solar = findCat(categories, ["solar-inverters", "solar-and-inverters"])

  const topLevelLinks: {
    label: string
    href: string
    hasDropdown?: boolean
    dropdownType?: string
    icon?: React.ComponentType<{ className?: string }>
  }[] = [
    { label: "Shop", href: "/shop", hasDropdown: true, dropdownType: "shop" },
    { label: "Laptops", href: laptops ? `/category/${laptops.slug}` : "/shop" },
    { label: "Printers", href: printers ? `/category/${printers.slug}` : "/shop" },
    { label: "Servers", href: servers ? `/category/${servers.slug}` : "/shop" },
    { label: "Solar Products", href: solar ? `/category/${solar.slug}` : "/shop", icon: Sun },
    { label: "Contact", href: "/contact" },
  ]

  const visibleLinks = topLevelLinks.slice(0, 7)
  const moreLinks = topLevelLinks.slice(7)

  return (
    <nav className="flex items-center gap-8">
      {visibleLinks.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
        const Icon = link.icon

        if (link.hasDropdown && link.dropdownType) {
          return (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => handleEnter(link.dropdownType!)}
              onMouseLeave={handleLeave}
            >
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-1 text-base font-medium transition hover:text-primary",
                  isActive ? "text-primary" : "text-foreground"
                )}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {link.label}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    activeDropdown === link.dropdownType ? "rotate-180" : ""
                  )}
                />
              </Link>

              {activeDropdown === link.dropdownType && link.dropdownType === "shop" && (
                <ShopDropdown categories={categories} onClose={() => setActiveDropdown(null)} />
              )}
            </div>
          )
        }

        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "flex items-center gap-1 text-base font-medium transition hover:text-primary",
              isActive ? "text-primary" : "text-foreground"
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {link.label}
          </Link>
        )
      })}

      {moreLinks.length > 0 && (
        <div
          className="relative"
          onMouseEnter={() => handleEnter("more")}
          onMouseLeave={handleLeave}
        >
          <button
            type="button"
            className={cn(
              "flex items-center gap-1 text-base font-medium transition hover:text-primary",
              moreLinks.some((l) => pathname === l.href) ? "text-primary" : "text-foreground"
            )}
          >
            More
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform",
                activeDropdown === "more" ? "rotate-180" : ""
              )}
            />
          </button>

          {activeDropdown === "more" && (
            <div className="absolute top-full right-0 z-50 mt-1 w-48 rounded-xl border bg-white p-2 shadow-xl">
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveDropdown(null)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition hover:bg-muted hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  )
}