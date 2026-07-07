"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Search, ShoppingBag, Heart, Phone, MapPin, User } from "lucide-react"

import { PlaceholderLink } from "@/components/shared/PlaceholderLink"

const links: { label: string; href?: string; placeholder?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Laptops", href: "/category/laptops" },
 
  { label: "Business", placeholder: true },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
]


export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b bg-white px-4">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex size-9 items-center justify-center rounded-lg text-foreground"
        >
          <Menu className="size-5" />
        </button>

        <Image
          src="/logo.svg"
          alt="Rollin Technologies"
          width={110}
          height={32}
          className="h-auto w-[110px]"
          priority
        />

        <div className="flex items-center gap-1">
          <Link
            href="/account/wishlist"
            aria-label="Wishlist"
            className="flex size-9 items-center justify-center rounded-lg text-foreground"
          >
            <Heart className="size-5" />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="flex size-9 items-center justify-center rounded-lg text-foreground"
          >
            <ShoppingBag className="size-5" />
          </Link>
        </div>
      </div>

      <div className="bg-primary px-4 py-2.5">
        <div className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2">
          <Search className="size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for Products"
            className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <Image
                src="/logo.svg"
                alt="Rollin Technologies"
                width={110}
                height={32}
                className="h-auto w-[110px]"
              />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex size-9 items-center justify-center rounded-lg text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
              {links.map((link) =>
                link.placeholder || !link.href ? (
                  <PlaceholderLink
                    key={link.label}
                    label={link.label}
                    className="rounded-lg px-3 py-3 text-sm font-medium"
                  />
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="space-y-3 border-t p-4 text-sm text-muted-foreground">
              {/* /store-locator not approved/built yet — see route status notes */}
              <PlaceholderLink
                label="Store Locator"
                icon={<MapPin className="size-4" />}
                className="flex items-center gap-2"
              />
              <Link href="/account" className="flex items-center gap-2">
                <User className="size-4" /> My Account
              </Link>
              <a
                href="tel:+2348148464823"
                className="flex items-center gap-2 font-semibold text-foreground"
              >
                <Phone className="size-4" /> +234 814 846 4823
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
