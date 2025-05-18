"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { Smartphone, QrCode, KeyRound, Menu } from "lucide-react"

// Access methods data
const accessMethods = [
  {
    id: "nfc",
    title: "NFC",
    icon: Smartphone,
    description: "Hold your device near the NFC tag",
    content: (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 1.5,
          }}
          className="w-24 h-24 rounded-full border-4 border-signature-gold flex items-center justify-center"
        >
          <Smartphone size={48} className="text-signature-gold" />
        </motion.div>
      </div>
    ),
  },
  {
    id: "qr",
    title: "QR",
    icon: QrCode,
    description: "Scan this QR code at the entrance",
    content: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="bg-white p-2 rounded-lg shadow-sm">
          <Image src="/signature-qr-code.png" alt="QR Code" width={100} height={100} className="w-24 h-24" />
        </div>
      </div>
    ),
  },
  {
    id: "pin",
    title: "PIN Code",
    icon: KeyRound,
    description: "Enter this PIN at the entrance",
    content: (
      <div className="relative w-full flex items-center justify-center py-2">
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((num, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="w-12 h-14 bg-white rounded-lg flex items-center justify-center text-2xl font-bold text-signature-gold"
            >
              {num}
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
]

export default function DigitalAccessSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isMobile = useMobile()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeMethod, setActiveMethod] = useState("nfc")

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

  const phoneVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.4 },
    },
  }

  // Mobile layout with app-like feel and phone mockup
  if (isMobile) {
    return (
      <section ref={ref} className={`px-0 pt-10 pb-16 overflow-hidden ${isLightMode ? "bg-gray-100" : "bg-black"}`}>
        {/* App-like header with sticky behavior */}
        <div className={`px-6 py-4 mb-8 ${isLightMode ? "bg-white" : "bg-[#1D1D1D]"}`}>
          <h2 className={`text-2xl font-bold ${isLightMode ? "text-gray-900" : "text-white"}`}>
            YOUR GYM <span className="text-signature-gold">ACCESS</span>
          </h2>
        </div>

        {/* Description */}
        <div className="px-6 mb-6">
          <p className={`text-base ${isLightMode ? "text-gray-700" : "text-gray-300"} leading-relaxed`}>
            NO MORE CARRYING PHYSICAL CARDS—YOUR GYM PASS IS NOW DIGITAL! WITH THE SIGNATURE FITNESS APP, MEMBERS CAN
            ACCESS THE GYM RIGHT FROM THEIR PHONE.
          </p>
        </div>

        {/* Phone mockup for mobile */}
        <div className="px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Phone mockup container */}
            <div
              className={`relative w-64 h-[500px] rounded-[30px] overflow-hidden border-[10px] ${
                isLightMode ? "border-gray-200" : "border-gray-800"
              } shadow-xl mx-auto`}
            >
              {/* Phone screen */}
              <div className="absolute inset-0 bg-black">
                {/* App header */}
                <div className="relative h-full">
                  <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center z-10">
                    <Image
                      src="/signature-logo.png"
                      alt="Signature Fitness"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                    <Menu size={18} className="text-white" />
                  </div>

                  {/* Background image with overlay */}
                  <div className="absolute inset-0 z-0">
                    <Image src="/gym-interior.jpg" alt="Gym interior" fill className="object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
                  </div>

                  {/* User profile */}
                  <div className="absolute top-12 left-0 right-0 flex flex-col items-center z-10">
                    <div className="w-20 h-20 rounded-full bg-white overflow-hidden border-2 border-signature-gold">
                      <Image
                        src="/user-avatar.jpg"
                        alt="User profile"
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-white text-lg font-bold mt-2">Alemayehu T</h3>
                    <p className="text-gray-400 text-xs">@alemayehuT</p>
                  </div>

                  {/* Access method tabs */}
                  <div className="absolute top-52 left-0 right-0 px-4 z-10">
                    <div className="flex bg-gray-800 rounded-lg p-1 mb-4">
                      {accessMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setActiveMethod(method.id)}
                          className={`flex-1 py-2 text-center rounded-md transition-colors text-xs ${
                            activeMethod === method.id ? "bg-signature-gold text-black font-medium" : "text-gray-400"
                          }`}
                        >
                          {method.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active method content */}
                  <div className="absolute top-56 left-0 right-0 bottom-0 flex flex-col items-center px-4 z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeMethod}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center w-full"
                      >
                        <h4 className="text-white text-sm font-medium mt-6 mb-2">Ready to Scan</h4>
                        <div className="h-32 flex items-center justify-center">
                          {accessMethods.find((m) => m.id === activeMethod)?.content}
                        </div>
                        <p className="text-gray-400 text-xs mt-2">
                          {accessMethods.find((m) => m.id === activeMethod)?.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions below phone */}
            <div className="mt-8 text-center max-w-xs">
              <p className={`text-sm ${isLightMode ? "text-gray-600" : "text-gray-400"}`}>
                Show this at the gym entrance for quick access
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  // Desktop layout
  return (
    <section ref={ref} className={`py-24 overflow-hidden ${isLightMode ? "bg-gray-100" : "bg-black"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="max-w-xl"
          >
            <motion.h2
              variants={itemVariants}
              className={`text-5xl font-bold ${isLightMode ? "text-gray-900" : "text-white"} tracking-tight leading-tight`}
            >
              <span className="text-signature-gold">YOUR GYM ACCESS,</span>
              <br />
              SIMPLIFIED
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className={`mt-6 ${isLightMode ? "text-gray-700" : "text-gray-300"} text-base leading-relaxed`}
            >
              NO MORE CARRYING PHYSICAL CARDS—YOUR GYM PASS IS NOW DIGITAL! WITH THE SIGNATURE FITNESS PROGRESSIVE WEB
              APP, MEMBERS CAN ACCESS THE GYM RIGHT FROM THEIR PHONE.
            </motion.p>

            {/* Access method tabs */}
            <motion.div variants={itemVariants} className="mt-12">
              <div className="flex space-x-4 mb-8">
                {accessMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <motion.button
                      key={method.id}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveMethod(method.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
                        activeMethod === method.id
                          ? isLightMode
                            ? "bg-white shadow-lg border border-signature-gold/30"
                            : "bg-gray-800"
                          : isLightMode
                            ? "bg-gray-200 hover:bg-gray-100"
                            : "bg-gray-900 hover:bg-gray-800"
                      }`}
                    >
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                          activeMethod === method.id ? "bg-signature-gold text-black" : "bg-gray-700 text-white"
                        }`}
                      >
                        <Icon size={24} />
                      </div>
                      <span className={`font-medium ${isLightMode ? "text-gray-900" : "text-white"}`}>
                        {method.title}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              {/* Active method content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMethod}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 rounded-lg ${isLightMode ? "bg-white shadow-lg" : "bg-gray-800"}`}
                >
                  <div className="h-48 flex items-center justify-center">
                    {accessMethods.find((m) => m.id === activeMethod)?.content}
                  </div>
                  <p className={`text-center mt-4 ${isLightMode ? "text-gray-700" : "text-gray-300"}`}>
                    {accessMethods.find((m) => m.id === activeMethod)?.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Right column - Phone mockup */}
          <motion.div
            variants={phoneVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="hidden lg:block"
          >
            <div
              className={`relative mx-auto w-72 h-[580px] rounded-[40px] overflow-hidden border-[14px] ${
                isLightMode ? "border-gray-200" : "border-gray-800"
              } shadow-2xl`}
            >
              {/* Phone screen */}
              <div className="absolute inset-0 bg-black">
                {/* App header */}
                <div className="relative h-full">
                  <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
                    <Image
                      src="/signature-logo.png"
                      alt="Signature Fitness"
                      width={30}
                      height={30}
                      className="h-8 w-8"
                    />
                    <Menu size={24} className="text-white" />
                  </div>

                  {/* Background image with overlay */}
                  <div className="absolute inset-0 z-0">
                    <Image src="/gym-interior.jpg" alt="Gym interior" fill className="object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
                  </div>

                  {/* User profile */}
                  <div className="absolute top-16 left-0 right-0 flex flex-col items-center z-10">
                    <div className="w-24 h-24 rounded-full bg-white overflow-hidden border-2 border-signature-gold">
                      <Image
                        src="/user-avatar.jpg"
                        alt="User profile"
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-white text-xl font-bold mt-3">Alemayehu T</h3>
                    <p className="text-gray-400 text-sm">@alemayehuT</p>
                  </div>

                  {/* Active method content - Removed tabs, adjusted positioning */}
                  <div className="absolute top-56 left-0 right-0 bottom-0 flex flex-col items-center px-6 z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeMethod}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center w-full"
                      >
                        <div className="inline-block px-4 py-1 bg-signature-gold rounded-full text-black text-sm font-medium mb-3">
                          {accessMethods.find((m) => m.id === activeMethod)?.title}
                        </div>
                        <h4 className="text-white text-sm font-medium mt-6 mb-2">Ready to Scan</h4>
                        <div className="h-36 flex items-center justify-center">
                          {accessMethods.find((m) => m.id === activeMethod)?.content}
                        </div>
                        <p className="text-gray-400 text-xs mt-2">
                          {accessMethods.find((m) => m.id === activeMethod)?.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
