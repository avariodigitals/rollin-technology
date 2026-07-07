// TARGET PATH IN REPO: src/components/account/AccountSidebar.tsx — REPLACE
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, User, MapPin, Heart, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"

interface AccountSidebarProps {
  name: string
  email: string
  initials: string
  onSignOut?: () => void
}

// Wishlist now points back to /account/wishlist — moved back inside the
// account area per your preference (it also matches Figma's intent more
// closely, which shows "My Wishlist" as an account-nested page).
const navItems = [
  { label: "Dashboard", href: "/account", icon: LayoutDashboard },
  { label: "My Orders", href: "/account/orders", icon: Package },
  { label: "Profile", href: "/account/profile", icon: User },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
]

export function AccountSidebar({ name, email, initials, onSignOut }: AccountSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="h-fit w-full max-w-[240px] rounded-xl border bg-white p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-3 border-b pb-4">
        <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{email}</p>
        </div>
      </div>

      <nav className="mt-3 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}

        <button
          type="button"
          onClick={onSignOut}
          className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="size-4" />
          Sign Out
        </button>
      </nav>
    </aside>
  )
}