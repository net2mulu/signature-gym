// Register the service worker for PWA functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful with scope: ", registration.scope)
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed: ", error)
      })
  })
}

// Handle PWA installation prompt
let deferredPrompt
const installButton = document.getElementById("install-button")

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault()
  // Stash the event so it can be triggered later
  deferredPrompt = e

  // Show the install button if it exists
  if (installButton) {
    installButton.style.display = "block"

    installButton.addEventListener("click", () => {
      // Show the install prompt
      deferredPrompt.prompt()

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt")
        } else {
          console.log("User dismissed the install prompt")
        }
        deferredPrompt = null
      })
    })
  }
})

// Hide the install button when the PWA is installed
window.addEventListener("appinstalled", (evt) => {
  if (installButton) {
    installButton.style.display = "none"
  }
  console.log("Signature Fitness has been installed")
})
