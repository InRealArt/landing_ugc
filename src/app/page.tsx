import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ArtConvertsSection from "@/components/ArtConvertsSection";
import ClientsMarquee from "@/components/ClientsMarquee";
import ArtistsGrid from "@/components/ArtistsGrid";
import HowItWorks from "@/components/HowItWorks";
import UGCStats from "@/components/UGCStats";
import Testimonials from "@/components/Testimonials";
import ComparisonTable from "@/components/ComparisonTable";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />
      <main>
        <HeroSection />
        <ArtConvertsSection />
        <ClientsMarquee />
        <ArtistsGrid />
        <HowItWorks />
        <UGCStats />
        <Testimonials />
        <ComparisonTable />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
