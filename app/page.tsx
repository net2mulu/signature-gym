import HeroCarousel from "@/components/hero-carousel"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import WelcomeSection from "@/components/welcome-section"
import GymEquipmentSection from "@/components/gym-equipment-section"
import MembershipPackages from "@/components/membership-packages"
import StudioServicesSection from "@/components/studio-services-section"
import StudioPackages from "@/components/studio-packages"
import DigitalAccessSection from "@/components/digital-access-section"
import OfflineIndicator from "@/components/offline-indicator"
import InstallPrompt from "@/components/install-prompt"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <ThemeToggle />
      <OfflineIndicator />
      <InstallPrompt />
      <main className="flex-grow pb-16 md:pb-0">
        <HeroCarousel />
        <WelcomeSection />
        <GymEquipmentSection />
        <MembershipPackages />
        <StudioServicesSection />
        <StudioPackages />
        <DigitalAccessSection />
      </main>
      <Footer />
    </div>
  )
}
