import Link from "next/link"
import { Home, Search } from "lucide-react"

import Container from "@/components/shared/Container"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"

export default function NotFound() {
  return (
    <Container>
      <div className="py-2 md:py-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Page not found" }]} />
      </div>

      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground">404</h1>
        </div>

        <div className="max-w-md space-y-2">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Page not found
          </h2>
          <p className="text-sm text-muted-foreground">
            The page you are looking for may have been moved, deleted, or never existed. Check the URL or return to the shop.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            <Search className="h-4 w-4" />
            Browse shop
          </Link>
        </div>
      </div>
    </Container>
  )
}
