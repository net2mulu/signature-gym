"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import { motion, useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { Check } from "lucide-react"

export default function MembershipPackages() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isMobile = useMobile()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Handle mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine if we're in light mode
  const isLightMode = mounted && theme === "light"

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  // Membership packages data
  const packages = [
    {
      id: 1,
      duration: "1 MONTH",
      price: "$35",
      description: "Perfect for trying out our facilities or committing to a quick fitness boost.",
      features: ["FULL GYM ACCESS"],
      bestValue: false,
      buttonText: "CHOOSE PACKAGE",
    },
    {
      id: 2,
      duration: "3 MONTH",
      price: "$50",
      description: "Take your fitness to the next level with a short-term plan that offers consistency.",
      features: ["FULL GYM ACCESS"],
      bestValue: false,
      buttonText: "CHOOSE PACKAGE",
    },
    {
      id: 3,
      duration: "6 MONTH",
      price: "$90",
      description:
        "Perfect for those committed to building a sustainable fitness routine with half a year of gym access.",
      features: ["FULL GYM ACCESS"],
      bestValue: true,
      buttonText: "JOIN TODAY",
    },
    {
      id: 4,
      duration: "12 MONTH",
      price: "$150",
      description: "Unlock a full year of unlimited access at the best value.",
      features: ["FULL GYM ACCESS"],
      bestValue: false,
      buttonText: "CHOOSE PACKAGE",
    },
  ]

  // Mobile layout with app-like feel
  if (isMobile) {
    return (
      <section ref={ref} className={`px-0 pt-6 pb-12 overflow-hidden ${isLightMode ? "bg-gray-50" : "bg-[#1D1D1D]"}`}>
        {/* App-like header with sticky behavior */}
        <div className={`px-4 py-3 mb-4 ${isLightMode ? "bg-white" : "bg-[#1D1D1D]"}`}>
          <h2 className={`text-xl font-bold ${isLightMode ? "text-gray-900" : "text-white"}`}>
            MEMBERSHIP <span className="text-signature-gold">PACKAGES</span>
          </h2>
        </div>

        {/* Description */}
        <div className="px-4 mb-6">
          <p className={`text-sm ${isLightMode ? "text-gray-700" : "text-gray-300"} leading-relaxed`}>
            FLEXIBLE MEMBERSHIP OPTIONS TO FIT YOUR GOALS AND SCHEDULE. WHETHER YOU'RE LOOKING FOR A SHORT-TERM
            COMMITMENT OR A YEAR-LONG JOURNEY, WE'VE GOT A PACKAGE THAT WORKS FOR YOU.
          </p>
        </div>

        {/* Horizontal scrollable packages */}
        <div className="px-4 overflow-x-auto hide-scrollbar pb-4">
          <div className="flex space-x-4 min-w-max">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`w-64 rounded-xl overflow-hidden shadow-md ${
                  pkg.bestValue
                    ? "bg-signature-gold text-gray-900"
                    : isLightMode
                      ? "bg-white text-gray-900"
                      : "bg-gray-900 text-white"
                }`}
              >
                {pkg.bestValue && (
                  <div className="bg-black text-white text-center py-1 text-xs font-bold">BEST VALUE</div>
                )}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{pkg.duration}</h3>
                  <p
                    className={`text-sm mb-4 ${
                      pkg.bestValue ? "text-gray-800" : isLightMode ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {pkg.description}
                  </p>
                  <div className="border-t border-b py-4 my-4 border-opacity-20 border-gray-600">
                    <div className="text-4xl font-bold">{pkg.price}</div>
                    <div className="text-xs mt-1 uppercase">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-center mt-2">
                          <Check size={14} className="mr-1" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    className={`w-full py-2 rounded-md font-bold text-sm ${
                      pkg.bestValue ? "bg-black text-white" : "bg-signature-gold text-white"
                    }`}
                  >
                    {pkg.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Desktop layout
  return (
    <section ref={ref} className={`py-24 overflow-hidden ${isLightMode ? "bg-gray-50" : "bg-[#1D1D1D]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-4xl font-bold mb-6 ${isLightMode ? "text-gray-900" : "text-white"}`}
          >
            MEMBERSHIP PACKAGES
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className={`max-w-3xl mx-auto ${isLightMode ? "text-gray-700" : "text-gray-300"}`}
          >
            FLEXIBLE MEMBERSHIP OPTIONS TO FIT YOUR GOALS AND SCHEDULE. WHETHER YOU'RE LOOKING FOR A SHORT-TERM
            COMMITMENT OR A YEAR-LONG JOURNEY, WE'VE GOT A PACKAGE THAT WORKS FOR YOU.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={itemVariants}
              className={`rounded-lg overflow-hidden shadow-lg relative ${
                pkg.bestValue
                  ? "bg-signature-gold text-gray-900"
                  : isLightMode
                    ? "bg-white text-gray-900"
                    : "bg-[#1D1D1D]/90 text-white"
              }`}
            >
              {pkg.bestValue && (
                <div className="bg-black text-white text-center py-1 text-sm font-bold">BEST VALUE</div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{pkg.duration}</h3>
                <p
                  className={`text-sm mb-6 min-h-[80px] ${
                    pkg.bestValue ? "text-gray-800" : isLightMode ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {pkg.description}
                </p>
                <div className="border-t border-b py-6 my-6 border-opacity-20 border-gray-600">
                  <div className="text-5xl font-bold">{pkg.price}</div>
                  <div className="text-sm mt-4 uppercase">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-center justify-center mt-2">
                        <Check size={16} className="mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className={`w-full py-3 rounded-md font-bold ${
                    pkg.bestValue ? "bg-black text-white" : "bg-signature-gold text-white"
                  }`}
                >
                  {pkg.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
