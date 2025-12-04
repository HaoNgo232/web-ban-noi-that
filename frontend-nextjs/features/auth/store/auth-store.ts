import { create } from "zustand"
import type { User } from "@/lib/types"

interface AuthStore {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,

  setAuth: (user, token) => {
    localStorage.setItem("auth_token", token)
    set({ user, token })
  },

  clearAuth: () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("refresh_token")
    set({ user: null, token: null })
  },

  isAuthenticated: () => {
    return !!get().token && !!get().user
  },
}))
