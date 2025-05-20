"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Clock, Users, Calendar, ArrowRight } from "lucide-react";
import StudioPackages from "@/components/studio-packages";
import AnimatedSection from "@/components/animated-section";
import AnimatedCard from "@/components/animated-card";
import InteractiveButton from "@/components/interactive-button";
import AnimatedTestimonials from "@/components/animated-testimonials";

// Studio class types data
const studioTypes = [
  {
    id: "yoga",
    name: "Yoga",
    description:
      "Find balance, flexibility, and inner peace through our variety of yoga classes designed for all levels.",
    image: "/yoga-studio.png",
    benefits: [
      "Improved flexibility and balance",
      "Reduced stress and anxiety",
      "Enhanced mind-body connection",
      "Better posture and alignment",
    ],
    classes: [
      {
        name: "Vinyasa Flow",
        duration: "60 min",
        level: "All Levels",
        description:
          "Dynamic flowing sequences that synchronize breath with movement.",
      },
      {
        name: "Hatha Yoga",
        duration: "75 min",
        level: "Beginner",
        description:
          "Traditional approach focusing on proper alignment and breathing techniques.",
      },
      {
        name: "Power Yoga",
        duration: "60 min",
        level: "Intermediate",
        description: "Vigorous, fitness-based approach to vinyasa-style yoga.",
      },
    ],
    pricing: {
      dropIn: "$18",
      tenClass: "$160",
      monthly: "$120",
    },
  },
  {
    id: "pilates",
    name: "Pilates",
    description:
      "Strengthen your core, improve posture, and enhance body awareness with our specialized Pilates programs.",
    image: "/pilates-studio.png",
    benefits: [
      "Strong core and improved stability",
      "Enhanced flexibility and mobility",
      "Better posture and alignment",
      "Injury prevention and rehabilitation",
    ],
    classes: [
      {
        name: "Mat Pilates",
        duration: "55 min",
        level: "All Levels",
        description:
          "Classic Pilates exercises performed on a mat focusing on core strength.",
      },
      {
        name: "Reformer Pilates",
        duration: "50 min",
        level: "All Levels",
        description:
          "Exercises performed on the Pilates reformer machine for resistance training.",
      },
      {
        name: "Pilates Fusion",
        duration: "60 min",
        level: "Intermediate",
        description:
          "Combines traditional Pilates with elements of yoga and functional training.",
      },
    ],
    pricing: {
      dropIn: "$22",
      tenClass: "$200",
      monthly: "$150",
    },
  },
  {
    id: "s60",
    name: "Group Class S60",
    description:
      "High-energy, results-driven 60-minute sessions designed to transform your body through varied workout styles.",
    image: "/group-fitness-studio.png",
    benefits: [
      "Efficient full-body workouts",
      "Increased cardiovascular fitness",
      "Improved strength and endurance",
      "Motivating group atmosphere",
    ],
    classes: [
      {
        name: "S60 HIIT",
        duration: "60 min",
        level: "All Levels",
        description:
          "High-intensity interval training to maximize calorie burn and improve fitness.",
      },
      {
        name: "S60 Strength",
        duration: "60 min",
        level: "All Levels",
        description:
          "Focused on building strength and muscle tone using various equipment.",
      },
      {
        name: "S60 Core",
        duration: "60 min",
        level: "All Levels",
        description:
          "Targets the core muscles for improved stability, strength, and definition.",
      },
    ],
    pricing: {
      dropIn: "$20",
      tenClass: "$180",
      monthly: "$140",
    },
  },
];

// Studio testimonials data
const studioTestimonials = [
  {
    name: "Sarah M.",
    image: "/headshot-woman-portrait.png",
    role: "Yoga Studio Member",
    quote:
      "The yoga classes at Signature have transformed not just my physical health but my mental wellbeing too. The instructors create such a peaceful and supportive environment.",
    rating: 5,
  },
  {
    name: "Michael T.",
    image: "/headshot-portrait-man.png",
    role: "S60 Studio Member",
    quote:
      "S60 classes are the perfect balance of challenge and fun. I've seen incredible results in just two months, and the community keeps me coming back for more.",
    rating: 5,
  },
  {
    name: "Jessica L.",
    image: "/athletic-woman-headshot.png",
    role: "Pilates Studio Member",
    quote:
      "As someone recovering from a back injury, the Pilates classes have been life-changing. The attention to form and personalized modifications have helped me rebuild strength safely.",
    rating: 5,
  },
  {
    name: "Alexander K.",
    image: "/athletic-man-headshot.png",
    role: "Yoga & S60 Member",
    quote:
      "The combination of high-intensity S60 classes and restorative yoga has completely transformed my fitness routine. The instructors are knowledgeable and the studio atmosphere is unmatched.",
    rating: 5,
  },
];

export default function StudioPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef(null);

  // Parallax effect for hero section
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, 150]);

  // Handle mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if we're in light mode
  const isLightMode = mounted && theme === "light";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <ThemeToggle />
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full"
          ref={headerRef}
        >
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="absolute inset-0"
          >
            <Image
              src="/pil.jpg"
              alt="Signature Studio"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto md:mx-0">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                >
                  Signature <span className="text-shine">Studio</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl"
                >
                  Transform Your Mind And Body Through Our Specialized Studio
                  Classes
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  <InteractiveButton
                    variant="primary"
                    size="lg"
                    ripple={true}
                    icon={<ArrowRight size={18} />}
                    iconPosition="right"
                  >
                    <Link href="#pricing">View Pricing</Link>
                  </InteractiveButton>
                  <InteractiveButton variant="outlined" size="lg" ripple={true}>
                    <Link href="#schedule">Class Schedule</Link>
                  </InteractiveButton>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Animated scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <span className="text-white text-sm mb-2">Scroll to explore</span>
            <motion.div
              className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1"
              initial={{ y: 0 }}
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Studio Introduction */}
        <section
          className={`py-16 md:py-24 ${
            isLightMode ? "bg-gray-50" : "bg-black"
          }`}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <AnimatedSection delay={0}>
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-6 ${
                    isLightMode ? "text-gray-900" : "text-white"
                  }`}
                >
                  About Our <span className="text-signature-gold">Studios</span>
                </h2>
                <p
                  className={`mb-6 leading-relaxed ${
                    isLightMode ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  At Signature Studios, we offer a diverse range of classes
                  designed to challenge, inspire, and transform. Our
                  state-of-the-art facilities and expert instructors create the
                  perfect environment for your fitness journey.
                </p>
                <p
                  className={`leading-relaxed ${
                    isLightMode ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  Whether you're seeking the mindful practice of yoga, the
                  core-strengthening benefits of Pilates, or the high-energy
                  atmosphere of our S60 group classes, we have something for
                  everyone, regardless of fitness level.
                </p>
                <div className="mt-10 grid grid-cols-3 gap-6">
                  <motion.div
                    className="flex flex-col items-center text-center"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-16 h-16 bg-signature-gold/20 rounded-full flex items-center justify-center mb-4 animate-float">
                      <Users className="w-8 h-8 text-signature-gold" />
                    </div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isLightMode ? "text-gray-900" : "text-white"
                      }`}
                    >
                      Expert Instructors
                    </h3>
                    <p
                      className={`text-sm ${
                        isLightMode ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      Certified professionals
                    </p>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center text-center"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div
                      className="w-16 h-16 bg-signature-gold/20 rounded-full flex items-center justify-center mb-4 animate-float"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <Calendar className="w-8 h-8 text-signature-gold" />
                    </div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isLightMode ? "text-gray-900" : "text-white"
                      }`}
                    >
                      Flexible Schedule
                    </h3>
                    <p
                      className={`text-sm ${
                        isLightMode ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      Classes all day
                    </p>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center text-center"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div
                      className="w-16 h-16 bg-signature-gold/20 rounded-full flex items-center justify-center mb-4 animate-float"
                      style={{ animationDelay: "1s" }}
                    >
                      <Clock className="w-8 h-8 text-signature-gold" />
                    </div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isLightMode ? "text-gray-900" : "text-white"
                      }`}
                    >
                      All Levels
                    </h3>
                    <p
                      className={`text-sm ${
                        isLightMode ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      Beginner to advanced
                    </p>
                  </motion.div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={1}>
                <motion.div
                  className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sZ2VFQVQH54UxSMSJLXdmxuqf9fzeR.png"
                    alt="Studio Interior"
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />

                  {/* Decorative elements with animation */}
                  <motion.div
                    className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-signature-gold opacity-0"
                    animate={{ opacity: 0.7, x: [0, 5, 0], y: [0, 5, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-signature-gold opacity-0"
                    animate={{ opacity: 0.7, x: [0, -5, 0], y: [0, -5, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Studio Types */}
        {studioTypes.map((studio, index) => (
          <section
            key={studio.id}
            id={studio.id}
            className={`py-16 md:py-24 ${
              index % 2 === 0
                ? isLightMode
                  ? "bg-white"
                  : "bg-[#1D1D1D]"
                : isLightMode
                ? "bg-gray-50"
                : "bg-black"
            }`}
          >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                  index % 2 !== 0 ? "md:grid-flow-dense" : ""
                }`}
              >
                <AnimatedSection
                  delay={0}
                  className={`${index % 2 !== 0 ? "md:col-start-2" : ""}`}
                >
                  <motion.h2
                    className={`text-3xl md:text-4xl font-bold mb-6 ${
                      isLightMode ? "text-gray-900" : "text-white"
                    } relative inline-block`}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {studio.name}{" "}
                    <span className="text-signature-gold">Studio</span>
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-signature-gold"
                      initial={{ width: 0, left: "50%" }}
                      whileInView={{ width: "50%", left: "25%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </motion.h2>
                  <motion.p
                    className={`mb-6 leading-relaxed ${
                      isLightMode ? "text-gray-700" : "text-gray-300"
                    }`}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {studio.description}
                  </motion.p>

                  <motion.h3
                    className={`text-xl font-bold mb-4 ${
                      isLightMode ? "text-gray-900" : "text-white"
                    }`}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Benefits
                  </motion.h3>
                  <ul className="space-y-2 mb-8">
                    {studio.benefits.map((benefit, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-signature-gold mt-2 mr-2"
                          whileHover={{ scale: 2 }}
                        ></motion.div>
                        <span
                          className={
                            isLightMode ? "text-gray-700" : "text-gray-300"
                          }
                        >
                          {benefit}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    className="mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <h3
                      className={`text-xl font-bold mb-4 ${
                        isLightMode ? "text-gray-900" : "text-white"
                      }`}
                    >
                      Pricing
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Drop-in", price: studio.pricing.dropIn },
                        { label: "10 Classes", price: studio.pricing.tenClass },
                        { label: "Monthly", price: studio.pricing.monthly },
                      ].map((price, i) => (
                        <AnimatedCard
                          key={i}
                          className={`p-4 rounded-lg text-center ${
                            isLightMode ? "bg-gray-100" : "bg-black/40"
                          }`}
                          hoverEffect="scale"
                        >
                          <p
                            className={`text-sm mb-1 ${
                              isLightMode ? "text-gray-600" : "text-gray-400"
                            }`}
                          >
                            {price.label}
                          </p>
                          <motion.p
                            className="text-2xl font-bold text-signature-gold"
                            whileHover={{ scale: 1.1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            {price.price}
                          </motion.p>
                        </AnimatedCard>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <InteractiveButton
                      variant="primary"
                      size="lg"
                      ripple={true}
                      icon={<ArrowRight size={18} />}
                      iconPosition="right"
                    >
                      <Link href={`/studio/${studio.id}`}>
                        Explore {studio.name} Classes
                      </Link>
                    </InteractiveButton>
                  </motion.div>
                </AnimatedSection>

                <AnimatedSection
                  delay={1}
                  className={`${index % 2 !== 0 ? "md:col-start-1" : ""}`}
                >
                  <div className="space-y-6">
                    <motion.div
                      className="relative h-[300px] rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={studio.image || "/placeholder.svg"}
                        alt={`${studio.name} Studio`}
                        fill
                        className="object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>

                    <AnimatedCard
                      className={`rounded-lg p-6 ${
                        isLightMode ? "bg-gray-100" : "bg-black/40"
                      }`}
                      hoverEffect="glow"
                    >
                      <motion.h3
                        className={`text-xl font-bold mb-4 ${
                          isLightMode ? "text-gray-900" : "text-white"
                        }`}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        Featured Classes
                      </motion.h3>
                      <div className="space-y-4">
                        {studio.classes.map((cls, i) => (
                          <AnimatedCard
                            key={i}
                            className={`p-4 rounded-lg ${
                              isLightMode ? "bg-white" : "bg-[#1D1D1D]"
                            }`}
                            hoverEffect="lift"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <h4
                                className={`font-bold ${
                                  isLightMode ? "text-gray-900" : "text-white"
                                }`}
                              >
                                {cls.name}
                              </h4>
                              <motion.div
                                className="flex items-center bg-signature-gold/20 text-signature-gold px-2 py-1 rounded-full text-xs"
                                whileHover={{ scale: 1.05 }}
                              >
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{cls.duration}</span>
                              </motion.div>
                            </div>
                            <p
                              className={`text-sm ${
                                isLightMode ? "text-gray-600" : "text-gray-400"
                              }`}
                            >
                              {cls.description}
                            </p>
                            <motion.div
                              className="mt-2 text-xs font-medium text-signature-gold"
                              whileHover={{ x: 5 }}
                              transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 10,
                              }}
                            >
                              {cls.level}
                            </motion.div>
                          </AnimatedCard>
                        ))}
                      </div>
                    </AnimatedCard>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        ))}

        {/* Schedule Section */}
        <section
          id="schedule"
          className={`py-16 md:py-24 ${
            isLightMode ? "bg-gray-50" : "bg-black"
          }`}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-16">
                <motion.h2
                  className={`text-3xl md:text-4xl font-bold ${
                    isLightMode ? "text-gray-900" : "text-white"
                  } relative inline-block`}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Class <span className="text-signature-gold">Schedule</span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-signature-gold"
                    initial={{ width: 0, left: "50%" }}
                    whileInView={{ width: "50%", left: "25%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </motion.h2>
                <motion.p
                  className={`mt-4 max-w-3xl mx-auto ${
                    isLightMode ? "text-gray-700" : "text-gray-300"
                  }`}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Find the perfect class to fit your schedule and fitness goals
                </motion.p>
              </div>
            </AnimatedSection>

            <AnimatedCard
              className={`p-6 rounded-lg ${
                isLightMode ? "bg-white shadow-md" : "bg-[#1D1D1D]"
              }`}
              hoverEffect="border"
            >
              <div className="flex justify-between items-center mb-6">
                <h3
                  className={`text-xl font-bold ${
                    isLightMode ? "text-gray-900" : "text-white"
                  }`}
                >
                  This Week's Highlights
                </h3>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Link
                    href="/studio/schedule"
                    className="inline-flex items-center text-signature-gold hover-underline"
                  >
                    View Full Schedule
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    day: "Monday",
                    classes: [
                      { time: "07:00", name: "Vinyasa Flow", type: "Yoga" },
                      { time: "12:00", name: "Mat Pilates", type: "Pilates" },
                      { time: "18:30", name: "S60 HIIT", type: "S60" },
                    ],
                  },
                  {
                    day: "Wednesday",
                    classes: [
                      { time: "08:30", name: "Power Yoga", type: "Yoga" },
                      {
                        time: "12:00",
                        name: "Reformer Pilates",
                        type: "Pilates",
                      },
                      { time: "19:00", name: "S60 Strength", type: "S60" },
                    ],
                  },
                  {
                    day: "Friday",
                    classes: [
                      { time: "07:00", name: "Hatha Yoga", type: "Yoga" },
                      {
                        time: "12:00",
                        name: "Pilates Fusion",
                        type: "Pilates",
                      },
                      { time: "18:00", name: "S60 Core", type: "S60" },
                    ],
                  },
                ].map((day, i) => (
                  <AnimatedSection key={day.day} delay={i * 0.2}>
                    <AnimatedCard
                      className={`p-4 rounded-lg ${
                        isLightMode ? "bg-gray-50" : "bg-black/30"
                      }`}
                      hoverEffect="lift"
                    >
                      <motion.h4
                        className={`font-bold mb-3 ${
                          isLightMode ? "text-gray-900" : "text-white"
                        }`}
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        }}
                      >
                        {day.day}
                      </motion.h4>
                      <div className="space-y-3">
                        {day.classes.map((cls, j) => (
                          <motion.div
                            key={j}
                            className={`p-3 rounded-lg flex justify-between items-center ${
                              isLightMode
                                ? "bg-white shadow-sm"
                                : "bg-[#1D1D1D]"
                            } cursor-pointer`}
                            whileHover={{ scale: 1.03, x: 5 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 10,
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: j * 0.1 }}
                          >
                            <div>
                              <p
                                className={`font-medium ${
                                  isLightMode ? "text-gray-900" : "text-white"
                                }`}
                              >
                                {cls.name}
                              </p>
                              <p
                                className={`text-xs ${
                                  isLightMode
                                    ? "text-gray-600"
                                    : "text-gray-400"
                                }`}
                              >
                                {cls.type}
                              </p>
                            </div>
                            <motion.div
                              className="bg-signature-gold/20 text-signature-gold px-2 py-1 rounded-full text-xs"
                              whileHover={{ scale: 1.1 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 10,
                              }}
                            >
                              {cls.time}
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </AnimatedCard>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </section>

        {/* Testimonials */}
        <section
          className={`py-16 md:py-24 ${
            isLightMode ? "bg-white" : "bg-[#1D1D1D]"
          }`}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <AnimatedTestimonials
              testimonials={studioTestimonials}
              title="Member Testimonials"
              subtitle="Hear what our members have to say about their studio experiences"
              lightBackground={true}
            />
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className={`py-16 md:py-24 ${
            isLightMode ? "bg-gray-50" : "bg-black"
          }`}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-16">
                <motion.h2
                  className={`text-3xl md:text-4xl font-bold ${
                    isLightMode ? "text-gray-900" : "text-white"
                  } relative inline-block`}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Studio <span className="text-signature-gold">Packages</span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-signature-gold"
                    initial={{ width: 0, left: "50%" }}
                    whileInView={{ width: "50%", left: "25%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </motion.h2>
                <motion.p
                  className={`mt-4 max-w-3xl mx-auto ${
                    isLightMode ? "text-gray-700" : "text-gray-300"
                  }`}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Choose the perfect package for your studio experience
                </motion.p>
              </div>
            </AnimatedSection>

            <StudioPackages />
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-signature-gold z-0"></div>

          {/* Animated background elements */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(circle at 20% 50%, rgba(190, 166, 50, 0.8) 0%, rgba(190, 166, 50, 1) 70%)",
            }}
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(190, 166, 50, 0.8) 0%, rgba(190, 166, 50, 1) 70%)",
                "radial-gradient(circle at 80% 50%, rgba(190, 166, 50, 0.8) 0%, rgba(190, 166, 50, 1) 70%)",
                "radial-gradient(circle at 20% 50%, rgba(190, 166, 50, 0.8) 0%, rgba(190, 166, 50, 1) 70%)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Decorative circles */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-white/10 pointer-events-none z-0"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-white/10 pointer-events-none z-0"
            animate={{
              x: [0, -20, 0],
              y: [0, 30, 0],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 text-black"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Ready to Begin Your Journey?
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl mb-8 text-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join Signature Studios today and discover the perfect class for
                your fitness goals
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <InteractiveButton variant="secondary" size="lg" ripple={true}>
                  <Link href="/studio/schedule">View Schedule</Link>
                </InteractiveButton>
                <InteractiveButton variant="outlined" size="lg" ripple={true}>
                  <Link href="/signup">Join Now</Link>
                </InteractiveButton>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
