"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function WelcomeSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isMobile = useMobile()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

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
        delayChildren: 0.3,
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
            WELCOME TO <span className="text-signature-gold">SIGNATURE FITNESS</span>
          </h2>
          <h3 className={`text-sm mt-1 ${isLightMode ? "text-gray-700" : "text-gray-300"} font-medium`}>
            YOUR PATH TO WELLNESS
          </h3>
        </div>

        {/* Swipeable image card with parallax effect */}
        <motion.div style={{ y: imageY }} className="w-full h-48 relative mb-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kpPRMSK9hsgYQbogddz8sazBFHWWja.png"
            alt="Modern gym equipment"
            fill
            className="object-cover"
          />
          <div
            className={`absolute inset-0 ${
              isLightMode
                ? "bg-gradient-to-b from-transparent to-white/20"
                : "bg-gradient-to-b from-transparent to-black/20"
            }`}
          />

          {/* Indicator dots */}
          <div className="absolute bottom-2 right-4 flex space-x-1">
            {[0, 1, 2].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-signature-gold" : isLightMode ? "bg-gray-300" : "bg-gray-600"}`}
              />
            ))}
          </div>
        </motion.div>

        {/* App-like content cards */}
        <div className="px-4">
          {/* Description card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded-xl mb-6 ${
              isLightMode ? "bg-white border border-gray-200 shadow-sm" : "bg-gray-900 border border-gray-800"
            }`}
          >
            <p className={`text-sm ${isLightMode ? "text-gray-700" : "text-gray-300"} leading-relaxed`}>
              EXPERIENCE TOP-NOTCH FACILITIES, EXPERT TRAINERS, AND A SUPPORTIVE COMMUNITY ALL UNDER ONE ROOF. AT
              SIGNATURE FITNESS, WE OFFER CUTTING-EDGE EQUIPMENT, DIVERSE CLASSES, AND PERSONALIZED GUIDANCE TO HELP YOU
              ACHIEVE YOUR HEALTH GOALS.
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
              href="/about"
              className={`w-full py-3.5 rounded-xl flex items-center justify-center font-medium text-sm ${
                isLightMode ? "bg-signature-gold text-white shadow-md" : "bg-signature-gold text-white"
              }`}
            >
              Discover More
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    )
  }

  // Desktop layout remains the same
  return (
    <section ref={ref} className={`py-24 overflow-hidden ${isLightMode ? "bg-gray-50" : "bg-[#1D1D1D]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left column - Text content */}
          <motion.div variants={itemVariants} className="max-w-xl">
            <h2
              className={`text-5xl font-bold ${
                isLightMode ? "text-gray-900" : "text-white"
              } tracking-tight leading-tight`}
            >
              WELCOME TO
              <br />
              <span className="text-signature-gold">SIGNATURE FITNESS</span>
            </h2>
            <h3 className={`text-2xl mt-4 ${isLightMode ? "text-gray-700" : "text-gray-300"} font-medium`}>
              YOUR PATH TO WELLNESS
            </h3>
            <motion.p
              variants={itemVariants}
              className={`mt-6 ${isLightMode ? "text-gray-700" : "text-gray-300"} text-base leading-relaxed`}
            >
              EXPERIENCE TOP-NOTCH FACILITIES, EXPERT TRAINERS, AND A SUPPORTIVE COMMUNITY ALL UNDER ONE ROOF. AT
              SIGNATURE FITNESS, WE OFFER CUTTING-EDGE EQUIPMENT, DIVERSE CLASSES, AND PERSONALIZED GUIDANCE TO HELP YOU
              ACHIEVE YOUR HEALTH GOALS.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8">
              <Link
                href="/about"
                className={`inline-flex items-center px-6 py-3 bg-signature-gold hover:bg-signature-gold/90 text-white rounded-md font-medium transition-colors duration-300 shadow-md`}
              >
                Discover More
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div
            variants={itemVariants}
            className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl"
          >
            <div
              className={`absolute inset-0 ${
                isLightMode
                  ? "bg-gradient-to-r from-white/10 to-transparent"
                  : "bg-gradient-to-r from-black/10 to-transparent"
              }`}
            />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kpPRMSK9hsgYQbogddz8sazBFHWWja.png"
              alt="Modern gym equipment"
              fill
              className="object-cover"
              priority
            />
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-signature-gold opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-signature-gold opacity-70"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
