import { Navbar, Footer } from "../../components/index.js";
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  StatsSection,
  PricingSection,
  CTASection,
} from "../../sections/index.js";
/* Landing page hihi */
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />
      {/* Stats Section */}
      <StatsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
