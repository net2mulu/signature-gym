"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    // Check if the app is already installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setIsInstallable(true);

      // Show tooltip after 3 seconds if the app is installable
      setTimeout(() => {
        setShowTooltip(true);
      }, 3000);
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowTooltip(false);

      // Send analytics event
      if (typeof window !== "undefined" && "gtag" in window) {
        // @ts-ignore
        window.gtag("event", "app_installed", {
          event_category: "engagement",
          event_label: "PWA Installation",
        });
      }
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );
    window.addEventListener("appinstalled", handleAppInstalled);

    // Auto-hide tooltip after 10 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Hide tooltip
    setShowTooltip(false);

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(
      `User ${
        outcome === "accepted" ? "accepted" : "dismissed"
      } the install prompt`
    );

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);

    if (outcome === "accepted") {
      setIsInstallable(false);
    }
  };

  if (!isInstallable || isInstalled) {
    return null;
  }

  // Return both the floating button and the navbar button
  return (
    <>
      {/* Floating button (existing) */}
      <motion.button
        id="install-button"
        onClick={handleInstallClick}
        className="fixed bottom-20 right-4 z-50 p-3 rounded-full shadow-lg bg-signature-gold text-black hover:bg-signature-gold/90 transition-colors"
        aria-label="Install App"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Download className="h-6 w-6" />
      </motion.button>

      {/* Mobile navbar install button */}
      {isMobile && (
        <motion.button
          onClick={handleInstallClick}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 py-1.5 px-4 rounded-full shadow-md bg-signature-gold text-black text-sm font-medium flex items-center space-x-1"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <Download className="h-4 w-4 mr-1" />
          <span>Install App</span>
        </motion.button>
      )}

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-32 right-4 z-50 bg-white text-black p-3 rounded-lg shadow-lg max-w-[200px] text-sm"
          >
            Install Signature Fitness on your device for the best experience!
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
