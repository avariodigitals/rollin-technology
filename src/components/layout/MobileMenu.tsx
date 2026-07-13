"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Heart,
  Phone,
  MapPin,
  User,
  ChevronRight,
} from "lucide-react"

import { PlaceholderLink } from "@/components/shared/PlaceholderLink"
import { useSearch } from "@/hooks/useSearch"

interface MobileMenuProps {
  categories: { name: string; slug: string }[]
}

const moreLinks: { label: string; href: string }[] = [
  { label: "Business & Procurement", href: "/procurement" },
  { label: "Contact", href: "/contact" },
]

function findCat(cats: { name: string; slug: string }[], slugs: string[]) {
  for (const s of slugs) {
    const c = cats.find((x) => x.slug === s)
    if (c) return c
  }
  return null
}

export default function MobileMenu({ categories }: MobileMenuProps) {
  const laptops = findCat(categories, ["laptops"])
  const printers = findCat(categories, ["printers"])
  const servers = findCat(categories, ["servers"])
  const solar = findCat(categories, ["solar-inverters", "solar-and-inverters"])

  const topLinks: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Laptops", href: laptops ? `/category/${laptops.slug}` : "/shop" },
    { label: "Printers", href: printers ? `/category/${printers.slug}` : "/shop" },
    { label: "Servers", href: servers ? `/category/${servers.slug}` : "/shop" },
    { label: "Solar Products", href: solar ? `/category/${solar.slug}` : "/shop" },
  ]
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { query, setQuery, trimmedQuery, canSearch, results, loading, error, clear } = useSearch({
    debounceMs: 300,
    minChars: 3,
    limit: 6,
  })

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSearch) return
    setSearchOpen(false)
    clear()
    router.push(`/shop?search=${encodeURIComponent(trimmedQuery)}`)
  }

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b bg-white px-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex size-9 items-center justify-center rounded-lg text-foreground"
          >
            <Menu className="size-5" />
          </button>

          <Link href="/" aria-label="Rollin Technologies home">
            <Image
              src="https://central.rollin.ng/wp-content/uploads/2026/07/thelogorollin.png"
              alt="Rollin Technologies"
              width={220}
              height={64}
              className="h-auto w-[130px] sm:w-[220px]"
              priority
            />
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
            className="flex size-9 items-center justify-center rounded-lg text-foreground"
          >
            <Search className="size-5" />
          </button>
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

      {/* Mobile Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[70] bg-white">
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <form onSubmit={handleSubmit} className="flex flex-1 items-center gap-2 rounded-full bg-gray-100 px-3.5 py-2.5">
              <Search className="size-4 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products…"
                className="w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
              />
              {query.trim().length > 0 && (
                <button
                  type="button"
                  onClick={clear}
                  className="flex size-5 items-center justify-center rounded-full bg-gray-300 text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="size-3" />
                </button>
              )}
            </form>
            <button
              type="button"
              onClick={() => {
                setSearchOpen(false)
                clear()
              }}
              className="text-sm font-medium text-primary"
            >
              Cancel
            </button>
          </div>

          <div className="overflow-y-auto p-4">
            {!canSearch && query.trim().length > 0 && (
              <p className="text-sm text-muted-foreground">Enter at least 3 characters to search.</p>
            )}

            {loading && (
              <p className="py-4 text-center text-sm text-muted-foreground">Searching…</p>
            )}

            {error && <p className="py-4 text-center text-sm text-destructive">{error}</p>}

            {canSearch && !loading && !error && results.products.length === 0 && results.categories.length === 0 && (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No results found for &ldquo;{trimmedQuery}&rdquo;.
              </p>
            )}

            {results.products.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Products</p>
                <div className="space-y-1">
                  {results.products.map((product) => (
                    <Link
                      key={product.databaseId}
                      href={`/product/${product.slug}`}
                      onClick={() => {
                        setSearchOpen(false)
                        clear()
                      }}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-muted"
                    >
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-gray-100">
                        {product.image?.sourceUrl ? (
                          <Image
                            src={product.image.sourceUrl}
                            alt={product.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <Search className="m-3 size-4 text-gray-400" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.onSale && product.salePrice ? product.salePrice : product.price || "Price on Request"}
                        </p>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.categories.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Categories</p>
                <div className="space-y-1">
                  {results.categories.map((category) => (
                    <Link
                      key={category.databaseId}
                      href={`/category/${category.slug}`}
                      onClick={() => {
                        setSearchOpen(false)
                        clear()
                      }}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
                    >
                      <span>{category.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {category.count} {category.count === 1 ? "product" : "products"}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {canSearch && !loading && (results.products.length > 0 || results.categories.length > 0) && (
              <Link
                href={`/shop?search=${encodeURIComponent(trimmedQuery)}`}
                onClick={() => {
                  setSearchOpen(false)
                  clear()
                }}
                className="flex items-center justify-center gap-1 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground"
              >
                View all results for &ldquo;{trimmedQuery}&rdquo;
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <Image
                src="https://central.rollin.ng/wp-content/uploads/2026/07/thelogorollin.png"
                alt="Rollin Technologies"
                width={220}
                height={64}
                className="h-auto w-[130px] sm:w-[220px]"
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
              {topLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-4 text-lg font-medium text-foreground transition hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-3 border-t" />

              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-4 text-lg font-medium text-foreground transition hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="space-y-3 border-t p-4 text-sm">
              <Link href="/account" className="flex items-center gap-2 text-foreground">
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
