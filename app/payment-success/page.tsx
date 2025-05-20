"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Home, Download, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PaymentSuccessPage() {
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="flex min-h-screen bg-black">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 relative">
        <Image src="/auth-background.jpg" alt="Signature Fitness" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-10 left-10">
          <h1 className="text-5xl font-bold text-signature-gold">
            SIGNATURE
            <br />
            FITNESS
          </h1>
        </div>
      </div>

      {/* Right side - Success Content */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12">
        <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full">
          {/* Mobile logo */}
          <div className="md:hidden flex justify-center mb-8">
            <Image src="/signature-logo.png" alt="Signature Fitness" width={80} height={80} className="h-20 w-20" />
          </div>

          <div className="w-20 h-20 rounded-full bg-signature-gold/20 flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-signature-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 text-center">Payment Successful!</h2>
          <p className="text-gray-400 mb-8 text-center">
            Thank you for joining Signature Fitness. Your membership is now active.
          </p>

          <div className="bg-gray-900 rounded-lg p-6 w-full mb-8">
            <h3 className="text-lg font-medium text-white mb-4">Membership Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Membership Type</span>
                <span className="text-white">All-Access Membership</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Start Date</span>
                <span className="text-white">Immediately</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span className="text-signature-gold">$120.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Active</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full mb-8">
            <Link
              href="/"
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              <Home size={24} className="text-signature-gold mb-2" />
              <span className="text-sm text-white text-center">Home</span>
            </Link>
            <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 bg-gray-900 hover:bg-gray-800 transition-colors">
              <Download size={24} className="text-signature-gold mb-2" />
              <span className="text-sm text-white text-center">Receipt</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 bg-gray-900 hover:bg-gray-800 transition-colors">
              <Calendar size={24} className="text-signature-gold mb-2" />
              <span className="text-sm text-white text-center">Classes</span>
            </button>
          </div>

          <p className="text-gray-400 text-center text-sm">Redirecting to home in {countdown} seconds...</p>
        </div>
      </div>
    </div>
  )
}
