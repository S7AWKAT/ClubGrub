import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Tablet, Truck, CheckCircle, Settings } from "lucide-react";

import step1Image from "@/assets/how-it-works-step-1.jpg";
import step2Image from "@/assets/how-it-works-step-2.jpg";
import step3Image from "@/assets/how-it-works-step-3.jpg";

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Smartphone,
      title: "Members order on mobile device",
      description: "GPS pins remove guesswork. Members select their exact location and browse your full menu with real-time availability.",
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
      features: ["Live order tracking", "Delivery route optimization", "Pickup notifications", "Member communication"],
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
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className="lg:w-1/2 animate-fade-up">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-cta rounded-2xl flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-club-dark" />
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
              </div>

              {/* Visual */}
              <div className="lg:w-1/2 animate-slide-in">
                <Card className="card-premium p-8 relative overflow-hidden">
                  <div className="aspect-video rounded-xl flex items-center justify-center relative">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-club-gold/30 to-club-gold-light/30 rounded-xl" />
                    <div className="text-center relative z-10">
                      <step.icon className="w-24 h-24 text-club-gold mx-auto mb-4" />
                      <h4 className="heading-card text-white mb-2">
                        Step {step.number}
                      </h4>
                      <p className="body-medium text-white/80">{step.title}</p>
                    </div>
                  </div>

                  {/* Step Indicator */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-club-gold rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-club-dark">{step.number}</span>
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
          <button className="btn-hero px-8 py-4">
            Check Compatibility
          </button>
        </div>
      </div>
    </section>
  );
};