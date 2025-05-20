"use client"

import type React from "react"

import { motion } from "framer-motion"
import { type MouseEvent, useState } from "react"

interface InteractiveButtonProps {
  children: React.ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  className?: string
  variant?: "primary" | "secondary" | "outlined" | "text"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  ripple?: boolean
}

export default function InteractiveButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  icon,
  iconPosition = "left",
  ripple = true,
}: InteractiveButtonProps) {
  const [rippleStyle, setRippleStyle] = useState<{ left: string; top: string } | null>(null)
  const [isRippling, setIsRippling] = useState(false)

  // Get base styles based on variant
  const getBaseStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-signature-gold hover:bg-signature-gold/90 text-black"
      case "secondary":
        return "bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black"
      case "outlined":
        return "bg-transparent border-2 border-signature-gold text-signature-gold hover:bg-signature-gold/10"
      case "text":
        return "bg-transparent text-signature-gold hover:bg-signature-gold/10"
      default:
        return "bg-signature-gold hover:bg-signature-gold/90 text-black"
    }
  }

  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "text-xs py-2 px-3"
      case "md":
        return "text-sm py-3 px-5"
      case "lg":
        return "text-base py-4 px-6"
      default:
        return "text-sm py-3 px-5"
    }
  }

  const baseStyles = getBaseStyles()
  const sizeStyles = getSizeStyles()

  const handleRipple = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ripple) return

    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setRippleStyle({ left: `${x}px`, top: `${y}px` })
    setIsRippling(true)

    setTimeout(() => {
      setIsRippling(false)
    }, 500)
  }

  return (
    <motion.button
      onClick={(e) => {
        handleRipple(e)
        onClick && onClick(e)
      }}
      disabled={disabled}
      type={type}
      className={`relative overflow-hidden rounded-md font-bold transition-colors duration-300 ${baseStyles} ${sizeStyles} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <span className="relative z-10 flex items-center justify-center">
        {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      </span>

      {isRippling && rippleStyle && (
        <span
          className="absolute rounded-full bg-white/30 dark:bg-black/20 animate-ripple"
          style={{
            left: rippleStyle.left,
            top: rippleStyle.top,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </motion.button>
  )
}
