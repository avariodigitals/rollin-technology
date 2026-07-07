// TARGET PATH IN REPO: src/lib/store/authStore.ts (replaces existing)
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface AuthUser {
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
}

interface AuthState {
  authToken: string | null
  refreshToken: string | null
  user: AuthUser | null
  hasHydrated: boolean
  setSession: (session: { authToken: string; refreshToken: string; user: AuthUser }) => void
  logout: () => void
  setHasHydrated: (value: boolean) => void
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authToken: null,
      refreshToken: null,
      user: null,
      hasHydrated: false,
      setSession: (session) =>
        set({ authToken: session.authToken, refreshToken: session.refreshToken, user: session.user }),
      logout: () => set({ authToken: null, refreshToken: null, user: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "rollin-auth",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)