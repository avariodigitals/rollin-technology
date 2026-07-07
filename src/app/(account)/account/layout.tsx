// TARGET PATH IN REPO: src/app/account/layout.tsx (replaces existing)
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { AccountSidebar } from "@/components/account/AccountSidebar"
import Container from "@/components/shared/Container"
import { useAuthStore } from "@/lib/store/authStore"


export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, logout, hasHydrated } = useAuthStore()

  useEffect(() => {
    if (hasHydrated && !user) {
      router.replace("/sign-in")
    }
  }, [hasHydrated, user, router])

  if (!hasHydrated || !user) {
    return null
  }

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email
  const initials =
    [user.firstName, user.lastName]
      .filter(Boolean)
      .map((n) => n!.charAt(0).toUpperCase())
      .join("") || user.email.charAt(0).toUpperCase()

  const handleSignOut = () => {
    logout()
    router.push("/")
  }

  return (
    <Container>
      <div className="grid gap-6 py-6 lg:grid-cols-[240px_1fr]">
        <AccountSidebar name={fullName} email={user.email} initials={initials} onSignOut={handleSignOut} />
        <div>{children}</div>
      </div>
    </Container>
  )
}