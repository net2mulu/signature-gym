"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CreditCard, Smartphone, Check } from "lucide-react"
import { useTheme } from "next-themes"

const paymentMethods = [
  {
    id: "card",
    name: "Credit Card",
    icon: CreditCard,
    description: "Pay with Visa, Mastercard, or American Express",
  },
  {
    id: "mobile",
    name: "Mobile Money",
    icon: Smartphone,
    description: "Pay with Telebirr or CBE Birr",
  },
]

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()
  const isLightMode = theme === "light"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to success page
      window.location.href = "/payment-success"
    }, 2000)
  }

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

      {/* Right side - Payment Form */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12">
        <div className="flex items-center mb-8">
          <Link href="/signup" className="flex items-center text-white hover:text-signature-gold transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Registration</span>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          {/* Mobile logo */}
          <div className="md:hidden flex justify-center mb-8">
            <Image src="/signature-logo.png" alt="Signature Fitness" width={80} height={80} className="h-20 w-20" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">Payment</h2>
          <p className="text-gray-400 mb-8">Complete your membership purchase</p>

          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-white mb-2">Order Summary</h3>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-300">6 Month Membership</span>
              <span className="text-white font-medium">$90.00</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-300">Tax</span>
              <span className="text-white font-medium">$5.40</span>
            </div>
            <div className="flex justify-between py-2 mt-2">
              <span className="text-white font-medium">Total</span>
              <span className="text-signature-gold font-bold">$95.40</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                return (
                  <div
                    key={method.id}
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedMethod === method.id
                        ? "bg-signature-gold/20 border border-signature-gold"
                        : "bg-gray-900 border border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        selectedMethod === method.id ? "border-signature-gold bg-signature-gold" : "border-gray-500"
                      }`}
                    >
                      {selectedMethod === method.id && <Check size={12} className="text-black" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Icon size={20} className="mr-2 text-gray-300" />
                        <span className="font-medium text-white">{method.name}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{method.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {selectedMethod === "card" && (
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-signature-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-300 mb-1">
                      Expiry Date
                    </label>
                    <input
                      id="expiry"
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-signature-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-300 mb-1">
                      CVC
                    </label>
                    <input
                      id="cvc"
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-signature-gold"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name on Card
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-signature-gold"
                  />
                </div>
              </div>
            )}

            {selectedMethod === "mobile" && (
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-1">
                    Mobile Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+251 91 234 5678"
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-signature-gold"
                  />
                </div>
                <div>
                  <label htmlFor="provider" className="block text-sm font-medium text-gray-300 mb-1">
                    Provider
                  </label>
                  <select
                    id="provider"
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-signature-gold"
                  >
                    <option value="telebirr">Telebirr</option>
                    <option value="cbebirr">CBE Birr</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-signature-gold hover:bg-signature-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-signature-gold disabled:opacity-50 transition-colors"
            >
              {isLoading ? "Processing..." : `Pay $95.40`}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            By completing this purchase, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
