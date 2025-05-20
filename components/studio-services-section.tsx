"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, useInView } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Service data
const studioServices = [
  {
    id: "cycling",
    title: "CYCLING",
    description: "HIGH-INTENSITY CARDIO WORKOUTS ON STATE-OF-THE-ART BIKES.",
    icon: "🚴‍♂️",
  },
  {
    id: "yoga",
    title: "YOGA",
    description:
      "FIND BALANCE AND FLEXIBILITY THROUGH MINDFUL MOVEMENT AND BREATH.",
    icon: "🧘‍♀️",
  },
  {
    id: "pilates",
    title: "PILATES",
    description:
      "STRENGTHEN YOUR CORE AND IMPROVE POSTURE WITH CONTROLLED MOVEMENTS.",
    icon: "💪",
  },
];

export default function StudioServicesSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isMobile = useMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Handle mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if we're in light mode
  const isLightMode = mounted && theme === "light";

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
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.1,
      },
    }),
  };

  // Mobile layout with app-like feel
  if (isMobile) {
    return (
      <section ref={ref} className="px-0 pt-6 pb-12 overflow-hidden">
        {/* App-like header with sticky behavior */}
        <div
          className={`px-4 py-3 mb-4 ${
            isLightMode ? "bg-white" : "bg-[#1D1D1D]"
          }`}
        >
          <h2
            className={`text-xl font-bold ${
              isLightMode ? "text-gray-900" : "text-white"
            }`}
          >
            SIGNATURE <span className="text-signature-gold">STUDIO</span>
          </h2>
        </div>

        {/* Main content area with background image */}
        <div className="relative w-full mb-8">
          {/* Background image */}
          <div className="relative w-full h-56">
            <Image
              src="/stu.png"
              alt="Signature Studio"
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

          {/* Blurred content overlay - consistent with gym section */}
          <div className="px-4 -mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className={`p-4 rounded-xl backdrop-blur-md ${
                isLightMode
                  ? "bg-white/40 border border-white/50 shadow-sm text-gray-800"
                  : "bg-[#1D1D1D]/40 border border-gray-700/50 text-white"
              }`}
            >
              <p className="text-sm capitalize leading-relaxed">
                OUR STUDIO IS DESIGNED TO CHALLENGE YOU IN NEW WAYS, OFFERING
                HIGH-ENERGY SESSIONS LED BY EXPERT INSTRUCTORS. WHETHER YOU'RE
                INTO YOGA, PILATES, OR CYCLING, THERE'S A CLASS THAT MATCHES
                YOUR STYLE AND PACE.
              </p>
              <div className="mt-4">
                <Link
                  href="/studio"
                  className={`inline-flex items-center text-sm font-medium ${
                    isLightMode ? "text-gray-900" : "text-white"
                  }`}
                >
                  EXPLORE CLASSES
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Service cards - outside the blur area */}
        <div className="px-4">
          <h3
            className={`text-lg font-bold mb-4 ${
              isLightMode ? "text-gray-900" : "text-white"
            }`}
          >
            OUR CLASSES
          </h3>
          <div className="space-y-3 mb-6">
            {studioServices.map((service, index) => (
              <motion.div
                key={service.id}
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
                className={`p-3 rounded-lg flex items-center ${
                  isLightMode
                    ? "bg-white shadow-sm border border-gray-100"
                    : "bg-[#1D1D1D] border border-gray-800"
                }`}
              >
                <span className="text-2xl mr-3">{service.icon}</span>
                <div>
                  <h4
                    className={`font-bold text-sm ${
                      isLightMode ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {service.title}
                  </h4>
                  <p
                    className={`text-xs mt-1 ${
                      isLightMode ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA button - App style */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center"
          >
            <Link
              href="/studio/schedule"
              className={`w-full py-3.5 rounded-xl flex items-center justify-center font-medium text-sm text-white shadow-md ${
                isLightMode
                  ? "bg-signature-gold hover:bg-signature-gold/90"
                  : "bg-signature-gold hover:bg-signature-gold/90"
              }`}
            >
              VIEW SCHEDULE
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  // Desktop layout
  return (
    <section
      ref={ref}
      className={`py-24 overflow-hidden ${
        isLightMode ? "bg-gray-100" : "bg-[#1D1D1D]/50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Background Image */}
          <div className="relative h-[600px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sZ2VFQVQH54UxSMSJLXdmxuqf9fzeR.png"
              alt="Signature Studio"
              fill
              className="object-cover"
              priority
            />

            {/* Content Overlay with blur - consistent with gym section */}
            <div className="absolute inset-0 flex items-center">
              <div
                className={`max-w-xl ml-8 md:ml-16 lg:ml-24 p-8 md:p-12 backdrop-blur-md rounded-lg shadow-xl ${
                  isLightMode
                    ? "bg-white/20 border border-white/30 text-gray-900"
                    : "bg-black/40 border border-gray-700/30 text-white"
                }`}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5 }}
                  className={`text-4xl md:text-5xl font-bold tracking-tight leading-tight ${
                    isLightMode ? "text-gray-900" : "text-white"
                  }`}
                >
                  SIGNATURE
                  <br />
                  <span className="text-signature-gold">STUDIO</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`mt-6 text-base md:text-lg leading-relaxed ${
                    isLightMode ? "text-gray-800" : "text-gray-300"
                  }`}
                >
                  OUR STUDIO IS DESIGNED TO CHALLENGE YOU IN NEW WAYS, OFFERING
                  HIGH-ENERGY SESSIONS LED BY EXPERT INSTRUCTORS. WHETHER YOU'RE
                  INTO YOGA, PILATES, OR CYCLING, THERE'S A CLASS THAT MATCHES
                  YOUR STYLE AND PACE.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8"
                >
                  <Link
                    href="/studio"
                    className={`inline-flex items-center px-8 py-3 text-white font-bold rounded-md transition-colors duration-300 shadow-md backdrop-blur-sm ${
                      isLightMode
                        ? "bg-signature-gold/90 hover:bg-signature-gold border border-signature-gold/30"
                        : "bg-signature-gold/90 hover:bg-signature-gold border border-signature-gold/20"
                    }`}
                  >
                    EXPLORE CLASSES
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
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-0 right-[20%] w-1 h-32 bg-white/70 rotate-[25deg] blur-[2px]"></div>
              <div className="absolute top-10 right-[30%] w-1 h-48 bg-white/70 rotate-[35deg] blur-[2px]"></div>
              <div className="absolute top-5 right-[40%] w-1 h-40 bg-white/70 rotate-[15deg] blur-[2px]"></div>
            </motion.div>
          </div>

          {/* Service cards - outside the blur area */}
          <div className="grid grid-cols-3 gap-6 mt-8 px-8 md:px-16 lg:px-24">
            {studioServices.map((service, index) => (
              <motion.div
                key={service.id}
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
                className={`p-6 rounded-lg ${
                  isLightMode
                    ? "bg-white shadow-md border border-gray-100"
                    : "bg-[#1D1D1D] border border-gray-800"
                }`}
              >
                <span className="text-4xl block mb-4">{service.icon}</span>
                <h4
                  className={`font-bold text-xl mb-2 ${
                    isLightMode ? "text-gray-900" : "text-white"
                  }`}
                >
                  {service.title}
                </h4>
                <p
                  className={`mb-4 ${
                    isLightMode ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {service.description}
                </p>
                <Link
                  href={`/studio/${service.id}`}
                  className={`inline-flex items-center text-sm font-medium ${
                    isLightMode
                      ? "text-gray-900 hover:text-signature-gold"
                      : "text-white hover:text-signature-gold"
                  } transition-colors`}
                >
                  LEARN MORE
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
