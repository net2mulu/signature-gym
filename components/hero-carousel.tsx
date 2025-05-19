"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

// Carousel slides data
const slides = [
  {
    id: 1,
    title: "SIGNATURE STRENGTH",
    subtitle: "SIGNATURE YOU.",
    description: "UNLOCK YOUR FULL POTENTIAL AT SIGNATURE FITNESS.",
    image: "/1.png",
    buttonText: "JOIN NOW",
    buttonLink: "/join",
  },
  {
    id: 2,
    title: "TRAIN SMARTER",
    subtitle: "LIVE BETTER.",
    description: "ACCESS PREMIUM EQUIPMENT AND EXPERT TRAINERS.",
    image: "/2.png",
    buttonText: "VIEW PLANS",
    buttonLink: "/plans",
  },
  {
    id: 3,
    title: "COMMUNITY",
    subtitle: "COMMITMENT.",
    description: "JOIN A COMMUNITY OF LIKE-MINDED INDIVIDUALS.",
    image: "/3.png",
    buttonText: "EXPLORE",
    buttonLink: "/community",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const constraintsRef = useRef(null);
  const isMobile = useMobile();

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoplay) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [autoplay]);

  // Pause autoplay on interaction
  const handleInteractionStart = () => setAutoplay(false);
  const handleInteractionEnd = () => setAutoplay(true);

  // Manual navigation
  const goToSlide = (index: number) => setCurrent(index);
  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Handle swipe gestures
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 50) {
      prevSlide();
    } else if (info.offset.x < -50) {
      nextSlide();
    }
    handleInteractionEnd();
  };

  if (isMobile) {
    // Mobile app-style banner carousel
    return (
      <div className="mt-16 mb-20 px-4 py-4">
        <motion.div
          className="relative overflow-hidden rounded-xl"
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          ref={constraintsRef}
        >
          {/* Banner Carousel */}
          <div className="relative h-[180px] w-full">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={current}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragStart={handleInteractionStart}
                onDragEnd={handleDragEnd}
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <Image
                    src={slides[current].image || "/placeholder.svg"}
                    alt={slides[current].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 dark:from-black/70 dark:to-black/30" />

                  <div className="absolute inset-0 flex flex-col justify-center p-4">
                    <h2 className="text-xl font-bold text-white mb-1">
                      {slides[current].title}
                    </h2>
                    <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                      {slides[current].description}
                    </p>
                    <Link
                      href={slides[current].buttonLink}
                      className="bg-gold-500 hover:bg-gold-600 text-white text-xs font-medium py-1.5 px-4 rounded-full w-fit transition-colors"
                    >
                      {slides[current].buttonText}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile app-style indicators */}
          <div className="absolute bottom-3 right-3 flex space-x-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === current ? "bg-gold-500" : "bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Featured sections below carousel */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Today's Classes
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Check out what's happening today
            </p>
            <Link
              href="/classes"
              className="text-gold-600 dark:text-gold-400 text-sm font-medium flex items-center"
            >
              View Schedule
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              My Progress
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Track your fitness journey
            </p>
            <Link
              href="/progress"
              className="text-gold-600 dark:text-gold-400 text-sm font-medium flex items-center"
            >
              View Stats
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Desktop version - full height hero with floating nav
  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
    >
      {/* Carousel slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[current].image || "/placeholder.svg"}
              alt="Gym hero image"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 dark:bg-black/60" />

            <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-white max-w-xl"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2">
                  {slides[current].title}
                </h1>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  {slides[current].subtitle}
                </h2>
                <p className="text-sm sm:text-base md:text-lg mb-8 text-gray-200 max-w-md">
                  {slides[current].description}
                </p>
                <Link
                  href={slides[current].buttonLink}
                  className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 text-sm sm:text-base"
                >
                  {slides[current].buttonText}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/50 text-white p-2 rounded-full z-10 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/50 text-white p-2 rounded-full z-10 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full focus:outline-none transition-colors duration-300 ${
              index === current
                ? "bg-gold-500"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
