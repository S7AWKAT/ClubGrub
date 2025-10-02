import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { scrollToSection } from "@/lib/utils";
import { ArrowRight, Award, Star, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-clubhouse.jpg";

export const HeroSection = () => {
  return (
    <section  id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Elegant private club dining room with modern mobile technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        {/* Main Headline */}
        <h1 className="heading-hero text-white mb-6 animate-fade-up">
          Sell more F&amp;B<br />
          <span className="text-gradient">Without extra labor</span>
        </h1>

        {/* Subheadline */}
        <p className="body-large text-white/90 max-w-3xl mx-auto mb-8 animate-fade-up [animation-delay:200ms]">
          Elevate hospitality experiences with convenient mobile ordering of food and beverages. Drive revenue while optimizing your team's efficiency.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [animation-delay:600ms]">
          <Button onClick={() => scrollToSection("contact")} className="btn-hero group text-lg px-8 py-4">
            Book a Demo
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button onClick={() => scrollToSection("contact")} variant="outline" className="btn-outline text-lg px-8 py-4">
            See it in action
          </Button>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};