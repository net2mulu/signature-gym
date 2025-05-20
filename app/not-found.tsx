"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Dumbbell } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="w-full max-w-md mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Dumbbell size={80} className="mx-auto mb-4" />
          <h1 className="text-6xl font-bold mb-2">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-300 mb-8"
        >
          Looks like you've wandered off your fitness path. Let's get you back
          on track!
        </motion.p>

        <div className="flex flex-col space-y-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-900 to-yellow-500 text-white py-3 px-6 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 bg-transparent border border-gray-500 text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 w-full"
            >
              <ArrowLeft size={20} />
              <span>Go Back</span>
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 text-gray-400 text-sm"
        >
          <p>Need help? Contact our support team</p>
        </motion.div>
      </div>
    </div>
  );
}
