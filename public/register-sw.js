// Service Worker Registration for Signature Fitness PWA
;(() => {
  // Check if service workers are supported
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          console.log("ServiceWorker registered with scope:", registration.scope)

          // Check for updates on page load
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing
            console.log("Service Worker update found!")

            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                console.log("New content is available; please refresh.")
              }
            })
          })
        })
        .catch((error) => {
          console.error("ServiceWorker registration failed:", error)
        })
    })
  }
})()
