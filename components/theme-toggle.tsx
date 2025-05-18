"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isLight = theme === "light"

  const toggleTheme = () => {
    setTheme(isLight ? "dark" : "light")
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 p-2 rounded-full shadow-md md:hidden transition-all duration-300 ${
        isLight ? "bg-white border border-signature-gold/30 text-signature-gold" : "bg-gray-800 text-gray-200"
      }`}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      {isLight ? <Moon size={20} /> : <Sun size={20} />}
    </motion.button>
  )
}

export function DesktopThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isLight = theme === "light"

  const toggleTheme = () => {
    setTheme(isLight ? "dark" : "light")
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ rotate: isLight ? -15 : 15 }}
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 ${
        isLight
          ? "bg-signature-gold/10 text-signature-gold hover:bg-signature-gold/20"
          : "bg-gray-700/30 text-white hover:bg-gray-700/50"
      }`}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      {isLight ? (
        <Moon size={18} className="transition-all duration-500" />
      ) : (
        <Sun size={18} className="transition-all duration-500" />
      )}
    </motion.button>
  )
}
