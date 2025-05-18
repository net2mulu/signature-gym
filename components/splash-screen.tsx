"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)
  const [mounted, setMounted] = useState(false)
  const isMobile = useMobile()
  const { resolvedTheme } = useTheme()

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Always show splash screen initially, even on desktop
    const timer = setTimeout(() => {
      setShowSplash(false)
      // Store that user has visited before
      if (typeof window !== "undefined") {
        localStorage.setItem("hasVisitedBefore", "true")
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [mounted])

  // Determine if dark mode is active
  const isDark = mounted && resolvedTheme === "dark"

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${
              isDark ? "bg-[#1D1D1D]" : "bg-white"
            }`}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-32 h-32 mb-6">
                <Image src="/signature-logo.png" alt="Signature Fitness" fill className="object-contain" priority />
              </div>

              <motion.h1
                className={`text-2xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Signature Fitness
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex space-x-2"
              >
                <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: showSplash ? 0 : 1 }} transition={{ duration: 0.5 }}>
        {children}
      </motion.div>
    </>
  )
}
