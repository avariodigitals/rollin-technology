
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { PlaceholderLink } from "@/components/shared/PlaceholderLink"
import { fetchGraphQL } from "@/lib/graphql"
import { LOGIN_MUTATION } from "@/lib/queries"
import { useAuthStore } from "@/lib/store/authStore"


export default function SignInPage() {
  const router = useRouter()
  const setSession = useAuthStore((s) => s.setSession)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const data = await fetchGraphQL(LOGIN_MUTATION, { username: email, password })

    if (!data?.login?.authToken) {
      setError("Incorrect email or password.")
      setLoading(false)
      return
    }

    setSession({
      authToken: data.login.authToken,
      refreshToken: data.login.refreshToken,
      user: data.login.user,
    })
    router.push("/account")
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#F0FDF4] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[var(--shadow-card-hover)]">
        <h1 className="font-heading text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to your Rollin account</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-9"
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

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <Checkbox />
              Remember me
            </label>
            <PlaceholderLink label="Forgot password?" className="font-medium text-primary/60" />
          </div>

          <Button type="submit" disabled={loading} className="h-12 w-full rounded-lg">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          Or sign in with
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          disabled
          title="Google sign-in isn't integrated yet"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border text-sm font-medium text-foreground transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          Google
        </button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}