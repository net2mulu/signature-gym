"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import OfflineIndicator from "@/components/offline-indicator"
import { Check, Clock, Users, PauseCircle, Gift, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"

// Membership types
type MembershipType = "single" | "couple" | "family"
type DurationOption = "monthly" | "6month" | "12month"
type TimeOption = "all-day" | "peak" | "off-peak"

export default function PricingPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [membershipType, setMembershipType] = useState<MembershipType>("single")
  const [duration, setDuration] = useState<DurationOption>("monthly")
  const [timeOption, setTimeOption] = useState<TimeOption>("all-day")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const pricingRef = useRef<HTMLDivElement>(null)

  // Determine if we're in light mode
  const isLightMode = theme === "light"

  // Pricing data
  const pricingData = {
    single: {
      monthly: {
        "all-day": { price: 60, savings: 0 },
        peak: { price: 45, savings: 15 },
        "off-peak": { price: 35, savings: 25 },
      },
      "6month": {
        "all-day": { price: 300, savings: 60 },
        peak: { price: 225, savings: 45 },
        "off-peak": { price: 175, savings: 35 },
      },
      "12month": {
        "all-day": { price: 540, savings: 180 },
        peak: { price: 405, savings: 135 },
        "off-peak": { price: 315, savings: 105 },
      },
    },
    couple: {
      monthly: {
        "all-day": { price: 100, savings: 20 },
        peak: { price: 75, savings: 15 },
        "off-peak": { price: 60, savings: 10 },
      },
      "6month": {
        "all-day": { price: 500, savings: 100 },
        peak: { price: 375, savings: 75 },
        "off-peak": { price: 300, savings: 60 },
      },
      "12month": {
        "all-day": { price: 900, savings: 240 },
        peak: { price: 675, savings: 180 },
        "off-peak": { price: 540, savings: 120 },
      },
    },
    family: {
      monthly: {
        "all-day": { price: 140, savings: 40 },
        peak: { price: 105, savings: 30 },
        "off-peak": { price: 85, savings: 20 },
      },
      "6month": {
        "all-day": { price: 700, savings: 140 },
        peak: { price: 525, savings: 105 },
        "off-peak": { price: 425, savings: 85 },
      },
      "12month": {
        "all-day": { price: 1260, savings: 420 },
        peak: { price: 945, savings: 315 },
        "off-peak": { price: 765, savings: 255 },
      },
    },
  }

  // Get current price and savings
  const currentPricing = pricingData[membershipType][duration][timeOption]

  // Guest privileges based on duration
  const guestPrivileges = {
    monthly: 0,
    "6month": 4,
    "12month": 8,
  }

  // Pause privileges based on duration
  const pausePrivileges = {
    monthly: 0,
    "6month": 1,
    "12month": 2,
  }

  // Membership type labels
  const membershipLabels = {
    single: "Individual",
    couple: "Couple",
    family: "Family",
  }

  // Duration labels
  const durationLabels = {
    monthly: "Monthly",
    "6month": "6 Months",
    "12month": "12 Months",
  }

  // Time option labels
  const timeLabels = {
    "all-day": "All Day Access",
    peak: "Peak Hours (5-10 AM)",
    "off-peak": "Off-Peak (10 AM - 4 PM)",
  }

  // FAQ data
  const faqData = [
    {
      question: "How does the guest privilege work?",
      answer:
        "With our 6-month membership, you can bring up to 4 different guests throughout your membership period. With our 12-month membership, you can bring up to 8 different guests. Each guest can visit once, and you must accompany them during their visit.",
    },
    {
      question: "Can I pause my membership?",
      answer:
        "Yes! Our 6-month members can pause their membership for up to 1 month, and our 12-month members can pause for up to 2 months. This is perfect for situations like pregnancy, extended travel, or recovery from illness or injury. Simply notify us in advance to activate your pause period.",
    },
    {
      question: "How does the referral program work?",
      answer:
        "When you refer a friend who signs up for any membership, you'll receive a 20% discount on your next renewal. There's no limit to how many friends you can refer, so you could potentially get multiple renewal discounts!",
    },
    {
      question: "What's included in the family membership?",
      answer:
        "Our family membership includes access for 2 adults and up to 3 children (under 18) living in the same household. Each family member gets their own access card and full use of the facilities during the selected hours.",
    },
    {
      question: "Can I upgrade my membership mid-term?",
      answer:
        "You can upgrade your membership at any time. We'll simply prorate the difference and apply it to your new membership level. Contact our front desk staff to process your upgrade.",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  }

  // Toggle FAQ expansion
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <ThemeToggle />
      <OfflineIndicator />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className={`py-16 md:py-24 ${
            isLightMode ? "bg-gradient-to-b from-white to-gray-100" : "bg-gradient-to-b from-[#1D1D1D] to-black"
          }`}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Flexible Membership <span className="text-signature-gold">Plans</span>
              </h1>
              <p className="text-lg md:text-xl opacity-80 mb-8">
                Choose the perfect membership that fits your schedule and lifestyle
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-2 md:gap-4"
              >
                <button
                  onClick={() => router.push("/payment")}
                  className={`px-6 py-3 rounded-full text-white font-medium transition-all duration-300 bg-signature-gold hover:bg-signature-gold/90 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95`}
                >
                  View Pricing Options
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Membership Features */}
        <section className={`py-16 ${isLightMode ? "bg-white" : "bg-[#1D1D1D]"}`}>
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              Membership <span className="text-signature-gold">Benefits</span>
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {/* Guest Privileges */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`p-6 rounded-xl ${
                  isLightMode ? "bg-gray-50 shadow-md hover:shadow-lg" : "bg-gray-900 shadow-lg hover:shadow-xl"
                } transition-all duration-300`}
              >
                <div className="w-14 h-14 rounded-full bg-signature-gold/20 flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-signature-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3">Guest Privileges</h3>
                <p className={`mb-4 ${isLightMode ? "text-gray-600" : "text-gray-300"}`}>
                  Bring your friends and family to experience our facilities
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-signature-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span>6-month plan: Invite 4 guests per year</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-signature-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span>12-month plan: Invite 8 guests per year</span>
                  </li>
                </ul>
              </motion.div>

              {/* Membership Pause */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`p-6 rounded-xl ${
                  isLightMode ? "bg-gray-50 shadow-md hover:shadow-lg" : "bg-gray-900 shadow-lg hover:shadow-xl"
                } transition-all duration-300`}
              >
                <div className="w-14 h-14 rounded-full bg-signature-gold/20 flex items-center justify-center mb-4">
                  <PauseCircle className="w-7 h-7 text-signature-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3">Membership Pause</h3>
                <p className={`mb-4 ${isLightMode ? "text-gray-600" : "text-gray-300"}`}>
                  Pause your membership during pregnancy or illness
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-signature-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span>6-month plan: Pause for 1 month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-signature-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span>12-month plan: Pause for 2 months</span>
                  </li>
                </ul>
              </motion.div>

              {/* Referral Program */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`p-6 rounded-xl ${
                  isLightMode ? "bg-gray-50 shadow-md hover:shadow-lg" : "bg-gray-900 shadow-lg hover:shadow-xl"
                } transition-all duration-300`}
              >
                <div className="w-14 h-14 rounded-full bg-signature-gold/20 flex items-center justify-center mb-4">
                  <Gift className="w-7 h-7 text-signature-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3">Referral Program</h3>
                <p className={`mb-4 ${isLightMode ? "text-gray-600" : "text-gray-300"}`}>
                  Get rewarded for sharing Signature Fitness
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-signature-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span>20% discount on your next renewal</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-signature-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span>No limit on number of referrals</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Calculator */}
        <section ref={pricingRef} className={`py-16 ${isLightMode ? "bg-gray-50" : "bg-black"}`}>
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-center mb-6"
            >
              Find Your <span className="text-signature-gold">Perfect Plan</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              Customize your membership to fit your schedule and lifestyle
            </motion.p>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Selection Panel - Left Side */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-7 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                >
                  {/* Progress Steps */}
                  <div className="mb-8 relative">
                    <div className="flex justify-between items-center mb-2">
                      {["Membership Type", "Duration", "Access Hours"].map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              index === 0 && membershipType
                                ? "bg-signature-gold text-white"
                                : index === 1 && duration
                                  ? "bg-signature-gold text-white"
                                  : index === 2 && timeOption
                                    ? "bg-signature-gold text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className="text-xs mt-1 text-center hidden sm:block">{step}</span>
                        </div>
                      ))}
                    </div>
                    <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 absolute top-4 -z-10">
                      <div
                        className={`h-full bg-signature-gold transition-all duration-300 ${
                          timeOption ? "w-full" : duration ? "w-2/3" : membershipType ? "w-1/3" : "w-0"
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Membership Type Selector */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-signature-gold text-white flex items-center justify-center text-sm mr-2">
                        1
                      </span>
                      Choose Membership Type
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {(Object.keys(membershipLabels) as MembershipType[]).map((type) => (
                        <motion.button
                          key={type}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setMembershipType(type)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            membershipType === type
                              ? `border-signature-gold ${isLightMode ? "bg-signature-gold/10" : "bg-signature-gold/20"}`
                              : isLightMode
                                ? "border-gray-200 hover:border-signature-gold/50"
                                : "border-gray-700 hover:border-signature-gold/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{membershipLabels[type]}</span>
                            {membershipType === type && <Check className="w-5 h-5 text-signature-gold" />}
                          </div>
                          <div className="mt-2 flex items-center">
                            <Users className={`w-4 h-4 mr-1 ${isLightMode ? "text-gray-600" : "text-gray-400"}`} />
                            <p className={`text-sm ${isLightMode ? "text-gray-600" : "text-gray-400"}`}>
                              {type === "single" ? "1 person" : type === "couple" ? "2 people" : "Up to 5 people"}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Duration Selector */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-signature-gold text-white flex items-center justify-center text-sm mr-2">
                        2
                      </span>
                      Select Duration
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {(Object.keys(durationLabels) as DurationOption[]).map((option) => {
                        // Calculate the savings percentage
                        const allDayPrice = pricingData[membershipType].monthly["all-day"].price
                        const monthlyEquivalent =
                          option === "monthly"
                            ? allDayPrice
                            : pricingData[membershipType][option]["all-day"].price / (option === "6month" ? 6 : 12)
                        const savingsPercent = Math.round((1 - monthlyEquivalent / allDayPrice) * 100)

                        return (
                          <motion.button
                            key={option}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setDuration(option)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 relative ${
                              duration === option
                                ? `border-signature-gold ${isLightMode ? "bg-signature-gold/10" : "bg-signature-gold/20"}`
                                : isLightMode
                                  ? "border-gray-200 hover:border-signature-gold/50"
                                  : "border-gray-700 hover:border-signature-gold/50"
                            }`}
                          >
                            {option !== "monthly" && savingsPercent > 0 && (
                              <div className="absolute -top-3 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                Save {savingsPercent}%
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{durationLabels[option]}</span>
                              {duration === option && <Check className="w-5 h-5 text-signature-gold" />}
                            </div>
                            <div className="mt-2 flex flex-col">
                              <div className="flex items-center">
                                <Gift className={`w-4 h-4 mr-1 ${isLightMode ? "text-gray-600" : "text-gray-400"}`} />
                                <p className={`text-sm ${isLightMode ? "text-gray-600" : "text-gray-400"}`}>
                                  {option === "monthly" ? "No commitment" : `${guestPrivileges[option]} guest passes`}
                                </p>
                              </div>
                              {option !== "monthly" && (
                                <div className="flex items-center mt-1">
                                  <PauseCircle
                                    className={`w-4 h-4 mr-1 ${isLightMode ? "text-gray-600" : "text-gray-400"}`}
                                  />
                                  <p className={`text-sm ${isLightMode ? "text-gray-600" : "text-gray-400"}`}>
                                    {pausePrivileges[option]} month{pausePrivileges[option] > 1 ? "s" : ""} pause
                                  </p>
                                </div>
                              )}
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Time Option Selector */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-signature-gold text-white flex items-center justify-center text-sm mr-2">
                        3
                      </span>
                      Choose Access Hours
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {(Object.keys(timeLabels) as TimeOption[]).map((option) => {
                        // Calculate discount percentage
                        const allDayPrice = pricingData[membershipType][duration]["all-day"].price
                        const optionPrice = pricingData[membershipType][duration][option].price
                        const discountPercent =
                          option !== "all-day" ? Math.round((1 - optionPrice / allDayPrice) * 100) : 0

                        return (
                          <motion.button
                            key={option}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setTimeOption(option)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 relative ${
                              timeOption === option
                                ? `border-signature-gold ${isLightMode ? "bg-signature-gold/10" : "bg-signature-gold/20"}`
                                : isLightMode
                                  ? "border-gray-200 hover:border-signature-gold/50"
                                  : "border-gray-700 hover:border-signature-gold/50"
                            }`}
                          >
                            {option !== "all-day" && discountPercent > 0 && (
                              <div className="absolute -top-3 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {discountPercent}% off
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{timeLabels[option]}</span>
                              {timeOption === option && <Check className="w-5 h-5 text-signature-gold" />}
                            </div>
                            <div className="flex items-center mt-2">
                              <Clock className={`w-4 h-4 mr-1 ${isLightMode ? "text-gray-600" : "text-gray-400"}`} />
                              <p className={`text-sm ${isLightMode ? "text-gray-600" : "text-gray-400"}`}>
                                {option === "all-day"
                                  ? "24/7 access"
                                  : option === "peak"
                                    ? "5:00 AM - 10:00 AM"
                                    : "10:00 AM - 4:00 PM"}
                              </p>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Price Display - Right Side */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-5 lg:sticky lg:top-24 self-start"
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className={`p-8 rounded-2xl shadow-lg border-2 border-signature-gold/50 ${
                      isLightMode ? "bg-white" : "bg-gray-900"
                    }`}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">Your Selected Plan</h3>
                      <div
                        className={`inline-block px-4 py-1 rounded-full ${
                          isLightMode ? "bg-gray-100" : "bg-gray-800"
                        } mb-2`}
                      >
                        <p className="text-sm font-medium">
                          {membershipLabels[membershipType]} • {durationLabels[duration]}
                        </p>
                      </div>
                      <p className={`text-sm ${isLightMode ? "text-gray-600" : "text-gray-400"}`}>
                        {timeLabels[timeOption]}
                      </p>
                    </div>

                    <div className="flex flex-col items-center mb-6">
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold">${currentPricing.price}</span>
                        {duration !== "monthly" && (
                          <span className={`ml-2 ${isLightMode ? "text-gray-600" : "text-gray-400"}`}>total</span>
                        )}
                      </div>

                      {duration !== "monthly" && (
                        <p className="text-lg mt-1">
                          <span className="font-medium">
                            ${Math.round(currentPricing.price / (duration === "6month" ? 6 : 12))}
                          </span>
                          <span className={`${isLightMode ? "text-gray-600" : "text-gray-400"}`}>/month</span>
                        </p>
                      )}

                      {currentPricing.savings > 0 && (
                        <div
                          className={`mt-3 px-4 py-2 rounded-lg ${isLightMode ? "bg-green-100" : "bg-green-900/30"}`}
                        >
                          <p className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
                            <Check className="w-4 h-4 mr-1" /> You save ${currentPricing.savings}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-8 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                      <h4 className="font-medium mb-2">What's included:</h4>

                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-signature-gold mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          {timeOption === "all-day"
                            ? "24/7 access to all facilities"
                            : timeOption === "peak"
                              ? "Access during peak hours (5 AM - 10 AM)"
                              : "Access during off-peak hours (10 AM - 4 PM)"}
                        </span>
                      </div>

                      {duration !== "monthly" && (
                        <>
                          <div className="flex items-start">
                            <Check className="w-5 h-5 text-signature-gold mr-2 mt-0.5 flex-shrink-0" />
                            <span>Bring up to {guestPrivileges[duration]} guests during your membership</span>
                          </div>
                          <div className="flex items-start">
                            <Check className="w-5 h-5 text-signature-gold mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              Pause your membership for up to {pausePrivileges[duration]} month
                              {pausePrivileges[duration] > 1 ? "s" : ""}
                            </span>
                          </div>
                        </>
                      )}

                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-signature-gold mr-2 mt-0.5 flex-shrink-0" />
                        <span>20% referral discount on next renewal</span>
                      </div>

                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-signature-gold mr-2 mt-0.5 flex-shrink-0" />
                        <span>Access to all gym equipment and facilities</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/payment")}
                      className="w-full py-4 rounded-xl bg-signature-gold text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:bg-signature-gold/90 shadow-md hover:shadow-lg text-lg"
                    >
                      <span>Get Started Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>

                    <p className="text-center text-sm mt-4 text-gray-500 dark:text-gray-400">
                      No credit card required • Cancel anytime
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`py-16 ${isLightMode ? "bg-white" : "bg-[#1D1D1D]"}`}>
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              Frequently Asked <span className="text-signature-gold">Questions</span>
            </motion.h2>

            <div className="max-w-3xl mx-auto">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`mb-4 rounded-xl overflow-hidden border ${
                    isLightMode
                      ? expandedFaq === index
                        ? "border-signature-gold/50 bg-signature-gold/5"
                        : "border-gray-200"
                      : expandedFaq === index
                        ? "border-signature-gold/30 bg-signature-gold/10"
                        : "border-gray-800"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                  >
                    <span className="font-medium">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-signature-gold" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`px-6 pb-4 ${isLightMode ? "text-gray-700" : "text-gray-300"}`}>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className={`py-16 ${
            isLightMode
              ? "bg-gradient-to-r from-signature-gold/20 to-signature-gold/5"
              : "bg-gradient-to-r from-signature-gold/30 to-black"
          }`}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
              <p className={`text-lg mb-8 ${isLightMode ? "text-gray-700" : "text-gray-300"}`}>
                Join Signature Fitness today and experience premium facilities, flexible membership options, and a
                supportive community.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <button
                  onClick={() => router.push("/payment")}
                  className="px-8 py-4 rounded-full bg-signature-gold text-white font-medium transition-all duration-300 hover:bg-signature-gold/90 shadow-lg hover:shadow-xl"
                >
                  Join Signature Fitness Today
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
