"use client"

import { useState, useEffect } from "react"
import { Download, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const isMobile = useMobile()
  const { theme } = useTheme()
  const isLightMode = theme === "light"

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true) {
      setIsInstalled(true)
      return
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(isIOSDevice)

    // For browsers that support beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent browsers from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      setIsInstallable(true)
      console.log("Install prompt captured and ready")
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener)

    // For iOS, we'll consider it "installable" even though we can't detect it directly
    if (isIOSDevice) {
      setIsInstallable(true)
    }

    // Always set installable to true for testing purposes
    setIsInstallable(true)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener)
    }
  }, [])

  const handleInstallClick = async () => {
    console.log("Install button clicked")

    // For browsers with native install prompt
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt()

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice
      console.log(`User ${outcome === "accepted" ? "accepted" : "dismissed"} the install prompt`)

      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null)

      if (outcome === "accepted") {
        setIsInstallable(false)
      }
    } else {
      // For iOS or when deferredPrompt is not available
      alert(
        isIOS
          ? "To install this app on iOS: tap the share button, then 'Add to Home Screen'"
          : "To install, look for 'Install App' or '+' in your browser's address bar or menu",
      )
    }
  }

  // Don't show if already installed
  if (isInstalled) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className={`fixed ${isMobile ? "bottom-24" : "bottom-8"} left-1/2 transform -translate-x-1/2 z-50 ${
        isLightMode ? "bg-white border border-signature-gold/30 shadow-lg" : "bg-[#1D1D1D] border border-gray-700"
      } rounded-lg px-4 py-3 flex items-center space-x-3`}
    >
      <div className="flex-shrink-0">
        {isIOS ? (
          <Share2 className="h-6 w-6 text-signature-gold" />
        ) : (
          <Download className="h-6 w-6 text-signature-gold" />
        )}
      </div>
      <div>
        <p className={`text-sm font-medium ${isLightMode ? "text-gray-900" : "text-white"}`}>
          Install Signature Fitness
        </p>
        <p className={`text-xs ${isLightMode ? "text-gray-600" : "text-gray-300"}`}>Get the full app experience</p>
      </div>
      <button
        onClick={handleInstallClick}
        className="ml-2 px-3 py-1.5 bg-signature-gold text-black text-sm font-medium rounded-md"
      >
        {isIOS ? "Add to Home" : "Install"}
      </button>
    </motion.div>
  )
}
