import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import SplashScreen from "@/components/splash-screen"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Signature Fitness",
  description: "Your premium gym management app",
  manifest: "/manifest.json",
  themeColor: "#BEA632",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Signature Fitness",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "application-name": "Signature Fitness",
    "apple-mobile-web-app-title": "Signature Fitness",
    "msapplication-TileColor": "#BEA632",
    "msapplication-tap-highlight": "no",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#BEA632" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SplashScreen>{children}</SplashScreen>
        </ThemeProvider>
        <Script src="/register-sw.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
