// Service Worker Registration for Signature Fitness PWA

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    registerServiceWorker()
    handleInstallPrompt()
    checkConnectivity()
  })
}

// Register the service worker
async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" })
    console.log("ServiceWorker registered with scope:", registration.scope)

    // Check for updates on page load
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing
      console.log("Service Worker update found!")

      newWorker.addEventListener("statechange", () => {
        if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
          showUpdateNotification()
        }
      })
    })

    // Set up periodic background sync if supported
    if ("periodicSync" in registration) {
      try {
        await registration.periodicSync.register("update-content", {
          minInterval: 24 * 60 * 60 * 1000, // Once per day
        })
        console.log("Periodic background sync registered")
      } catch (error) {
        console.log("Periodic background sync registration failed:", error)
      }
    }
  } catch (error) {
    console.error("ServiceWorker registration failed:", error)
  }
}

// Handle the install prompt
let deferredPrompt

function handleInstallPrompt() {
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault()

    // Stash the event so it can be triggered later
    deferredPrompt = e

    // Update UI to notify the user they can install the PWA
    showInstallPromotion()

    // Log that the install prompt has been captured
    console.log("Install prompt is available")
  })

  // When the app is successfully installed
  window.addEventListener("appinstalled", (evt) => {
    // Log the installation
    console.log("Signature Fitness was installed")

    // Hide the install promotion
    hideInstallPromotion()

    // Clear the deferredPrompt
    deferredPrompt = null

    // Analytics
    sendAnalyticsEvent("app", "installed")
  })
}

// Show the install promotion UI
function showInstallPromotion() {
  const installButton = document.getElementById("install-button")
  if (installButton) {
    installButton.style.display = "flex"

    installButton.addEventListener("click", async () => {
      if (!deferredPrompt) return

      // Show the install prompt
      deferredPrompt.prompt()

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice
      console.log(`User ${outcome === "accepted" ? "accepted" : "dismissed"} the install prompt`)

      // We've used the prompt, and can't use it again, throw it away
      deferredPrompt = null

      // Hide the install button
      hideInstallPromotion()
    })
  }
}

// Hide the install promotion UI
function hideInstallPromotion() {
  const installButton = document.getElementById("install-button")
  if (installButton) {
    installButton.style.display = "none"
  }
}

// Show update notification
function showUpdateNotification() {
  // Create and show a notification that an update is available
  const updateBanner = document.createElement("div")
  updateBanner.id = "update-banner"
  updateBanner.innerHTML = `
    <div style="position: fixed; bottom: 0; left: 0; right: 0; background-color: #BEA632; color: #000; padding: 1rem; text-align: center; z-index: 9999; display: flex; justify-content: space-between; align-items: center;">
      <span>A new version is available!</span>
      <button id="update-button" style="background-color: #000; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">Update Now</button>
    </div>
  `

  document.body.appendChild(updateBanner)

  document.getElementById("update-button").addEventListener("click", () => {
    window.location.reload()
  })
}

// Check and handle connectivity changes
function checkConnectivity() {
  const updateNetworkStatus = () => {
    if (navigator.onLine) {
      document.documentElement.classList.remove("offline")
      console.log("App is online")
    } else {
      document.documentElement.classList.add("offline")
      console.log("App is offline")
    }
  }

  window.addEventListener("online", updateNetworkStatus)
  window.addEventListener("offline", updateNetworkStatus)

  // Initial check
  updateNetworkStatus()
}

// Helper function for analytics
function sendAnalyticsEvent(category, action) {
  // Implementation depends on your analytics provider
  console.log(`Analytics: ${category} - ${action}`)
}
