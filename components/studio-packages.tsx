"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import { motion, useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

// Package data
const studioPackages = [
  {
    id: "platinum",
    title: "PLATINUM",
    upfrontDeposit: "$2200",
    description: "Perfect for trying out our facilities or committing to a quick fitness boost.",
    bestValue: false,
    classPricing: [
      { class: "Pilates", price: "$12.60" },
      { class: "Yoga", price: "$9.90" },
      { class: "Group Fitness", price: "$9.90" },
      { class: "Spinning", price: "$9.90" },
    ],
  },
  {
    id: "gold",
    title: "GOLD",
    upfrontDeposit: "$1500",
    description: "Perfect for trying out our facilities or committing to a quick fitness boost.",
    bestValue: true,
    classPricing: [
      { class: "Pilates", price: "$14.00" },
      { class: "Yoga", price: "$11.00" },
      { class: "Group Fitness", price: "$11.00" },
      { class: "Spinning", price: "$11.00" },
    ],
  },
  {
    id: "silver",
    title: "SILVER",
    upfrontDeposit: "$900",
    description: "Perfect for trying out our facilities or committing to a quick fitness boost.",
    bestValue: false,
    classPricing: [
      { class: "Pilates", price: "$15.40" },
      { class: "Yoga", price: "$12.00" },
      { class: "Group Fitness", price: "$12.00" },
      { class: "Spinning", price: "$12.00" },
    ],
  },
]

export default function StudioPackages() {
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

  // Mobile layout with app-like feel
  if (isMobile) {
    return (
      <section ref={ref} className={`px-0 pt-6 pb-12 overflow-hidden ${isLightMode ? "bg-gray-50" : "bg-[#1D1D1D]"}`}>
        {/* App-like header with sticky behavior */}
        <div className={`px-4 py-3 mb-4 ${isLightMode ? "bg-white" : "bg-[#1D1D1D]"}`}>
          <h2 className={`text-xl font-bold ${isLightMode ? "text-gray-900" : "text-white"}`}>
            STUDIO <span className="text-signature-gold">PACKAGES</span>
          </h2>
        </div>

        {/* Description */}
        <div className="px-4 mb-6">
          <p className={`text-sm ${isLightMode ? "text-gray-700" : "text-gray-300"} leading-relaxed`}>
            Find the perfect balance of value and luxury with our Studio Packages. Choose your ideal membership and
            elevate your fitness experience.
          </p>
        </div>

        {/* Horizontal scrollable packages */}
        <div className="px-4 overflow-x-auto hide-scrollbar pb-4">
          <div className="flex space-x-4 min-w-max">
            {studioPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-72 overflow-hidden rounded-lg border border-signature-gold shadow-lg"
              >
                {pkg.bestValue && (
                  <div className="bg-signature-gold text-[#1D1D1D] text-center py-2 text-sm font-bold">BEST VALUE</div>
                )}
                <div className={`p-5 ${isLightMode ? "bg-white text-gray-900" : "bg-[#1D1D1D] text-white"}`}>
                  <h3 className="text-xl font-bold mb-2 text-signature-gold">{pkg.title}</h3>
                  <p className="text-sm mb-4 text-gray-600">{pkg.description}</p>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-600">Upfront Deposit</div>
                    <div className="text-4xl font-bold text-signature-gold my-2">{pkg.upfrontDeposit}</div>
                    <div className={`w-full h-px ${isLightMode ? "bg-gray-300" : "bg-gray-700"} my-4`}></div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">Pricing per Class</div>
                    {pkg.classPricing.map((pricing, i) => (
                      <div key={i} className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">{pricing.price}</span>
                        <span className="text-white">{pricing.class}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-300 mb-4">and more perks</div>

                  <button className="w-full py-3 bg-signature-gold text-[#1D1D1D] rounded font-bold hover:bg-signature-gold/90 transition-colors">
                    CHOOSE PACKAGE
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="px-4 mt-6">
          <p className={`text-xs ${isLightMode ? "text-gray-600" : "text-gray-400"}`}>
            *Class bookings are deducted from your upfront deposit.
          </p>
          <p className={`text-xs ${isLightMode ? "text-gray-600" : "text-gray-400"} mt-1`}>
            Not Sure what choose? Compare benefits of each membership tiers here.{" "}
            <Link href="/membership/compare" className="text-signature-gold hover:underline">
              Learn More
            </Link>
          </p>
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
            STUDIO PACKAGES
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className={`max-w-3xl mx-auto ${isLightMode ? "text-gray-700" : "text-gray-300"}`}
          >
            Find the perfect balance of value and luxury with our Studio Packages.
            <br />
            Choose your ideal membership and elevate your fitness experience.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {studioPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={itemVariants}
              className="rounded-lg overflow-hidden relative border border-signature-gold shadow-lg"
            >
              {pkg.bestValue && (
                <div className="bg-signature-gold text-[#1D1D1D] text-center py-2 text-sm font-bold">BEST VALUE</div>
              )}
              <div className={`p-6 ${isLightMode ? "bg-white text-gray-900" : "bg-[#1D1D1D] text-white"}`}>
                <h3 className="text-2xl font-bold mb-3 text-signature-gold">{pkg.title}</h3>
                <p className="text-sm mb-6 text-gray-600 min-h-[60px]">{pkg.description}</p>

                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-600">Upfront Deposit</div>
                  <div className="text-5xl font-bold text-signature-gold my-3">{pkg.upfrontDeposit}</div>
                  <div className={`w-full h-px ${isLightMode ? "bg-gray-300" : "bg-gray-700"} my-6`}></div>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-600 mb-3">Pricing per Class</div>
                  {pkg.classPricing.map((pricing, i) => (
                    <div key={i} className="flex justify-between text-sm mb-3">
                      <span className="text-gray-300">{pricing.price}</span>
                      <span className="text-white">{pricing.class}</span>
                    </div>
                  ))}
                </div>

                <div className="text-sm text-gray-300 mb-6">and more perks</div>

                <button className="w-full py-3 bg-signature-gold text-[#1D1D1D] rounded font-bold hover:bg-signature-gold/90 transition-colors">
                  CHOOSE PACKAGE
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className={`text-sm ${isLightMode ? "text-gray-600" : "text-gray-400"}`}>
            *Class bookings are deducted from your upfront deposit.
          </p>
          <p className={`text-sm ${isLightMode ? "text-gray-600" : "text-gray-400"} mt-2`}>
            Not Sure what choose? Compare benefits of each membership tiers here.{" "}
            <Link href="/membership/compare" className="text-signature-gold hover:underline">
              Learn More
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
