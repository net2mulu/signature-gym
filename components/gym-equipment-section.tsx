"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion, useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function GymEquipmentSection() {
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
      <section ref={ref} className="px-0 pt-6 pb-12 overflow-hidden">
        {/* App-like header with sticky behavior */}
        <div className={`px-4 py-3 mb-4 ${isLightMode ? "bg-white" : "bg-[#1D1D1D]"}`}>
          <h2 className={`text-xl font-bold ${isLightMode ? "text-gray-900" : "text-white"}`}>
            SIGNATURE <span className="text-signature-gold">GYM</span>
          </h2>
        </div>

        {/* Full-width image */}
        <div className="relative w-full h-56 mb-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qc2cfrOMEjtkPeVXAueaDnqjt7qUc2.png"
            alt="Signature Gym Equipment"
            fill
            className="object-cover"
          />
          <div
            className={`absolute inset-0 ${
              isLightMode
                ? "bg-gradient-to-r from-black/60 to-transparent"
                : "bg-gradient-to-r from-black/60 to-transparent"
            }`}
          />
        </div>

        {/* App-like content cards */}
        <div className="px-4">
          {/* Description card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded-xl mb-6 backdrop-blur-md ${
              isLightMode
                ? "bg-white/40 border border-white/50 shadow-sm text-gray-800"
                : "bg-[#1D1D1D]/40 border border-gray-700/50 text-white"
            }`}
          >
            <p className="text-sm leading-relaxed">
              FROM HIGH-PERFORMANCE STRENGTH EQUIPMENT TO CARDIO MACHINES AND FREE WEIGHTS, OUR GYM IS DESIGNED TO HELP
              YOU TRAIN THE WAY YOU WANT.
            </p>
          </motion.div>

          {/* CTA button - App style */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <Link
              href="/gym"
              className={`w-full py-3.5 rounded-xl flex items-center justify-center font-medium text-sm backdrop-blur-sm text-white shadow-md ${
                isLightMode
                  ? "bg-signature-gold/90 hover:bg-signature-gold border border-signature-gold/30"
                  : "bg-signature-gold/90 hover:bg-signature-gold border border-signature-gold/20"
              }`}
            >
              GET STARTED
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    )
  }

  // Desktop layout
  return (
    <section ref={ref} className={`py-24 overflow-hidden ${isLightMode ? "bg-gray-100" : "bg-[#1D1D1D]/50"}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative h-[600px]"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qc2cfrOMEjtkPeVXAueaDnqjt7qUc2.png"
              alt="Signature Gym Equipment"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-10 flex items-center">
            <div
              className={`max-w-xl ml-8 md:ml-16 lg:ml-24 p-8 md:p-12 backdrop-blur-md rounded-lg shadow-xl ${
                isLightMode
                  ? "bg-white/20 border border-white/30 text-gray-900"
                  : "bg-black/40 border border-gray-700/30 text-white"
              }`}
            >
              <motion.h2
                variants={itemVariants}
                className={`text-4xl md:text-5xl font-bold tracking-tight leading-tight ${
                  isLightMode ? "text-gray-900" : "text-white"
                }`}
              >
                SIGNATURE
                <br />
                <span className="text-signature-gold">GYM</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className={`mt-6 text-base md:text-lg leading-relaxed ${
                  isLightMode ? "text-gray-800" : "text-gray-300"
                }`}
              >
                FROM HIGH-PERFORMANCE STRENGTH EQUIPMENT TO CARDIO MACHINES AND FREE WEIGHTS, OUR GYM IS DESIGNED TO
                HELP YOU TRAIN THE WAY YOU WANT.
              </motion.p>
              <motion.div variants={itemVariants} className="mt-8">
                <Link
                  href="/gym"
                  className={`inline-flex items-center px-8 py-3 text-white font-bold rounded-md transition-colors duration-300 shadow-md backdrop-blur-sm ${
                    isLightMode
                      ? "bg-signature-gold/90 hover:bg-signature-gold border border-signature-gold/30"
                      : "bg-signature-gold/90 hover:bg-signature-gold border border-signature-gold/20"
                  }`}
                >
                  GET STARTED
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements - Light Beams */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute inset-0 z-5 pointer-events-none"
          >
            <div className="absolute top-0 right-[20%] w-1 h-32 bg-white/70 rotate-[25deg] blur-[2px]"></div>
            <div className="absolute top-10 right-[30%] w-1 h-48 bg-white/70 rotate-[35deg] blur-[2px]"></div>
            <div className="absolute top-5 right-[40%] w-1 h-40 bg-white/70 rotate-[15deg] blur-[2px]"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
