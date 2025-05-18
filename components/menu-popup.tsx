"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface MenuPopupProps {
  isOpen: boolean
  onClose: () => void
  items: Array<{ name: string; href: string }>
  position: "left" | "center" | "right"
  isLightMode?: boolean
}

export default function MenuPopup({ isOpen, onClose, items, position, isLightMode = false }: MenuPopupProps) {
  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Determine horizontal position class
  const positionClass = {
    left: "left-0 ml-2",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0 mr-2",
  }[position]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - just for closing, nearly invisible */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50"
            onClick={onClose}
          />

          {/* Popup Menu */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className={`fixed bottom-20 ${positionClass} z-50 min-w-[160px] max-w-[200px] rounded-xl overflow-hidden shadow-lg ${
              isLightMode ? "shadow-[0_5px_15px_rgba(190,166,50,0.15)]" : ""
            }`}
          >
            <div
              className={`py-2 px-1 backdrop-blur-sm ${
                isLightMode ? "bg-white/95 border border-signature-gold/30" : "bg-[#1D1D1D]/95"
              } rounded-xl`}
            >
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isLightMode ? "text-gray-800 hover:bg-signature-gold/10" : "text-white hover:bg-gray-800/80"
                  }`}
                  onClick={onClose}
                >
                  <span className="text-sm font-medium">{item.name}</span>
                  <ChevronRight size={16} className={isLightMode ? "text-signature-gold" : "text-gray-500"} />
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
