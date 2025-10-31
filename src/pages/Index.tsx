import Header from "@/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { OperatorOutcomes } from "@/components/sections/OperatorOutcomes";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { UseCases } from "@/components/sections/UseCases";
import AppAnatomy from "@/components/sections/AppAnatomy";
import { LaunchPlaybook } from "@/components/sections/LaunchPlaybook";
import { SocialProof } from "@/components/sections/SocialProof";
import { FAQ } from "@/components/sections/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Operator Outcomes */}
      <OperatorOutcomes />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Use Cases */}
      <UseCases />

      {/* App Anatomy */}
      <AppAnatomy />
      
      {/* Launch Playbook */}
      <div id="next-section">
        <LaunchPlaybook />
      </div>
      
      {/* Social Proof */}
      <SocialProof />
      
      {/* FAQ */}
      <FAQ />
      
      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
};

export default Index;