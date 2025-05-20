"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Dumbbell, Users, Clock, ArrowRight } from "lucide-react";
import MembershipPackages from "@/components/membership-packages";
import AnimatedSection from "@/components/animated-section";
import AnimatedCard from "@/components/animated-card";
import InteractiveButton from "@/components/interactive-button";
import AnimatedTestimonials from "@/components/animated-testimonials";

// Gym testimonials data
const gymTestimonials = [
  {
    name: "David L.",
    image: "/headshot-portrait-man.png",
    role: "Member for 2 years",
    quote:
      "Signature Gym transformed my approach to fitness. The trainers created a custom program that helped me lose 30kg in 8 months. The community keeps me motivated and coming back every day!",
    rating: 5,
  },
  {
    name: "Emily R.",
    image: "/headshot-woman-portrait.png",
    role: "Member for 1 year",
    quote:
      "As a busy professional, I needed a gym that offered flexibility and results. Signature's 24/7 access and expert trainers helped me build strength and confidence in just a few months.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    image: "/athletic-man-headshot.png",
    role: "Member for 3 years",
    quote:
      "After trying many gyms, Signature stands out for its premium equipment and knowledgeable staff. I've increased my deadlift by 100kg and feel stronger than ever! The atmosphere is unmatched.",
    rating: 5,
  },
  {
    name: "Sarah J.",
    image: "/athletic-woman-headshot.png",
    role: "Member for 6 months",
    quote:
      "Coming to Signature Gym was the best decision I made for my health. The trainers are top-notch, the equipment is always clean and well-maintained, and the results speak for themselves!",
    rating: 5,
  },
];

export default function GymPage() {
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
              src="/download.webp"
              alt="Signature Gym"
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
                  Signature <span className="text-shine">Gym</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl"
                >
                  Elevate Your Fitness Journey With State-Of-The-Art Equipment
                  And Expert Guidance
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
                    <Link href="#pricing">View Membership</Link>
                  </InteractiveButton>
                  <InteractiveButton variant="outlined" size="lg" ripple={true}>
                    <Link href="#facilities">Explore Gym</Link>
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

        {/* About Section */}
        <section
          id="about"
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
                  About{" "}
                  <span className="text-signature-gold">Signature Gym</span>
                </h2>
                <p
                  className={`mb-6 leading-relaxed ${
                    isLightMode ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  Signature Gym offers a premium fitness experience designed to
                  help you achieve your health and wellness goals. Our facility
                  combines cutting-edge equipment, expert trainers, and a
                  supportive community to create the ideal environment for
                  transformation.
                </p>
                <p
                  className={`leading-relaxed ${
                    isLightMode ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  Whether you're just starting your fitness journey or looking
                  to take your training to the next level, our comprehensive
                  approach ensures you have everything you need to succeed.
                </p>
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <motion.div
                    className="flex flex-col items-center text-center"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-16 h-16 bg-signature-gold/20 rounded-full flex items-center justify-center mb-4 animate-float">
                      <Dumbbell className="w-8 h-8 text-signature-gold" />
                    </div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isLightMode ? "text-gray-900" : "text-white"
                      }`}
                    >
                      Premium Equipment
                    </h3>
                    <p
                      className={`text-sm ${
                        isLightMode ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      Top-of-the-line machines and free weights
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
                      <Users className="w-8 h-8 text-signature-gold" />
                    </div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isLightMode ? "text-gray-900" : "text-white"
                      }`}
                    >
                      Expert Trainers
                    </h3>
                    <p
                      className={`text-sm ${
                        isLightMode ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      Certified professionals to guide your journey
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
                    src="3.png"
                    alt="Gym Interior"
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

        {/* Facilities Section */}
        <section
          id="facilities"
          className={`py-16 md:py-24 ${
            isLightMode ? "bg-white" : "bg-[#1D1D1D]"
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
                  World-Class{" "}
                  <span className="text-signature-gold">Facilities</span>
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
                  Discover our extensive range of equipment and dedicated
                  training zones designed to optimize your workout experience
                </motion.p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Strength Zone",
                  description:
                    "Our strength zone features free weights, benches, squat racks, and plate-loaded machines for serious strength training.",
                  features: [
                    "Olympic lifting platforms",
                    "Power racks and cages",
                    "Dumbbells up to 50kg",
                  ],
                  image: "/modern-weight-training-area.png",
                },
                {
                  title: "Cardio Zone",
                  description:
                    "Our cardio section features the latest treadmills, ellipticals, bikes, and rowers with integrated entertainment.",
                  features: [
                    "Smart treadmills with incline",
                    "Stair masters and climbers",
                    "Assault bikes and rowers",
                  ],
                  image: "/modern-cardio-gym.png",
                },
                {
                  title: "Functional Zone",
                  description:
                    "Our functional training area is equipped with kettlebells, battle ropes, medicine balls, and open space.",
                  features: [
                    "TRX suspension systems",
                    "Plyo boxes and agility tools",
                    "Turf strip for functional movement",
                  ],
                  image: "/functional-training-gym.png",
                },
              ].map((facility, i) => (
                <AnimatedSection key={facility.title} delay={i}>
                  <AnimatedCard
                    className={`rounded-lg overflow-hidden group h-full ${
                      isLightMode ? "bg-gray-100" : "bg-black/50"
                    }`}
                    hoverEffect="glow"
                  >
                    <div className="relative h-60">
                      <Image
                        src={facility.image || "/placeholder.svg"}
                        alt={facility.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-signature-gold">
                        {facility.title}
                      </h3>
                      <p
                        className={`mb-4 ${
                          isLightMode ? "text-gray-700" : "text-gray-300"
                        }`}
                      >
                        {facility.description}
                      </p>
                      <ul
                        className={`space-y-2 ${
                          isLightMode ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {facility.features.map((feature, j) => (
                          <motion.li
                            key={j}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: j * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-signature-gold mr-2"
                              whileHover={{ scale: 1.5 }}
                            ></motion.div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </AnimatedCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Trainers Section */}
        <section
          id="trainers"
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
                  Expert <span className="text-signature-gold">Trainers</span>
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
                  Our certified trainers are dedicated to helping you achieve
                  your fitness goals through personalized training programs
                </motion.p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "John Anderson",
                  role: "Strength & Conditioning Coach",
                  bio: "Specializing in strength training, powerlifting, and sports performance, John brings 10+ years of coaching experience.",
                  specialties: ["Powerlifting", "Sports Conditioning"],
                  image: "/professional-male-fitness-trainer.png",
                },
                {
                  name: "Sarah Johnson",
                  role: "Nutrition & Weight Management",
                  bio: "With a background in nutritional science, Sarah helps clients transform their bodies through balanced nutrition and exercise.",
                  specialties: ["Weight Loss", "Nutrition Planning"],
                  image: "/professional-female-fitness-trainer.png",
                },
                {
                  name: "Michael Williams",
                  role: "Functional Fitness Specialist",
                  bio: "Michael focuses on functional movement patterns that improve everyday life and athletic performance.",
                  specialties: ["Mobility", "Athletic Performance"],
                  image: "/african-male-fitness-trainer.png",
                },
              ].map((trainer, i) => (
                <AnimatedSection key={trainer.name} delay={i}>
                  <AnimatedCard
                    className={`rounded-lg overflow-hidden h-full ${
                      isLightMode ? "bg-gray-100" : "bg-[#1D1D1D]"
                    }`}
                    hoverEffect="lift"
                  >
                    <div className="relative h-80">
                      <Image
                        src={trainer.image || "/placeholder.svg"}
                        alt={trainer.name}
                        fill
                        className="object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-6"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <h3 className="text-xl font-bold text-white">
                          {trainer.name}
                        </h3>
                        <p className="text-signature-gold">{trainer.role}</p>
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <p
                        className={`mb-4 ${
                          isLightMode ? "text-gray-700" : "text-gray-300"
                        }`}
                      >
                        {trainer.bio}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {trainer.specialties.map((specialty, j) => (
                          <motion.span
                            key={j}
                            className="px-3 py-1 bg-signature-gold/20 text-signature-gold rounded-full text-xs"
                            whileHover={{ y: -2 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 10,
                            }}
                          >
                            {specialty}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </AnimatedCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Classes Section */}
        <section
          id="classes"
          className={`py-16 md:py-24 ${
            isLightMode ? "bg-white" : "bg-[#1D1D1D]"
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
                  Featured <span className="text-signature-gold">Classes</span>
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
                  Join our group sessions for motivation, expert guidance, and a
                  supportive community atmosphere
                </motion.p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "HIIT Extreme",
                  subtitle: "High Intensity Interval Training",
                  description:
                    "Push your limits with our high-intensity interval training class designed to boost metabolism and burn fat efficiently.",
                  categories: ["Cardio", "Strength"],
                  duration: "45 Min",
                  schedule: "Mon, Wed, Fri",
                  image: "/hiit-class.png",
                },
                {
                  title: "Power Hour",
                  subtitle: "Strength & Conditioning",
                  description:
                    "Develop functional strength and muscular endurance with our comprehensive strength and conditioning program.",
                  categories: ["Strength", "Endurance"],
                  duration: "60 Min",
                  schedule: "Tue, Thu, Sat",
                  image: "/strength-conditioning-class.png",
                },
              ].map((gymClass, i) => (
                <AnimatedSection key={gymClass.title} delay={i}>
                  <AnimatedCard
                    className={`rounded-lg overflow-hidden ${
                      isLightMode ? "bg-gray-100" : "bg-black/50"
                    }`}
                    hoverEffect="scale"
                  >
                    <div className="relative h-60">
                      <Image
                        src={gymClass.image || "/placeholder.svg"}
                        alt={gymClass.title}
                        fill
                        className="object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-6"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {gymClass.title}
                            </h3>
                            <p className="text-signature-gold">
                              {gymClass.subtitle}
                            </p>
                          </div>
                          <motion.div
                            className="flex items-center bg-signature-gold text-black px-3 py-1 rounded-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm font-bold">
                              {gymClass.duration}
                            </span>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <p
                        className={`mb-4 ${
                          isLightMode ? "text-gray-700" : "text-gray-300"
                        }`}
                      >
                        {gymClass.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          {gymClass.categories.map((category, j) => (
                            <motion.span
                              key={j}
                              className="px-3 py-1 bg-signature-gold/20 text-signature-gold rounded-full text-xs"
                              whileHover={{ y: -2 }}
                            >
                              {category}
                            </motion.span>
                          ))}
                        </div>
                        <motion.span
                          className="text-gray-400"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          viewport={{ once: true }}
                        >
                          {gymClass.schedule}
                        </motion.span>
                      </div>
                    </div>
                  </AnimatedCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className={`py-16 md:py-24 ${
            isLightMode ? "bg-gray-50" : "bg-black"
          }`}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <AnimatedTestimonials
              testimonials={gymTestimonials}
              title="Success Stories"
              subtitle="Hear from our members who have transformed their lives through dedication and our supportive environment"
              lightBackground={false}
            />
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className={`py-16 md:py-24 ${
            isLightMode ? "bg-white" : "bg-[#1D1D1D]"
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
                  Membership{" "}
                  <span className="text-signature-gold">Pricing</span>
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
                  Choose the perfect membership plan that fits your fitness
                  goals and budget
                </motion.p>
              </div>
            </AnimatedSection>

            <MembershipPackages />

            <div className="mt-16 text-center">
              <h3
                className={`text-2xl font-bold mb-4 ${
                  isLightMode ? "text-gray-900" : "text-white"
                }`}
              >
                Additional <span className="text-signature-gold">Services</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
                {[
                  {
                    title: "Personal Training",
                    description: "One-on-one sessions with our expert trainers",
                    price: "$40 / session",
                    note: "Packages available at discounted rates",
                  },
                  {
                    title: "Nutrition Consultation",
                    description: "Personalized nutrition plans and guidance",
                    price: "$60 / session",
                    note: "Includes meal planning and follow-up",
                  },
                  {
                    title: "Group Classes",
                    description: "Access to all our specialized group classes",
                    price: "$15 / class",
                    note: "Class packages available at discounted rates",
                  },
                ].map((service, i) => (
                  <AnimatedSection key={service.title} delay={i}>
                    <AnimatedCard
                      className={`p-6 rounded-lg h-full ${
                        isLightMode ? "bg-gray-100" : "bg-black/50"
                      }`}
                      hoverEffect="glow"
                    >
                      <motion.h4
                        className={`text-xl font-bold mb-2 ${
                          isLightMode ? "text-gray-900" : "text-white"
                        }`}
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        }}
                      >
                        {service.title}
                      </motion.h4>
                      <p
                        className={`mb-3 ${
                          isLightMode ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {service.description}
                      </p>
                      <motion.div
                        className="text-2xl font-bold text-signature-gold mb-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        }}
                      >
                        {service.price}
                      </motion.div>
                      <p
                        className={`text-sm ${
                          isLightMode ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {service.note}
                      </p>
                    </AnimatedCard>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Membership CTA */}
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
                Ready to Transform Your Body?
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl mb-8 text-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join Signature Gym today and start your journey to a stronger,
                healthier you
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <InteractiveButton variant="secondary" size="lg" ripple={true}>
                  <a href="#pricing">View Memberships</a>
                </InteractiveButton>
                <InteractiveButton variant="outlined" size="lg" ripple={true}>
                  <Link href="/contact">Contact Us</Link>
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
