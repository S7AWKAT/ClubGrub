import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scrollToSection } from "@/lib/utils";
import { CheckCircle, Clock, Users, MessageCircle, Tablet, Rocket, Megaphone } from "lucide-react";
import useSectionVisible from "@/hooks/useSectionVisible";
import { analytics } from "@/lib/analytics";

export const LaunchPlaybook = () => {
  const services = [
    {
      icon: Tablet,
      title: "Menu Build & Content",
      description: "Our team builds your complete digital menu with photos, descriptions, and pricing",
      timeline: "30 min"
    },
    {
      icon: Users,
      title: "Staff Training",
      description: "Comprehensive training for kitchen, service, and management teams",
      timeline: "20 min"
    },
    {
      icon: Megaphone,
      title: "Member Communication",
      description: "Ready-to-send email templates, QR codes, and launch announcement materials",
      timeline: "15 min"
    },
    {
      icon: Rocket,
      title: "Go Live",
      description: "Accept your first order within minutes and receive unlimited tech support.",
      timeline: "Instant"
    }
  ];

  const benefits = [
    "Complimentary iPad included (ready to accept orders in minutes)",
    "Dedicated launch specialist assigned to your club",
    "Member onboarding materials and communication templates",
    "Real-time tech support anytime you need it",
    "Performance analytics and optimization recommendations",
    "Prep printer available"
  ];
  useSectionVisible('launch-playbook');

  return (
    <section id="launch-playbook" className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-club-gold/10 text-club-gold border-club-gold/20 mb-6">
            Turnkey Launch Solution
          </Badge>
          <h2 className="heading-section text-text-primary mb-6">
            We handle the complexity<br />
            so you can <span className="text-gradient">focus on serving members</span>
          </h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            From menu setup to staff training, we provide everything needed for a successful launch. Most clubs are accepting orders within 24 hours.
          </p>
        </div>

        {/* Services Timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="card-feature text-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-cta rounded-2xl flex items-center justify-center mx-auto mb-6">
                <service.icon className="w-8 h-8 text-white" />
              </div>

              <Badge className="bg-club-gold-light/20 text-club-gold border-club-gold-light/30 font-bold px-3 py-1 mb-4">
                {service.timeline}
              </Badge>

              <h3 className="heading-card text-text-primary mb-4">
                {service.title}
              </h3>

              <p className="body-medium text-text-secondary">
                {service.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Quick Launch Promise */}
        <div className="bg-gradient-to-r from-club-gold-light to-club-gold rounded-3xl p-12 text-center mb-16 text-white">
          <Rocket className="w-16 h-16 mx-auto mb-6 text-club-gold-light" />
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Go live as soon as tomorrow
          </h3>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Our proven launch process gets you operational faster than any other technology. No lengthy implementations or complex integrations.
          </p>
        </div>

        {/* Benefits & Features */}
        <div className="animate-fade-up">
          <h3 className="heading-section text-text-primary mb-8 text-center">
            Everything you need to succeed
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mb-12 max-w-5xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-4">
                <span className="flex-shrink-0 mt-0.5">
                    <span className="w-8 h-8 bg-club-gold-light text-white rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                </span>
                <span className="body-medium text-text-secondary">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => { try { analytics.ctaClicked('Start Your Launch Process','contact','launch-playbook'); } catch(e){}; scrollToSection("contact"); }} className="btn-hero px-8 py-4">
              Start Your Launch Process
            </button>
          </div>
        </div>

        {/* Support Promise */}
        <div className="text-center mt-16 bg-club-cream rounded-3xl p-12">
          <h3 className="heading-card text-text-primary mb-4">
            Ongoing support when you need it
          </h3>
          <p className="body-large text-text-secondary mb-6 max-w-2xl mx-auto">
            Our success team provides ongoing optimization, feature updates, and support to ensure your continued growth.
          </p>
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-club-gold">24/7</div>
              <div className="text-sm text-text-secondary">Support Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-club-gold">&lt;2min</div>
              <div className="text-sm text-text-secondary">Avg Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-club-gold">99.9%</div>
              <div className="text-sm text-text-secondary">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};