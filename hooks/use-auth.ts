"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

// Simplified auth hook that provides UI functionality without backend integration
export function useAuth() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true)
      setError(null)

      // Simulate authentication (no actual backend call)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, allow any login
      router.push("/")
      return true
    } catch (err) {
      setError("An error occurred during login")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (credentials: { name: string; email: string; password: string }) => {
    try {
      setIsLoading(true)
      setError(null)

      // Simulate registration (no actual backend call)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/payment")
      return true
    } catch (err) {
      setError("An error occurred during registration")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    // Simulate logout
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push("/")
  }

  return {
    user: null, // No actual user data
    isAuthenticated: false, // Always false in UI-only mode
    isLoading,
    error,
    login,
    register,
    logout,
  }
}
