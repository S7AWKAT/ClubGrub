import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scrollToSection } from "@/lib/utils";
import { Smartphone, Tablet, Truck, CheckCircle, Settings } from "lucide-react";
import { analytics } from "@/lib/analytics";

import step1Image from "@/assets/how-it-works-step-1new.jpg";
import step2Image from "@/assets/how-it-works-step-2new.jpg";
import step3Image from "@/assets/how-it-works-step-3new.jpg";

export const HowItWorks = () => {
  // Track section and step visibility
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('data-step');
        if (entry.isIntersecting) {
          if (id) {
            analytics.stepViewed(id);
          } else {
            analytics.sectionVisible('how-it-works');
          }
        }
      });
    }, { threshold: 0.5 }); // 50% visibility threshold

    // Observe main section
    const section = document.getElementById('how-it-works');
    if (section) observer.observe(section);

    // Observe each step
    document.querySelectorAll('[data-step]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: "01",
      icon: Smartphone,
      title: "Members order on mobile device",
      description: "Members browse your menu, select their favorite food or beverages and choose their desired location.",
      features: ["GPS location targeting", "Real-time menu updates", "Member billing integration", "Order customization"],
      image: step1Image,
    },
    {
      number: "02", 
      icon: Tablet,
      title: "Team manages tickets on ClubGrub iPad",
      description: "Kitchen and beverage teams receive orders instantly. Prep, stage, and dispatch with seamless workflow management.",
      features: ["Instant order notifications", "2-way text msg communication", "Prep time optimization", "Staff coordination tools"],
      image: step2Image,
    },
    {
      number: "03",
      icon: Truck,
      title: "Deliver or stage for pickup",
      description: "Real-time order tracking keeps members informed. Flexible delivery options match your operational preferences.",
      features: ["Live order tracking", "No beverage cart required", "Pickup notifications", "Member communication"],
      image: step3Image,
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <Badge className="bg-club-gold/10 text-club-gold border-club-gold/20 mb-6">
            Simple Process, Powerful Results
          </Badge>
          <h2 className="heading-section text-text-primary mb-6">
            How <span className="text-gradient">ClubGrub</span> Works
          </h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            From order to delivery in three seamless steps. Technology that works behind the scenes to enhance your hospitality.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div
              key={step.number}
              data-step={`step-${step.number}`}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className="lg:w-1/2 animate-fade-up w-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-cta rounded-2xl flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-club-gold-light" />
                  </div>
                  <div className="text-6xl font-bold text-club-gold/20">
                    {step.number}
                  </div>
                </div>

                <h3 className="heading-section text-text-primary mb-6">
                  {step.title}
                </h3>

                <p className="body-large text-text-secondary mb-8">
                  {step.description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-club-gold flex-shrink-0" />
                      <span className="body-medium text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Image for mobile view */}
                <div className="lg:hidden mt-8 rounded-2xl overflow-hidden shadow-lg relative flex items-center justify-center">
                  <img src={step.image} alt={step.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={637} height={425} />
                  <div className="aspect-[16/10] w-full" /> {/* This div maintains the aspect ratio */}
                  <div className="absolute inset-0 bg-gradient-to-br from-club-dark/60 to-club-charcoal/40" />
                  {/* Step Indicator for mobile */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-club-gold rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-club-gold-light">{step.number}</span>
                  </div>
                  <div className="relative z-10 text-center">
                    <step.icon className="w-16 h-16 text-club-gold mx-auto" />
                  </div>
                </div>
              </div>

              {/* Visual */}
              <div className="lg:w-1/2 animate-slide-in hidden lg:block">
                <Card className="card-premium p-8 relative overflow-hidden">
                  <div className="aspect-video rounded-xl flex items-center justify-center relative">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                      loading="lazy"
                      width={637}
                      height={414}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-club-dark/60 to-club-charcoal/40 rounded-xl" />
                    <div className="text-center relative z-10">
                      <step.icon className="w-24 h-24 text-club-gold mx-auto mb-4" />
                      <h4 className="heading-card text-white">
                        Step {step.number}
                      </h4>
                    </div>
                  </div>

                  {/* Step Indicator */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-club-gold rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-club-gold-light">{step.number}</span>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Connector */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-club-gold rounded-full" />
            <div className="w-20 h-1 bg-club-gold/30" />
            <div className="w-4 h-4 bg-club-gold rounded-full" />
            <div className="w-20 h-1 bg-club-gold/30" />
            <div className="w-4 h-4 bg-club-gold rounded-full" />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 bg-gradient-to-r from-club-cream to-surface rounded-3xl p-12">
          <Settings className="w-12 h-12 text-club-gold mx-auto mb-6" />
          <h3 className="heading-card text-text-primary mb-4">
            Works with <span className="text-gradient">any POS</span>
          </h3>
          <p className="body-large text-text-secondary mb-8 max-w-2xl mx-auto">
            Keep your existing setup and accept member billing or card payments.
          </p>
          <button onClick={() => { try { (window as any).analytics?.ctaClicked?.('Start Elevating Your Operation','contact','how-it-works'); } catch(e){}; try { analytics.ctaClicked('Start Elevating Your Operation','contact','how-it-works'); } catch(e){}; scrollToSection("contact"); }} className="btn-hero px-8 py-4">
            Start Elevating Your Operation
          </button>
        </div>
      </div>
    </section>
  );
};