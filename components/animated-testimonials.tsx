"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface Testimonial {
  name: string
  image: string
  role: string
  quote: string
  rating?: number
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
  lightBackground?: boolean
}

export default function AnimatedTestimonials({
  testimonials,
  title = "What Our Members Say",
  subtitle = "Hear from our community about their experiences",
  lightBackground = false,
}: AnimatedTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isMobile = useMobile()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Handle mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine if we're in light mode
  const isLightMode = mounted && theme === "light"

  // Autoplay functionality
  useEffect(() => {
    if (!isHovering && !isDragging) {
      intervalRef.current = setInterval(() => {
        nextTestimonial()
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovering, isDragging, currentIndex])

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleDotClick = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    if ("touches" in e) {
      setStartX(e.touches[0].clientX)
    } else {
      setStartX(e.clientX)
    }
  }

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(false)
    let endX
    if ("changedTouches" in e) {
      endX = e.changedTouches[0].clientX
    } else {
      endX = e.clientX
    }

    const diffX = endX - startX
    if (diffX > 50) {
      prevTestimonial()
    } else if (diffX < -50) {
      nextTestimonial()
    }
  }

  const testimonialVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  }

  // For mobile scrolling layout
  if (isMobile) {
    return (
      <div className="w-full">
        {title && (
          <div className="text-center mb-8">
            <h2
              className={`text-3xl font-bold mb-2 ${
                isLightMode ? "text-gray-900" : "text-white"
              } relative inline-block`}
            >
              {title.split(" ").map((word, i) => (
                <span key={i} className={i === 1 ? "text-signature-gold" : ""}>
                  {word}{" "}
                </span>
              ))}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-signature-gold"
                initial={{ width: 0, left: "50%" }}
                animate={{ width: "50%", left: "25%" }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </h2>
            <p className={`mt-2 ${isLightMode ? "text-gray-600" : "text-gray-300"}`}>{subtitle}</p>
          </div>
        )}

        <div
          className="overflow-x-auto hide-scrollbar pb-8"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex space-x-4 px-4 min-w-max">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`w-80 p-6 rounded-xl ${
                  isLightMode
                    ? lightBackground
                      ? "bg-white shadow-md"
                      : "bg-gray-100 shadow-md"
                    : lightBackground
                      ? "bg-[#1D1D1D] border border-gray-800"
                      : "bg-black/40 border border-gray-800"
                }`}
                style={{ backdropFilter: "blur(10px)" }}
              >
                <div className="flex items-start mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-signature-gold mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className={`font-bold ${isLightMode ? "text-gray-900" : "text-white"}`}>{testimonial.name}</h3>
                    <p className="text-signature-gold text-sm">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-signature-gold fill-signature-gold" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Quote className="absolute top-0 left-0 w-6 h-6 text-signature-gold/20 -translate-x-2 -translate-y-2" />
                  <p
                    className={`text-sm leading-relaxed ${isLightMode ? "text-gray-700" : "text-gray-300"}`}
                    style={{ minHeight: "100px" }}
                  >
                    "{testimonial.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile pagination dots */}
        <div className="flex justify-center mt-2 space-x-1.5">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                currentIndex === index ? "bg-signature-gold" : "bg-gray-300 dark:bg-gray-700"
              }`}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full relative overflow-hidden">
      {title && (
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl font-bold mb-3 ${isLightMode ? "text-gray-900" : "text-white"} relative inline-block`}
          >
            {title.split(" ").map((word, i) => (
              <span key={i} className={i === 1 ? "text-signature-gold" : ""}>
                {word}{" "}
              </span>
            ))}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-signature-gold"
              initial={{ width: 0, left: "50%" }}
              animate={{ width: "50%", left: "25%" }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`mt-3 max-w-2xl mx-auto ${isLightMode ? "text-gray-600" : "text-gray-300"}`}
          >
            {subtitle}
          </motion.p>
        </div>
      )}

      <div
        className="w-full relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
      >
        <div className="relative h-[350px] w-full flex justify-center">
          <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={testimonialVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`absolute top-0 max-w-3xl w-full rounded-xl p-8 shadow-xl ${
                isLightMode
                  ? lightBackground
                    ? "bg-white"
                    : "bg-gray-100"
                  : lightBackground
                    ? "bg-[#1D1D1D] border border-gray-800"
                    : "bg-black/40 border border-gray-800"
              }`}
              style={{
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-start relative">
                <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full overflow-hidden border-4 border-signature-gold">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-16 pt-2">
                  <div className="flex mb-1">
                    {Array.from({ length: testimonials[currentIndex].rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-signature-gold fill-signature-gold" />
                    ))}
                  </div>
                  <h3 className={`text-xl font-bold ${isLightMode ? "text-gray-900" : "text-white"}`}>
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-signature-gold">{testimonials[currentIndex].role}</p>
                </div>
              </div>

              <div className="mt-6 relative">
                <Quote className="absolute top-0 left-0 w-10 h-10 text-signature-gold/20 -translate-x-4 -translate-y-4" />
                <p
                  className={`text-lg leading-relaxed ${isLightMode ? "text-gray-700" : "text-gray-300"} pl-2`}
                  style={{ minHeight: "100px" }}
                >
                  "{testimonials[currentIndex].quote}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-10">
          <motion.button
            onClick={prevTestimonial}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isLightMode
                ? "bg-white/80 hover:bg-white text-gray-800 border border-gray-200"
                : "bg-gray-800/80 hover:bg-gray-800 text-white border border-gray-700"
            } backdrop-blur-sm transition-all`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            onClick={nextTestimonial}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isLightMode
                ? "bg-white/80 hover:bg-white text-gray-800 border border-gray-200"
                : "bg-gray-800/80 hover:bg-gray-800 text-white border border-gray-700"
            } backdrop-blur-sm transition-all`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === index ? "bg-signature-gold" : "bg-gray-300 dark:bg-gray-700"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
