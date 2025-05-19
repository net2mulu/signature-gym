"use client"

import { useState, useEffect } from "react"
import { Download, Share2, X, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

export default function PWAInstallButton({ variant = "default" }: { variant?: "default" | "desktop" | "mobile" }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(true) // Set to true by default for testing
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isMacOS, setIsMacOS] = useState(false)
  const [browserInfo, setBrowserInfo] = useState({
    name: "",
    isChrome: false,
    isFirefox: false,
    isSafari: false,
    isEdge: false,
  })
  const [showInstructions, setShowInstructions] = useState(false)
  const [installAttempted, setInstallAttempted] = useState(false)
  const isMobileView = useMobile()

  useEffect(() => {
    if (typeof window === "undefined") return

    console.log("PWAInstallButton mounted, variant:", variant)

    // Check if the app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true) {
      console.log("App is already installed")
      setIsInstalled(true)
      return
    }

    // Detect platform and browser
    const userAgent = navigator.userAgent.toLowerCase()
    const isIOSDevice = /ipad|iphone|ipod/.test(userAgent) && !(window as any).MSStream
    const isMacOSDevice = /macintosh/.test(userAgent) && navigator.maxTouchPoints > 1
    const isChromeBrowser = /chrome/.test(userAgent) && !/edg/.test(userAgent)
    const isFirefoxBrowser = /firefox/.test(userAgent)
    const isSafariBrowser = /safari/.test(userAgent) && !/chrome/.test(userAgent)
    const isEdgeBrowser = /edg/.test(userAgent)

    console.log("Device detection:", {
      isIOSDevice,
      isMacOSDevice,
      isChromeBrowser,
      isFirefoxBrowser,
      isSafariBrowser,
      isEdgeBrowser,
    })

    setIsIOS(isIOSDevice)
    setIsMacOS(isMacOSDevice)
    setBrowserInfo({
      name: isChromeBrowser
        ? "Chrome"
        : isFirefoxBrowser
          ? "Firefox"
          : isSafariBrowser
            ? "Safari"
            : isEdgeBrowser
              ? "Edge"
              : "Other",
      isChrome: isChromeBrowser,
      isFirefox: isFirefoxBrowser,
      isSafari: isSafariBrowser,
      isEdge: isEdgeBrowser,
    })

    // For browsers that support beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent browsers from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      console.log("beforeinstallprompt event captured")
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    const handleAppInstalled = () => {
      console.log("App installed event fired")
      setIsInstallable(false)
      setIsInstalled(true)
      setDeferredPrompt(null)
      setShowInstructions(false)

      // Show success message
      showInstallSuccess()

      // Store in localStorage that the app has been installed
      localStorage.setItem("pwaInstalled", "true")
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener)
    window.addEventListener("appinstalled", handleAppInstalled)

    // For iOS/Safari, we'll consider it "installable" even though we can't detect it directly
    if (isIOSDevice || (isMacOSDevice && isSafariBrowser)) {
      console.log("iOS/Safari detected, setting installable to true")
      setIsInstallable(true)
    }

    // Check localStorage to see if the user has previously installed the app
    const previouslyInstalled = localStorage.getItem("pwaInstalled") === "true"
    if (previouslyInstalled) {
      console.log("App was previously installed according to localStorage")
      setIsInstalled(true)
    }

    // Always set installable to true for testing
    setIsInstallable(true)
    console.log("Setting isInstallable to true for testing")

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [variant])

  const handleInstallClick = async () => {
    console.log("Install button clicked")

    // For iOS/Safari, show instructions
    if (isIOS || (isMacOS && browserInfo.isSafari)) {
      console.log("Showing iOS/Safari instructions")
      setShowInstructions(true)
      setInstallAttempted(true)
      return
    }

    // For browsers with native install prompt
    if (deferredPrompt) {
      console.log("Triggering native install prompt")
      setInstallAttempted(true)

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
      console.log("No deferred prompt available, showing alert")
      // Fallback for when the deferred prompt isn't available
      alert("To install this app, look for 'Install' or 'Add to Home Screen' in your browser's menu")
    }
  }

  const closeInstructions = () => {
    setShowInstructions(false)
  }

  const showInstallSuccess = () => {
    // Create a temporary success message
    const successMessage = document.createElement("div")
    successMessage.className =
      "fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-signature-gold text-black py-2 px-4 rounded-full shadow-lg flex items-center"
    successMessage.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="mr-2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>App installed successfully!</span>
    `
    document.body.appendChild(successMessage)

    // Remove after 3 seconds
    setTimeout(() => {
      document.body.removeChild(successMessage)
    }, 3000)
  }

  // For debugging, log the component state
  console.log("PWAInstallButton render state:", {
    isInstallable,
    isInstalled,
    variant,
    isMobileView,
    showDesktopVariant: variant === "desktop" || (!isMobileView && variant === "default"),
    showMobileVariant: variant === "mobile" || (isMobileView && variant === "default"),
  })

  // Don't hide for testing purposes
  // if (isInstalled) {
  //   return null
  // }

  // // Don't hide for testing purposes
  // if (!isInstallable) {
  //   return null
  // }

  // Determine which variant to show based on props and viewport
  const showDesktopVariant = variant === "desktop" || (!isMobileView && variant === "default")
  const showMobileVariant = variant === "mobile" || (isMobileView && variant === "default")

  // Desktop button variant
  if (showDesktopVariant) {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="flex items-center space-x-1 py-2 px-4 rounded-full text-sm font-medium bg-signature-gold text-black hover:bg-signature-gold/90 transition-colors shadow-sm"
          aria-label="Install App"
        >
          {isIOS || (isMacOS && browserInfo.isSafari) ? (
            <>
              <Share2 className="h-4 w-4 mr-1" />
              <span>Add to Home</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-1" />
              <span>Install App</span>
            </>
          )}
        </button>

        {/* Instructions Modal */}
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
              onClick={closeInstructions}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#1D1D1D] rounded-xl max-w-md w-full shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 bg-signature-gold flex justify-between items-center">
                  <h3 className="text-black font-bold text-lg">
                    {isIOS ? "Install on iOS" : isMacOS ? "Install on macOS" : "Install App"}
                  </h3>
                  <button onClick={closeInstructions} className="p-1 rounded-full bg-black/20">
                    <X size={20} className="text-black" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <Image src="/signature-logo.png" alt="Signature Fitness" width={64} height={64} className="mb-2" />
                    <p className="text-white text-center">Install Signature Fitness for the best experience</p>
                  </div>

                  {/* iOS/Safari Instructions */}
                  {(isIOS || (isMacOS && browserInfo.isSafari)) && (
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-signature-gold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-black font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-white mb-2">Tap the share button</p>
                          <div className="bg-gray-800 rounded-lg p-3 flex items-center">
                            <Share2 size={24} className="text-white" />
                            <span className="ml-2 text-gray-300">Tap this button in Safari</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-signature-gold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-black font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-white mb-2">Scroll and tap "Add to Home Screen"</p>
                          <div className="bg-gray-800 rounded-lg p-3 flex items-center">
                            <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs">+</span>
                            </div>
                            <span className="ml-2 text-gray-300">Add to Home Screen</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-signature-gold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-black font-bold">3</span>
                        </div>
                        <p className="text-white">Tap "Add" in the top right corner</p>
                      </div>
                    </div>
                  )}

                  {/* Chrome/Edge/Firefox Instructions */}
                  {!isIOS && !isMacOS && (browserInfo.isChrome || browserInfo.isEdge || browserInfo.isFirefox) && (
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-signature-gold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-black font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-white mb-2">Click the install button in the address bar</p>
                          <div className="bg-gray-800 rounded-lg p-3 flex items-center">
                            <Download size={24} className="text-white" />
                            <span className="ml-2 text-gray-300">Look for this icon in {browserInfo.name}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-signature-gold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-black font-bold">2</span>
                        </div>
                        <p className="text-white">Click "Install" in the prompt that appears</p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={closeInstructions}
                    className="w-full mt-6 py-3 bg-signature-gold text-black rounded-lg font-medium flex items-center justify-center"
                  >
                    Got it <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Mobile button variant
  if (showMobileVariant) {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="flex items-center space-x-1 py-1.5 px-3 rounded-full text-sm font-medium bg-signature-gold text-black shadow-sm"
          aria-label="Install App"
        >
          {isIOS ? (
            <>
              <Share2 className="h-4 w-4 mr-1" />
              <span>Add to Home</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-1" />
              <span>Install</span>
            </>
          )}
        </button>

        {/* iOS Instructions Modal */}
        <AnimatePresence>
          {showInstructions && isIOS && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
              onClick={closeInstructions}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#1D1D1D] rounded-xl max-w-sm w-full shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 bg-signature-gold flex justify-between items-center">
                  <h3 className="text-black font-bold text-lg">Install on iOS</h3>
                  <button onClick={closeInstructions} className="p-1 rounded-full bg-black/20">
                    <X size={20} className="text-black" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <Image src="/signature-logo.png" alt="Signature Fitness" width={64} height={64} className="mb-2" />
                    <p className="text-white text-center">
                      Install Signature Fitness on your home screen for the best experience
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-signature-gold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-black font-bold">1</span>
                      </div>
                      <div>
                        <p className="text-white mb-2">Tap the share button</p>
                        <div className="bg-gray-800 rounded-lg p-3 flex items-center">
                          <Share2 size={24} className="text-white" />
                          <span className="ml-2 text-gray-300">Tap this button in Safari</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-signature-gold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-black font-bold">2</span>
                      </div>
                      <div>
                        <p className="text-white mb-2">Scroll and tap "Add to Home Screen"</p>
                        <div className="bg-gray-800 rounded-lg p-3 flex items-center">
                          <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs">+</span>
                          </div>
                          <span className="ml-2 text-gray-300">Add to Home Screen</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-signature-gold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-black font-bold">3</span>
                      </div>
                      <p className="text-white">Tap "Add" in the top right corner</p>
                    </div>
                  </div>

                  <button
                    onClick={closeInstructions}
                    className="w-full mt-6 py-3 bg-signature-gold text-black rounded-lg font-medium flex items-center justify-center"
                  >
                    Got it <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Fallback for testing - always show a button
  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center space-x-1 py-1.5 px-3 rounded-full text-sm font-medium bg-signature-gold text-black shadow-sm"
      aria-label="Install App"
    >
      <Download className="h-4 w-4 mr-1" />
      <span>Install (Fallback)</span>
    </button>
  )
}
