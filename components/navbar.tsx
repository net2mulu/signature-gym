"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Dumbbell, Activity, DollarSign, User, Download } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import MenuPopup from "./menu-popup"
import { DesktopThemeToggle } from "./theme-toggle"

// Add this before the Navbar component
// Extend the Window interface to include deferredPrompt
declare global {
  interface Window {
    deferredPrompt: any
  }
}

// Update the subMenus object to remove reservation and add profile
const subMenus = {
  gym: [
    { name: "Equipment", href: "/gym/equipment" },
    { name: "Free Weights", href: "/gym/free-weights" },
    { name: "Cardio Zone", href: "/gym/cardio" },
    { name: "Personal Training", href: "/gym/personal-training" },
    { name: "Fitness Assessment", href: "/gym/assessment" },
  ],
  studio: [
    { name: "Group Classes", href: "/studio/classes" },
    { name: "Yoga", href: "/studio/yoga" },
    { name: "Pilates", href: "/studio/pilates" },
    { name: "HIIT", href: "/studio/hiit" },
    { name: "Spinning", href: "/studio/spinning" },
  ],
  profile: [
    { name: "My Account", href: "/profile/account" },
    { name: "My Bookings", href: "/profile/bookings" },
    { name: "Settings", href: "/profile/settings" },
    { name: "Help", href: "/profile/help" },
  ],
  pricing: [
    { name: "Membership Plans", href: "/pricing/plans" },
    { name: "Day Passes", href: "/pricing/day-passes" },
    { name: "Class Packages", href: "/pricing/class-packages" },
    { name: "Corporate Plans", href: "/pricing/corporate" },
    { name: "Special Offers", href: "/pricing/offers" },
  ],
}

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Update the navItems array to remove Reservation and add Profile for mobile
  const navItems = [
    { name: "Gym", href: "/gym", icon: Dumbbell, key: "gym", position: "left" as const },
    { name: "Studio", href: "/studio", icon: Activity, key: "studio", position: "left" as const },
    { name: "Profile", href: "/profile", icon: User, key: "profile", position: "right" as const },
    { name: "Pricing", href: "/pricing", icon: DollarSign, key: "pricing", position: "right" as const },
  ]

  // Desktop navigation items (without Profile)
  const desktopNavItems = [
    { name: "Gym", href: "/gym" },
    { name: "Studio", href: "/studio" },
    { name: "Pricing", href: "/pricing" },
  ]

  // Add this inside the Navbar component, after the state declarations
  // Handle PWA installation
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      window.deferredPrompt = e
      console.log("Install prompt ready")
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener)
    }
  }, [])

  // Handle mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const handleMenuClick = (key: string) => {
    setActiveMenu(activeMenu === key ? null : key)
  }

  const closeMenu = () => {
    setActiveMenu(null)
  }

  // Function to handle PWA installation
  const handleInstallClick = () => {
    try {
      if (window.deferredPrompt) {
        // Show the install prompt
        window.deferredPrompt.prompt()

        // Wait for the user to respond to the prompt
        window.deferredPrompt.userChoice
          .then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
              console.log("User accepted the install prompt")
            } else {
              console.log("User dismissed the install prompt")
            }
            // Clear the saved prompt since it can't be used again
            window.deferredPrompt = null
          })
          .catch((err) => {
            console.error("Install prompt error:", err)
          })
      } else {
        console.log("Install prompt not available")
        // Fallback for iOS or when prompt isn't available
        alert("To install this app, add it to your home screen from your browser's menu")
      }
    } catch (error) {
      console.error("Error showing install prompt:", error)
    }
  }

  // Determine if we're in light mode
  const isLightMode = mounted && theme === "light"

  return (
    <>
      {/* Desktop navigation - floating rounded bar */}
      <div className="w-full fixed top-0 left-0 z-50 hidden md:block px-4 py-3">
        <nav
          className={`max-w-6xl mx-auto transition-all duration-500 ${
            scrolled
              ? isLightMode
                ? "bg-white/95 border-signature-gold shadow-[0_0_15px_rgba(190,166,50,0.15)]"
                : "bg-[#1D1D1D] border border-gray-800 shadow-lg"
              : isLightMode
                ? "bg-white/80 border-signature-gold/50 backdrop-blur-md"
                : "bg-[#1D1D1D]/70 border border-gray-800/50 backdrop-blur-md"
          } rounded-full px-6 ${isLightMode ? "border" : ""}`}
        >
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/signature-logo.png"
                    alt="Signature Fitness"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                  <span className={`ml-2 font-semibold text-lg ${isLightMode ? "text-gray-900" : "text-white"}`}>
                    Signature
                  </span>
                </Link>
              </div>
            </div>

            {/* Update the desktop navigation items rendering to use desktopNavItems */}
            <div className="flex items-center space-x-4">
              {desktopNavItems.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`transition-colors duration-200 text-sm font-medium relative ${
                      isActive
                        ? isLightMode
                          ? "text-signature-gold font-semibold"
                          : "text-signature-gold font-semibold"
                        : isLightMode
                          ? "text-gray-700 hover:text-signature-gold"
                          : "text-gray-300 hover:text-signature-gold"
                    } ${isActive ? "after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-signature-gold" : ""}`}
                  >
                    {item.name}
                  </Link>
                )
              })}

              <Link
                href="/login"
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  isLightMode
                    ? "bg-signature-gold hover:bg-signature-gold/90 text-white shadow-md hover:shadow-lg"
                    : "bg-signature-gold hover:bg-signature-gold/90 text-white"
                }`}
              >
                Login
              </Link>
              <div className="flex items-center justify-center">
                <DesktopThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile header - with logo on the left and install button on right */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 md:hidden transition-all duration-300 ${
          isLightMode ? "bg-white border-b border-signature-gold/30" : "bg-[#1D1D1D] border-b border-gray-800"
        }`}
      >
        <Link href="/" className="flex items-center">
          <Image src="/signature-logo.png" alt="Signature Fitness" width={36} height={36} className="h-9 w-9" />
          <span className={`ml-2 font-semibold text-lg ${isLightMode ? "text-gray-900" : "text-white"}`}>
            Signature
          </span>
        </Link>
      </div>

      {/* Mobile bottom navigation - app style with centered logo */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
          isLightMode
            ? "bg-white border-t border-signature-gold/30 shadow-[0_-2px_10px_rgba(190,166,50,0.1)]"
            : "bg-[#1D1D1D] border-t border-gray-800"
        }`}
      >
        <div className="grid grid-cols-4 h-16 relative">
          {/* Navigation items */}
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  isActive
                    ? "text-signature-gold font-semibold"
                    : isLightMode
                      ? "text-gray-600 hover:text-gray-900"
                      : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "fill-current" : ""}`} />
                <span className="text-xs">{item.name}</span>
                {isActive && <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-signature-gold"></div>}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Keep the center logo as a home button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[51] md:hidden">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center ${
            pathname === "/"
              ? isLightMode
                ? "text-signature-gold"
                : "text-signature-gold"
              : isLightMode
                ? "text-gray-600"
                : "text-gray-400"
          }`}
        >
          <div
            className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
              isLightMode ? "bg-white border-2 border-signature-gold/50" : "bg-[#1D1D1D] border-2 border-gray-800"
            }`}
          >
            <Image src="/signature-logo.png" alt="Signature Fitness" width={30} height={30} className="w-8 h-8" />
          </div>
        </Link>
      </div>

      {/* Add a floating action button for PWA installation */}
      <button
        onClick={handleInstallClick}
        className={`fixed bottom-20 right-4 z-50 p-3 rounded-full shadow-lg md:hidden transition-all duration-300 ${
          isLightMode
            ? "bg-signature-gold hover:bg-signature-gold/90 text-white"
            : "bg-signature-gold hover:bg-signature-gold/90 text-white"
        }`}
        aria-label="Install App"
      >
        <Download className="h-6 w-6" />
      </button>

      {/* Menu popups for each navigation item */}
      {navItems.map((item) => (
        <MenuPopup
          key={item.key}
          isOpen={activeMenu === item.key}
          onClose={closeMenu}
          items={subMenus[item.key as keyof typeof subMenus]}
          position={item.position}
          isLightMode={isLightMode}
        />
      ))}
    </>
  )
}
