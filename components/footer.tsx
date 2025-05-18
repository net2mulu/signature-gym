"use client"

import Link from "next/link"
import Image from "next/image"
import { Twitter, Facebook, Instagram } from "lucide-react"
import { TikTok } from "./icons/tiktok"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function Footer() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine if we're in light mode
  const isLightMode = mounted && theme === "light"

  return (
    <footer
      className={`py-12 px-4 md:px-8 mt-auto hidden md:block transition-all duration-300 ${
        isLightMode ? "bg-white border-t-4 border-signature-gold" : "bg-[#1D1D1D] border-t-4 border-signature-gold"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo Column */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/signature-logo.png"
              alt="Signature Fitness"
              width={100}
              height={100}
              className="w-24 h-24 mb-4"
            />
            {isLightMode && (
              <div className="mt-4 text-sm text-gray-600">
                <p>Elevate your fitness journey</p>
                <p>with Signature Fitness</p>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className={`text-lg font-semibold mb-4 ${isLightMode ? "text-gray-900" : "text-white"}`}>
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              {["Home", "Gym", "Classes", "Profile", "About Us"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`transition-colors ${
                    isLightMode ? "text-gray-700 hover:text-signature-gold" : "text-white hover:text-signature-gold"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Studios */}
          <div className="flex flex-col">
            <h3 className={`text-lg font-semibold mb-4 ${isLightMode ? "text-gray-900" : "text-white"}`}>Studios</h3>
            <nav className="flex flex-col space-y-2">
              {["Pilates", "Cycling", "Yoga", "Schedules", "Reservations"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`transition-colors ${
                    isLightMode ? "text-gray-700 hover:text-signature-gold" : "text-white hover:text-signature-gold"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Gym */}
          <div className="flex flex-col">
            <h3 className={`text-lg font-semibold mb-4 ${isLightMode ? "text-gray-900" : "text-white"}`}>Gym</h3>
            <nav className="flex flex-col space-y-2">
              {["Login", "Membership", "Reservation"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`transition-colors ${
                    isLightMode ? "text-gray-700 hover:text-signature-gold" : "text-white hover:text-signature-gold"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Profile & Social Media */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-4 ${isLightMode ? "text-gray-900" : "text-white"}`}>Profile</h3>
              <p className={`mb-2 ${isLightMode ? "text-gray-700" : "text-white"}`}>+251 900 11 2233</p>
              <p className={`mb-4 ${isLightMode ? "text-gray-700" : "text-white"}`}>info@signatureresidence.com</p>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isLightMode ? "text-gray-900" : "text-white"}`}>
                Social Media
              </h3>
              <div className="flex space-x-4">
                {[
                  { icon: Twitter, label: "Twitter", url: "https://twitter.com" },
                  { icon: TikTok, label: "TikTok", url: "https://tiktok.com" },
                  { icon: Instagram, label: "Instagram", url: "https://instagram.com" },
                  { icon: Facebook, label: "Facebook", url: "https://facebook.com" },
                ].map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full p-2 transition-all duration-300 ${
                        isLightMode
                          ? "bg-signature-gold/20 text-signature-gold hover:bg-signature-gold/30 hover:scale-110"
                          : "bg-white text-black hover:bg-gray-200"
                      }`}
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-12 pt-6 text-center md:text-left text-sm ${
            isLightMode ? "border-t border-signature-gold/20 text-gray-600" : "border-t border-gray-800 text-gray-400"
          }`}
        >
          <p>&copy; {new Date().getFullYear()} Signature Fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
