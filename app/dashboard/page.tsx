"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { ThemeToggle } from "@/components/theme-toggle"
import AuthGuard from "@/components/auth-guard"
import type { Subscription, Membership } from "@/types"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [memberships, setMemberships] = useState<Record<string, Membership>>({})
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's subscriptions
        const subsResponse = await fetch("/api/subscriptions")
        const subsData = await subsResponse.json()

        if (subsData.success) {
          setSubscriptions(subsData.data)

          // Fetch membership details for each subscription
          const membershipIds = [...new Set(subsData.data.map((sub: Subscription) => sub.membershipId))]
          const membershipsMap: Record<string, Membership> = {}

          for (const id of membershipIds) {
            const membershipResponse = await fetch(`/api/memberships/${id}`)
            const membershipData = await membershipResponse.json()

            if (membershipData.success) {
              membershipsMap[id] = membershipData.data
            }
          }

          setMemberships(membershipsMap)
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchData()
    } else {
      // Redirect to home page since we're only maintaining UI without actual auth
      router.push("/")
    }
  }, [session, router])

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <ThemeToggle />

        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          <h1 className="text-3xl font-bold mb-6">Welcome, {session?.user?.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">Active Memberships</h2>
              <p className="text-4xl font-bold text-signature-gold">
                {subscriptions.filter((s) => s.status === "ACTIVE").length}
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">Guest Passes</h2>
              <p className="text-4xl font-bold text-signature-gold">
                {subscriptions.reduce((total, sub) => total + sub.guestPasses, 0)}
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">Next Payment</h2>
              <p className="text-4xl font-bold text-signature-gold">
                {subscriptions.length > 0 ? new Date(subscriptions[0].endDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Memberships</h2>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-10 h-10 border-4 border-signature-gold border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : subscriptions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Membership</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Start Date</th>
                      <th className="text-left py-3 px-4">End Date</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((subscription) => (
                      <tr key={subscription.id} className="border-b">
                        <td className="py-3 px-4">{memberships[subscription.membershipId]?.name || "Loading..."}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              subscription.status === "ACTIVE"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : subscription.status === "PAUSED"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {subscription.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{new Date(subscription.startDate).toLocaleDateString()}</td>
                        <td className="py-3 px-4">{new Date(subscription.endDate).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <button
                            className="text-signature-gold hover:underline mr-3"
                            onClick={() => router.push(`/subscriptions/${subscription.id}`)}
                          >
                            View
                          </button>
                          {subscription.status === "ACTIVE" ? (
                            <button
                              className="text-yellow-600 hover:underline"
                              onClick={() => router.push(`/subscriptions/${subscription.id}/pause`)}
                            >
                              Pause
                            </button>
                          ) : subscription.status === "PAUSED" ? (
                            <button
                              className="text-green-600 hover:underline"
                              onClick={() => router.push(`/subscriptions/${subscription.id}/resume`)}
                            >
                              Resume
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="mb-4">You don't have any active memberships.</p>
                <button
                  className="px-4 py-2 bg-signature-gold text-white rounded-md hover:bg-signature-gold/90 transition-colors"
                  onClick={() => router.push("/memberships")}
                >
                  Browse Memberships
                </button>
              </div>
            )}
          </div>

          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <button
                className="p-4 border border-signature-gold/30 rounded-lg hover:bg-signature-gold/10 transition-colors text-left"
                onClick={() => router.push("/memberships")}
              >
                <h3 className="font-semibold mb-1">Browse Memberships</h3>
                <p className="text-sm">Discover and join new memberships.</p>
              </button>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
