import { Header } from "@/components/layout/Header";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FAQ } from "@/components/sections/FAQ";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LaunchPlaybook } from "@/components/sections/LaunchPlaybook";
import { OperatorOutcomes } from "@/components/sections/OperatorOutcomes";
import { SocialProof } from "@/components/sections/SocialProof";
import { UseCases } from "@/components/sections/UseCases";

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <UseCases />
        <HowItWorks />
        <OperatorOutcomes />
        <LaunchPlaybook />
        <SocialProof />
        <FAQ />
        <ContactCTA />
      </main>
    </>
  );
}

export default App;