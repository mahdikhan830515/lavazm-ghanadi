import { create } from 'zustand'

interface User {
  id: string
  phoneNumber: string
  firstName?: string
  lastName?: string
  email?: string
  role: 'USER' | 'ADMIN'
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setIsLoading: (isLoading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, token: null }),
}))
