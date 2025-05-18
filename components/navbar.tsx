"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Dumbbell, Video, Calendar, DollarSign, User } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import MenuPopup from "./menu-popup"
import { DesktopThemeToggle } from "./theme-toggle"

// Define submenu items for each main navigation item
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
  reservation: [
    { name: "Book a Class", href: "/reservation/class" },
    { name: "Book Equipment", href: "/reservation/equipment" },
    { name: "Personal Trainer", href: "/reservation/trainer" },
    { name: "My Bookings", href: "/reservation/my-bookings" },
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

  const navItems = [
    { name: "Gym", href: "/gym", icon: Dumbbell, key: "gym", position: "left" as const },
    { name: "Studio", href: "/studio", icon: Video, key: "studio", position: "left" as const },
    { name: "Reservation", href: "/reservation", icon: Calendar, key: "reservation", position: "right" as const },
    { name: "Pricing", href: "/pricing", icon: DollarSign, key: "pricing", position: "right" as const },
  ]

  const handleMenuClick = (key: string) => {
    setActiveMenu(activeMenu === key ? null : key)
  }

  const closeMenu = () => {
    setActiveMenu(null)
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
                : "bg-[#1D1D1D] shadow-lg"
              : isLightMode
                ? "bg-white/80 border-signature-gold/50 backdrop-blur-md"
                : "bg-[#1D1D1D]/70 backdrop-blur-md"
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

            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-200 text-sm font-medium ${
                    isLightMode ? "text-gray-700 hover:text-signature-gold" : "text-gray-300 hover:text-signature-gold"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
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

      {/* Mobile header - with logo on the left */}
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

        {/* Right side placeholder for balance (theme toggle is positioned absolutely) */}
        <div className="w-9 h-9"></div>
      </div>

      {/* Mobile bottom navigation - app style with centered logo */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
          isLightMode
            ? "bg-white border-t border-signature-gold/30 shadow-[0_-2px_10px_rgba(190,166,50,0.1)]"
            : "bg-[#1D1D1D] border-t border-gray-800"
        }`}
      >
        <div className="grid grid-cols-5 h-16 relative">
          {/* First two navigation items */}
          {navItems.slice(0, 2).map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href) || activeMenu === item.key

            return (
              <button
                key={item.key}
                onClick={() => handleMenuClick(item.key)}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  isActive
                    ? isLightMode
                      ? "text-signature-gold"
                      : "text-signature-gold"
                    : isLightMode
                      ? "text-gray-600 hover:text-gray-900"
                      : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.name}</span>
              </button>
            )
          })}

          {/* Center logo as home button */}
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
              className={`relative w-12 h-12 -mt-6 rounded-full flex items-center justify-center shadow-lg ${
                isLightMode ? "bg-white border-2 border-signature-gold/50" : "bg-[#1D1D1D] border-2 border-gray-800"
              }`}
            >
              <Image src="/signature-logo.png" alt="Signature Fitness" width={30} height={30} className="w-8 h-8" />
            </div>
            <span className="text-xs mt-1">Home</span>
          </Link>

          {/* Last two navigation items */}
          {navItems.slice(2, 4).map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href) || activeMenu === item.key

            return (
              <button
                key={item.key}
                onClick={() => handleMenuClick(item.key)}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  isActive
                    ? isLightMode
                      ? "text-signature-gold"
                      : "text-signature-gold"
                    : isLightMode
                      ? "text-gray-600 hover:text-gray-900"
                      : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.name}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Login button for mobile - fixed to bottom right */}
      <Link
        href="/login"
        className={`fixed bottom-20 right-4 z-50 p-3 rounded-full shadow-lg md:hidden transition-all duration-300 ${
          isLightMode
            ? "bg-signature-gold hover:bg-signature-gold/90 text-white"
            : "bg-signature-gold hover:bg-signature-gold/90 text-white"
        }`}
        aria-label="Login"
      >
        <User className="h-6 w-6" />
      </Link>

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
