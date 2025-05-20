"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, PhoneCall, Check } from "lucide-react"

export default function PaymentPage() {
  const [selectedOption, setSelectedOption] = useState<"creditCard" | "mobileMoney">("creditCard")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      router.push("/payment-success")
    }, 2000)
  }

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

      {/* Right side - Payment Form */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-white hover:text-signature-gold transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          {/* Mobile logo */}
          <div className="md:hidden flex justify-center mb-8">
            <Image src="/signature-logo.png" alt="Signature Fitness" width={80} height={80} className="h-20 w-20" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">Complete Payment</h2>
          <p className="text-gray-400 mb-8">Select your preferred payment method</p>

          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-white mb-2">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">All-Access Membership</span>
              <span className="text-white">$120.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Duration</span>
              <span className="text-white">1 Month</span>
            </div>
            <div className="border-t border-gray-700 my-2 pt-2 flex justify-between">
              <span className="font-medium text-white">Total</span>
              <span className="font-medium text-signature-gold">$120.00</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedOption("creditCard")}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                  selectedOption === "creditCard"
                    ? "border-signature-gold bg-signature-gold/10"
                    : "border-gray-700 bg-gray-900"
                }`}
              >
                <CreditCard
                  size={24}
                  className={selectedOption === "creditCard" ? "text-signature-gold" : "text-gray-400"}
                />
                <span className={`mt-2 text-sm ${selectedOption === "creditCard" ? "text-white" : "text-gray-400"}`}>
                  Credit Card
                </span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedOption("mobileMoney")}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                  selectedOption === "mobileMoney"
                    ? "border-signature-gold bg-signature-gold/10"
                    : "border-gray-700 bg-gray-900"
                }`}
              >
                <PhoneCall
                  size={24}
                  className={selectedOption === "mobileMoney" ? "text-signature-gold" : "text-gray-400"}
                />
                <span className={`mt-2 text-sm ${selectedOption === "mobileMoney" ? "text-white" : "text-gray-400"}`}>
                  Mobile Money
                </span>
              </button>
            </div>
          </div>

          {selectedOption === "creditCard" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-300 mb-1">
                  Name on Card
                </label>
                <input
                  id="cardName"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-signature-gold"
                  placeholder="Enter name on card"
                />
              </div>
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-signature-gold"
                  placeholder="xxxx xxxx xxxx xxxx"
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
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-signature-gold"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-300 mb-1">
                    CVC
                  </label>
                  <input
                    id="cvc"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-signature-gold"
                    placeholder="CVC"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="mt-4 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-signature-gold hover:bg-signature-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-signature-gold disabled:opacity-50 transition-colors"
              >
                {isLoading ? "Processing..." : "Pay $120.00"}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 text-center">
                <h4 className="font-medium text-white mb-2">Scan QR Code to Pay</h4>
                <div className="flex justify-center mb-4">
                  <Image src="/signature-qr-code.png" alt="Payment QR Code" width={200} height={200} />
                </div>
                <p className="text-gray-400 text-sm">
                  Scan this code with your mobile payment app, then click "I've completed payment"
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-signature-gold hover:bg-signature-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-signature-gold disabled:opacity-50 transition-colors"
              >
                {isLoading ? "Verifying..." : "I've completed payment"}
                {!isLoading && <Check size={18} className="ml-2" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
