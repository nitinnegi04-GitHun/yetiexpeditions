import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustMatrix from "@/components/TrustMatrix";
import TrekIndex from "@/components/TrekIndex";
import TrekCalendar from "@/components/TrekCalendar";
import SpecialProjects from "@/components/SpecialProjects";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustMatrix />
      <TrekIndex />
      <TrekCalendar />
      <SpecialProjects />
      <QuoteSection />
      <Footer />
    </main>
  );
}
