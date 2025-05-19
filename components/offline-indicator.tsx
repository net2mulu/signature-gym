"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      // Show the indicator briefly when coming back online
      setShowIndicator(true)
      setTimeout(() => setShowIndicator(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowIndicator(true)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!showIndicator) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className={`fixed top-16 left-0 right-0 z-50 flex items-center justify-center`}
      >
        <div
          className={`px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg ${
            isOnline ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {isOnline ? (
            <>
              <Wifi size={16} />
              <span className="text-sm font-medium">Back online</span>
            </>
          ) : (
            <>
              <WifiOff size={16} />
              <span className="text-sm font-medium">You're offline</span>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
