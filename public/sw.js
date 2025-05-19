// Signature Fitness Service Worker
const CACHE_NAME = "signature-fitness-v1"

// Assets to cache immediately on service worker install
const PRECACHE_ASSETS = [
  "/",
  "/login",
  "/signup",
  "/manifest.json",
  "/signature-logo.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/apple-touch-icon.png",
  "/offline.html",
]

// Install event - precache key assets
self.addEventListener("install", (event) => {
  self.skipWaiting() // Ensure new service worker activates immediately

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache")
        return cache.addAll(PRECACHE_ASSETS)
      })
      .catch((err) => console.error("Pre-caching failed:", err)),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName.startsWith("signature-fitness-") && cacheName !== CACHE_NAME
            })
            .map((cacheName) => {
              console.log("Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }),
        )
      })
      .then(() => {
        console.log("Service Worker activated and controlling the page")
        return self.clients.claim() // Take control of all clients
      }),
  )
})

// Helper function to determine if a request is an API call
const isApiRequest = (url) => {
  return url.pathname.startsWith("/api/")
}

// Helper function to determine if a request is for a static asset
const isStaticAsset = (url) => {
  return /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/.test(url.pathname)
}

// Fetch event - handle network requests
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url)

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return
  }

  // For API requests, use network first, then cache
  if (isApiRequest(url)) {
    event.respondWith(networkFirstStrategy(event.request))
    return
  }

  // For static assets, use cache first, then network
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirstStrategy(event.request))
    return
  }

  // For HTML pages, use network first with offline fallback
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/offline.html")
      }),
    )
    return
  }

  // Default: stale-while-revalidate strategy
  event.respondWith(staleWhileRevalidateStrategy(event.request))
})

// Cache-first strategy (good for static assets)
const cacheFirstStrategy = async (request) => {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    const cache = await caches.open(CACHE_NAME)
    cache.put(request, networkResponse.clone())
    return networkResponse
  } catch (error) {
    console.error("Cache first strategy failed:", error)
    // No fallback for static assets
  }
}

// Network-first strategy (good for API calls)
const networkFirstStrategy = async (request) => {
  try {
    const networkResponse = await fetch(request)
    const cache = await caches.open(CACHE_NAME)
    cache.put(request, networkResponse.clone())
    return networkResponse
  } catch (error) {
    console.error("Network first strategy failed:", error)
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    // No fallback for API calls
  }
}

// Stale-while-revalidate strategy (good for balance)
const staleWhileRevalidateStrategy = async (request) => {
  const cachedResponse = await caches.match(request)

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, networkResponse.clone())
      })
      return networkResponse
    })
    .catch((error) => {
      console.error("Stale while revalidate fetch failed:", error)
    })

  return cachedResponse || fetchPromise
}

// Push event - handle push notifications
self.addEventListener("push", (event) => {
  if (!event.data) return

  try {
    const data = event.data.json()

    const options = {
      body: data.body || "New notification from Signature Fitness",
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-72x72.png",
      vibrate: [100, 50, 100],
      data: {
        url: data.url || "/",
        dateOfArrival: Date.now(),
        primaryKey: data.id || 1,
      },
      actions: [
        {
          action: "view",
          title: "View",
          icon: "/icons/icon-72x72.png",
        },
      ],
    }

    event.waitUntil(self.registration.showNotification(data.title || "Signature Fitness", options))
  } catch (error) {
    console.error("Push notification error:", error)

    // Fallback for non-JSON data
    event.waitUntil(
      self.registration.showNotification("Signature Fitness", {
        body: event.data.text(),
        icon: "/icons/icon-192x192.png",
      }),
    )
  }
})

// Notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "view" && event.notification.data && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url))
  } else {
    event.waitUntil(clients.openWindow("/"))
  }
})

// Periodic sync for background updates
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "update-content") {
    event.waitUntil(updateContent())
  }
})

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-bookings") {
    event.waitUntil(syncBookings())
  }
})

// Helper function for content updates
async function updateContent() {
  try {
    const cache = await caches.open(CACHE_NAME)
    await cache.add("/api/latest-content")
    console.log("Content updated in background")
  } catch (error) {
    console.error("Background update failed:", error)
  }
}

// Helper function for syncing offline bookings
async function syncBookings() {
  try {
    // Get stored bookings from IndexedDB and send to server
    console.log("Syncing offline bookings")
    // Implementation would depend on your IndexedDB structure
  } catch (error) {
    console.error("Booking sync failed:", error)
  }
}
