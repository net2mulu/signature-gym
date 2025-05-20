// User types (for UI purpose only)
export interface User {
  id: string
  name: string
  email: string
  image?: string
  role: string
}

// Membership types (for UI display only)
export interface Membership {
  id: string
  name: string
  description: string
  price: number
  duration: number // in months
  features: string[]
  type: string
  accessHours: string
}

// Simplified payment types (for UI only)
export interface PaymentMethod {
  id: string
  name: string
  icon: string
}
