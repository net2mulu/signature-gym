"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { useTheme } from "next-themes"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: "lift" | "scale" | "glow" | "border" | "none"
}

export default function AnimatedCard({ children, className = "", hoverEffect = "lift" }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()
  const isLightMode = theme === "light"

  // Determine hover animations based on the effect type
  const getHoverAnimations = () => {
    switch (hoverEffect) {
      case "lift":
        return {
          whileHover: {
            y: -10,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          },
          transition: { type: "spring", stiffness: 400, damping: 17 },
        }
      case "scale":
        return {
          whileHover: { scale: 1.05 },
          transition: { type: "spring", stiffness: 400, damping: 17 },
        }
      case "glow":
        return {
          animate: {
            boxShadow: isHovered
              ? `0 0 25px 5px ${isLightMode ? "rgba(190, 166, 50, 0.3)" : "rgba(190, 166, 50, 0.2)"}`
              : "0 0 0 0 rgba(0, 0, 0, 0)",
          },
          transition: { duration: 0.3 },
        }
      case "border":
        return {
          animate: {
            borderColor: isHovered ? "#BEA632" : isLightMode ? "rgba(229, 231, 235, 1)" : "rgba(75, 85, 99, 1)",
            borderWidth: isHovered ? "2px" : "1px",
          },
          transition: { duration: 0.3 },
        }
      case "none":
      default:
        return {}
    }
  }

  const animations = getHoverAnimations()

  return (
    <motion.div
      className={className}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, ...animations.animate }}
      whileHover={animations.whileHover}
      transition={animations.transition}
    >
      {children}
    </motion.div>
  )
}
