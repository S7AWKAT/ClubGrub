import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, ArrowRight, Calendar, Mail, MapPin } from "lucide-react";

export const ContactCTA = () => {
  return (
    <section className="py-24 bg-gradient-overlay relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--club-gold)) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, hsl(var(--club-gold)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-white animate-fade-up">
            <Badge className="bg-white/10 border-white/20 text-white mb-6">
              Limited Onboarding Slots Available
            </Badge>
            
            <h2 className="heading-section text-white mb-6">
              Ready to elevate<br />
              your <span className="text-gradient">hospitality?</span>
            </h2>
            
            <p className="body-large text-white/90 mb-8 max-w-lg">
              Join the most exclusive clubs in the nation. Transform your F&B operations and exceed member expectations with ClubGrub's premium hospitality technology.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-club-gold flex-shrink-0" />
                <span className="text-white/90">Implementation in 24 hours or less</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-club-gold flex-shrink-0" />
                <span className="text-white/90">Complimentary iPad and setup included</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-club-gold flex-shrink-0" />
                <span className="text-white/90">Dedicated success manager assigned</span>
              </div>
            </div>

            {/* Urgency */}
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6 text-club-gold" />
                <span className="font-semibold text-white">Limited Availability</span>
              </div>
              <p className="text-white/80 text-sm">
                We limit onboarding to ensure premium service quality. Only <strong>8 slots remaining</strong> for this quarter.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-in">
            <Card className="card-premium p-8 bg-white">
              <div className="text-center mb-8">
                <h3 className="heading-card text-text-primary mb-2">
                  Book Your Demo
                </h3>
                <p className="text-text-secondary">
                  See ClubGrub in action at your club
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      First Name *
                    </label>
                    <Input 
                      placeholder="John"
                      className="border-border-muted focus:border-club-gold focus:ring-club-gold/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Last Name *
                    </label>
                    <Input 
                      placeholder="Smith"
                      className="border-border-muted focus:border-club-gold focus:ring-club-gold/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address *
                  </label>
                  <Input 
                    type="email"
                    placeholder="john.smith@club.com"
                    className="border-border-muted focus:border-club-gold focus:ring-club-gold/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Club Name *
                  </label>
                  <Input 
                    placeholder="Prestigious Country Club"
                    className="border-border-muted focus:border-club-gold focus:ring-club-gold/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Your Role *
                  </label>
                  <Input 
                    placeholder="General Manager, F&B Director, etc."
                    className="border-border-muted focus:border-club-gold focus:ring-club-gold/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Phone Number
                  </label>
                  <Input 
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="border-border-muted focus:border-club-gold focus:ring-club-gold/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Tell us about your club
                  </label>
                  <Textarea 
                    placeholder="Number of members, current F&B challenges, specific needs..."
                    rows={4}
                    className="border-border-muted focus:border-club-gold focus:ring-club-gold/20"
                  />
                </div>

                <Button className="btn-hero w-full group text-lg py-4">
                  Schedule My Demo
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-xs text-text-secondary text-center">
                  By submitting this form, you agree to receive communications from ClubGrub. 
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </Card>
          </div>
        </div>

        {/* Alternative Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-club-gold" />
            </div>
            <h4 className="font-semibold mb-2">Schedule a Call</h4>
            <p className="text-white/80 text-sm mb-4">
              Book a convenient time for a personalized demo
            </p>
            <button className="text-club-gold font-medium hover:underline">
              View Calendar →
            </button>
          </div>

          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-club-gold" />
            </div>
            <h4 className="font-semibold mb-2">Email Us</h4>
            <p className="text-white/80 text-sm mb-4">
              Get answers to specific questions
            </p>
            <a href="mailto:sales@clubgrub.com" className="text-club-gold font-medium hover:underline">
              sales@clubgrub.com →
            </a>
          </div>

          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-club-gold" />
            </div>
            <h4 className="font-semibold mb-2">Visit Our Showroom</h4>
            <p className="text-white/80 text-sm mb-4">
              Experience ClubGrub in our hospitality lab
            </p>
            <button className="text-club-gold font-medium hover:underline">
              Schedule Visit →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};