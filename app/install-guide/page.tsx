import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function InstallGuidePage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-sm mb-6 text-gray-400 hover:text-white">
        <ArrowLeft size={16} className="mr-1" />
        Back to home
      </Link>

      <h1 className="text-2xl font-bold mb-6">How to Install Signature Fitness</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">For iPhone & iPad</h2>
          <ol className="space-y-6">
            <li className="flex flex-col">
              <span className="font-medium mb-2">1. Open in Safari</span>
              <p className="text-sm text-gray-400 mb-2">This app must be installed from Safari browser.</p>
              <div className="bg-gray-800 rounded-lg p-4 w-full h-48 flex items-center justify-center">
                <Image
                  src="/screenshots/ios-safari.png"
                  alt="Open in Safari"
                  width={200}
                  height={150}
                  className="object-contain"
                />
              </div>
            </li>

            <li className="flex flex-col">
              <span className="font-medium mb-2">2. Tap the Share button</span>
              <div className="bg-gray-800 rounded-lg p-4 w-full h-48 flex items-center justify-center">
                <Image
                  src="/screenshots/ios-share.png"
                  alt="Tap share button"
                  width={200}
                  height={150}
                  className="object-contain"
                />
              </div>
            </li>

            <li className="flex flex-col">
              <span className="font-medium mb-2">3. Scroll down and tap "Add to Home Screen"</span>
              <div className="bg-gray-800 rounded-lg p-4 w-full h-48 flex items-center justify-center">
                <Image
                  src="/screenshots/ios-add-home.png"
                  alt="Add to Home Screen"
                  width={200}
                  height={150}
                  className="object-contain"
                />
              </div>
            </li>

            <li className="flex flex-col">
              <span className="font-medium mb-2">4. Tap "Add" in the top right</span>
              <p className="text-sm text-gray-400 mb-2">You can edit the name if you want.</p>
              <div className="bg-gray-800 rounded-lg p-4 w-full h-48 flex items-center justify-center">
                <Image
                  src="/screenshots/ios-confirm.png"
                  alt="Tap Add"
                  width={200}
                  height={150}
                  className="object-contain"
                />
              </div>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">For Android</h2>
          <p className="text-sm text-gray-400 mb-4">
            On most Android devices, you'll be prompted automatically to install the app. If not, follow these steps:
          </p>
          <ol className="space-y-6">
            <li className="flex flex-col">
              <span className="font-medium mb-2">1. Tap the menu button (⋮)</span>
              <div className="bg-gray-800 rounded-lg p-4 w-full h-48 flex items-center justify-center">
                <Image
                  src="/screenshots/android-menu.png"
                  alt="Tap menu"
                  width={200}
                  height={150}
                  className="object-contain"
                />
              </div>
            </li>

            <li className="flex flex-col">
              <span className="font-medium mb-2">2. Tap "Install app" or "Add to Home screen"</span>
              <div className="bg-gray-800 rounded-lg p-4 w-full h-48 flex items-center justify-center">
                <Image
                  src="/screenshots/android-install.png"
                  alt="Install app"
                  width={200}
                  height={150}
                  className="object-contain"
                />
              </div>
            </li>
          </ol>
        </section>
      </div>
    </div>
  )
}
