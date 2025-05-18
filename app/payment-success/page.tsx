"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { useTheme } from "next-themes"

export default function PaymentSuccessPage() {
  const { theme } = useTheme()
  const isLightMode = theme === "light"

  // Confetti effect
  useEffect(() => {
    const confetti = async () => {
      const { default: confetti } = await import("canvas-confetti")

      // Fire confetti
      const count = 200
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 1000,
      }

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        })
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ["#BEA632", "#ffffff"],
      })
      fire(0.2, {
        spread: 60,
        colors: ["#BEA632", "#ffffff"],
      })
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ["#BEA632", "#ffffff"],
      })
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: ["#BEA632", "#ffffff"],
      })
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
        colors: ["#BEA632", "#ffffff"],
      })
    }

    confetti()
  }, [])

  return (
    <div className="flex min-h-screen bg-black">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Mxv2qXilQ22K6e9zvtJ9slaKHCySP2.png"
          alt="Signature Fitness"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-10 left-10">
          <h1 className="text-5xl font-bold text-signature-gold">
            SIGNATURE
            <br />
            FITNESS
          </h1>
        </div>
      </div>

      {/* Right side - Success Message */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12">
        <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full text-center">
          {/* Mobile logo */}
          <div className="md:hidden flex justify-center mb-8">
            <Image src="/signature-logo.png" alt="Signature Fitness" width={80} height={80} className="h-20 w-20" />
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 rounded-full bg-signature-gold/20 flex items-center justify-center mb-6"
          >
            <CheckCircle size={60} className="text-signature-gold" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Payment Successful!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 mb-8"
          >
            Thank you for joining Signature Fitness
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900 rounded-lg p-6 mb-8 w-full"
          >
            <h3 className="text-lg font-medium text-white mb-4">Membership Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Membership Type:</span>
                <span className="text-white">6 Month Membership</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Start Date:</span>
                <span className="text-white">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">End Date:</span>
                <span className="text-white">
                  {new Date(new Date().setMonth(new Date().getMonth() + 6)).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount Paid:</span>
                <span className="text-signature-gold font-bold">$95.40</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 w-full"
          >
            <Link
              href="/"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-signature-gold hover:bg-signature-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-signature-gold transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/download-app"
              className="w-full flex justify-center py-3 px-4 border border-gray-700 rounded-lg shadow-sm text-white bg-transparent hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-colors"
            >
              Download Mobile App
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
