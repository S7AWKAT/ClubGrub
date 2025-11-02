import Header from "@/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { OperatorOutcomes } from "@/components/sections/OperatorOutcomes";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { UseCases } from "@/components/sections/UseCases";
import { AppAnatomy } from "@/components/sections/AppAnatomy";
import { LaunchPlaybook } from "@/components/sections/LaunchPlaybook";
import { SocialProof } from "@/components/sections/SocialProof";
import { FAQ } from "@/components/sections/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { useState } from "react";

const Index = () => {
  const [isProgrammaticScrollActive, setIsProgrammaticScrollActive] = useState(false);

  const handleHeaderScroll = (id: string) => {
    setIsProgrammaticScrollActive(true);

    const APP_ANATOMY_ID = "app-anatomy";
    const SECTION_AFTER_APP_ANATOMY_ID = "launch-playbook";

    const appAnatomyElement = document.getElementById(APP_ANATOMY_ID);
    const targetElement = document.getElementById(id);

    if (appAnatomyElement && targetElement) {
        const appAnatomyTop = appAnatomyElement.offsetTop;
        const appAnatomyBottom = appAnatomyTop + appAnatomyElement.offsetHeight;
        const currentScrollY = window.scrollY;

        const isCurrentlyInAppAnatomy = currentScrollY >= appAnatomyTop && currentScrollY < appAnatomyBottom;
        const isTargetBeforeAppAnatomy = targetElement.offsetTop < appAnatomyTop;

        let finalTargetElement = targetElement;

        if (isCurrentlyInAppAnatomy && isTargetBeforeAppAnatomy) {
            finalTargetElement = document.getElementById(SECTION_AFTER_APP_ANATOMY_ID);
        }

        if (finalTargetElement) {
            const headerElement = document.querySelector('header');
            if (headerElement) {
                const headerHeight = headerElement.offsetHeight;
                let targetPosition = finalTargetElement.offsetTop - headerHeight;
                if (id === 'app-anatomy') {
                    targetPosition += 50;
                }

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    } else if (targetElement) {
        const headerElement = document.querySelector('header');
        if (headerElement) {
            const headerHeight = headerElement.offsetHeight;
            let targetPosition = targetElement.offsetTop - headerHeight;
            if (id === 'app-anatomy') {
                targetPosition += 50;
            }

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    setTimeout(() => {
      setIsProgrammaticScrollActive(false);
    }, 1000); // Adjust delay as needed for smooth scroll duration
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onScrollToSection={handleHeaderScroll} />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Operator Outcomes */}
      <OperatorOutcomes />

      {/* Social Proof */}
      <SocialProof />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Use Cases */}
      <UseCases />

      {/* App Anatomy */}
      <AppAnatomy id="app-anatomy" isExternalScrolling={isProgrammaticScrollActive} />
      
      {/* Launch Playbook */}
      <div id="next-section">
        <LaunchPlaybook />
      </div>
      
      {/* FAQ */}
      <FAQ />
      
      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
};

export default Index;