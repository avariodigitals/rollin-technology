// TARGET PATH IN REPO: src/app/register/page.tsx — REPLACE THE ENTIRE FILE
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { fetchGraphQL } from "@/lib/graphql"
import { REGISTER_CUSTOMER_MUTATION } from "@/lib/queries"

/**
 * CHANGED — previously chained an automatic login right after
 * registerCustomer succeeded, sending the user straight to /account.
 * Per direct feedback, that skipped an expected "log in after creating
 * your account" step. Now shows a success message and redirects to
 * /sign-in instead — the user logs in explicitly with the credentials
 * they just created.
 */
export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match.")
      return
    }

    setLoading(true)

    const registerData = await fetchGraphQL(REGISTER_CUSTOMER_MUTATION, {
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
    })

    setLoading(false)

    if (!registerData?.registerCustomer?.customer) {
      setError("Could not create an account with that email. It may already be in use.")
      return
    }

    setSuccess(true)
    setTimeout(() => router.push("/sign-in"), 1800)
  }

  if (success) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#F0FDF4] px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-[var(--shadow-card-hover)]">
          <h1 className="font-heading text-2xl font-bold text-foreground">Account created</h1>
          <p className="mt-2 text-sm text-muted-foreground">Taking you to sign in...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#F0FDF4] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[var(--shadow-card-hover)]">
        <h1 className="font-heading text-2xl font-bold text-foreground">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Join Rollin and start shopping smarter</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">First Name</label>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" value={form.firstName} onChange={update("firstName")} required />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Last Name</label>
              <Input value={form.lastName} onChange={update("lastName")} required />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="email" className="pl-9" value={form.email} onChange={update("email")} required />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Phone Number</label>
            <div className="relative">
              <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="tel" className="pl-9" value={form.phone} onChange={update("phone")} required />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                minLength={8}
                className="px-9"
                value={form.password}
                onChange={update("password")}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Confirm Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                minLength={8}
                className="pl-9"
                value={form.confirmPassword}
                onChange={update("confirmPassword")}
                required
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <Checkbox
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className="mt-0.5"
              required
            />
            <span>
              I agree to Rollin&apos;s{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>

          <Button type="submit" disabled={!agreed || loading} className="h-12 w-full rounded-lg">
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}