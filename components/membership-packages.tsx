"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import { motion, useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { Check } from "lucide-react"
// Add the import for useRouter at the top of the file
import { useRouter } from "next/navigation"

// Membership packages data
const packages = [
  {
    id: 2,
    duration: "3 Month",
    price: "$50",
    description: "Take your fitness to the next level with a short-term plan that offers consistency.",
    features: ["Full Gym Access"],
    bestValue: false,
    buttonText: "Choose Package",
  },
  {
    id: 3,
    duration: "6 Month",
    price: "$90",
    description:
      "Perfect for those committed to building a sustainable fitness routine with half a year of gym access.",
    features: ["Full Gym Access"],
    bestValue: true,
    buttonText: "Join Today",
  },
  {
    id: 4,
    duration: "12 Month",
    price: "$150",
    description: "Unlock a full year of unlimited access at the best value.",
    features: ["Full Gym Access"],
    bestValue: false,
    buttonText: "Choose Package",
  },
]

// Add custom border animation
const useCustomBorderAnimation = () => {
  useEffect(() => {
    if (typeof document !== "undefined") {
      const style = document.createElement("style")
      style.innerHTML = `
        @keyframes borderPulse {
          0% { border-color: rgba(190, 166, 50, 0.3); }
          50% { border-color: rgba(190, 166, 50, 1); }
          100% { border-color: rgba(190, 166, 50, 0.3); }
        }
        .border-pulse:hover {
          animation: borderPulse 1.5s infinite;
        }
      `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [])
}

// Update the MembershipPackages component to include the router
export default function MembershipPackages() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isMobile = useMobile()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const router = useRouter()

  useCustomBorderAnimation()

  // Handle mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Function to handle package selection
  const handlePackageSelect = () => {
    router.push("/payment")
  }

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
        {/* Description */}
        <div className="px-4 mb-6">
          <p className={`text-sm ${isLightMode ? "text-gray-700" : "text-gray-300"} leading-relaxed`}>
            Flexible membership options to fit your goals and schedule. Whether you're looking for a short-term
            commitment or a year-long journey, we've got a package that works for you.
          </p>
        </div>

        {/* Horizontal scrollable packages */}
        <div className="px-4 overflow-x-auto hide-scrollbar pb-4 flex justify-center">
          <div className="flex space-x-4">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`w-64 rounded-xl overflow-hidden shadow-md border-2 ${
                  pkg.bestValue
                    ? "bg-signature-gold text-gray-900 border-black hover:border-black"
                    : isLightMode
                      ? "bg-white text-gray-900 border-gray-200 hover:border-signature-gold border-pulse"
                      : "bg-gray-900 text-white border-gray-700 hover:border-signature-gold border-pulse"
                } transition-all duration-500 hover:scale-110 hover:shadow-xl active:scale-95 hover:z-10`}
              >
                {pkg.bestValue && (
                  <div className="bg-black text-white text-center py-1 text-xs font-bold">Best Value</div>
                )}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{pkg.duration}</h3>
                  <p
                    className={`text-sm mb-4 ${
                      pkg.bestValue ? "text-gray-800" : isLightMode ? "text-gray-700" : "text-gray-100"
                    }`}
                  >
                    {pkg.description}
                  </p>
                  <div className="border-t border-b py-4 my-4 border-opacity-20 border-gray-600">
                    <div className="text-4xl font-bold">{pkg.price}</div>
                    <div className="text-xs mt-1">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-center mt-2">
                          <Check size={14} className="mr-1" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Update the button in the mobile layout to use the handlePackageSelect function */}
                  {/* Find the button element in the mobile layout and replace it with: */}
                  <button
                    onClick={handlePackageSelect}
                    className={`w-full py-2 rounded-md font-bold text-sm transition-colors duration-300 ${
                      pkg.bestValue
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-signature-gold text-white hover:bg-signature-gold/90"
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
    <section ref={ref} className={`py-8 overflow-hidden ${isLightMode ? "bg-gray-50" : "bg-[#1D1D1D]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={itemVariants}
              className={`rounded-lg overflow-hidden shadow-lg relative border-2 ${
                pkg.bestValue
                  ? "bg-signature-gold text-gray-900 border-black hover:border-black"
                  : isLightMode
                    ? "bg-white text-gray-900 border-gray-200 hover:border-signature-gold border-pulse"
                    : "bg-[#1D1D1D]/90 text-white border-gray-700 hover:border-signature-gold border-pulse"
              } transition-all duration-500 hover:scale-110 hover:shadow-2xl cursor-pointer hover:z-10`}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {pkg.bestValue && (
                <div className="bg-black text-white text-center py-1 text-sm font-bold">Best Value</div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{pkg.duration}</h3>
                <p
                  className={`text-sm mb-6 min-h-[80px] ${
                    pkg.bestValue ? "text-gray-800" : isLightMode ? "text-gray-700" : "text-gray-100"
                  }`}
                >
                  {pkg.description}
                </p>
                <div className="border-t border-b py-6 my-6 border-opacity-20 border-gray-600">
                  <div className="text-5xl font-bold">{pkg.price}</div>
                  <div className="text-sm mt-4">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-center justify-center mt-2">
                        <Check size={16} className="mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Update the button in the desktop layout to use the handlePackageSelect function */}
                {/* Find the button element in the desktop layout and replace it with: */}
                <button
                  onClick={handlePackageSelect}
                  className={`w-full py-3 rounded-md font-bold transition-colors duration-300 ${
                    pkg.bestValue
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-signature-gold text-white hover:bg-signature-gold/90"
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
