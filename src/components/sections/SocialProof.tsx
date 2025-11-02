import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scrollToSection } from "@/lib/utils";
import {
  Design4,
} from "./SocialProofDesigns";

export const SocialProof = () => {
  const stats = [
    { number: "100%", label: "Member Satisfaction" },
    { number: "35%", label: "Avg Revenue Increase" },
    { number: "24hrs", label: "Implementation Time" },
  ];

  return (
    <section id="trusted" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <Badge className="bg-club-gold/10 text-club-gold border-club-gold/20 mb-6">
            Trusted by Elite Clubs
          </Badge>
          <h2 className="heading-section text-text-primary mb-6">
            Trusted by <span className="text-gradient">industry leaders</span>
          </h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            We're proud to partner with the best in the business.
          </p>
        </div>

        <Design4 />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="card-premium text-center p-6 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold text-club-gold mb-2">{stat.number}</div>
              <div className="text-text-secondary">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="body-large text-text-secondary mb-6">
            Join the clubs setting the standard for premium hospitality
          </p>
          <button onClick={() => scrollToSection("contact")} className="btn-hero px-8 py-4">
            Schedule Your Demo
          </button>
        </div>
      </div>
    </section>
  );
};