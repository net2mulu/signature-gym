"use client"

import type { ReactNode } from "react"

// Simplified auth provider that just passes through children
// No actual authentication functionality, just UI placeholders
interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return <>{children}</>
}
